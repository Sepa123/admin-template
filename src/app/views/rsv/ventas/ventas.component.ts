import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { RsvService } from 'src/app/service/rsv.service'
import { CatalogoRSV,ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface';
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import { ComunasService } from 'src/app/service/comunas/comunas.service';
import { TipoDespacho } from 'src/app/models/tipoDespacho.inteface'

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class VentasComponent {
  
  skillsForm: FormGroup;
  colores : ColoresRSV[] = []

  codigosProductos : CatalogoPorColor [] = []

  sucursalesRSV : SucursalRSV [] = []

  arrayCodigosProductos : CatalogoPorColor[][] = []
  ventasForm : FormGroup;

  tipoDespacho : TipoDespacho [] = []

  listaRegiones : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []

  // "Id_user" : 1,
  //   "Ids_user" : "",
  //   "Sucursal" : 1,
  //   "Cliente" : "",
  //   "Direccion" : "",
  //   "Comuna" : "",
  //   "Region" : "",
  //   "Fecha_entrega" : "",
  //   "Tipo_despacho" : 1,
  //   "Numero_factura" : "",
  //   "Codigo_ty" : "",
  //   "Entregado" : false

  nombreCargaExiste : boolean = false

  isErrorView : boolean = false
  constructor(private fb:FormBuilder,private service: RsvService , private comunaService : ComunasService) {

    this.ventasForm = this.fb.group({
      Id_user : this.fb.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
      Ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
      Cliente : this.fb.control("", [Validators.required] ),
      Sucursal : this.fb.control("", [Validators.required] ),
      Direccion : this.fb.control("", [Validators.required]),
      Region : this.fb.control("", [Validators.required]),
      Comuna : this.fb.control("", [Validators.required]),
      Fecha_entrega : this.fb.control("", [Validators.required]),
      Tipo_despacho : this.fb.control("", [Validators.required]),
      Numero_factura : this.fb.control("", [Validators.required]),
      Codigo_ty : this.fb.control(""),
      Entregado : this.fb.control(false),
      arrays : this.fb.array([])
    })
 
    this.skillsForm = this.fb.group({
      name: '',
      skills: this.fb.array([]) ,
    });
  
  }
 
  get skills() : FormArray {
    return this.skillsForm.get("skills") as FormArray
  }

  get arrays() : FormArray {
    return this.ventasForm.get("arrays") as FormArray
  }
 
  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: '',
    })
  }

  newProducto(): FormGroup {
    return this.fb.group ({
        Id_venta : this.fb.control(0),
        Codigo : this.fb.control("", [Validators.required]),
        Unidades : this.fb.control("", [Validators.required]),
        Id_user : this.fb.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
        Ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
        Descripcion : this.fb.control(""),
        Color : this.fb.control("", [Validators.required] ),
    })
  }

  cargaUnica(){
    const nombreCarga = this.ventasForm.value.Nombre_carga
    this.service.buscar_carga_por_nombre_carga(nombreCarga.trim()).subscribe((data : any)=> {
      if(data.repetido){
        alert(data.message)
        this.nombreCargaExiste = true
      }else{
        this.nombreCargaExiste = false
      }
    })
  }

  buscarComunas(event: any){
    const selectedRegionId = event.target.value;
    console.log('Región seleccionada:', selectedRegionId);
    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )
    this.ventasForm.patchValue({
      Comuna : this.listaComunas[0].Nombre_comuna
    })

  }

  cambio(index : number){
    this.arrayCodigosProductos[index] = [{
      "Codigo": "",
      "Producto": "",
      "Color" : 0
    }]
    const color : number = this.ventasForm.value.arrays[index].Color

    this.service.filtrar_catalogo_por_color(color).subscribe((data)=> {
      this.codigosProductos = data
      // this.arrayCodigosProductos = data
      this.arrayCodigosProductos[index] = this.codigosProductos
      console.log(this.arrayCodigosProductos[index][0].Codigo)

    })

  }


  seleccionCodigo(i : number){
    const codigo : string = this.ventasForm.value.arrays[i].Codigo
    const producto = this.arrayCodigosProductos[i].find(cod => cod.Codigo == codigo)?.Producto
    this.arrays.at(i).patchValue({
            Descripcion : producto
          })

    // alert(codigo)
  }

  addCargas() {
    this.arrays.push(this.newProducto());

    this.arrayCodigosProductos.push([{
      "Codigo": "",
      "Producto": "",
      "Color" : 0
    }])

    this.arrayCodigosProductos[this.arrays.length-1] = [{
      "Codigo": "",
      "Producto": "",
      "Color" : 0
    }]

    console.log(this.arrayCodigosProductos)
  }

  removeCarga(i:number) {
    this.arrayCodigosProductos.splice(i,1)
    this.arrays.removeAt(i);
  }
 
  onSubmit() {
    // console.log(this.skillsForm.value);
    this.isErrorView = true
    const indexArray = this.ventasForm.value.arrays.length

    console.log("this.ventasForm.value.arrays")
    console.log(this.ventasForm.value.Region)
    // const comuna = this.listaComunasFull.filter(lista => lista.Id == )
    const region = this.listaRegiones.filter(lista => lista.Id_region  == this.ventasForm.value.Region)
    this.ventasForm.patchValue({
      // Region : region[0].Nombre_region,
      Codigo_ty : "rsvty"
    })

    if(this.ventasForm.valid){
      this.ventasForm.patchValue({
        Region : region[0].Nombre_region,
        Codigo_ty : "rsvty"
      })
        this.service.insert_nota_venta(this.ventasForm.value).subscribe((data:any) => {
          alert(data.message)
          this.ventasForm.reset() 

          this.ventasForm.patchValue({
            Codigo_ty : "rsvty",
            Id_user : sessionStorage.getItem("id")?.toString()+"",
            Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
            Cliente : "",
            Sucursal : "",
            Direccion : "",
            Region : "",
            Comuna :"",
            Fecha_entrega : "",
            Tipo_despacho : "",
            Numero_factura : "",
            Entregado : false,
          })

          for (let index = indexArray; index >= 0; index--) {
            console.log(index)
            this.arrays.removeAt(index)
          }
          this.arrayCodigosProductos = []
          
          this.isErrorView = false
        },(error) => {
          alert(error.error.detail)
        })
    } else {
      console.log(this.ventasForm)
    }
  }

  ngOnInit(){
    this.service.get_colores_rsv().subscribe((data) => {
      this.colores = data
      
    })

    this.comunaService.getListaRegiones().subscribe((data : any) => {
      this.listaRegiones = data
    })

    this.comunaService.getListaComunas().subscribe((data : any) => {
      this.listaComunas = data
      this.listaComunasFull = this.listaComunas
    })

    setTimeout(() => {
      this.service.get_sucursales().subscribe((data) => {
        this.sucursalesRSV = data
      })
    },500)

    setTimeout(() => {
      this.service.get_tipo_despacho().subscribe((data) => {
        this.tipoDespacho = data
      })
    },700)

  }

}