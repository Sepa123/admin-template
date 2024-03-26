import { Component ,OnInit} from '@angular/core';
import {InventarioTIService} from '../../../service/inventario-ti.service'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormArray } from '@angular/forms'

import { Personal } from 'src/app/models/mantenedores/personal.interface';
import {Departamentos} from 'src/app/models/mantenedores/departamento.interface';
import {Tipo} from 'src/app/models/mantenedores/tipo.interface';
import {Equipo, Almacenamiento, Ram, Ubicacion, Marca} from 'src/app/models/mantenedores/equipo.interface';
import { SucursalInventario } from 'src/app/models/mantenedores/sucursal.interface';
import{EstadoInventario } from 'src/app/models/mantenedores/estado.interface'
import {LicenciaWindows} from 'src/app/models/mantenedores/licencia.interface'
import { SubEstado, Code } from 'src/app/models/mantenedores/subEstado.interface';
import{Estado} from 'src/app/models/mantenedores/estados.interface'
import {FiltroEquipo} from 'src/app/models/mantenedores/filtroEquipo.interface'
import{LicenciaYEquipo} from 'src/app/models/mantenedores/licenciaYEquipo.interface'

import Swal from 'sweetalert2';


@Component({
  selector: 'app-inventario-ti',
  templateUrl: './inventario-ti.component.html',
  styleUrls: ['../styles/inventario-ti.component.scss']
})
export class InventarioTiComponent implements OnInit {

  show: boolean = false
  isModalOpen: boolean = false
  mostrarTipo: boolean = false;
  mostrarEquipo: boolean = false;
  mostrarPersona: boolean = false;
  mostrarDepartamento: boolean = false;
  mostrarSucursal: boolean = false;
  mostrarEstado : boolean = false;
  mostrarLicencia: boolean = false;
  mostrarSubEstado: boolean = false;
  mostrarLicenciaYEquipo: boolean = false
  seleccionTipoEquipo: number | null = null; ;
  seleccionEstadoEquipo: number = 0;

  // enum para el equipo
  seleccionRam : string  |null= null;
  seleccionAlm : string  |null= null;
  seleccionMarca: string | null = null;

  botonEditar : boolean = false


  isErrorView : boolean = false

  personas : Personal [] = []
  departamentos : Departamentos [] = []
  tipoDeEquipo : Tipo [] = []
  tipo : Tipo [] = []
  equipos : Equipo [] = []
  filtroEquipos: Equipo[] = []
  sucursales : SucursalInventario [] = []
  estados : EstadoInventario [] = []
  //modelo de datos para los estados y subestados
  estado : Estado [] = []
  estadoAsignado!: number
  estadoEquipo :   EstadoInventario [] = []
  licencias : LicenciaWindows [] = []
  subestados: SubEstado[] = []
  busquedaDeIdSegunTipo :  Equipo [] = []
  almacenamientos: Almacenamiento [] = Object.values(Almacenamiento) as Almacenamiento[]
  rams:Ram[] = Object.values(Ram)  as Ram[]
  ubicacion : Ubicacion [] = Object.values(Ubicacion) as Ubicacion []
  marca : Marca [] = Object.values(Marca) as Marca []

  identificador: Code [] = Object.values(Code) as Code[]
  //conteo para el code segun el parent code
  busquedaCode:  Estado [] = []
  nr_code! : any
  nCode!: number

  //busqueda del estado mas alto para incrementar y asignar el valor de este al crear un nuevo
  busquedaEstado:  Estado [] = []

  //seleccionar el subestado del equipo
  subestadoSeleccionado!: number

  //campos para seleccionar y filtrar a la persona segun si se encuentra activo o no 
  opciones: { label: string; valor: boolean | null }[] = [
    { label: 'Todo el Personal', valor: null },
    { label: 'Habilitado', valor: true },
    { label: 'Inhabilitado', valor: false }
  ];

  //campos para seleccionar y filtrar las licencias por asignadas y disponibles
  seleccion:{label: string; valor: string}[] = [
    {label: 'Todos', valor: 'Todos'},
    {label: 'Disponibles', valor: 'Disponibles' },
    {label: 'Asignados', valor: 'Asignados'}
  ]

  licenciaYEquipo: LicenciaYEquipo [] = []

  camposChip : boolean = false
  id!: number
  leyendaEquipo!: string
  nEquipo!: number

  equipoSinJoin :Equipo [] = []
  TodosEquipos : string = "Todas"
  tipoElegido: string = ""

  //variables para buscadores
  serial ! : string
  nombre!: string
  apellido! : string
  rut!: string
  //conteo de ID segun el tipo de equipo
  idCL!: any 
  idCH!: any
  idPT!: any
  idNB!: any
  idAC!: any
  idCI!: any
  idIM!: any
  nr_equipo ! :any
  codigoGenerado ! : string

  fechaHoy = this.obtenerFechaActual()

  //variables para el numero de equipo
  NB: string = 'TY-NB-'
  AC : string = 'TY-AC-'
  CL: string = 'TY-CL-'
  IM: string = 'TY-IM-'
  CI: string = 'TY-CI-'
  PT: string = 'TY-PT-'


  //Mostrar u ocultar datos
  genericos : boolean = false // !== 1 y 2
  pantalla  : boolean  = false //id 5
  memoria  : boolean  = false // 11 y 12
  todo : boolean = false
  
  bitacoraPersona!: {}

  //mostrar por ID el producto asociado a la base de datos

  public visible1 = false;
  public visible2 = false;
  public visible3 = false;
  public visible4 = false;
  public visible5 = false;
  public visible6 = false;
  public visible7 = false;
  public visible8 = false;
  public visible9 = false;
  public visible10 = false
  public visible11 = false
  public visible12 = false
  public visible13 = false
  
  //datos geo
  latitude!: number
  longitud! : number
  latStr!: string
  longStr!: string




