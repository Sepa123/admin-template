import { Component } from '@angular/core';
import { TocService } from 'src/app/service/toc.service'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { ProductoToc } from 'src/app/models/productosToc.interface';
import { ComunasService } from 'src/app/service/comunas/comunas.service';
import { Subestados } from 'src/app/models/subestados.interface';
// import { Codigo1 } from 'src/app/models/Codigos1.interface';
import {Codigo1,Estado,Subestado} from 'src/app/models/TOC/camposBitTienda.interface'
import { ObservacionTOC } from 'src/app/models/ObservacionesTOC.interface';
import { ActividadDiariaTOC } from 'src/app/models/actividadesDiariasTOC.interface'
import { BackofficeUsuarioTOC } from 'src/app/models/backofficeUsuarioTOC.interface'

@Component({
  selector: 'app-bitacora-toc',
  templateUrl: './bitacora-toc.component.html',
  styleUrls: ['./bitacora-toc.component.scss']
})
export class BitacoraTocComponent {

  listaCodigos1 : Codigo1 [] = []

  tipoCliente : string = "1"
  estados : Estado [] = []
  subestados : Subestado [] = []
  listaSubestados : Subestado [] = []

  public rol = sessionStorage.getItem("rol_id") 

  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string


  constructor(private service: TocService,public builder: FormBuilder, private comunaService : ComunasService) { }

  isErrorView : boolean = false

