import { Component ,OnInit} from '@angular/core';
import {InventarioTIService} from '../../../service/inventario-ti.service'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormArray } from '@angular/forms'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Personal } from 'src/app/models/mantenedores/personal.interface';
import {Departamentos} from 'src/app/models/mantenedores/departamento.interface';
import {Tipo} from 'src/app/models/mantenedores/tipo.interface';
import {Equipo} from 'src/app/models/mantenedores/equipo.interface';
import { SucursalInventario } from 'src/app/models/mantenedores/sucursal.interface';
import{EstadoInventario } from 'src/app/models/mantenedores/estado.interface'
import {LicenciaWindows} from 'src/app/models/mantenedores/licencia.interface'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventario-ti',
  templateUrl: './inventario-ti.component.html',
  styleUrls: ['../styles/inventario-ti.component.scss']
})
export class InventarioTiComponent implements OnInit {

    
  isModalOpen: boolean = false
  mostrarTipo: boolean = false;
  mostrarEquipo: boolean = false;
  mostrarPersona: boolean = false;
  mostrarDepartamento: boolean = false;
  mostrarSucursal: boolean = false;
  mostrarEstado : boolean = false;
  mostrarLicencia: boolean = false;
  seleccionTipoEquipo: number | null = null; ;
  seleccionEstadoEquipo: number = 0;

  botonEditar : boolean = false


  isErrorView : boolean = false

  personas : Personal [] = []
  departamentos : Departamentos [] = []
  tipoDeEquipo : Tipo [] = []
  tipo : Tipo [] = []
  equipos : Equipo [] = []
  sucursales : SucursalInventario [] = []
  estados : EstadoInventario [] = []
  estadoEquipo :   EstadoInventario [] = []
  licencias : LicenciaWindows [] = []

  id!: number

  //Mostrar u ocultar datos
  genericos : boolean = false // !== 1 y 2
  pantalla  : boolean  = false //id 5
  memoria  : boolean  = false // 11 y 12
  todo : boolean = false
  

  //mostrar por ID el producto asociado a la base de datos

  public visible1 = false;
  public visible2 = false;
  public visible3 = false;
  public visible4 = false;
  public visible5 = false;
  public visible6 = false;
  public visible7 = false;
  
  //datos geo
  latitude!: number
  longitud! : number
  latStr!: string
  longStr!: string


  valorSeleccionado: any;
    constructor(private service: InventarioTIService, private fb:FormBuilder) {
   this.personaForm;
    
    }