  valorSeleccionado: any;
    constructor(private service: InventarioTIService, 
      private fb:FormBuilder
    ) {
   this.personaForm;
    
    }

    ngOnInit(){
  
      this.service.get_lista_de_tipos_equipos().subscribe((data)=>{
        this.tipo= data
      })
      this.service.get_lista_estado_inventario().subscribe((data)=> {
        this.estadoEquipo  = data
      })

      this.service.get_lista_estado().subscribe((data)=>{
        this.estado = data
      })

      this.service.get_lista_de_subestados().subscribe((data)=> {
        this.subestados = data
      })

      this.service.get_ultimo_equipo_creado().subscribe((data)=>{
        const body={
         
          "id": data[0],
          "id_user": parseInt(sessionStorage['id']),
          "ids_user": sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          "observacion": "Equipo nuevo generado",
          "status":data[1],
          "subestado": data[2],
          "lat": this.latStr,
          "long": this.longStr
        }
        console.log(body)
        console.log(data[1],data[2])
      

      })
    }


   // botones para activar los pop up, uno para cada accion en especifico
   toggleLiveDemoTipo() {
    this.visible1= !this.visible1;
  }

  handleLiveDemoChangeTipo(event: any) {
    this.visible1= event;
  }
  
  toggleLiveDemoEquipo() {
    this.visible2 = !this.visible2;
  }

  handleLiveDemoChangeEquipo(event: any) {
    this.visible2= event;
  }

  toggleLiveDemoSucursal() {
    this.visible3  = !this.visible3 ;
  }

  handleLiveDemoChangeSucursal(event: any) {
    this.visible3  = event;
  }

  toggleLiveDemoPersona() {
    this.visible4 = !this.visible4;
  }

  handleLiveDemoChangePersona(event: any) {
    this.visible4 = event;
  }

  toggleLiveDemoDepartamento() {
    this.visible5= !this.visible5;
  }

  handleLiveDemoChangeDepartamento(event: any) {
    this.visible5= event;
  }

  toggleLiveDemoEstado() {
    this.visible6= !this.visible6;
  }
 
  handleLiveDemoChangeEstado(event: any) {
    this.visible6= event;
  }

  toggleLiveDemoLicencia() {
    this.visible7= !this.visible7;
  }
  handleLiveDemoChangeLicencia(event: any) {
    this.visible7= event;
  }
  toggleLiveSubEstado() {
    this.visible8= !this.visible8;
  }
  handleLiveSubEstado(event: any) {
    this.visible8= event;
  }

  toggleLiveVerDescripcionEquipo() {
    this.visible9= !this.visible9;
  }
  handleLiveVerDescripcionEquipo(event: any) {
    this.visible9= event;
  }

  toggleLiveInfoEquipo() {
    this.visible10= !this.visible10;
  }
  handleLiveInfoEquipo(event: any) {
    this.visible10= event;
  }
  
  toggleLiveInfo() {
    this.visible11= !this.visible11;
  }
  handleLiveInfo(event: any) {
    this.visible11= event;
  }

  toggleLiveInfoPersona() {
    this.visible12= !this.visible12;
  }
  handleLiveInfoPersona(event: any) {
    this.visible12= event;
  }
  toggleLiveInfoLicenciaAsignada() {
    this.visible13= !this.visible13;
  }
  handleLiveInfoLicenciaAsignada(event: any) {
    this.visible13= event;
  }
  
  openModal(){
    this.isModalOpen = true
  }

  closeModal(){
    this.isModalOpen = false
  }

  recargar(){
    location.reload()
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

  //al crear el acta se genera con la fecha del dia 
  obtenerFechaActual(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate());
    const isoDate = fecha.toISOString().split('T')[0]; // Obtiene la fecha en formato ISO (YYYY-MM-DD)
    return isoDate;
  }

  infoEquipo(){
    this.toggleLiveInfoEquipo()
  }

  infoAcciones(){
    this.toggleLiveInfo()
  }

  infoPersona(){
    this.toggleLiveInfoPersona()
  }

  infoLicenciaAsignada(){
    this.toggleLiveInfoLicenciaAsignada()
  }

  

  filterByEquipo(nombreEquipo : string){
    console.log("nombre",nombreEquipo)
    this.TodosEquipos = nombreEquipo
    if(nombreEquipo === "Todos"){
      this.listarEquiposyDescripcion()
    }else{
      this.service.get_lista_descripcion_por_equipo().subscribe((data)=>{
        this.equipos =data.filter(equipo => equipo.tipo?.toString() == nombreEquipo)
      

      })
    }
  }
  estadoChip(){
    this.service.get_subestado_chip().subscribe((data)=> {
      this.subestados = data
      this.show = true
    })
  }
  filterByChip(nombreEquipo : string){
    this.TodosEquipos = nombreEquipo
    if(nombreEquipo === "Todos"){
      this.camposChip = true
      this.service.get_lista_descripcion_por_equipo().subscribe((data)=>{
        this.equipos =data.filter(equipo => equipo.tipo?.toString() == "Chip")
      })
    }else{
      this.camposChip = true
      this.service.get_chip_by_estado().subscribe((data)=>{
        this.equipos =data.filter(equipo => equipo.subestado?.toString() == nombreEquipo)
      })
    }  
  }


  filterBySerial(event: any){
    this.serial = event.target.value
    if(this.serial.trim()===''){
      this.service.get_lista_descripcion_por_equipo().subscribe((data)=>{
        this.equipos = data
      })
    }
    this.service.get_equipo_por_serial(this.serial).subscribe((data)=>{
      this.equipos = data
    })
    this.serial = ""
 
  }
  filterByPersona(event: any){
    this.rut = event.target.value
    const rutCorregido = this.rut.toUpperCase().replace(/\./g, '')
    if(this.rut.trim()=== ''){
      this.service.get_lista_datos_personales().subscribe((data)=>{
        this.personas = data
      })
    }else{
      this.service.get_persona_por_rut(rutCorregido).subscribe((data)=>{
        this.personas = data
        if(this.personas.length == 0){
          Swal.fire({ 
            icon: 'error',
            title: 'RUT no encontrado',
            text: 'Por favor, validar que el RUT ingresado sea válido',
            })
        }
      })
    }
    
   
    this.rut = ""
  }



