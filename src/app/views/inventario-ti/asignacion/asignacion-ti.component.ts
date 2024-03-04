import { Component } from '@angular/core';
import {InventarioTIService} from '../../../service/inventario-ti.service'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormArray } from '@angular/forms'
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Personal } from 'src/app/models/mantenedores/personal.interface';
import {Asignacion} from 'src/app/models/mantenedores/asignacion.interface'
import {Equipo, Ubicacion} from 'src/app/models/mantenedores/equipo.interface';
import {Departamentos} from 'src/app/models/mantenedores/departamento.interface';
import {Tipo} from 'src/app/models/mantenedores/tipo.interface';
import { EstadoInventario } from 'src/app/models/mantenedores/estado.interface';
import { AsignadosById } from 'src/app/models/mantenedores/asignacionPorId.interface';
import {DevolucionById} from 'src/app/models/mantenedores/devolucionPorID.interface'
import {Estado} from 'src/app/models/mantenedores/estados.interface'
import { SubEstado } from 'src/app/models/mantenedores/subEstado.interface';
import {LicenciaWindows} from 'src/app/models/mantenedores/licencia.interface'
import{FirmaEntrega} from 'src/app/models/mantenedores/firma_entrega.interface'
import{LicenciaYEquipo} from 'src/app/models/mantenedores/licenciaYEquipo.interface'
import{ChipYEquipo} from 'src/app/models/mantenedores/chipYEquipo.interface'
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
// import bootstrap from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-asignacion-ti',
  templateUrl: './asignacion-ti.component.html',
  styleUrls: ['../styles/inventario-ti.component.scss'],
  // standalone: true,
  // imports: [MatButtonModule, MatTooltipModule],
  // providers: [NgxExtendedPdfViewerModule]
})
export class AsignacionTiComponent {

    showLicencia : boolean = false
    showChip : boolean = false
    public visible = false;
    public visible1 = false;
    public visible2 = false;
    public visible3 = false;
    public visible4 = false;
    public visible5 = false;
    public visible6= false;
    public visible7= false;
    public visible8= false;
    public visible9= false;


   objeto  : Asignacion [] = []
    isModalOpen: boolean = false
    mostrarAsignacion: boolean = false;
    mostrarAccesorio: boolean = false
    asignaciones : Asignacion [] = []
    accesoriosAsignados:Asignacion [] = []
    asignadosSinSjoin: Asignacion [] = []
    equipos : Equipo [] = []
    personas : Personal [] = []
    departamentos : Departamentos [] = []
    estados : EstadoInventario [] = [] 
    // modelo para el estado con subestado
    estado: Estado[] = []
    subestado : SubEstado [] = []
    estadosDevolver: EstadoInventario [] = []
    tipo : Tipo [] = []
    folioEntrega :Asignacion [] = []
    folioDevolucion :Asignacion [] = []
    licencias: LicenciaWindows  [] = []
    folioE ! : any
    folioD! : any
    folioEString!: string
    folioDString!: string
    persona_encargada! : string
    primerNombre!: string
    primerApellido!: string
    personaConVariosEquipos!:string

    //variables para licencias asignadas a personas
    mostrarLicenciaYEquipo: boolean = false
    licenciaYEquipo: LicenciaYEquipo [] = []
    mostrarLicencia: boolean = false;

    ubicacion : Ubicacion [] = Object.values(Ubicacion) as Ubicacion []

    listaDeEquipos: any [] =[]
    listaMarcas : string [] = []
    listaSeriales: string [] = []

    //datos de la persona que entrega es quien gestiona la creacion del acta
  
    encargado: string |null = sessionStorage.getItem('usuario')
    nameParts: string[] = [];
    //mostrar los campos para asignar chip disponibles
    datosChip: boolean = false
    ChipSeleccionada!: number
    ChipCapturada: boolean =false
    chipYEquipo: ChipYEquipo [] = []

    //mostrar los campos para asignar licencia
    datosLicencia: boolean = false
    licenciaSeleccionada!: number
    licenciaCapturada: boolean =false
    mostrarChipYEquipo:  boolean = false

    //datos para asignar accesorios y repuestos que no son asignados a una persona si no departament
    //estos no requieren acta de entrega
    departamentoSeleccionado!: number
    tipoSeleccionado!: number
    equipoSeleccionado!: number

    //aplicar filtros de busqueda
    TodosDeptos : string = "Todas"
    equipoChip : Equipo []= []
    fechaHoy = this.obtenerFechaActual()
    conjuntoLeyenda: any[] = [];
    parLeyenda = {}
    equiposGenerales : Equipo []= []
    personaAsignada : AsignadosById [] = []
    equiposPorPersona : AsignadosById [] = []
    estadoActa: AsignadosById [] = []
    devolucionActa: DevolucionById [] = []
     //datos geo
    latitude!: number
    longitud! : number
    latStr!: string
    longStr!: string
    idTipo!: number

    botonDevolver : boolean = false

    idAsignacion!: number
    rut! : string
    cuerpoActa! :{}

    //visualizar mas informacion
    empleado!: string
    equipoDescripcion!: string
    fechaEntrega!: string
    fechaDevolucion!: string
    numeracionEquipo!: any

    //ubicamos el tipo por el id para asi desplegar solo los equipos correspondientes por tipo elegido
    tipoAsignado! : number


      //variables para el numero de equipo
  NB: string = 'TY-NB-'
  AC : string = 'TY-AC-'
  CL: string = 'TY-CL-'
  IM: string = 'TY-IM-'
  CI: string = 'TY-CI-'
  PT: string = 'TY-PT-'
  CH : string = 'TY-CH-'


  selectedEquipos: boolean[] = [];
  i: number = 0;
  equiposUnicos: any[] = [];
  letra!: string
  numEquipo!: any
  leyendaEquipo!: string

  //variable para el cambio de estado una vez devuelto el equipo
  estadoElegido!: number
  subestadoElegido!:number
  observacion! : string
  id!: number
  // tratamiento del archivo firmado y subida al servidor
  // firma! : boolean
  firma: Asignacion[] = []
  firmaGenerada : boolean = false
  pdfScaneado !: File
  archivos: any = []
  previsualizacion: SafeUrl | null = null;
  idAsignado!: number
  fotoDevolucion!: string


  //RUTA PDF
  rutaEntrega : AsignadosById[] =[]
  rutaDevolucion: AsignadosById[] =[]

  
  

    
    constructor(private service: InventarioTIService, private fb:FormBuilder,
      private sanitizer: DomSanitizer) {
        this.sanitizer = sanitizer
         }

