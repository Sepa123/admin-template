import { Component } from '@angular/core';
import { TocService } from 'src/app/service/toc.service'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { ProductoToc } from 'src/app/models/productosToc.interface';
import { ComunasService } from 'src/app/service/comunas/comunas.service';
import { Subestados } from 'src/app/models/subestados.interface';
import { Codigo1 } from 'src/app/models/Codigos1.interface';
import { ObservacionTOC } from 'src/app/models/ObservacionesTOC.interface';
import { ActividadDiariaTOC } from 'src/app/models/actividadesDiariasTOC.interface'
import { BackofficeUsuarioTOC } from 'src/app/models/backofficeUsuarioTOC.interface'

@Component({
  selector: 'app-bitacora-toc',
  templateUrl: './bitacora-toc.component.html',
  styleUrls: ['./bitacora-toc.component.scss']
})
export class BitacoraTocComponent {

  producto! : ProductoToc

  tablaActividades : boolean = false
  tablaBackoffice : boolean = false

  isSubmitDisabled : boolean = false

  isErrorView = false;

  listaRegiones : any [] = []
  listaRegionesFull : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []

  listaSubestados : Subestados [] = []
  listaCodigos1 : Codigo1 [] = []

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

  constructor (private service :TocService,public builder: FormBuilder, private comunaService : ComunasService,) {}

  form = this.builder.group({
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

  ngOnInit(){
    this.comunaService.getListaRegiones().subscribe((data : any) => {
      this.listaRegiones = data
      this.listaRegionesFull = data
    })

    this.comunaService.getListaComunas().subscribe((data : any) => {
      this.listaComunas = data
      this.listaComunasFull = this.listaComunas
    })

    this.service.buscar_subestados().subscribe((data) => {
      this.listaSubestados = data
    })

    this.service.buscar_codigos1().subscribe((data) => {
      this.listaCodigos1 = data
    })

    this.observacionesUsuario(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"")
    this.buscarActividadDiaria()
    this.buscarNombreUsuario(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"")

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

    this.service.backoffice_usuario(this.form.value.Ids_usuario+"").subscribe((data) => {
      this.backofficeUsuario = data
    })
    this.service.actividad_diaria_usuario(this.form.value.Ids_usuario+""+"",formatoFecha).subscribe((data) => {
      this.actividadesDiarias = data
    })
  }

  

  BuscarProducto(){
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

  buscarComunas(region : string){
    const region_selecccionada = this.listaRegiones.filter(r => r.Nombre_region == region)[0].Id_region

    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == region_selecccionada )
  }

  reiniciar(){
    this.form.reset()

    this.form.patchValue({
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

  registrar(){
    this.isErrorView = false

    if(this.form.value.Fecha_reprogramada  == "" ) {
      this.form.patchValue({ Fecha_reprogramada : null})
    }
    // if(this.form.value.Comuna  == "" ) {
    //   this.form.patchValue({ Comuna : null})
    // }
    if(this.form.value.Comuna_correcta  == "" ) {
      this.form.patchValue({ Comuna_correcta : null})
    }
    if(this.form.value.Fecha_compromiso  == "" ) {

      // this.form.patchValue({ Fecha_compromiso : formattedDate})
    }

    if(this.form.value.Fecha  == "" ) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      this.form.patchValue({ Fecha : formattedDate})
    }

    console.log(this.form.value)
    if(this.form.valid){
      this.service.insert_bitacora_toc(this.form.value).subscribe((data : any) => {
        alert(data.message)
        this.form.reset();
  
        this.form.patchValue({
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
        this.form.patchValue({
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
}