  tipoSeleccionado(event: any) {
    const idTipo = event.target.value;
    console.log('ID seleccionado:', idTipo);
    this.tipo.forEach(idEnData =>{
      if(idEnData.id == idTipo){
        console.log("entro")
        this.id ++
        if(idTipo == 1 ||idTipo == 2 ) {
          console.log(idTipo, "cel y note")
          console.log(this.todo)
          this.todo = true
          this.pantalla = false
          this.memoria = false
        }else if ( idTipo == 13){
          console.log(idTipo, "memoria")
          this.memoria = true
          this.todo = false
          this.pantalla = false
        }else if(idTipo== 5){
          console.log(idTipo, "pantalla")
          this.pantalla = true
        }
      }
    })
  } 

  generarIdEquipo(event: any){
    const idTipo = event.target.value
    this.service.get_nr_equipo(idTipo).subscribe((data)=>{
      this.busquedaDeIdSegunTipo = data
      this.nr_equipo = this.busquedaDeIdSegunTipo
     
      console.log("nr_equipo0",this.busquedaDeIdSegunTipo)
    })
    this.tipo.forEach(idEnData =>{
      if(idEnData.id == idTipo){
        if(idTipo == 1){
          this.nEquipo = this.nr_equipo
        }else if(idTipo == 2){
          this.nEquipo = this.nr_equipo
        }else if(idTipo ==3){
          this.nEquipo = this.nr_equipo
        }else if(idTipo == 5){
          this.nEquipo = this.nr_equipo
        }else if(idTipo == 6 || idTipo == 8|| idTipo == 9 || idTipo==10 || idTipo ==4 || idTipo == 13 || idTipo == 14 ||idTipo == 18 || idTipo == 19 ){
          this.nEquipo = this.nr_equipo
        }else if(idTipo == 11 || idTipo == 12  || idTipo == 16 || idTipo == 17) {
          this.nEquipo = this.nr_equipo 
        }else if(idTipo == 7 || idTipo == 15){
          this.nEquipo = this.nr_equipo
        }
      }
    })
  }


// DATOS DEL FORMULARIO PARA AGREGAR UNA PERSONA

  filterHabilitado(habilitado : Boolean | null){

    if(habilitado == null){
      this.listarPersona()
    }else{
      this.service.get_lista_datos_personales().subscribe((data)=>{
        this.personas = data.filter(ppl => ppl.habilitado== habilitado)
      })
      
  }
}
cambioHabilitarPersona(id: number){

   const body = {
    "id": id,
    "id_user":parseInt(sessionStorage['id']),
    "ids_user":sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
    "lat":this.latStr,
    "long": this.longStr,
    "habilitado": false,
    "observacion": "Se ha inhabilitado"
   }
   this.service.modificar_habilitado(body).subscribe((data)=>{
    Swal.fire({ 
      icon: 'success',
      title: 'Persona inhabilitada',
      text: 'Se realizó la modificación con éxito',
      })
      this.listarPersona()
   })
}