         ngOnInit(){
          // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
          // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  
          //trae los equipos que se pueden asignar, aquellos con estado devuelto o chip
          this.service.get_lista_equipos_disponibles().subscribe((data)=>{
            this.equipos = data
          })
          // this.service.get_lista_de_tipos_equipos().subscribe((data)=>{ 
          //   this.tipo= data
          // })
          // this.service.get_estados_devolucion().subscribe((data)=>{
          //   this.estadosDevolver= data
          //   console.log(this.estadosDevolver)
          // })
          // this.service.get_lista_estado_inventario().subscribe((data)=>{
          //   this.estados = data
          // })

          //estados a seleccionar al momento de devolver un equipo
          this.service.get_lista_estado_devolucion().subscribe((data)=>{
            this.estado = data
          })

        
          this.service.get_lista_de_departamentos().subscribe((data)=> {
            this.departamentos = data
          })


          this.service.get_lista_persona_habilitada().subscribe((data)=>{
            this.personas = data
          })

          this.service.get_lista_licencias().subscribe((data)=> {
            this.licencias = data
          })

          this.service.get_folio_entrega().subscribe((data=>{
            this.folioEntrega = data
            this.folioE = this.folioEntrega
            console.log(this.folioE)
          }))
        
          this.service.get_folio_devolucion().subscribe((data)=>{
            this.folioDevolucion = data
            this.folioD = this.folioDevolucion
            console.log(this.folioD)
          })

          this.service.get_lista_de_equipos_generales().subscribe((data)=>{
            this.equiposGenerales = data

            this.service.get_lista_de_asignados_sin_join().subscribe((data)=>{
              this.asignadosSinSjoin = data
            })
        })

        // this.service.get_lista_de_asignaciones().subscribe((data)=>{
        //   this.asignaciones = data
        // })
        // this.service.get_lista_accesorios_asignados().subscribe((data)=>{
        //   this.accesoriosAsignados = data
        // })
        this.separarNombre()
        }
     

    separarNombre(){
      if (this.encargado !== null) {
        this.nameParts = this.encargado.split(' ');
        const firstName: string = this.nameParts.length > 0 ? this.nameParts[0] : '';
        const lastName: string = this.nameParts.length > 2 ? this.nameParts[2] : '';
        this.persona_encargada = firstName + " "+ lastName
      } 
    }
    toggleLiveDemoAsignar() {
    this.visible= !this.visible;}

    handleLiveDemoChangeAsignar(event: any) {
    this.visible= event;}


    toggleLiveDemoDevolucion() {
    this.visible1= !this.visible1;}
      
    handleLiveDemoDevolucion(event: any) {
    this.visible1= event;}

    toggleLiveDevolucionEstado() {
      this.visible4= !this.visible4;}
        
    handleLiveDevolucionEstado(event: any) {
    this.visible4= event;}

    toggleLiveEntregaEstado() {
      this.visible5= !this.visible5;}
        
    handleLiveEntregaEstado(event: any) {
    this.visible5= event;}
    toggleLiveListaAsignados() {
    this.visible2= !this.visible2; }

    handleLiveListaAsignados(event: any) {
    this.visible2= event;}

  
    toggleLiveDetalle() {
    this.visible3= !this.visible3;}

    handleLiveDetalle(event: any) {
    this.visible3= event;}

    toggleLiveRepuesto() {
      this.visible6= !this.visible6;}
  
    handleLiveRepuesto(event: any) {
      this.visible6= event;}

    toggleLiveInfo() {
      this.visible7= !this.visible7;}
    
    handleLiveInfo(event: any) {
      this.visible7= event;}
      
    toggleLiveDevolverAccesorio() {
      this.visible8= !this.visible8;}
      
    handleLiveDevolverAccesorio(event: any) {
      this.visible8= event;}

    toggleLiveInfoLicenciaAsignada() {
      this.visible9= !this.visible9;
    }
    handleLiveInfoLicenciaAsignada(event: any) {
      this.visible9= event;
    }
      


    openModal(){
    this.isModalOpen = true }

    closeModal(){
    this.isModalOpen = false}   


    //al crear el acta se genera con la fecha del dia 
  obtenerFechaActual(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate());
    const isoDate = fecha.toISOString().split('T')[0]; // Obtiene la fecha en formato ISO (YYYY-MM-DD)
    return isoDate;
  }

  getLocation(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude
        this.longitud= position.coords.longitude 
        this.latStr = this.latitude.toString()
        this.longStr = this.longitud.toString()
      });
    } else {
      console.log("Localización no disponible");
    }
  }

  //señaletica para describir simbolos y funciones
  informacionSimbolos(){
    this.toggleLiveInfo()
  }

  infoLicenciaAsignada(){
    this.toggleLiveInfoLicenciaAsignada()
  }


  //ubicar los equipos asignados por departamento
  filterByDepartamento(nombre : string){
    this.TodosDeptos = nombre
    if(nombre === "Todos"){
      this.listaDeAsignaciones()
    }else{
      this.service.get_lista_de_asignaciones().subscribe((data)=>{
        this.asignaciones =data.filter((dpto) => dpto.departamento?.toString() == nombre)
        console.log("Filtered asignaciones:", this.asignaciones);
      })
    }
  }
