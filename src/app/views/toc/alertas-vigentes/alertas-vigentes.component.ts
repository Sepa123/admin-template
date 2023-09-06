import { Component } from '@angular/core';
import { TocService } from 'src/app/service/toc.service'
import { AlertasVigente } from 'src/app/models/alertasVigentes.interface';
import { UsuarioTOC } from 'src/app/models/usuariosTOC.interface'
import { TocTracking } from 'src/app/models/tocTracking.interface'
import {FormBuilder, Validators, ValidationErrors } from '@angular/forms'
import { AlertaExistenteTOC } from 'src/app/models/editarTOC.interface'
import { ComunasService } from 'src/app/service/comunas/comunas.service';
import { Codigo1 } from 'src/app/models/Codigos1.interface';
import { Subestados } from 'src/app/models/subestados.interface';


@Component({
  selector: 'app-alertas-vigentes',
  templateUrl: './alertas-vigentes.component.html',
  styleUrls: ['./alertas-vigentes.component.scss']
})
export class AlertasVigentesComponent {
  chart: any;
  guiaActual : string = ""

  regex = /\*/;

  codigoPick : string = ""

  buscaAlerta : boolean = false

  alertasVigentes : AlertasVigente [] = []

  usuariosTOC : UsuarioTOC [] = []

  nombreUsuario : any [] = []

  cantidad_bitacora : number [] = []

  observacionActual : string | null = ""

  arrayTOCTracking : TocTracking [] = []

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

  // Editar TOC

  isModalEditar: boolean = false
  public visibleEditar = false;
  toggleEditar() {
    this.visibleEditar = !this.visibleEditar
  }

  handleEditar(event: any) {
    this.visibleEditar = event;
  }
  openModalEditar(){
    this.isModalEditar = true
  }

  closeModalEditar(){
    this.isModalEditar = false
  }

  constructor( private service : TocService, public builder : FormBuilder, private comunaService : ComunasService){

  }

  alertaExistente : AlertaExistenteTOC [] = []

  listaRegiones : any [] = []
  listaRegionesFull : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []

  listaSubestados : Subestados [] = []
  listaCodigos1 : Codigo1 [] = []

  loadingData : boolean = true

  public rol = sessionStorage.getItem("rol_id")

  formEditarTOC = this.builder.group({
    Guia : this.builder.control("",),
    Observacion : this.builder.control("",),
    Subestado_esperado : this.builder.control(""), 
    Direccion_correcta: this.builder.control(""),  
    Comuna_correcta : this.builder.control(""),  
    Fecha_reprogramada : this.builder.control(""), 
    Codigo1Str : this.builder.control(""), 
    // Id_transyanez : this.builder.control(this.codigoTY, [Validators.required]),
    Ids_transyanez : this.builder.control("", [Validators.required]),
    Id_usuario : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_usuario : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    Alerta : this.builder.control(false),
    Origen : this.builder.control("TOC/Editar")
  })

  verObservacion(obs : string | null){
    if(obs === null || obs === ""){
      this.observacionActual = "Sin observación"
    }else{
      this.observacionActual = obs
    }
    this.toggleLiveDemo()
  }

  
  codigoEditar  : string = ""
  updateData( codigo : string) {

    this.service.buscar_alerta_by_ids_transyanez(codigo).subscribe(data => {
      this.alertaExistente = data
      this.codigoEditar = codigo

      this.formEditarTOC.patchValue({
        Alerta : data[0].Alerta,
        Observacion : data[0].Observacion,
        Direccion_correcta : data[0].Direccion_correcta,
        Fecha_reprogramada : data[0].Fecha_Reprogramada,
        Comuna_correcta : data[0].Comuna_correcta,
        Codigo1Str : data[0].Codigo1,
        Subestado_esperado : data[0].Subestado_esperado,
        Ids_transyanez : codigo,
        Id_usuario : sessionStorage.getItem("id")?.toString()+"",
        Ids_usuario : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
        Guia : data[0].Guia
      })
      this.toggleEditar()
    })
    
  }

  buscarAlerta(codigo : string){

    this.service.toc_tracking(codigo).subscribe(data => {
      this.arrayTOCTracking = data
      // this.guiaActual = codigo
      this.service.buscar_guia_by_codigo(codigo).subscribe((data : any)=> {
        this.guiaActual = data.Guia
      })
      this.arrayTOCTracking.map(toc => {
        if (toc.Direccion == null || toc.Direccion == '') {
          toc.Direccion = 'Sin dirección*'
        }
        if (toc.Fecha_compromiso == null || toc.Fecha_compromiso == '') {
          toc.Fecha_compromiso = 'Sin Fecha Compromiso*'
        }
        if (toc.Comuna == null || toc.Comuna == '') {
          toc.Comuna = 'Sin Comuna*'
        }
      })
      this.buscaAlerta = true
      
  }, error => {

  })
  }

  editarTOC(){

    
    if(this.formEditarTOC.valid){
      this.service.editar_alerta_toc(this.formEditarTOC.value).subscribe((data : any) => {
        alert(data.message)
      })
      console.log(this.formEditarTOC.value)

      
    }
  }

  ngOnInit(){

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
    
    this.service.buscar_alertas_vigentes().subscribe((data) => {
      this.alertasVigentes = data
      this.loadingData = false
      this.alertasVigentes.map(alertas => {
        if (alertas.Direccion == null) {
          alertas.Direccion = 'Sin dirección*'
        }
        
      })
    })
  }
}