  personaForm = this.fb.group({
    id: this.fb.control(0),
    nombres: this.fb.control("", [Validators.required] ),
    apellidos : this.fb.control("", [Validators.required] ),
    rut : this.fb.control("", [Validators.required] ),
    nacionalidad: this.fb.control(""),
    id_user : this.fb.control(parseInt(sessionStorage['id']), [Validators.required]),
    ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    lat: this.fb.control(""),
    long: this.fb.control(""),
    fecha_nacimiento: this.fb.control(null as Date | null),
    estado_civil: this.fb.control(""),
    telefono: this.fb.control(""),
    fecha_ingreso: this.fb.control(null as Date | null),
    cargo: this.fb.control(""),
    domicilio: this.fb.control(""),
    comuna: this.fb.control(""),
    banco: this.fb.control(""),
    tipo_cuenta: this.fb.control(""),
    numero_cuenta: this.fb.control(""),
    correo: this.fb.control(""),
    afp: this.fb.control(""),
    salud: this.fb.control(""),
    telefono_adicional: this.fb.control(""),
    nombre_contacto: this.fb.control(""),
    seguro_covid: this.fb.control(false),
    horario: this.fb.control(""),
    ceco: this.fb.control(""),
    sueldo_base: this.fb.control(0),
    tipo_contrato: this.fb.control(""),
    direccion_laboral: this.fb.control(""),
    enfermedad: this.fb.control(""),
    polera: this.fb.control(""),
    pantalon: this.fb.control(""),
    zapato: this.fb.control(0),
    poleron: this.fb.control(""),
    req_comp: this.fb.control(false),
    req_cel: this.fb.control(false),
    observacion: this.fb.control("Nueva Persona creada"),
    habilitado: true
  
    })
    //validacion, si el rut del usuario ya existe no se deberia poder crear otra persona con el mismo
    buscar(){
      const rutDuplicado = this.personas.find(person => person.rut == this.personaForm.value.rut) 
      console.log("existe", rutDuplicado)  
    }
// POST DE PERSONA
    registrarPersona(){
      if (this.personaForm.valid) {
        if(!this.botonEditar){
          this.getLocation()
          this.personaForm.patchValue({
          lat : this.latStr,
          long: this.longStr
          }) 
          const rutDuplicado = this.personas.find(person => person.rut == this.personaForm.value.rut) 
          if(!rutDuplicado){
            console.log(this.personaForm.value)
            this.service.creacion_personal(this.personaForm.value).subscribe(
              (respuesta) => {
                this.service.get_ultima_persona_creada().subscribe((data)=>{
                  this.personas = data
                  this.bitacoraPersona = {
                    "id": this.personas[0],
                    "lat":this.latStr,
                    "long": this.longStr,
                    "id_user": parseInt(sessionStorage['id']),
                    "ids_user": sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
                    "observacion": "Nueva Persona creada"
                  }
                  console.log("antes",this.bitacoraPersona)
                  console.log("id",this.personas[0])

                  this.service.bitacora_persona(this.bitacoraPersona).subscribe((data)=>{
                    Swal.fire({
                      icon: 'success',
                      title: 'Persona ingresada',
                      text: 'Se ha registrado con éxito',
                      })
                      // this.personaForm.reset()
                      this.toggleLiveDemoPersona()
                      this.listarPersona()
                      console.log("despues",this.bitacoraPersona)
                  })
                })
                console.log('Persona registrada:', respuesta);
                
                
               
                },
                (error) => {
                  Swal.fire({
                  icon: 'error',
                  title: 'Error al ingresar',
                  text: 'Validar información',
                })
                  console.error('Error al registrar la persona:', error);
                });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'El RUT ingresado ya existe',
              text: 'Validar información',
              })
          }
        }else{
          this.personaForm.patchValue({
            id_user : parseInt(sessionStorage['id']),
            ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
            lat : this.latStr,
            long: this.longStr
          })
            this.service.actualizar_persona(this.personaForm.value).subscribe((data)=>{   
              this.personaForm.reset()
              Swal.fire({
                icon: 'success',
                title: 'Persona actualizada',
                text: 'Se ha actualizado los datos con éxito',
                })
              this.toggleLiveDemoPersona()
              this.botonEditar = false
              this.listarPersona()
            }, (error)=>{
              Swal.fire({
                icon: 'error',
                title: 'Error al modificar',
                text: 'Validar información',
                })
              })
        }
     }        
    }
    //EDITAR PERSONA

    editarPersona(id:number){
      const busqueda = this.personas.find(person => person.id == id)
      if(busqueda){
        this.botonEditar = true
        this.personaForm.patchValue({
          id: busqueda.id,
          nombres: busqueda.nombres,
	        apellidos : busqueda.apellidos,
	        rut : busqueda.rut,
	        nacionalidad: busqueda.nacionalidad,
	        fecha_nacimiento : busqueda.fecha_nacimiento,
	        estado_civil : busqueda.estado_civil,
	        telefono : busqueda.telefono,
	        fecha_ingreso: busqueda.fecha_ingreso,
	        cargo : busqueda.cargo,
	        domicilio : busqueda.domicilio,
	        comuna : busqueda.comuna,
	        banco : busqueda.banco,
	        tipo_cuenta : busqueda.tipo_cuenta,
	        numero_cuenta : busqueda.numero_cuenta,
	        correo : busqueda.correo,
	        afp : busqueda.afp,
	        salud : busqueda.salud,
	        telefono_adicional: busqueda.telefono_adicional,
	        nombre_contacto : busqueda.nombre_contacto,
	        seguro_covid : busqueda.seguro_covid,
	        horario : busqueda.horario,
	        ceco : busqueda.ceco,
	        sueldo_base : busqueda.sueldo_base,
	        tipo_contrato : busqueda.tipo_contrato,
	        direccion_laboral : busqueda.direccion_laboral,
	        enfermedad : busqueda.enfermedad,
	        polera : busqueda.polera,
	        pantalon : busqueda.pantalon,
	        poleron: busqueda.poleron,
	        zapato : busqueda.zapato,
          req_comp: busqueda.req_comp,
          req_cel : busqueda.req_cel,
      

        })
        this.toggleLiveDemoPersona()
      }
    }
    //descargar planilla con los datos completos de las personas
    imprimirPlanillaPersonas(fecha:string){
       fecha = this.fechaHoy
      this.service.downloadPlanillaExcel(fecha)
  }

    // FOMULARIO PARA AGREGAR UN  EQUIPO
    tipoEquipoForm = this.fb.group({
      id: this.fb.control(0),
      nombre: this.fb.control("", [Validators.required] ),
      documentacion: this.fb.control(false)
  
    })

    registrarTipoEquipo(){
      if (this.tipoEquipoForm.valid) {
        if(!this.botonEditar){
          this.service.crear_tipo_equipo(this.tipoEquipoForm.value).subscribe(
            (respuesta) => {
              console.log('Tipo de equipo registrado:', respuesta);
              this.tipoEquipoForm.reset()
              Swal.fire({
                icon: 'success',
                title: 'Tipo de Equipo ingresado',
                text: 'Se ha registrado con éxito',
              })
              this.toggleLiveDemoTipo()
              this.listarTiposDeEquipos()
             
              },
              (error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al modificar',
                  text: 'Validar información',
                })
                console.error('Error al registrar el tipo de equipo:', error);
              }
            );
        }else{
          console.log(this.tipoEquipoForm.value)
          this.service.actualizar_tipo(this.tipoEquipoForm.value).subscribe((respuesta)=>{
            this.tipoEquipoForm.reset()
            Swal.fire({
              icon: 'success',
              title: 'Tipo de Equipo actualizado',
              text: 'Se ha actualizado con éxito',
            })
            this.toggleLiveDemoTipo()
            this.listarTiposDeEquipos()
            this.botonEditar = false
          }, (error)=>{
            Swal.fire({
              icon: 'error',
              title: 'Error al modificar',
              text: 'Validar información',
            })
          })
        }
       
        }
    }

    //EDITAR EQUIPO

    editarTipo(id: number){
      const busqueda = this.tipo.find(equipo => equipo.id === id)
      console.log(busqueda)
      if(busqueda){
        this.botonEditar = true
        this.tipoEquipoForm.patchValue({
        id: busqueda.id,
        nombre : busqueda.nombre,                          
       })
      }
       this.toggleLiveDemoTipo() 
    }
    //FORM DEPARTAMENTO

    departamentoForm = this.fb.group({
      id: this.fb.control(0),
      id_user : this.fb.control(0),
      ids_user : this.fb.control(""),
      nombre: this.fb.control(""),
    })

    registroDepartamento(){
      if (this.departamentoForm.valid) {
        if(!this.botonEditar){
          this.departamentoForm.patchValue({
            id_user : parseInt(sessionStorage['id']),
            ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
           })
          this.service.creacion_departamento(this.departamentoForm.value).subscribe(
            (respuesta) => {
              
              console.log('Departamento registrada:', respuesta);
              this.departamentoForm.reset()
              Swal.fire({
                icon: 'success',
                title: 'Departamento ingresado',
                text: 'Se ha registrado con éxito',
              })
              this.listaDepartamento()
              this.toggleLiveDemoDepartamento()
              },
              (error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al ingresar',
                  text: 'Validar información',
                })
                console.error('Error al registrar el departamento:', error);
              }
            );
        }else{
          this.service.actualizar_departamento(this.departamentoForm.value).subscribe((data)=>{
            this.departamentoForm.reset()
            Swal.fire({
              icon: 'success',
              title: 'Departamento actualizado',
              text: 'Se ha modificado con éxito',
            })
            this.listaDepartamento()
            this.toggleLiveDemoDepartamento()
            this.botonEditar = false
          }, (error)=>{
            Swal.fire({
              icon: 'error',
              title: 'Error al modificar',
              text: 'Validar información',
            })
          })
          }
        }
    }

    //EDITAR DEPARTAMENTO
    editarDepartamento(id: number){
      const busqueda = this.departamentos.find(equipo => equipo.id === id)
      console.log(busqueda)
      if(busqueda){
        this.botonEditar = true
        this.departamentoForm.patchValue({
        id: busqueda.id,
        nombre : busqueda.nombre,
       })
      }
       this.toggleLiveDemoDepartamento() 
    }

    //FORM DE LICENCIA
    filterByLicencia(campo:string){
      console.log(campo)
      if(campo == 'Todos'){
        this.service.get_lista_licencias().subscribe((data)=> {
          this.licencias = data
          this.mostrarLicencia= true
          this.mostrarLicenciaYEquipo = false
          
        })
      }else if(campo == 'Disponibles'){
        this.service.get_lista_licencias_no_asignadas().subscribe((data)=>{
          this.licencias = data
          this.mostrarLicencia= true
          this.mostrarLicenciaYEquipo = false
        })
      }else if(campo== 'Asignados'){
        console.log("entro")
        this.service.get_licencias_asignadadas().subscribe((data)=>{
          this.licencias = data
          this.mostrarLicencia= true
          this.mostrarLicenciaYEquipo = false
        })
      }
      
    }

    //servicio para obtener los datos de a que equipo se asigno la licencia
    obtenerLicenciaAsignadaAEquipo(){
      this.service.get_licencias_asignadas_a_equipos().subscribe((data)=>{
        this.licenciaYEquipo  = data
        if(!this.mostrarLicenciaYEquipo ){
          this.mostrarLicenciaYEquipo = true
          this.mostrarEquipo = false
          this.mostrarTipo = false
          this.mostrarPersona = false
          this.mostrarSucursal = false
          this.mostrarDepartamento = false
          this.mostrarEstado = false
          this.mostrarSubEstado = false
        }else{
          this.mostrarLicenciaYEquipo = false
          this.mostrarEquipo = false
          this.mostrarTipo = false
          this.mostrarPersona = false
          this.mostrarSucursal = false
          this.mostrarDepartamento = false
          this.mostrarEstado = false
          this.mostrarSubEstado = false
        }
        
        this.mostrarLicencia = false
        console.log(this.licenciaYEquipo)
      })
    }
    


    licenciaForm = this.fb.group({
      id: this.fb.control(0),
      id_user : this.fb.control(0),
      ids_user : this.fb.control(""),
      codigo: this.fb.control(""),
      lat: this.fb.control(""),
      long: this.fb.control(""),
      asignada:this.fb.control(false)
    })