  activate( activo : boolean,tipo_usuario : string){
    this.pv = activo
    this.tipoCliente = tipo_usuario

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





  form = this.builder.group({
    Id_usuario : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_usuario : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    Driver : this.builder.control(""),
    Guia : this.builder.control(""),
    Cliente : this.builder.control(""),
    Estado: this.builder.control(0),
    Subestado : this.builder.control(0),  
    EstadoStr: this.builder.control(''),
    SubestadoStr : this.builder.control(''),
    Nombre_cliente : this.builder.control(""),
    Observacion : this.builder.control(""),
    Id_transyanez : this.builder.control(1),
    Ids_transyanez : this.builder.control("Ids_transyanez"),
    Codigo1 : this.builder.control(1),
    Codigo1Str: this.builder.control(""),
    Codigo_producto : this.builder.control(""),
  })



 

  currentDate : string = ''
  
  ngOnInit() : void {


    this.getLocation()
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const day = String(now.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    this.currentDate = formattedDate


    this.service.campos_bitacora_tienda().subscribe((data) => {
      this.listaCodigos1 = data.Codigo1
      this.estados  = data.Estados
      this.subestados = data.Subestados
    })

    this.comunaService.getListaRegiones().subscribe((data : any) => {
      this.listaRegiones = data
      this.listaRegionesFull = data
    })

    this.comunaService.getListaComunas().subscribe((data : any) => {
      this.listaComunas = data
      this.listaComunasFull = this.listaComunas
    })
    

  }

  pv : boolean = true


  motivoDesactiva : number = 1
  fechaDesvinculacion : string = ''
  descDesviculacion : string = ''

  listaMotivosD : any [] = []


  buscarSubestados(event: any){
    const selectedId = event.target.value;
    this.listaSubestados = this.subestados.filter( sub => sub.Id_estado == selectedId )
    this.form.patchValue({
      Subestado : this.listaSubestados[0].Id_subestado
    })
  }


  registrar(){
    const idEstado = this.form.value.Estado
    const idSubestado = this.form.value.Subestado

 
    this.isErrorView = false
    this.form.patchValue({
      Cliente : this.tipoCliente,
      EstadoStr : this.estados.find((e) => e.Id_estado == idEstado)?.Descripcion,
      SubestadoStr : this.subestados.find((e) => e.Id_subestado == idSubestado)?.Descripcion,
    })

    console.log(this.form.valid)

    if(this.form.valid){

      this.service.insert_bitacora_tienda_toc(this.form.value).subscribe((data : any) => {

        alert(data.message)

        this.codigo_TY = data.codigo_ty

        this.form.reset( )

        this.form.patchValue({
          Id_usuario : sessionStorage.getItem("id")?.toString()+"",
          Ids_usuario : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          Estado: 0,
          Subestado :0,  
          Id_transyanez : 1,
          Ids_transyanez : "Ids_transyanez",
          Codigo1 : 1
        })
      })

    }else{
      this.isErrorView = true
      alert("Hay datos incorrectos")
    }

  }

  codigo_TY : string = ''

  copiarAlPortapapeles() {

    if (this.codigo_TY == '') return alert('No se encuentra código TY,por favor generar registro en la bitacora')
    navigator.clipboard.writeText(this.codigo_TY)
    .then(() => {
      alert('Contenido copiado al portapapeles');
      /* Resuelto - texto copiado al portapapeles con éxito */
    },() => {
      console.error('Error al copiar');
      /* Rechazado - fallo al copiar el texto al portapapeles */
    });
  }



  /////form cd

  formCD = this.builder.group({
    Codigo_producto : this.builder.control(""),
    Fecha : this.builder.control(""),
    PPU : this.builder.control(""),
    Guia: this.builder.control(""),
    Cliente : this.builder.control(""),
    Region : this.builder.control(""),
    Comuna : this.builder.control(""),
    Estado : this.builder.control(""),  
    Subestado : this.builder.control(""),  
    Driver : this.builder.control(""),  
    Nombre_cliente : this.builder.control(""),
    Fecha_compromiso : this.builder.control("", [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    Direccion_correcta : this.builder.control(""),
    Comuna_correcta : this.builder.control(""),
    Fecha_reprogramada : this.builder.control("", [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    Observacion : this.builder.control("",[Validators.required]),
    Subestado_esperado : this.builder.control(""), 
    Id_transyanez : this.builder.control(1, [Validators.required]),
    Ids_transyanez : this.builder.control("Ids_transyanez", [Validators.required]),
    Id_usuario : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_usuario : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    Alerta : this.builder.control(false),
    Codigo1 : this.builder.control(0),
    Codigo1Str: this.builder.control(""),
    Correo: this.builder.control(""),
    Telefono: this.builder.control("")
  })



  producto! : ProductoToc

  tablaActividades : boolean = false
  tablaBackoffice : boolean = false

  isSubmitDisabled : boolean = false


  listaRegiones : any [] = []
  listaRegionesFull : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []



  listaObservaciones : ObservacionTOC [] = []

  actividadesDiarias : ActividadDiariaTOC [] = []
  backofficeUsuario : BackofficeUsuarioTOC [] = []

  regex = /\*/;
  portal = /\bportal-\b/;

  nombre_usuario : string =""
  
  observacionActual : string | null = ""

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

  verObservacion(obs : string | null){
    if(obs === null || obs === ""){
      this.observacionActual = "Sin observación"
    }else{
      this.observacionActual = obs
    }
    this.toggleLiveDemo()
  }

  verTablaActividades(){
    this.tablaBackoffice = !this.tablaBackoffice
    this.tablaActividades = false
  }
  
  verBackOffice(){
    this.tablaActividades = !this.tablaActividades
    this.tablaBackoffice = false
  }


  buscarNombreUsuario(ids_usuario : string){
    if(this.portal.test(ids_usuario)){
      this.service.get_nombre_usu_portal(ids_usuario).subscribe((data : any) => {
          this.nombre_usuario = data
      })
    }
  }


  buscarActividadDiaria(){
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Sumar 1 porque los meses van de 0 a 11
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const formatoFecha = `${año}${mes}${dia}`;

    this.service.backoffice_usuario(this.formCD.value.Ids_usuario+"").subscribe((data) => {
      this.backofficeUsuario = data
    })
    this.service.actividad_diaria_usuario(this.formCD.value.Ids_usuario+""+"",formatoFecha).subscribe((data) => {
      this.actividadesDiarias = data
    })
  }

  

  BuscarProducto(){
    const cod_producto : any = this.formCD.value.Codigo_producto
    this.formCD.patchValue({
      Guia : cod_producto
    })
    this.service.buscar_producto_toc(cod_producto).subscribe((data) => {
      this.producto = data
      // const regionSeleccionada = this.listaComunasFull.filter(comuna => this.producto.Comuna == comuna.Nombre_comuna)[0].Id_region
      // console.log(regionSeleccionada)

      this.buscarComunas(this.producto.Region)

      this.formCD.patchValue({
        Fecha : this.producto.Fecha,
        PPU : this.producto.Patente,
        Guia : this.producto.Guia,
        Cliente : this.producto.Cliente,
        Region : this.producto.Region,
        Estado : this.producto.Estado,
        Subestado : this.producto.Subestado,
        Driver : this.producto.Usuario_movil,
        Nombre_cliente : this.producto.Nombre_cliente,
        Fecha_compromiso : this.producto.Fecha_compromiso,
        Comuna :this.producto.Comuna,
        Correo : this.producto.Correo,
        Telefono: this.producto.Telefono

      })
      // console.log(this.producto)
    },((error) => {
       alert(error.error.detail)
    }))
  }


  BuscarProductoTienda(){
    const cod_producto : any = this.form.value.Codigo_producto
    this.form.patchValue({
      Guia : cod_producto
    })
    this.service.buscar_producto_toc(cod_producto).subscribe((data) => {
      this.producto = data
      // const regionSeleccionada = this.listaComunasFull.filter(comuna => this.producto.Comuna == comuna.Nombre_comuna)[0].Id_region
      // console.log(regionSeleccionada)

      this.buscarComunas(this.producto.Region)

      this.form.patchValue({
        Guia : this.producto.Guia,
        Cliente : this.producto.Cliente,
        // Estado : this.producto.Estado,
        // Subestado : this.producto.Subestado,
        Driver : this.producto.Usuario_movil,
        Nombre_cliente : this.producto.Nombre_cliente,
        // Comuna :this.producto.Comuna,
        // Correo : this.producto.Correo,
        // Telefono: this.producto.Telefono

      })
      // console.log(this.producto)
    },((error) => {
       alert(error.error.detail)
    }))
  }

  buscarComunas(region : string){
    const region_selecccionada = this.listaRegiones.filter(r => r.Nombre_region == region)[0].Id_region

    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == region_selecccionada )
  }

  reiniciar(){
    this.formCD.reset()

    this.formCD.patchValue({
      Fecha : "",
      Fecha_compromiso : "",
      Fecha_reprogramada : "",
      Id_transyanez : 1,
      Ids_transyanez :"Ids_transyanez",
      Id_usuario : sessionStorage.getItem("id")?.toString()+"",
      Ids_usuario : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Alerta : false,
      Codigo1 : 0,
      Codigo1Str : ""
    })

    this.isErrorView = false

    this.buscarActividadDiaria()

  }

  observacionesUsuario(id_usuario : string){
    this.service.buscar_observaciones_usuario(id_usuario).subscribe((data) => {
      this.listaObservaciones = data
    })
  }

  registrarCD(){
    this.isErrorView = false

    if(this.formCD.value.Fecha_reprogramada  == "" ) {
      this.formCD.patchValue({ Fecha_reprogramada : null})
    }
    if(this.formCD.value.Comuna_correcta  == "" ) {
      this.formCD.patchValue({ Comuna_correcta : null})
    }
    if(this.formCD.value.Fecha_compromiso  == "" ) {

      // this.form.patchValue({ Fecha_compromiso : formattedDate})
    }

    if(this.formCD.value.Fecha  == "" ) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      this.formCD.patchValue({ Fecha : formattedDate})
    }

    console.log(this.formCD.value)
    if(this.formCD.valid){
      this.service.insert_bitacora_toc(this.formCD.value).subscribe((data : any) => {
        alert(data.message)
        this.codigo_TY = data.codigo_ty

        this.formCD.reset();
  
        this.formCD.patchValue({
          Fecha : "",
          Fecha_compromiso : "",
          Fecha_reprogramada : "",
          Comuna_correcta : "",
          Id_transyanez : 1,
          Ids_transyanez :"Ids_transyanez",
          Id_usuario : sessionStorage.getItem("id")?.toString()+"",
          Ids_usuario : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          Alerta : false,
          Codigo1 : 0
        })

        this.observacionesUsuario(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"")

        this.buscarActividadDiaria()
      }, ((error) => {
        alert(error)
        this.formCD.patchValue({
          Fecha : "",
          Fecha_reprogramada : "",
          Fecha_compromiso : "",
          Comuna_correcta : "",
          Id_transyanez : 1,
          Ids_transyanez :"Ids_transyanez",
          Id_usuario : sessionStorage.getItem("id")?.toString()+"",
          Ids_usuario : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          Alerta : false,
          Codigo1 : 0
        })
      }))
    }else{
      this.isErrorView = true
    }
  }


 ngOnDestroy(): void {


  }

}
