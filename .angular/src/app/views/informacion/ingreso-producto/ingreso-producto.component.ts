import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { ProductosService } from '../../../service/productos.service'
import { ComunasService } from '../../../service/comunas/comunas.service'
import { RutasService } from 'src/app/service/rutas.service';
import { RetiroClienteService } from '../../../service/retiro-cliente.service'

import { ProductosPorSKU } from 'src/app/models/productoPorSKU.interface';
@Component({
  selector: 'app-ingreso-producto',
  templateUrl: './ingreso-producto.component.html',
  styleUrls: ['./ingreso-producto.component.scss']
})
export class IngresoProductoComponent {

  constructor(public builder: FormBuilder, private comunaService : ComunasService, 
              private productoService : ProductosService, private rutaService: RutasService,
              private retiroCliente : RetiroClienteService){
  }
  productosSKU!  : ProductosPorSKU []
  listaRegiones : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []
  idPortal! : string

  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string

  selectedRegion! : string 

  form = this.builder.group({
    Cliente : this.builder.control("Easy", [Validators.required]),
    Codigo_pedido : this.builder.control("", [Validators.required]),
    Tipo : this.builder.control("Envio", [Validators.required]),
    Envio_asociado : this.builder.control("", [Validators.required]),
    Fecha_pedido : this.builder.control("", [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    SKU : this.builder.control("", [Validators.required, Validators.pattern('^[0-9]+$')]),
    Descripcion_producto : this.builder.control("", [Validators.required]),
    Cantidad : this.builder.control("", [Validators.required, this.positiveNumberValidator]),
    Bultos : this.builder.control("", [Validators.required,this.positiveNumberValidator]),
    Nombre_cliente : this.builder.control("", [Validators.required]),
    Direccion : this.builder.control("", [Validators.required]),
    Comuna : this.builder.control("Arica", [Validators.required]),
    Telefono : this.builder.control("", [Validators.required]),
    Email : this.builder.control("", [Validators.email]),
    Region : this.builder.control("1", [Validators.required]),
    Id_usuario : this.builder.control("1")
  })

  isSubmitDisabled : boolean = false

  isErrorView = false;

  ngOnInit(){

    this.getLocation()

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""

    this.comunaService.getListaRegiones().subscribe((data : any) => {
      this.listaRegiones = data
    })

    this.comunaService.getListaComunas().subscribe((data : any) => {
      this.listaComunas = data
      this.listaComunasFull = this.listaComunas
    })



  }

  getLocation(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position)

      });
    } else {
      console.log("Localización no disponible");
    }
  }
  showPosition(position: any): any{
        this.latitude = position.coords.latitude
        this.longitud= position.coords.longitude 
       this.latStr = this.latitude.toString()
        this.longStr = this.longitud.toString()

    console.log("Longitud : " , this.longStr, "latitud :", this.latStr)
  }

  buscarComunas(event: any){
    const selectedRegionId = event.target.value;
    console.log('Región seleccionada:', selectedRegionId);
    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )
    this.form.patchValue({
      Comuna : this.listaComunas[0].Nombre_comuna
    })
  }

  regex = /\(\s*(EASY|Electrolux|Sportex|Easy OPL)\s*\)\s*/g;

  eliminarCadenas(input : string) {
  return input.replace(this.regex, '');
}

  buscarSKU(){
    const cod_sku : any = this.form.value.SKU
    this.productoService.getProductosPorSKU(cod_sku).subscribe((data) => {
      console.log(data[0].Descripcion_producto)
      this.form.patchValue({
        Descripcion_producto : this.eliminarCadenas(data[0].Descripcion_producto).trim()
      })
    })
  }

    // Función personalizada para validar que el número sea positivo
    positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      if (value && Number(value) <= 0) {
        return { positiveNumber: true };
      }
      return null;
    }

  buscarEnvioAsociado(){
    const cod_pedido : any = this.form.value.Envio_asociado

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""

    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Ingreso E/R",
      "n_guia" : cod_pedido,
      "cod_pedido" : cod_pedido,
      "cod_producto" : cod_pedido,
      "ids_usuario" : this.idPortal,
      "latitud" : this.latStr,
      "longitud" : this.longStr,
      "observacion" : "Ingresando producto en Ingreso Producto"
      // "cod_sku" : sku
    }

    this.rutaService.get_rutas_manual(body).subscribe((data) => {
      const filterComuna = this.listaComunasFull.find(comuna => comuna.Nombre_comuna.toUpperCase() == data[0].Ciudad.toUpperCase())  
      let comunaRuta = ""
      let regionRuta = ""
      if(filterComuna !== undefined){
        comunaRuta =  filterComuna.Nombre_comuna
        const region_seleccion = this.listaRegiones.find(region => region.Id_region == filterComuna.Id_region)
        regionRuta = region_seleccion.Id_region
      }
      this.form.patchValue({
        Cliente : data[0].Notas,
        Nombre_cliente : data[0].Nombre,
        Direccion : data[0].Calle,
        Comuna : comunaRuta,
        Region : regionRuta,
        Email : data[0].Email,
        Telefono : data[0].Telefono
      })
    })
  }

  registrar(){
    console.log(this.form.value)
    this.isErrorView = false

    this.form.patchValue({
      Id_usuario : sessionStorage.getItem("id")?.toString()+""
    })

    if(this.form.value.Email == "") {
      this.form.patchValue({
        Email : "sin.correo@transyanez.cl"
      })
    }
    if(this.form.valid){
      console.log(this.form.value)
      this.retiroCliente.registrar_retiro_cliente(this.form.value).subscribe((data) => {
        console.log("El registro si llego", data)
        alert("Codigo de registro realizado correctamente")
        this.form.reset();
      })
    }else{
      this.isErrorView = true
      // alert("Hay datos incorrectos")
    }
  }

}