//REGISTRO DE LICENCIA
    registroLicencia(){
      if(this.licenciaForm.valid){
        if(!this.botonEditar){
          this.getLocation();
          this.licenciaForm.patchValue({
          id_user : parseInt(sessionStorage['id']),
          ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          lat: this.latStr,
          long: this.longStr
        }) 
        this.service.crearLicencia(this.licenciaForm.value).subscribe((respuesta)=>{
          console.log('Licencia registrada:', respuesta);
          Swal.fire({
            icon: 'success',
            title: 'Licencia ingresada',
            text: 'Se ha ingresado con éxito',
          })
          this.licenciaForm .reset()
          this.toggleLiveDemoLicencia()
          location.reload();
         
        }, (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al ingresar',
            text: 'Validar información',
          })
          console.error('Error al registrar la licencia:', error);
          })
        }else{
          this.service.actualizar_licencia(this.licenciaForm.value).subscribe((data)=>{
            this.licenciaForm.reset()
            Swal.fire({
              icon: 'success',
              title: 'Licencia actualizada',
              text: 'Se ha modificado con éxito',
            })
            this.toggleLiveDemoLicencia()
            location.reload();
            this.botonEditar = false
          }, (error)=>{
            Swal.fire({
              icon: 'error',
              title: 'Error al modificar',
              text: 'Validar información',
            })
          })
        }
      }
      this.listaDeLicencias()
    }

    //EDITAR LICENCIA
    editarLicencia(id:number){
      const busqueda = this.licencias.find(licencia => licencia.id === id)
      if(busqueda){
        this.botonEditar = true
        this.licenciaForm.patchValue({
          id : busqueda.id,
          codigo: busqueda.codigo
        })                                                        
        this.toggleLiveDemoLicencia()
      }
    }
    liberarLicencia(id:number){
      console.log(id)
    }

    //FORM ESTADO DEL EQUIPO

    estadoForm = this.fb.group({
      id: this.fb.control(0),
      // id_user : this.fb.control(parseInt(sessionStorage['id']), [Validators.required]),
      // ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
      estado: this.fb.control(0),
      descripcion: this.fb.control("")
    })

    registroEstado(){
      if (this.estadoForm.valid) {
        this.service.get_ultimo_estado().subscribe((data : any)=>{
          this.estadoForm.patchValue({
            estado: parseInt(data[0])+1
          })
          console.log(this.estadoForm.value)

          if(!this.botonEditar){
            this.service.crear_estado_inventario(this.estadoForm.value).subscribe(
              (respuesta) => {
                console.log('Estado registrad:', respuesta);
                Swal.fire({
                  icon: 'success',
                  title: 'Estado ingresado',
                  text: 'Se ha ingresado con éxito',
                })
                this.estadoForm.reset()
                this.toggleLiveDemoEstado()
                this.listaEstado()
                },
                (error) => {
                  console.error('Error al registrar el estado:', error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Error al ingresar',
                    text: 'Validar información',
                  })
                } );
           }else{
            this.service.actualizar_estado(this.estadoForm.value).subscribe((data)=>{
              this.estadoForm.reset()
              Swal.fire({
                icon: 'success',
                title: 'Estado actualizado',
                text: 'Se ha modificado con éxito',
              })
              this.listaEstado()
              this.toggleLiveDemoEstado()
              this.botonEditar = false
            }, (error)=>{
              Swal.fire({
                icon: 'error',
                title: 'Error al modificar',
                text: 'Validar información',
              })
            })
           }
        })
      }
    }
    //EDITAR ESTADO

    editarEstado(id:number){
      const busqueda = this.estado.find(estado => estado.id === id)
      if(busqueda){
        this.estadoForm.patchValue({
          id: busqueda.id,
          descripcion: busqueda.descripcion
        })
        this.botonEditar = true
        this.toggleLiveDemoEstado()
      }
    }

    //FORM SUCURSAL

      sucursalForm = this.fb.group({
        id: this.fb.control(0),
        nombre : this.fb.control(""),
        pais : this.fb.control(""),
        ciudad : this.fb.control(""),
        comuna: this.fb.control(""),
        direccion: this.fb.control(""),
        latitud: this.fb.control(""),
        longitud: this.fb.control(""),
        id_usuario : this.fb.control(0),
        ids_usuario : this.fb.control(""),

      })
      registroSucursal() {
        if (this.sucursalForm.valid) {
          if(!this.botonEditar){
            this.getLocation();
            this.sucursalForm.patchValue({
            id_usuario: parseInt(sessionStorage['id']),
            ids_usuario : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
            latitud : this.latStr,
            longitud: this.longStr
          }) 
          this.service.creacion_sucursal(this.sucursalForm.value).subscribe(
            (respuesta) => {
              console.log('Sucursal registrada:', respuesta);
              Swal.fire({
                icon: 'success',
                title: 'Sucursal ingresada',
                text: 'Se ha modificado con éxito',
              })
              this.sucursalForm.reset();
              this.toggleLiveDemoSucursal()
              this.listaDeSucursales();
            },
            (error) => {
              console.error('Error al registrar la sucursal:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error al ingresar',
                text: 'Validar información',
              })
            } );
          }else{
            this.service.actualizar_sucursal(this.sucursalForm.value).subscribe((data)=>{
              this.sucursalForm.reset()
              Swal.fire({
                icon: 'success',
                title: 'Sucursal actualizada',
                text: 'Se ha modificado con éxito',
              })
              this.toggleLiveDemoSucursal()
              this.listaDeSucursales()
              this.botonEditar = false
            }, (error)=>{
              Swal.fire({
                icon: 'error',
                title: 'Error al modificar',
                text: 'Validar información',
              })
            })
          }
        }
      }

      //EDITAR SUCURSAL


      editarSucursal(id: number){
        const busqueda = this.sucursales.find(sucursal => sucursal.id === id)
        if(busqueda){
          this.botonEditar = true
          this.sucursalForm.patchValue({
            id: busqueda.id,
            nombre: busqueda.nombre,
	          pais: busqueda.pais,
	          ciudad: busqueda.ciudad,
	          comuna: busqueda.comuna,
	          direccion: busqueda.direccion,
          })
          this.toggleLiveDemoSucursal()
        }
      }
  //FORM DESCRIPCION DE EQUIPO

  ramElegida(event:any){
    this.seleccionRam = event.target.value
    if(this.seleccionRam == "Seleccione una opcion"){
      this.seleccionRam = ""
    }
  }

  almacenamientoElegido(event:any){
    this.seleccionAlm  = event.target.value
    if(this.seleccionAlm == "Seleccione una opcion"){
      this.seleccionAlm = ""
    }
    console.log(this.seleccionAlm )
  }

  marcaElegida(event:any){
    this.seleccionMarca = event.target.value
    console.log(this.seleccionMarca)
  }

 
    equipoDescripcionForm = this.fb.group(
      {
      id: this.fb.control(0),
      id_user : this.fb.control(0),
      ids_user : this.fb.control(""),
      lat: this.fb.control(""),
      long: this.fb.control(""),
      marca: this.fb.control(Marca['Sin info']),
      modelo: this.fb.control(""),
      serial: this.fb.control(""),
      mac_wifi: this.fb.control(""),
      serie: this.fb.control(""),
      resolucion: this.fb.control(""),
      dimensiones: this.fb.control(""),
      descripcion: this.fb.control(""),
      ubicacion: this.fb.control(""),
      almacenamiento: this.fb.control(Almacenamiento.null),
      ram: this.fb.control(Ram.null),
      estado: this.fb.control(0),
      subestado: this.fb.control(0),
      tipo: this.fb.control(0),
      cantidad: this.fb.control(1),
      nr_equipo: this.fb.control(0),
      ubicacionarchivo: this.fb.control(""),
      observacion: this.fb.control("Equipo nuevo generado"),
      status: this.fb.control(0)
    })