    ngOnInit(){
  
      this.service.get_lista_de_tipos_equipos().subscribe((data)=>{
        this.tipo= data
      })
      this.service.get_lista_estado_inventario().subscribe((data)=> {
        this.estadoEquipo  = data
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
  
  openModal(){
    this.isModalOpen = true
  }

  closeModal(){
    this.isModalOpen = false
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
        }else if (idTipo == 3  || idTipo == 13){
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


// DATOS DEL FORMULARIO PARA AGREGAR UNA PERSONA

  personaForm = this.fb.group({
    id: this.fb.control(0),
    nombres: this.fb.control("", [Validators.required] ),
    apellidos : this.fb.control("", [Validators.required] ),
    rut : this.fb.control("", [Validators.required] ),
    nacionalidad: this.fb.control("", [Validators.required] ),
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
  
    })
// POST DE PERSONA
    registrarPersona(){
      if (this.personaForm.valid) {
        if(!this.botonEditar){
          this.getLocation()
          this.personaForm.patchValue({
          lat : this.latStr,
          long: this.longStr
        }) 
        
        this.service.creacion_personal(this.personaForm.value).subscribe(
          (respuesta) => {
            console.log('Persona registrada:', respuesta);
            this.personaForm.reset()
            this.listarPersona()
            },
            (error) => {
              console.error('Error al registrar la persona:', error);
            }
          );

        }else{
          this.service.actualizar_persona(this.personaForm.value).subscribe((data)=>{
            this.listarPersona()
            this.personaForm.reset()
            this.botonEditar = false
            
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
        })
        this.toggleLiveDemoPersona()
      }
    }

    // FOMULARIO PARA AGREGAR UN  EQUIPO
    tipoEquipoForm = this.fb.group({
      id: this.fb.control(0),
      nombre: this.fb.control("", [Validators.required] ),
  
    })

    registrarTipoEquipo(){
      if (this.tipoEquipoForm.valid) {
        if(!this.botonEditar){
          this.service.crear_tipo_equipo(this.tipoEquipoForm.value).subscribe(
            (respuesta) => {
              console.log('Tipo de equipo registrado:', respuesta);
              this.tipoEquipoForm.reset()
              this.listarTiposDeEquipos()
              },
              (error) => {
                console.error('Error al registrar el tipo de equipo:', error);
              }
            );
        }else{
          console.log(this.tipoEquipoForm.value)
          this.service.actualizar_tipo(this.tipoEquipoForm.value).subscribe((respuesta)=>{
            this.tipoEquipoForm.reset()
            this.listarTiposDeEquipos()
            this.botonEditar = false
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
      id_user : this.fb.control(parseInt(sessionStorage['id']), [Validators.required]),
      ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
      nombre: this.fb.control(""),
    })

    registroDepartamento(){
      if (this.departamentoForm.valid) {
        if(!this.botonEditar){
          this.service.creacion_departamento(this.departamentoForm.value).subscribe(
            (respuesta) => {
              console.log('Departamento registrada:', respuesta);
              this.departamentoForm.reset()
              this.listaDepartamento()
              },
              (error) => {
                console.error('Error al registrar el departamento:', error);
              }
            );
        }else{
          this.service.actualizar_departamento(this.departamentoForm.value).subscribe((data)=>{
            this.departamentoForm.reset()
            this.listaDepartamento()
            this.botonEditar = false
            
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
    licenciaForm = this.fb.group({
      id: this.fb.control(0),
      id_user : this.fb.control(parseInt(sessionStorage['id']), [Validators.required]),
      ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
      codigo: this.fb.control(""),
      lat: this.fb.control(""),
      long: this.fb.control("")
    })

//REGISTRO DE LICENCIA
    registroLicencia(){
      if(this.licenciaForm.valid){
        if(!this.botonEditar){
          this.getLocation();
          this.licenciaForm.patchValue({
          lat: this.latStr,
          long: this.longStr
        }) 
        this.service.crearLicencia(this.licenciaForm.value).subscribe((respuesta)=>{
          console.log('Licencia registrada:', respuesta);
          this.licenciaForm .reset()
          this.listaDeLicencias()
        }, (error) => {
          console.error('Error al registrar la licencia:', error);
          })

        }else{
          this.service.actualizar_licencia(this.licenciaForm.value).subscribe((data)=>{
            this.listaDeLicencias()
            this.licenciaForm.reset()
            this.botonEditar = false
           
            
          })
        }
      }
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

    //FORM ESTADO DEL EQUIPO

    estadoForm = this.fb.group({
      id: this.fb.control(0),
      id_user : this.fb.control(parseInt(sessionStorage['id']), [Validators.required]),
      ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
      nombre: this.fb.control(""),
    })

    registroEstado(){
      if (this.estadoForm.valid) {
       if(!this.botonEditar){
        this.service.crear_estado_inventario(this.estadoForm.value).subscribe(
          (respuesta) => {
            console.log('Estado registrad:', respuesta);
            this.estadoForm .reset()
            this.listaEstado()
            },
            (error) => {
              console.error('Error al registrar el estado:', error);
            } );
       }else{
        this.service.actualizar_estado(this.estadoForm.value).subscribe((data)=>{
          this.estadoForm.reset()
          this.listaEstado()
          this.botonEditar = false
        })
       }
       
        }
    }
    //EDITAR ESTADO

    editarEstado(id:number){
      const busqueda = this.estados.find(estado => estado.id === id)
      if(busqueda){
        this.estadoForm.patchValue({
          id: busqueda.id,
          nombre: busqueda.nombre
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
        id_usuario : this.fb.control(parseInt(sessionStorage['id']), [Validators.required]),
        ids_usuario : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),

      })
      registroSucursal() {
        if (this.sucursalForm.valid) {
          if(!this.botonEditar){
            this.getLocation();
            this.sucursalForm.patchValue({
            latitud : this.latStr,
            longitud: this.longStr
          }) 
      
          this.service.creacion_sucursal(this.sucursalForm.value).subscribe(
            (respuesta) => {
              console.log('Sucursal registrada:', respuesta);
              this.sucursalForm.reset();
              this.listaDeSucursales();
            },
            (error) => {
              console.error('Error al registrar la sucursal:', error);
            } );
          }else{
            this.service.actualizar_sucursal(this.sucursalForm.value).subscribe((data)=>{
              this.sucursalForm.reset()
              this.listaDeSucursales()
              this.botonEditar = false
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
    equipoDescripcionForm = this.fb.group({
      id: this.id,
      id_user : this.fb.control(parseInt(sessionStorage['id']), [Validators.required]),
      ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
      lat: this.fb.control(""),
      long: this.fb.control(""),
      marca: this.fb.control(""),
      modelo: this.fb.control(""),
      serial: this.fb.control(""),
      mac_wifi: this.fb.control(""),
      serie: this.fb.control(""),
      resolucion: this.fb.control(0),
      dimensiones: this.fb.control(""),
      descripcion: this.fb.control(""),
      ubicacion: this.fb.control(""),
      almacenamiento: this.fb.control(0),
      ram: this.fb.control(0),
      estado: this.fb.control(0),
      tipo: this.fb.control(0)
    })
//REGISTRO DESCRIPCION DE EQUIPO
    registroEquipoDescripcion(){
      if (this.equipoDescripcionForm.valid) {
        if(!this.botonEditar){
            this.getLocation()
            this.equipoDescripcionForm.patchValue({
            lat : this.latStr,
            long : this.longStr
          })
          this.service.crear_descripcion_equipo(this.equipoDescripcionForm.value).subscribe(
            (respuesta) => {
              console.log('Descripcion de equipo registrada:', respuesta);
              this.equipoDescripcionForm.reset()
              this.listarEquiposyDescripcion()
              },
              (error) => {
                console.error('Error al registrar la descripcion del equipo:', error);
              });
        }else{
          this.service.actualizar_descripcion_equipo(this.equipoDescripcionForm.value).subscribe((data)=>{
            this.listarEquiposyDescripcion()
            this.equipoDescripcionForm.reset()
            this.botonEditar = false
          })
        }
       
        }
    }

    //EDITAR EQUIPO
    

    editarEquipo(id: number){
      const busqueda = this.equipos.find(equipo => equipo.id === id)
      if(busqueda){
        this.botonEditar = true
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
	        tipo: busqueda.tipo,

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
      this.service.get_lista_descripcion_por_equipo().subscribe((data)=>{
        this.equipos = data
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
      this.mostrarEstado = true
      this.service.get_lista_estado_inventario().subscribe((data)=> {
        this.estados = data
      })
    }

    listaDeLicencias(){
      this.mostrarEquipo = false
      this.mostrarTipo = false
      this.mostrarPersona = false
      this.mostrarSucursal = false
      this.mostrarDepartamento = false
      this.mostrarEstado = false
      this.mostrarLicencia = true;
      this.service.get_lista_licencias().subscribe((data)=> {
        this.licencias = data
      })
    }
}