import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { RsvService } from 'src/app/service/rsv.service'
import { CatalogoRSV,ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface';
import { CargaRSV } from 'src/app/models/cargaRSV.interface'
import { EtiquetaRSV } from 'src/app/models/etiquetaRSV.interface';
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import { DatosCargaRSV } from 'src/app/models/datosCargaRSV.interface';
import { MES } from 'src/app/models/enum/meses.enum';
import { ROLES_ENUM } from 'src/app/models/enum/roles.enum';
@Component({
  selector: 'app-listar-carga',
  templateUrl: './listar-carga.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class ListarCargaComponent {

  isCargaSelect : boolean = false

  verEtiquetasDescargar : string [] = [ROLES_ENUM.ADMIN,ROLES_ENUM.ADMINISTRATIVO_RSV,ROLES_ENUM.JEFE_OPERACIONES,ROLES_ENUM.SUPERVISOR_RSV]

  codigoEliminar : string [] = []

  colores : ColoresRSV[] = []
  sucursalesRSV : SucursalRSV [] = []

  codigosProductos : CatalogoPorColor [] = []
  codigosProductosFull : CatalogoPorColor [] = []

  arrayCodigosProductos : CatalogoPorColor[][] = []
  cargasForm : FormGroup;

  nombreCargaExiste : boolean = false

  tablaCarga : CargaRSV [] =[]
  public rol = sessionStorage.getItem("rol_id") 

  MesSeleccionado : string = ""
  AnoSeleccionado : string =""
  añoActual : string =""

  meses : any [] = []

  listaAnos : string [] = []


  listaEtiquetas : DatosCargaRSV [] = []

  arrlistaEtiquetas : DatosCargaRSV [][] = []

  isErrorView : boolean = false

  cargaSeleccionada : string = ""

  cargaPrevia : number = 0

// modales 
  isModalOpen: boolean = false
  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  
  openModal(){
    this.isModalOpen = true
  }

  closeModal(){
    this.isModalOpen = false
  }

  constructor(private fb:FormBuilder,private service: RsvService) {
    
    this.meses = [
      { Nombre: 'Enero', Valor: '01' },
      { Nombre: 'Febrero', Valor: '02' },
      { Nombre: 'Marzo', Valor: '03' },
      { Nombre: 'Abril', Valor:'04' },
      { Nombre: 'Mayo', Valor: '05' },
      { Nombre: 'Junio', Valor:'06' },
      { Nombre: 'Julio', Valor: '07' },
      { Nombre: 'Agosto', Valor: '08' },
      { Nombre: 'Septiembre', Valor: '09' },
      { Nombre: 'Octubre', Valor: '10' },
      { Nombre: 'Noviembre', Valor: '11' },
      { Nombre: 'Diciembre', Valor: '12' }
    ]

    this.cargasForm = this.fb.group({
      Nombre_carga : this.fb.control("", [Validators.required] ),
      Fecha_ingreso : this.fb.control("", [Validators.required] ),
      Sucursal : this.fb.control("", [Validators.required] ),
      arrays : this.fb.array([])
    })
  }
  
  ngOnInit(){

    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear().toString();
    const mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');

    const añoInicial = 2020;
    const años = [];

    for (let año = añoInicial; año <= parseInt(añoActual); año++) {
        años.push(año.toString());
    }

    this.listaAnos = años

    this.service.get_colores_rsv().subscribe((data) => {
      this.colores = data
      
    })

    this.service.catalogo_por_colo_sin_filtro().subscribe(data => {
      this.codigosProductosFull = data
    })
    this.service.get_listar_cargas_por_mes(añoActual+''+mesActual).subscribe((data)=> {

      this.tablaCarga = data
      if(this.rol !== '5'){
        this.tablaCarga  = this.tablaCarga .filter(sucursal => sucursal.Sucursal !== "Prueba")
      }
    })

    setTimeout(() => {
      this.service.get_sucursales().subscribe((data) => {
        this.sucursalesRSV = data
      })
    },1300)

    
  }

  verEtiquetas(nombre_carga : string) {
    this.cargaSeleccionada = nombre_carga
    this.arrlistaEtiquetas = []
    this.service.get_datos_carga_por_nombre_rsv(nombre_carga).subscribe((data) => {
      this.listaEtiquetas = data
      const colores  =  [...new Set(this.listaEtiquetas.map((lista) => lista.Color))]
      // arrlistaEtiquetas
      let array = []

      this.isCargaSelect = true
      colores.map(color => {
        array = this.listaEtiquetas.filter(lista => lista.Color == color)
        this.arrlistaEtiquetas.push(array)
      })
    })
  }

  descargarLista(){
    this.service.downloadListaCargaExcel(this.cargaSeleccionada)
  }

  descargarEtiquetas(codigo : string, tipo : string){
    this.service.downloadEtiquetasExcel(this.cargaSeleccionada, codigo, tipo)
  }


  filtrarListaCargaPorMes(año : string){
    this.arrlistaEtiquetas = []
    this.service.get_listar_cargas_por_mes(año).subscribe((data)=> {
      this.tablaCarga = data
      if(this.rol !== '5'){
        this.tablaCarga  = this.tablaCarga .filter(sucursal => sucursal.Sucursal !== "Prueba")
      }
      
    })
  }

  verificarCarga(nombre_carga : string){

    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear().toString();
    const mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');

    this.service.generar_etiquetas_por_nombre_carga(nombre_carga).subscribe((data :any) =>{
      if(data.alerta == 0){
        alert(data.message)
        this.service.get_listar_cargas_por_mes(añoActual+mesActual).subscribe((data)=> {
          this.tablaCarga = data
          if(this.rol !== '5'){
            this.tablaCarga  = this.tablaCarga .filter(sucursal => sucursal.Sucursal !== "Prueba")
          }
      })
      } else if (data.alerta == 1) {
        alert(data.message)
      }
    })
  }

  get arrays() : FormArray {
    return this.cargasForm.get("arrays") as FormArray
  }

  cambio(index : number){
    this.arrayCodigosProductos[index] = [{
      "Codigo": "",
      "Producto": "",
      "Color" : 0,
      "unid_con_etiqueta" : true
    }]
    const color : number = this.cargasForm.value.arrays[index].Color

    this.service.filtrar_catalogo_por_color(color).subscribe((data)=> {
      this.codigosProductos = data
      // this.arrayCodigosProductos = data
      this.arrayCodigosProductos[index] = this.codigosProductos
      console.log(this.arrayCodigosProductos[index][0].Codigo)

    })

  }

  // seleccionCodigo(i : number){
  //   const codigo : string = this.cargasForm.value.arrays[i].Codigo
  //   const producto = this.arrayCodigosProductos[i].find(cod => cod.Codigo == codigo)?.Producto
  //   this.arrays.at(i).patchValue({
  //           Descripcion : producto
  //         })
  // }

  seleccionCodigo(i : number){
    const codigo : string = this.cargasForm.value.arrays[i].Codigo
    const codigoRepetido = this.cargasForm.value.arrays.filter((dato : any) => dato.Codigo == codigo)
    console.log(codigoRepetido)
    if(codigoRepetido.length > 1) {
      this.arrays.at(i).patchValue({
        Codigo : ""
      })
      return alert("El producto "+codigo+" ya esta registrado en esta carga")
    }
    const producto = this.arrayCodigosProductos[i].find(cod => cod.Codigo == codigo)?.Producto
    this.arrays.at(i).patchValue({
            Descripcion : producto
          })
  }

  newCarga(): FormGroup {
    return this.fb.group ({
        Nombre_carga : this.fb.control(""),
        Fecha_ingreso : this.fb.control(""),
        Sucursal : this.fb.control(""),
        Codigo : this.fb.control("", [Validators.required] ),
        Color : this.fb.control("", [Validators.required] ),
        Paquetes : this.fb.control("", [Validators.required] ),
        Unidades: this.fb.control("", [Validators.required] ),
        Id_user : this.fb.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
        Ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
        Descripcion : this.fb.control("")
    })
  }

  addCargaExistente( carga : CargaRSV): FormGroup {
    return this.fb.group ({
        Nombre_carga : this.fb.control(carga.Nombre_carga),
        Fecha_ingreso : this.fb.control(carga.Fecha_ingreso),
        Sucursal : this.fb.control(carga.Sucursal),
        Codigo : this.fb.control(carga.Codigo, [Validators.required] ),
        Color : this.fb.control(carga.Color, [Validators.required] ),
        Paquetes : this.fb.control(carga.Paquetes, [Validators.required] ),
        Unidades: this.fb.control(carga.Unidades, [Validators.required] ),
        Id_user : this.fb.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
        Ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
        Descripcion : this.fb.control("")
    })
  }


  seleccionarCargaEditar(carga : string | null | undefined){
    const indexArray = this.cargasForm.value.arrays.length
    for (let index = indexArray; index >= 0; index--) {
      this.arrays.removeAt(index)  
    }
    this.arrayCodigosProductos = []

    this.codigoEliminar = []

    this.service.get_carga_por_nombre_carga_rsv(carga+"").subscribe((data) =>{

      data.map( (carga,i)  => {
        this.arrays.push(this.addCargaExistente(carga))
        this.arrayCodigosProductos.push(this.codigosProductosFull.filter(codigo => codigo.Color == carga.Color))

        
        this.seleccionCodigo(i)
      })

      this.cargaPrevia = data.length

      this.cargasForm.patchValue({
        Nombre_carga : data[0].Nombre_carga,
        Fecha_ingreso : data[0].Fecha_ingreso,
        Sucursal : data[0].Sucursal,
      })

      this.toggleLiveDemo()

      
    })
  }

  addCargas() {
    this.arrays.push(this.newCarga());

    this.arrayCodigosProductos.push([{
      "Codigo": "",
      "Producto": "",
      "Color" : 0,
      "unid_con_etiqueta" : true
    }])

    this.arrayCodigosProductos[this.arrays.length-1] = [{
      "Codigo": "",
      "Producto": "",
      "Color" : 0,
      "unid_con_etiqueta" : true
    }]

    console.log(this.arrayCodigosProductos)
  }

  removeCarga(i:number) {
    this.codigoEliminar.push(this.arrays.at(i).value.Codigo)
    
    this.arrayCodigosProductos.splice(i,1)
    this.arrays.removeAt(i);
  }

  onSubmit(){
    console.log(this.cargasForm.value)
    console.log("this.codigoEliminar")
    console.log(this.codigoEliminar.toString())
    this.cargasForm.value.arrays.map((data : any) => {
      data["Nombre_carga"] = this.cargasForm.value.Nombre_carga
      data["Fecha_ingreso"] = this.cargasForm.value.Fecha_ingreso
      data["Sucursal"] = this.cargasForm.value.Sucursal
    })
    if(this.cargasForm.valid){
      this.service.delete_lista_codigos_carga(this.codigoEliminar.toString(),this.cargasForm.value.Nombre_carga).subscribe((data : any) => {
          // alert(data.message)
        this.service.update_carga(this.cargasForm.value.arrays).subscribe((data : any) => {
          alert(data.message)
        },error => {
          alert(error.error.detail)
        })

      })
    }else {
      alert("Falta algo")
    }
  }

}

  