//ubicar los equipos asignados segun el tipo
  filterByEquipo(nombre : string){
    if(nombre  === "Todos"){
      this.listaDeAsignaciones()
    }else{
      this.service.get_lista_de_asignaciones().subscribe((data)=>{
        this.asignaciones =data.filter(dpto => dpto.tipo?.toString() == nombre  )
      })
    }
  }

  encontrarTipo(event:any){
    this.tipoAsignado = event.target.value
    console.log(this.tipoAsignado)
    if(this.tipoAsignado == 1){
      this.showLicencia = true
    }
    else if(this.tipoAsignado == 2){
      this.showChip = true
    }
    this.encontrarEquipo(this.tipoAsignado)
  }

  encontrarEquipo( id: number){
    this.service.get_equipo_by_tipo(id).subscribe((data)=>{
      this.equipos = data
      console.log(this.equipos)
    })
  }


  //se asigna el codigo segun el tipo del equipo
  busquedaCodigo(idEquipo: number){
    const encontrado = this.equiposGenerales.find(equipo => equipo.id == idEquipo)
    if(encontrado){
      if(encontrado.tipo == 1){
        this.idTipo = encontrado.tipo
        this.letra = 'NB'
        this.numEquipo = encontrado.nr_equipo
      }else if(encontrado.tipo==2){
        this.idTipo = encontrado.tipo
        console.log("el tipo", this.idTipo)
        this.numEquipo = encontrado.nr_equipo
        this.letra= 'CL'
      }else if(encontrado.tipo == 3){
        this.idTipo = encontrado.tipo
        this.numEquipo = encontrado.nr_equipo
        this.letra = 'CH'  
      }else if(encontrado.tipo == 4 || encontrado.tipo == 6 || encontrado.tipo ==8 || encontrado.tipo ==9
        || encontrado.tipo == 10 || encontrado.tipo == 13 || encontrado.tipo == 14 || encontrado.tipo == 18 || encontrado.tipo == 19){
          this.idTipo = encontrado.tipo
          this.letra = 'AC'
          this.numEquipo = encontrado.nr_equipo
          // if(encontrado.cantidad){
          //   encontrado.cantidad -= 1
          // }
      }else if(encontrado.tipo == 5){
        this.idTipo = encontrado.tipo
        this.letra = 'NB'
        this.numEquipo = encontrado.nr_equipo
      
      }else if(encontrado.tipo == 11 || encontrado.tipo == 12 || encontrado.tipo ==16 || encontrado.tipo == 17){
        this.idTipo = encontrado.tipo
        this.letra= 'CI'
        this.numEquipo = encontrado.nr_equipo
      }else if(encontrado.tipo == 7 || encontrado.tipo == 15){
        this.idTipo = encontrado.tipo
        this.letra= 'IM'
        this.numEquipo = encontrado.nr_equipo
      }
      this.generarCodigo(this.numEquipo, this.letra)   
    } 
  }

  //asignando numeracion segun el tipo del equipo 
  generarCodigo(idEquipo: number, letra : string){
    if (idEquipo> 99){
      this.leyendaEquipo = "TY-"+letra+"-"+idEquipo
    }else if(idEquipo > 9){
      this.leyendaEquipo = "TY-"+letra+"-0"+idEquipo
    }else{
      this.leyendaEquipo = "TY-"+letra+"-00"+idEquipo
    }
  }

  generarFolio(idFolio: number){
    if(this.folioE >99){
      this.folioEString = "TY-AE-"+this.folioE
    }else if(this.folioE >9){
      this.folioEString = "TY-AE-0"+this.folioE
    }else{
      this.folioEString = "TY-AE-00"+this.folioE
    }return this.folioEString
  }


  generarFolioDevolucion(idFolio: number){
    if(this.folioD >99){
      this.folioDString = "TY-AD-"+this.folioD
    }else if(this.folioD >9){
      this.folioDString = "TY-AD-0"+this.folioD
    }else{
      this.folioDString = "TY-AD-00"+this.folioD
    }return this.folioDString
  }

  
  asignacionForm = this.fb.group({
    id_user : this.fb.control(0),
    ids_user : this.fb.control(""),
    lat: this.fb.control(""),
    long: this.fb.control(""),
    equipo: this.fb.control(0),
    persona: this.fb.control(0),
    fecha_entrega: this.fb.control(null as Date | null),
    estado: this.fb.control(false),
    fecha_devolucion: this.fb.control(null as Date | null),
    observacion: this.fb.control(""),
    folio_entrega: this.fb.control(0),
    folio_devolucion: this.fb.control(0),
    pdf_entrega: this.fb.control(""),
    pdf_devolucion: this.fb.control(""),
    departamento : this.fb.control(0),
    id_licencia: this.fb.control(0),
    status: this.fb.control(0),
    tipo: this.fb.control(0),
    ubicacion: this.fb.control(""),
    ubicacionarchivo: this.fb.control(""),
    asignado: this.fb.control(false),
    firma_devolucion: this.fb.control(false),
    id_chip: this.fb.control(0), 
    estadoChip: this.fb.control(0),
    subestadoChip: this.fb.control(0),
    // ubicacionarchivo: this.fb.control("")   
  })

  registrarAsignacion(){
    if(this.asignacionForm.valid){
      if(!this.botonDevolver){
        //si se selecciona una licencia windows para el equipo
        if(this.licenciaCapturada){
          this.getLocation()
          this.asignacionForm.patchValue({
          id_user: parseInt(sessionStorage['id']),
          ids_user: sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          lat : this.latStr,
          long: this.longStr,
          id_licencia: this.licenciaSeleccionada,
          observacion: "Se asigna licencia windows",
          status: 1,
          folio_entrega : this.folioE,
          asignado: true,
          })
          this.service.crearAsignacion(this.asignacionForm.value).subscribe((respuesta)=>{
            console.log('Persona registrada:', respuesta);
            this.asignacionForm.reset()
            this.toggleLiveDemoAsignar()
            this.listaDeAsignaciones()
          }, (error) => {
          console.error('Error al registrar la persona:', error);
          })
        }else if(this.ChipCapturada){
          this.getLocation()
          this.asignacionForm.patchValue({
          id_user: parseInt(sessionStorage['id']),
          ids_user: sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          lat : this.latStr,
          long: this.longStr,
          id_chip: this.ChipSeleccionada,
          observacion: "Se asigna chip a celular",
          status: 1,
          estadoChip:4,
          subestadoChip: 4, 
          folio_entrega : this.folioE,
          asignado: true,
          })
          this.service.crearAsignacion(this.asignacionForm.value).subscribe((respuesta)=>{
            console.log('Persona registrada:', respuesta);
            this.asignacionForm.reset()
            this.toggleLiveDemoAsignar()
            this.listaDeAsignaciones()
          }, (error) => {
          console.error('Error al registrar la persona:', error);
          })
        }
        else{
          //si no se selecciona licencia windows
          this.getLocation()
          this.asignacionForm.patchValue({
          id_user: parseInt(sessionStorage['id']),
          ids_user: sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          lat : this.latStr,
          long: this.longStr,
          id_licencia: null, 
          id_chip:null,//no se asigna licencia por lo cual campo es nulo
          status: 1, // de entregado
          observacion: "Se asigna Equipo",
          
          //folio_entrega : this.folioE
          })
          this.service.crearAsignacion(this.asignacionForm.value).subscribe((respuesta)=>{
            console.log('Persona registrada:', respuesta);
            this.asignacionForm.reset()
            this.toggleLiveDemoAsignar()
            this.listaDeAsignaciones()
          }, (error) => {
          console.error('Error al registrar la persona:', error);
          })
        }
      }else {
      this.service.actualizar_asignacion(this.asignacionForm.value).subscribe((respuesta)=>{
        console.log('Persona registrada:', respuesta);
        this.generarFolio(this.folioE)
        this.asignacionForm.reset()
        this.listaDeAsignaciones()
      }, (error) => {
        console.error('Error al registrar la persona:', error);
        })
      }
    }
  }

  //permite mostrar la tabla de equipos asignados
  listaDeAsignaciones(){
      this.mostrarAsignacion = true
      this.mostrarAccesorio = false
      this.mostrarLicenciaYEquipo = false
      this.mostrarChipYEquipo
      this.service.get_lista_de_asignaciones().subscribe((data)=>{
        this.asignaciones = data
      })
       this.service.get_lista_de_tipos_con_documentacion().subscribe((data)=>{
        this.tipo= data
      })
    }

    listaDeAccesorios(){
      this.mostrarAccesorio = true
      this.mostrarAsignacion = false
      this.mostrarLicenciaYEquipo = false
      this.mostrarChipYEquipo = false
      this.mostrarLicencia = true
      this.service.get_lista_accesorios_asignados().subscribe((data)=>{
        this.accesoriosAsignados = data
      })
      this.service.get_lista_de_tipos_sin_documentacion().subscribe((data)=>{
        this.tipo= data
      })
    }

    asignarLicencia(){
      if(!this.datosLicencia){
        this.datosLicencia =true
        this.service.get_lista_licencias_no_asignadas().subscribe((data)=>{
          this.licencias = data
        })
      }else{
        this.datosLicencia =false
      }
    }

    licenciaElegida(event:any){
      this.licenciaSeleccionada = event.target.value
      this.licenciaCapturada = true
    }


    asignarChip(){
      if(!this.datosChip){
        this.datosChip =true
        this.service.get_chip_no_asignados().subscribe((data)=>{
          this.equipoChip = data
        })
      }else{
        this.datosChip=false
      }
    }

    chipElegido(event:any){
      this.ChipSeleccionada = event.target.value
      this.ChipCapturada = true
      console.log(this.ChipSeleccionada)
    }


  listado(event: any, id: number){
    console.log("id",id)
    this.idAsignado =id
    //id del equipo
    const result = event.target.value
    console.log(result, "result")
    //si existe un id de equipo igual a los asignados a la persona
    const buscarEquipo = this.equiposPorPersona.find(e=> e.equipo_id == result)
      if(buscarEquipo){
        console.log(buscarEquipo.equipo_id)
        console.log(buscarEquipo.marca)
        console.log(buscarEquipo.serial)
        console.log(buscarEquipo.descripcion)
        console.log(buscarEquipo.almacenamiento)
        console.log(buscarEquipo.ram)
        //se ingresaran los datos solo cuando el input se encuentre checked
        if(event.target.checked == true){
          this.listaDeEquipos.push(
            {"id":buscarEquipo.equipo_id,
             "tipo":buscarEquipo.tipo,
             "marca": buscarEquipo.marca,
             "serial":buscarEquipo.serial,
             "descripcion": buscarEquipo.descripcion+ " " +buscarEquipo.almacenamiento + " "+ buscarEquipo.ram
           }
       )
       //al desmarcar el input se encuentra el id del equipo deseleccionado y el index
       //para eliminarlo del array
        }else if(this.listaDeEquipos[0].id){
          const borrar= this.listaDeEquipos.findIndex(e=> e.equipo_id == result)
          //se borra el objeto del equipo desmaarcado
          this.listaDeEquipos.splice(borrar-1,1)
        }
        // this.listaDeEquipos.push(buscarEquipo.marca + " " +buscarEquipo.serial)
      }
  }
  
  generarActaEntrega(id: number){
    this.toggleLiveListaAsignados()
    const idEncontrado = this.asignaciones.find(equipoAsignado =>
      equipoAsignado.id == id)
      if(idEncontrado){
        this.service.get_lista_asignados_by_id(id).subscribe((data)=>{
          this.personaAsignada = data
          console.log(this.personaAsignada[0].folio_entrega)
          if(this.personaAsignada[0].folio_entrega == null|| this.personaAsignada[0].folio_entrega == 0 ){
            console.log("asignado", this.personaAsignada)
            this.generarFolio(this.folioE)
            console.log(this.personaAsignada[0].rut)
            this.service.get_lista_equipos_asignados_por_persona(this.personaAsignada[0].rut).subscribe((data)=>{
               //modelo de datos para actualizar el estado del equipo en la tabla de asignacion y equipo
               this.personaAsignada
               this.equiposPorPersona = data
               console.log(this.equiposPorPersona)
              const datos = {
              "id": idEncontrado.id,
              "fecha_entrega": this.fechaHoy,
              "folio_entrega" : this.folioE,
              "estado": true, //estado del equipo en tabla asignacion, true implica entregado
              "sub_estado": 1, // equipo recepcionado en tabla asignacion
              "subestado": 1,// subestado de recepcionado tabla de equipo
              "status": 1, // columna estado de la tabla equipo, el 1 hace referencia al estado de entregado
              "equipo_id":this.equiposPorPersona[0].equipo_id,
              "ids_usuario":sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"" ,
              "id_usuario": parseInt(sessionStorage['id']),
              "observacion": "Se ha generado acta de entrega",
              "lat":this.latStr,
              "long":this.longStr,
              }
              console.log(datos)
              //se obtiene datos personales como nombre y apellido
              const nombres =  this.equiposPorPersona[0].nombres
              const nombre = nombres.split(' ')
              this.primerNombre = nombre[0]
              const apellidos =  this.equiposPorPersona[0].apellidos
              const apellido = apellidos.split( ' ')
              this.primerApellido = apellido[0]
              //se concatena nombre y apellido
              this.personaConVariosEquipos= this.primerNombre+ " " +this.primerApellido
              //en caso de qe solo exista un equipo asignado este se envia directamente
              if(this.equiposPorPersona.length < 2){
                console.log(this.equiposPorPersona.length)
                const nombres = this.personaAsignada[0].nombres
                const nombre = nombres.split(' ')
                const primerNombre = nombre[0]
                const apellidos = this.personaAsignada[0].apellidos
                const apellido = apellidos.split( ' ')
                const primerApellido = apellido[0]
                //se obtiene la fecha del dia
                const fecha= String(this.fechaHoy)
                //cuando existe mas de un equipo se envia como un array 
                this.listaDeEquipos.push(this.personaAsignada[0].equipo + " " + this.personaAsignada[0].serial  )

                //modelo de datos para generar el PDF de la acta de entrega
                const body= {
                "id": this.personaAsignada[0].id,
                "nombres": primerNombre,
                "apellidos": primerApellido,
                "rut": this.personaAsignada[0].rut,
                "cargo": this.personaAsignada[0].cargo,
                "equipo":this.equiposPorPersona[0].equipo? this.equiposPorPersona[0].equipo :'N/A',
                "marca": this.personaAsignada[0].marca ? this.personaAsignada[0].marca : 'N/A',
                "serial":this.personaAsignada[0].serial ? this.personaAsignada[0].serial: 'N/A',
                "descripcion": this.personaAsignada[0].descripcion+ " " +this.personaAsignada[0].almacenamiento + " "
                + this.personaAsignada[0].ram ? this.personaAsignada[0].descripcion: 'N/A',
                //descripcion concatena diversos datos en caso de que alguno se encuentre vacio
                // "marca": this.listaDeEquipos, 
                "fecha_entrega": fecha,
                "folio_entrega" : this.folioEString,
                "encargado_entrega" : this.persona_encargada,
                "equipo_id": this.equiposPorPersona[0].equipo_id

              }
              //servicio para crear el PDF del acta de entrega
              this.service.datosPDF(body).subscribe((data)=>{
              console.log(data)
                Swal.fire({
                icon: 'success',
                title: 'Acta Generada',
                text: 'Se ha generado el acta con éxito',
                })
                this.listaDeAsignaciones()
              })
              
              //se actualiza el estado del equipo en la tabla asignacion y equipo al realizar la entrega
              this.service.actualizar_crear_acta_entrega(datos).subscribe((data)=>{
                console.log("datos enviados act",datos)
              console.log("actualizado")
              })
            }     
          })   
        
          }else{
            Swal.fire({
            icon: 'error',
            title: 'No se generó el Acta',
            text: 'Ya existe un acta creado anteriormente, validar información',
          })
        }      
      })    
    }
  }

  generarActaDevolucion(id: number){
    //si existe mas de un equipo asignado para la persona se despliega la lista para seleccionar cuales se desean devolver
    this.toggleLiveDemoDevolucion()
    this.botonDevolver = true
    console.log(this.asignaciones)
    const idEncontrado = this.asignaciones.find(equipoAsignado =>
      equipoAsignado.id == id)
      if(idEncontrado){
        this.service.get_lista_asignados_by_id(id).subscribe((data)=>{
          this.personaAsignada = data
          if(this.personaAsignada[0].folio_devolucion == null || this.personaAsignada[0].folio_devolucion == 0 ){
            this.generarFolioDevolucion(this.folioD)
            // console.log("generado folio", this.folioD)
            this.service.get_lista_equipos_asignados_para_Devolver(this.personaAsignada[0].rut).subscribe((data)=>{
              this.personaAsignada
              this.equiposPorPersona = data

          //     const nombres = this.personaAsignada[0].nombres
          //     const nombre = nombres.split(' ')
          //     const primerNombre = nombre[0]
          //     const apellidos = this.personaAsignada[0].apellidos
          //     const apellido = apellidos.split( ' ')
          //     const primerApellido = apellido[0]
          // })       

            //en caso de qe solo exista un equipo asignado este se envia directamente
              if(this.equiposPorPersona.length < 2){
             // console.log(this.equiposPorPersona.length)
                const nombres = this.personaAsignada[0].nombres
                const nombre = nombres.split(' ')
                const primerNombre = nombre[0]
                const apellidos = this.personaAsignada[0].apellidos
                const apellido = apellidos.split( ' ')
                const primerApellido = apellido[0]
                const fecha= String(this.fechaHoy)
                this.listaDeEquipos.push(this.personaAsignada[0].equipo + " " + this.personaAsignada[0].serial  )

                //modelo de datos para generar el pdf de devolucion
                const body= {
                "id": this.personaAsignada[0].id,
                "nombres": primerNombre,
                "apellidos": primerApellido,
                "rut": this.personaAsignada[0].rut,
                "cargo": this.personaAsignada[0].cargo,
                "tipo":this.equiposPorPersona[0].tipo? this.equiposPorPersona[0].tipo :'N/A',
                "marca": this.personaAsignada[0].marca ? this.personaAsignada[0].marca : 'N/A',
                "serial":this.personaAsignada[0].serial ? this.personaAsignada[0].serial: 'N/A',
                "descripcion": this.personaAsignada[0].descripcion+ " " +this.personaAsignada[0].almacenamiento + " "
                + this.personaAsignada[0].ram ? this.personaAsignada[0].descripcion: 'N/A',
      
                // "marca": this.listaDeEquipos, 
                "fecha_devolucion": fecha,
                "folio_devolucion" : this.folioDString,
                "encargado_entrega" : this.persona_encargada
                
                }
              this.service.datosPDFDevolucion(body).subscribe((data)=>{
                console.log(data)
                
                Swal.fire({
                icon: 'success',
                title: 'Acta Generada',
                text: 'Se ha generado el acta con éxito',
                })
                this.listaDeAsignaciones()
              }) 

              //modelo de datos que permite actualizar el estado del equipo y la asignacion
              const datos = {
                "id": idEncontrado.id,
                "fecha_devolucion": this.fechaHoy,
                "folio_devolucion" : this.folioD,
                "estado": false, // estado false tabla asignacion implica equipo devuelto (disponible nuevamente)
                // "sub_estado": 2, // se debe seleccionar la ubicacion del equipo devuelto bien sea en providencia o bodega, columna tabla asignacion
                // "subestado": 2,//se debe seleccionar la ubicacion del equipo devuelto bien sea en providencia o bodega, columna tabla equipo
                // "status":2,//el estado 2 implica equipo devuelto, columna tabla de equipo
                // "equipo_id": this.equiposPorPersona[0].equipo_id
                "status":2,
                "subestado": 0,// aun no se ha elegido la ubicacion de la devolucion
                "ids_usuario":sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"" ,
                "id_usuario": parseInt(sessionStorage['id']),
                "observacion": "Se ha generado acta de devolucion",
                "lat":this.latStr,
                "long":this.longStr,
                "equipo_id": this.personaAsignada[0].equipo_id
              }
              console.log(datos)
              this.service.actualizar_acta_devolucion(datos).subscribe((data)=>{
              console.log("actualizado")
              })
            }     
          }) 
        } else{
          Swal.fire({
            icon: 'error',
            title: 'No se generó el Acta',
            text: 'Ya existe un acta creado anteriormente, validar información',
          })
        }
        })    
      }
  } 



  enviarDatosActa(){
    //obtenemos los datos personales como nombre y apellido
    const nombres =  this.equiposPorPersona[0].nombres
    const nombre = nombres.split(' ')
    const primerNombre = nombre[0]
    const apellidos =  this.equiposPorPersona[0].apellidos
    const apellido = apellidos.split( ' ')
    const primerApellido = apellido[0]

    //se concatena nombre y apellido para enviar en conjunto
    this.personaConVariosEquipos= primerNombre+ " " +primerApellido
    this.rut = this.equiposPorPersona[0].rut
    //obtenemos la fecha actual
    const fecha= String(this.fechaHoy)

    //si existe mas de un equipo asignado a la persona y no se ha firmado el acta se muestra el pop up y por medio de este
    //mediante un evento click se recolecta la informacion y se envia

    //datos para generar el acta de entrega
    this.cuerpoActa= {
      "id": this.equiposPorPersona[0].id,
      "nombres": primerNombre,
      "apellidos": primerApellido,
      "rut": this.equiposPorPersona[0].rut,
      "cargo": this.equiposPorPersona[0].cargo,
      "info": this.listaDeEquipos,
      "fecha_entrega": fecha,
      "folio_entrega" : this.folioEString,
      "encargado_entrega" : this.persona_encargada
    }
    console.log("cuerpo",this.cuerpoActa)
    console.log("lista",this.listaDeEquipos)
    //datos para generar el acta de devolucion
    const cuerpoActaDevolucion= {
      "id": this.equiposPorPersona[0].id,
      "nombres": primerNombre,
      "apellidos": primerApellido,
      "rut": this.equiposPorPersona[0].rut,
      "cargo": this.equiposPorPersona[0].cargo,
      "info": this.listaDeEquipos,
      "fecha_devolucion": fecha,
      "folio_devolucion" : this.folioDString,
      "encargado_entrega" : this.persona_encargada
    }
    //cambiar el estado del equipo para la acta de entrega
    const datos = {
      "id": this.equiposPorPersona[0].id,
      "fecha_entrega": this.fechaHoy,
      "folio_entrega" : this.folioE,
      "estado": true, //el estado true significa entregado
      "status":1,
      "sub_estado": 1, //subestado 1 indica recepcionado, del estado 1 de entregado
      "equipo_id":this.equiposPorPersona[0].equipo_id,
      "ids_usuario":sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"" ,
      "id_usuario": parseInt(sessionStorage['id']),
      "observacion": "Se ha generado acta de entrega",
      "lat":this.latStr,
      "long":this.longStr,
    }

   //cambiar el estado del equipo para la acta de devolucion
    const datosDevolver = {
      "id": this.equiposPorPersona[0].id,
      "fecha_devolucion": this.fechaHoy,
      "folio_devolucion" : this.folioD,
      "estado": false, //el estado false significa devuelto (disponible para entregar)
      // "sub_estado": 1, //se selecciona la ubicacion del equipo devuelto en providencia o en bodega 
      "status":2,
      "equipo_id":this.equiposPorPersona[0].equipo_id,
      "ids_usuario":sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"" ,
      "id_usuario": parseInt(sessionStorage['id']),
      "observacion": "Se ha generado acta de devolución",
      "lat":this.latStr,
      "long":this.longStr,
      // "ubicacionarchivo": this.fotoDevolucion

    }
    if(!this.botonDevolver){
      this.service.actualizar_crear_acta_entrega(datos).subscribe((data)=>{
        console.log("actualizado")
        })
      this.service.datosPDF(this.cuerpoActa).subscribe((data)=>{
        console.log(data)
        Swal.fire({
          icon: 'success',
          title: 'Acta Generada',
          text: 'Se ha generado el acta con éxito',
        })
      })

    }else{
      //validamos que el array enviado con la informacion de los equipos no se encuentre vacia
      if(this.listaDeEquipos.length !==0){
        this.service.actualizar_acta_devolucion(datosDevolver).subscribe((data)=>{
        console.log("actualizado")
        })
        this.service.datosPDFDevolucion(cuerpoActaDevolucion).subscribe((data)=>{
          console.log(data)
          this.toggleLiveListaAsignados()
          Swal.fire({
            icon: 'success',
            title: 'Acta Generada',
            text: 'Se ha generado el acta con éxito',
          })
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Acta No Generada',
          text: 'Por favor, validar información',
        })
      }
      
    }
  }
  capturaFotoEquipoDevuelto(event: any){
    this.fotoDevolucion = event.target.value
    console.log(this.fotoDevolucion)
    
  }

      asignarFirmaEntrega( id: number){
        console.log("el id", this.idAsignado)
        this.service.get_lista_asignados_by_id(this.idAsignado).subscribe((data)=>{
          this.estadoActa = data
          const body = {
            "id": this.idAsignado,
            "firma_entrega": true,
            "sub_estado": 2,// subestado 2 implica equipo recepcionado en la tabla asignacion
            "subestado": 2,// subestado 2 implica equipo recepcionado en la tabla equipo
            "equipo_id": this.estadoActa[0].equipo_id, // id del equipo
            "status": 1 ,//se mantiene el estado como entregado en la tabla equipo
            "ids_usuario":sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"" ,
            "id_usuario": parseInt(sessionStorage['id']),
            "observacion": "Se ha generado acta de entrega",
            "lat":this.latStr,
            "long":this.longStr,
       
          }
          if(this.estadoActa[0].estado == false){
            Swal.fire({
              icon: 'error',
              title: 'No se pudo generar la Firma',
              text: 'Validar que exista un acta de entrega antes de generar la firma',
            })
          }
          else if(this.pdfScaneado.size < 0){
            Swal.fire({
              icon: 'error',
              title: 'Adjunte el PDF Escaneado',
            })
          }else{
            this.subirArchivos(this.idAsignado)
            this.service.actualizarFirmaActaEntrega(body).subscribe(()=>{
              this.firmaGenerada = true
              Swal.fire({
                icon: 'success',
                title: 'Firma Generada',
                text: 'Se ha realizado la firma del Acta de Entrega',
              })
              this.toggleLiveEntregaEstado()
              this.service.get_lista_de_asignaciones().subscribe((data)=>{
                this.asignaciones = data})
            })
          }
        })
      }


      elegirEstado(event: any){
        this.estadoElegido =event.target.value
        this.service.get_subestado_by_id(this.estadoElegido).subscribe((data)=>{
          this.subestado = data
        })
      }
      elegirSubestado(event:any){
        this.subestadoElegido = event.target.value
      }
    
      observacionDevolucion(event: any){
        this.observacion =event.target.value
      }

      enviarPDFScaneado(event:any){
        this.pdfScaneado  = event.target.files[0]
        this.extraerBase64(this.pdfScaneado).then((imagen :any )=>{
          this.previsualizacion = imagen.base
          console.log(imagen)
        })
        this.archivos.push(this.pdfScaneado)
        console.log(this.pdfScaneado)
    }

    extraerBase64 = async($event:any)=> new Promise((resolve, reject)=>{
      try{
        const unsafePdf = window.URL.createObjectURL($event)
        const pdf = this.sanitizer.bypassSecurityTrustUrl(unsafePdf)
        const reader = new FileReader()
        reader.readAsDataURL($event)
        reader.onload = ()=>{
          resolve({
            base: reader.result,
          })
        }
        reader.onerror = (error) =>{
          resolve({
            base: null
          })
        } 
      }
      catch (e){
        reject(e)
      }
    })

    subirArchivos(id:number):any{
      if(this.pdfScaneado){
        console.log(this.pdfScaneado)
        const data = this.pdfScaneado.name
        this.service.uploadPDFEntrega(this.pdfScaneado, id,data).subscribe(response=>{
          console.log("lo que se envia",response)
        })
      }
      // const data = this.pdfScaneado.name
      // console.log("data",data)
     
      // try{
     
      //   const data = this.pdfScaneado.name
      //   console.log("data",data)
      //   // this.archivos.forEach((archivo : any) =>{
      //   //   console.log(archivo)
      //   //   formulario.append('files', archivo)
      //   //   console.log("data",formulario)
      //   // })
      //   this.service.uploadPDFEntrega(this.pdfScaneado).subscribe((data)=>{
      //     console.log("lo que se envia",data)
      //   })
      // }catch(e){
      //   console.log('ERROR', e)
      // }
    }

      //una vez el acta de devolucion ha sido generada se dispone a obtener la firma del acta para realizar el cambio del estado
      enviarFirmaDevolucion(id: number){
          const body={
            "id": this.personaAsignada[0].id,
            "firma_devolucion":true,
            "status": this.estadoElegido, 
            "sub_estado": this.subestadoElegido,
            "subestado": this.subestadoElegido,
            "observacion": this.observacion,
            "equipo_id": this.personaAsignada[0].equipo_id,
            "ids_usuario":sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"" ,
            "id_usuario": parseInt(sessionStorage['id']),
            "lat":this.latStr,
            "long":this.longStr,
            "acta_devolucion": this.pdfScaneado,
            "ubicacionarchivo": this.fotoDevolucion
          }
          console.log(this.personaAsignada[0].firma_entrega == false)
          // if(this.personaAsignada[0].firma_entrega == false || this.personaAsignada[0].firma_entrega == null){
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'No se pudo generar la Firma',
          //     text: 'Validar que exista un acta de devolución antes de generar la firma',
          //   })
          // }
          this.service.get_lista_devolucion_by_id(this.personaAsignada[0].id).subscribe((data)=>{
            this.devolucionActa = data
            console.log(this.devolucionActa)
            if(this.devolucionActa[0].folio_devolucion == null){
              Swal.fire({
                icon: 'error',
                title: 'No se pudo generar la Firma',
                text: 'Validar que exista un acta de devolución antes de generar la firma',
              })
              this.toggleLiveDevolucionEstado()
            }else{
              this.service.actualizarFirmaDevolucion(body).subscribe(()=>{
                this.firmaGenerada = true
                this.toggleLiveDevolucionEstado()
                Swal.fire({
                  icon: 'success',
                  title: 'Firma Generada',
                  text: 'Se ha realizado la firma del Acta de Devolución',
                })
                this.service.get_lista_de_asignaciones().subscribe((data)=>{
                  this.asignaciones = data})
              })
            }
          })  
      }

    
      asignarEstadoDevolucion( id: number){
        this.service.get_lista_asignados_by_id(id).subscribe((data)=>{
          this.personaAsignada = data
          if(this.personaAsignada[0].firma_entrega == true && this.personaAsignada[0].pdf_devolucion){
            this.toggleLiveDevolucionEstado()
          }else{
            Swal.fire({
              icon: 'error',
              title: 'No se ha generado Firma',
              text: 'Verifique que existe una acta de devolución previamente firmada',
            })
          }
        })
        
        
     }

     asignarEstadoEntrega( id: number){
      this.service.get_lista_asignados_by_id(id).subscribe((data)=>{
        this.personaAsignada = data
        if(this.personaAsignada[0].pdf_entrega){
          this.toggleLiveEntregaEstado()
        }else{
          Swal.fire({
            icon: 'error',
            title: 'No se ha generado Firma',
            text: 'Verifique que existe una acta de entrega',
          })
        }
      })
   }

     //descarga de los archivos PDFS
     descargarPDFDevolucion(id:number){
      // this.service.get_firma_devolucion(id).subscribe((data : boolean [])=>{
      
      //   this.firma = data[0]
      //   console.log(this.firma)
      //   if(this.firma == true){
      //     this.service.downloadEscaneado_devolucion(id)
      //   }else{
      //     this.service.downloadPDF_devolucion(id)
      //   }
      // })
      //verficiamos el estado de la firma, si ya se encuentra firmado es porque existe un archivo escaneadao
      //por tal motivo el tratamiento de datos para el archivo escaneado es distinto
      this.service.get_firma_devolucion(id).subscribe((data)=>{
        this.firma = data
        console.log(this.firma)
         //obtenemos la ruta del pdf para extraer el nombre del archivo el cual se enviara al servicio
         const rutaPDF = this.firma[0].pdf_devolucion
         const partePDF = rutaPDF?.split("/")
         if(partePDF){
          const nombre = partePDF[partePDF?.length-1]
          console.log(nombre)
          if(nombre){
            if(this.firma[0].firma_devolucion == true){
              //se generara la descarga con el nombre del pdf extraido desde la base de datos
              this.service.downloadEscaneado_devolucion(id,nombre)
            }else{
              this.service.downloadPDF_devolucion(id, nombre)
            }
          }
         }
    
      })
        
     }

     descargarPDFEntrega(id:number){
      this.service.get_firma_entrega(id).subscribe((data)=>{
        this.firma = data
        const rutaPDF = this.firma[0].pdf_entrega
        const partePDF = rutaPDF?.split("/")
        if(partePDF){
          const nombre = partePDF[partePDF?.length-1]
          if(nombre){
            if(this.firma[0].firma_entrega == true){
              this.service.downloadEscaneado_entrega(id, nombre)
            }else{
              this.service.downloadPDF_entrega(id,nombre)
            }
          } 
        }
        // if(this.firma[0].firma_entrega == true){
        //   const rutaPDF = this.firma[0].pdf_entrega
        //   const partePDF = rutaPDF?.split("/")
        //   if(partePDF){
        //     const nombre = partePDF[partePDF?.length-1]
        //     if(nombre){
        //       this.service.downloadEscaneado_entrega(id, nombre)
        //     }
        //   }
        // }else{
        //   this.service.downloadPDF_entrega(id,nombre)
        // }
      })
      
    }

     //permite ver mayores caracteristicas del equipo y persona asignada
       verMas(id:number){
        console.log("ver mas",id)
        this.busquedaCodigo(this.asignadosSinSjoin[0].equipo)
        console.log("1",this.asignadosSinSjoin[0])
        console.log("2", this.asignadosSinSjoin[0].equipo)
        this.service.get_lista_de_asignados_sin_join_por_id(id).subscribe((data)=>{
          this.asignadosSinSjoin = data
          console.log("3",this.asignadosSinSjoin)
        })

        this.service.get_lista_asignados_by_id(id).subscribe((data)=>{
          this.personaAsignada = data
          console.log("persona asig", this.personaAsignada)
          this.empleado = this.personaAsignada[0].nombres + "  " + this.personaAsignada[0].apellidos
          this.equipoDescripcion = this.personaAsignada[0].marca + " " + this.personaAsignada[0].serial
        
        })

        this.toggleLiveDetalle()
        // this.asignacionForm.patchValue({    
        //   equipo: producto.equipo,
        //   persona: producto.persona,
        //   estado: producto.estado,
        //   fecha_entrega: producto.fecha_entrega,
        //   fecha_devolucion: (producto.fecha_devolucion !== undefined) ? producto.fecha_devolucion : null,
        //   observacion: producto.observacion,
        //   folio_entrega: producto.folio_entrega,
        //   folio_devolucion:producto.folio_devolucion,
        //   pdf_entrega: producto.pdf_entrega,
        //   pdf_devolucion: producto.pdf_devolucion,
        //   departamento : producto.departamento    
        // }) 
       }
       //se toma por el evento los id a enviar para los respuestos y/o accesorios asignados por departamento
       departamentoElegido(event:any){
        this.departamentoSeleccionado = event.target.value
       }

       equipoElegido(event:any){
        this.equipoSeleccionado= event.target.value
       }

       enviarRepuestoAccesorio(){
        const body={
          "departamento": this.departamentoSeleccionado,
          "tipo": this.tipoAsignado,
          "equipo": this.equipoSeleccionado,
          "observacion":this.observacion,
          "id_user":parseInt(sessionStorage['id']),
          "ids_user": sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          "lat":this.latStr,
          "long":this.longStr,
          "fecha_entrega":this.fechaHoy,
          "estado": true,
          "status":1,
          "subestado":1,
          "sub_estado":1
        }
        console.log(body)
        this.service.asignacionAccesorio(body).subscribe((respuesta)=>{
          console.log('Persona registrada:', respuesta);
          Swal.fire({
            icon: 'success',
            title: 'Accesorio o Repuesto asignado',
            text: 'Asignación realizada con éxito',
          })
          this.asignacionForm.reset()
          this.listaDeAsignaciones()
        }, (error) => {
        console.error('Error al registrar la persona:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al realizar la asignación',
          text: 'Asignación no realizada, validar información',
        })
        })
       }

       //servicio para obtener los datos de a que equipo se asigno la licencia
    obtenerLicenciaAsignadaAEquipo(){
      this.service.get_licencias_asignadas_a_equipos().subscribe((data)=>{
        this.licenciaYEquipo  = data
        if(!this.mostrarLicenciaYEquipo ){
          this.mostrarLicenciaYEquipo = true
          this.mostrarAccesorio = false
          this.mostrarAsignacion = false
          
        }else{
          this.mostrarLicenciaYEquipo = false
        }
        
        console.log(this.licenciaYEquipo)
      })
    }

       async liberarLicencia(id:number){
        console.log(id)
        await this.getLocation()
        const buscarAsignado = this.licenciaYEquipo.find( licencia =>licencia.id == id)
        console.log(buscarAsignado)
        if(buscarAsignado){
          const body = {
            "id_licencia": buscarAsignado.id,
            "persona":buscarAsignado.id_persona,
            "equipo": buscarAsignado.id_equipo,
            "observacion": "Licencia Liberada",
            "id_user":parseInt(sessionStorage['id']),
            "ids_user": sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
            "lat":this.latStr,
            "long":this.longStr,
            "asignado": false
          }
          console.log(body)
          this.service.liberarLicencia(body).subscribe((data)=>{
            console.log("licencia liberada")
            Swal.fire({
              icon: 'success',
              title: 'Licencia liberada',
            })
          })
        }
       
      }

      obtenerChipAsignadoAEquipo(){
        this.service.get_chip_asignados_a_equipos().subscribe((data)=>{
          this.chipYEquipo  = data
          console.log(this.chipYEquipo)
          if(!this.mostrarChipYEquipo ){
            this.mostrarChipYEquipo= true
            this.mostrarLicenciaYEquipo = false
            this.mostrarAccesorio = false
            this.mostrarAsignacion = false
  
          }else{
            this.mostrarChipYEquipo = false
          }
          
          console.log(this.chipYEquipo)
        })
      }

      devolverAccesorio(id:number){
        this.toggleLiveDevolverAccesorio()
        this.idAsignacion = id
        }

      enviarDevolucionAccesorio(id:number){
        const encontrarAcc = this.accesoriosAsignados.find(acc => acc.id == this.idAsignacion)
        if(encontrarAcc){
          const body={
            "equipo": encontrarAcc.id,
            "id_user":parseInt(sessionStorage['id']),
            "ids_user": sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
            "lat":this.latStr,
            "long":this.longStr,
            "status":  this.estadoElegido,
            "subestado": this.subestadoElegido,
            "observacion": this.observacion,
            "fecha_devolucion":this.fechaHoy,
            "estado": true,
            "sub_estado":this.subestadoElegido,
            "id_asignacion": encontrarAcc.id_asignacion
          }
          console.log(body)
          this.service.devolucionAccesorio(body).subscribe((respuesta :any)=>{
            console.log('Devolucion realizada:', respuesta);
            Swal.fire({
              icon: 'success',
              title: 'Devolución de accesorio',
            })
         
            this.listaDeAccesorios()
          }, (error) => {
            console.error('Error ', error);
            })
          }
        }
  
}