//REGISTRO DESCRIPCION DE EQUIPO
    registroEquipoDescripcion(){
      if (this.equipoDescripcionForm.valid) {
        if(!this.botonEditar){
            this.getLocation()
            this.equipoDescripcionForm.patchValue({
            id_user : parseInt(sessionStorage['id']),
            ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
            lat : this.latStr,
            long : this.longStr,
            nr_equipo : this.nr_equipo,  
            subestado : this.subestadoSeleccionado,
            estado: this.estadoAsignado,
            status:  this.estadoAsignado
          })
          this.service.crear_descripcion_equipo(this.equipoDescripcionForm.value).subscribe(
            (respuesta) => {
              console.log(this.equipoDescripcionForm.value)
              this.service.get_ultimo_equipo_creado().subscribe((data)=>{
                const body={
                  "id": data[0],
                  "id_user": parseInt(sessionStorage['id']),
                  "ids_user": sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
                  "observacion": "Equipo nuevo generado",
                  "status":data[1],
                  "subestado": data[2],
                  "lat": this.latStr,
                  "long": this.longStr
                }
                this.service.bitacora_equipo(body).subscribe((data)=>{
                  console.log('Descripcion de equipo registrada:', respuesta);
                  this.equipoDescripcionForm.reset()
                  Swal.fire({
                  icon: 'success',
                  title: 'Descripción de Equipo ingresada',
                  text: 'Se ha ingresado con éxito',
                  })
                this.toggleLiveDemoEquipo()
                this.listarEquiposyDescripcion()
                })
                })
              },
              (error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al ingresar',
                  text: 'Validar información',
                })
                console.error('Error al registrar la descripcion del equipo:', error);
              });
        }else{
          this.equipoDescripcionForm.patchValue({
            id_user : parseInt(sessionStorage['id']),
            ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
            lat : this.latStr,
            long : this.longStr, 
            observacion: "Equipo modificado"        
          })
          this.service.actualizar_descripcion_equipo(this.equipoDescripcionForm.value).subscribe((data)=>{
            this.equipoDescripcionForm.reset()
            Swal.fire({
              icon: 'success',
              title: 'Descripción de Equipo actualizada',
              text: 'Se ha modificado con éxito',
            })
            this.listarEquiposyDescripcion()
            this.toggleLiveDemoEquipo()
            this.botonEditar = false
          }, (error)=>{
            Swal.fire({
              icon: 'error',
              title: 'Error al modificar',
              text: 'Validar información',
            })
          })
         }
        }
    }

    //EDITAR EQUIPO
    

    editarEquipo(id: number){
      //obtenemos por el id el objeto del equipo para asi poder traer sus valores y editar 
      const busqueda = this.equipoSinJoin.find(equipo => equipo.id === id)
      if(busqueda){
          this.equipoDescripcionForm.patchValue({
            id : busqueda.id,
            marca : busqueda.marca,
            modelo: busqueda.modelo,
            serial: busqueda.serial,
            mac_wifi: busqueda.mac_wifi,
            serie: busqueda.serie,
            resolucion: busqueda.resolucion,
            dimensiones: busqueda.dimensiones,
            descripcion: busqueda.descripcion,
            ubicacion: busqueda.ubicacion,
            almacenamiento: busqueda.almacenamiento,
            ram: busqueda.ram,
            estado: busqueda.estado,
            subestado: busqueda.subestado,
            tipo: busqueda.tipo,
            ubicacionarchivo : busqueda.ubicacionarchivo
          })
        this.botonEditar = true
        this.toggleLiveDemoEquipo()
      }
    }
    verDescripcionEquipo(id:number){
      console.log("hola")
      this.toggleLiveVerDescripcionEquipo()
      this.service.get_lista_descripcion_por_id(id).subscribe((data)=>{
       this.filtroEquipos= data
      })
    }
    //obtenemos el id del estado
    asignarEstado(event:any){
      this.estadoAsignado = event.target.value
      this.asignarSubestado(this.estadoAsignado)
   
    }

    asignarSubestado( id: number){
      this.service.get_subestado_by_id(id).subscribe((data)=>{
        this.subestados = data
  
      })
    }

    subestadoElegido(event:any){
      this.subestadoSeleccionado = event.target.value
      console.log(this.subestadoSeleccionado)
    }

   

    generarCodeSubEstado(event: any){
      const idCode= event.target.value
      this.service.get_code_subestado(idCode).subscribe((data)=>{
        this.busquedaCode = data
        this.nr_code = this.busquedaCode
        this.estado.forEach(codeData =>{
          if(codeData.id == idCode){
            if(idCode ==1){
              this.nCode =this.nr_code
            }else if(idCode == 2){
              this.nCode =this.nr_code
            }else if(idCode== 3){
              this.nCode =this.nr_code
            }else if(idCode==4){
              this.nCode =this.nr_code
            }
          }
        })
      })
     
    }

    // formulario para la creacion de los SUBESTADOS
    subestadoForm = this.fb.group({
      id: this.fb.control(0),
      parent_code : (Code['Sin info']),
      code: this.fb.control(0),
      descripcion : this.fb.control(""),
    })

    registroSubEstado(){
      if (this.subestadoForm.valid) {
          this.subestadoForm.patchValue({
          code : this.nr_code})
          console.log(this.subestadoForm.value)
          if(!this.botonEditar){
            this.service.crearSubEstado(this.subestadoForm.value).subscribe((respuesta)=>{
              Swal.fire({
                icon: 'success',
                title: 'Subestado creado',
                text: 'Se ha generado de forma exitosa',
              })
              console.log('Subestado registrado:', respuesta);
              this.subestadoForm.reset()
              this.listaDeSubEstados()
            },
            (error)=>{
              console.error('Error al registrar el estado:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error al ingresar',
                text: 'Validar información',
              })
            })
          }else{
            this.service.actualizar_subestado(this.subestadoForm).subscribe((data)=>{
              this.subestadoForm.reset()
              Swal.fire({
                icon: 'success',
                title: 'SubEstado actualizado',
                text: 'Se ha modificado con éxito',
              })
              this.listaEstado()
              this.toggleLiveDemoEstado()
              this.botonEditar = false
            })
          }
          
        }
      }

    editarSubEstado(id:number){
      const busqueda = this.subestados.find(sub => sub.id === id)
      if(busqueda){
        this.subestadoForm.patchValue({
          id: busqueda.id,
          parent_code : busqueda.parent_code,
          code: busqueda.code,
          descripcion : busqueda.descripcion,
        })
        this.botonEditar = true
        this.toggleLiveSubEstado()
      }
    }

    cambiarEstadoChip(id:number){
      const busqueda = this.equipoSinJoin.find(equipo => equipo.id === id)
      if (busqueda){
        this.equipoDescripcionForm.patchValue({
          id : busqueda.id,
          subestado: busqueda.subestado,
        })
        this.toggleLiveDemoEquipo()
      }
    }

  


    
     
    // GET DATOS PERSONALES
    listarPersona(){
      this.mostrarPersona = true
      this.mostrarEquipo = false
      this.mostrarSucursal = false
      this.mostrarTipo = false
      this.mostrarDepartamento = false
      this.mostrarEstado = false
      this.mostrarLicencia = false;
      this.mostrarSubEstado = false
      this.mostrarLicenciaYEquipo = false
      this.service.get_lista_datos_personales().subscribe((data)=>{
        this.personas = data
      })
    }
    //GET DEL TIPOD EQUIPO
    listarTiposDeEquipos(){
      this.mostrarTipo = true
      this.mostrarPersona = false
      this.mostrarEquipo = false
      this.mostrarSucursal = false
      this.mostrarDepartamento = false
      this.mostrarEstado = false
      this.mostrarLicencia = false;
      this.mostrarSubEstado = false
      this.mostrarLicenciaYEquipo = false
      this.service.get_lista_de_tipos_equipos().subscribe((data)=>{
        this.tipoDeEquipo = data
      })
    }

    //GET DE CADA EQUIPO A DETALLE
    listarEquiposyDescripcion(){
      this.mostrarEquipo = true
      this.mostrarTipo = false
      this.mostrarPersona = false
      this.mostrarSucursal = false
      this.mostrarDepartamento = false
      this.mostrarEstado = false
      this.mostrarLicencia = false;
      this.mostrarSubEstado = false
      this.mostrarLicenciaYEquipo = false
      this.service.get_lista_descripcion_por_equipo().subscribe((data)=>{
        this.equipos = data
      })
      //trae los equipos en bruto para poder desplegarlos en el modal para editar
      this.service.get_lista_de_equipos_sin_join().subscribe((data)=>{
        this.equipoSinJoin = data
      })
    }
    //GET DE SUCURSAL 

    listaDeSucursales(){
      this.mostrarEquipo = false
      this.mostrarTipo = false
      this.mostrarPersona = false
      this.mostrarEstado = false
      this.mostrarLicencia = false;
      this.mostrarSucursal = true
      this.mostrarDepartamento = false
      this.mostrarSubEstado = false
      this.mostrarLicenciaYEquipo = false
      this.service.get_lista_de_sucursal().subscribe((data)=>{
        this.sucursales =data
      })
    }
    //GET DE DEPARTAMENTO, OCULTA LAS OTRAS LISTAS

    listaDepartamento(){
      this.mostrarEquipo = false
      this.mostrarTipo = false
      this.mostrarPersona = false
      this.mostrarSucursal = false
      this.mostrarEstado = false
      this.mostrarLicencia = false;
      this.mostrarSubEstado = false
      this.mostrarLicenciaYEquipo = false
      this.mostrarDepartamento = true

      this.service.get_lista_de_departamentos().subscribe((data)=> {
        this.departamentos = data
      })
    }

    listaEstado(){
      this.mostrarEquipo = false
      this.mostrarTipo = false
      this.mostrarPersona = false
      this.mostrarSucursal = false
      this.mostrarDepartamento = false
      this.mostrarLicencia = false;
      this.mostrarSubEstado = false
      this.mostrarLicenciaYEquipo = false
      this.mostrarEstado = true
      // this.service.get_lista_estado_inventario().subscribe((data)=> {
      //   this.estados = data
      // })
      this.service.get_lista_estado().subscribe((data)=>{
        this.estado = data
      })
    }

    listaDeLicencias(){
      this.mostrarEquipo = false
      this.mostrarTipo = false
      this.mostrarPersona = false
      this.mostrarSucursal = false
      this.mostrarDepartamento = false
      this.mostrarEstado = false
      this.mostrarSubEstado = false
      this.mostrarLicenciaYEquipo = false
      this.mostrarLicencia = true;
      this.service.get_lista_licencias().subscribe((data)=> {
        this.licencias = data
      })
    }

    listaDeSubEstados(){
      this.mostrarEquipo = false
      this.mostrarTipo = false
      this.mostrarPersona = false
      this.mostrarSucursal = false
      this.mostrarDepartamento = false
      this.mostrarEstado = false
      this.mostrarLicencia = false;
      this.mostrarSubEstado = true;
      this.mostrarLicenciaYEquipo = false
      this.service.get_lista_de_subestados().subscribe((data)=> {
        this.subestados = data
      })
    }
}