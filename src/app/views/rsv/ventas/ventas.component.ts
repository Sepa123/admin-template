import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { RsvService } from 'src/app/service/rsv.service'
import { CatalogoRSV,ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface';
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import { ComunasService } from 'src/app/service/comunas/comunas.service';
import { TipoDespacho } from 'src/app/models/tipoDespacho.inteface'
import { EvaluacionPedidoRSV} from 'src/app/models/evaluacionPedidoRSV.interface'
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class VentasComponent {
  
  skillsForm: FormGroup;
  colores : ColoresRSV[] = []

  public rol = sessionStorage.getItem("rol_id") 

  arrEvaluacionPedidoRSV : EvaluacionPedidoRSV [] = []

  codigosProductos : CatalogoPorColor [] = []

  sucursalesRSV : SucursalRSV [] = []

  arrayCodigosProductos : CatalogoPorColor[][] = []
  ventasForm : FormGroup;

  tipoDespacho : TipoDespacho [] = []

  listaRegiones : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []

  isModalOpen: boolean = false
  public visible = false;

  etiqueta : string = ""

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  
  openModal(){
    
    this.isModalOpen = true

    console.log(this.isModalOpen)
  }

  closeModal(){
    this.isModalOpen = false
  }

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
      arrays : this.fb.array([]),
      etiqueta : this.fb.control("")
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
        Retorno : this.fb.control(""),
        Mensaje : this.fb.control(""),
        E_paquetes : this.fb.control(""),
        E_unidades : this.fb.control(""),
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

  
  evaluarPedidoUnidad(i : number){
    let cantidad = this.ventasForm.value.arrays[i].Unidades
    if(cantidad == "") cantidad = 0
    const body = {
      Codigo_producto : this.ventasForm.value.arrays[i].Codigo,
      Cantidad : cantidad,
      Sucursal : this.ventasForm.value.Sucursal
    }
    this.service.get_stock_producto(body).subscribe((data : any) => {
      this.arrays.at(i).patchValue({
        E_paquetes : data.E_paquetes + " paq",
        E_unidades : data.E_unidades + " und",
      })
    })

    this.service.verificar_existencia_producto(body).subscribe((data) => {
      // this.arrEvaluacionPedidoRSV.push(data)
      this.arrays.at(i).patchValue({
        Retorno : data.Retorno,
        Mensaje : data.Mensaje
      })
    })
  }

  generarCodigoVenta(){
    this.service.get_codigo_facturas_ventas().subscribe((data : any)=>{
      this.ventasForm.patchValue({
        Codigo_ty : data.Codigo+""
      })
    })
  }

  seleccionCodigo(i : number){
    const codigo : string = this.ventasForm.value.arrays[i].Codigo

    const codigoRepetido = this.ventasForm.value.arrays.filter((dato : any) => dato.Codigo == codigo)
    const producto = this.arrayCodigosProductos[i].find(cod => cod.Codigo == codigo)?.Producto

    if(codigoRepetido.length > 1) {
      this.arrays.at(i).patchValue({
        Codigo : ""
      })
      return alert("El producto "+codigo+" ya esta registrado en esta carga")
    }

    this.evaluarPedidoUnidad(i)
    
    this.arrays.at(i).patchValue({
            Descripcion : producto
          })

    // alert(codigo)
  }

  addCargas() {
    console.log(this.ventasForm.value.Sucursal)
    if (this.ventasForm.value.Sucursal == "") return alert("Antes de agregar productos, debe seleccionar una sucursal")
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

    // this.generarCodigoVenta()

    setTimeout(() => {
      this.service.get_sucursales().subscribe((data) => {
        this.sucursalesRSV = data
        if(this.rol !== '5'){
          this.sucursalesRSV = this.sucursalesRSV.filter(sucursal => sucursal.Id !== 2)
        }
      })
    },500)

    setTimeout(() => {
      this.service.get_tipo_despacho().subscribe((data) => {
        this.tipoDespacho = data
      })
    },700)

  }

  pickEtiqueta(){
    this.addCargas()
    const resultado = this.ventasForm.value.etiqueta.replace(/"/g, '@').replace(/'/g, '-').toUpperCase()
    console.log(this.arrays.length)


    const regex = /([a-zA-Z]+)@/;
    const color : any = regex.exec(resultado);

    console.log(color[1])

    // this.colores.filter(color => color.Extension ==  color[1])

    this.cambio(this.arrays.length - 1)
    this.arrays.at(this.arrays.length - 1).patchValue({
      Codigo: "",
      Producto: "",
      Descripcion : resultado,
      Color : 0
    })
    this.ventasForm.patchValue({
      etiqueta : ""
    })
    // this.ventasForm.patchValue({
    //   etiqueta : resultado
    // })
  }

  // cambioColorPick(index : number){
  //   this.arrayCodigosProductos[index] = [{
  //     "Codigo": "",
  //     "Producto": "",
  //     "Color" : 0
  //   }]
  //   const color : number = this.ventasForm.value.arrays[index].Color

  //   this.service.filtrar_catalogo_por_color(color).subscribe((data)=> {
  //     this.codigosProductos = data
  //     // this.arrayCodigosProductos = data


  //     this.arrayCodigosProductos[index] = this.codigosProductos
  //     console.log(this.arrayCodigosProductos[index][0].Codigo)

  //   })

  // }


  generar_N_factura(){
    console.log(this.ventasForm.value.Region)
    this.service.generar_codigo_factura(parseInt(this.ventasForm.value.Tipo_despacho)).subscribe((data : any) => {
      console.log(data.Resultado == 0)
      if(data.Resultado == 0){
        this.ventasForm.patchValue({
          Numero_factura : data.Codigo
        })
      }else{
        alert(data.Mensaje)
      }
      
    })
  }

}