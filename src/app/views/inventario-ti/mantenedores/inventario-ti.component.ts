import { Component ,OnInit} from '@angular/core';
import {InventarioTIService} from '../../../service/inventario-ti.service'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormArray } from '@angular/forms'

import { Personal } from 'src/app/models/mantenedores/personal.interface';
import {Departamentos} from 'src/app/models/mantenedores/departamento.interface';
import {Tipo} from 'src/app/models/mantenedores/tipo.interface';
import {Equipo, Almacenamiento, Ram} from 'src/app/models/mantenedores/equipo.interface';
import { SucursalInventario } from 'src/app/models/mantenedores/sucursal.interface';
import{EstadoInventario } from 'src/app/models/mantenedores/estado.interface'
import {LicenciaWindows} from 'src/app/models/mantenedores/licencia.interface'

import Swal from 'sweetalert2';


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

  seleccionRam : string  |null= null;

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
  busquedaDeIdSegunTipo :  Equipo [] = []
  almacenamientos: Almacenamiento [] = Object.values(Almacenamiento) as Almacenamiento[]
  rams:Ram[] = Object.values(Ram)  as Ram[]

  id!: number
  leyendaEquipo!: string
  nEquipo!: number
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
     
      
        }else if(idTipo == 6 || idTipo == 8|| idTipo == 9 || idTipo==10 || idTipo ==4 || idTipo == 13 || idTipo == 14  ){
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
  
    })

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
            this.service.creacion_personal(this.personaForm.value).subscribe(
              (respuesta) => {
                console.log('Persona registrada:', respuesta);
                this.personaForm.reset()
                Swal.fire({
                icon: 'success',
                title: 'Persona ingresada',
                text: 'Se ha registrado con éxito',
                })
                this.toggleLiveDemoPersona()
                this.listarPersona()
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
    console.log(this.seleccionRam)
  }
    equipoDescripcionForm = this.fb.group({
      id: this.fb.control(0),
      id_user : this.fb.control(parseInt(sessionStorage['id']), [Validators.required]),
      ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
      lat: this.fb.control(""),
      long: this.fb.control(""),
      marca: this.fb.control(""),
      modelo: this.fb.control(""),
      serial: this.fb.control(""),
      mac_wifi: this.fb.control(""),
      serie: this.fb.control(""),
      resolucion: this.fb.control(""),
      dimensiones: this.fb.control(""),
      descripcion: this.fb.control(""),
      ubicacion: this.fb.control(""),
      almacenamiento: this.fb.control(Almacenamiento.cero),
      ram: this.fb.control(Ram.cero),
      estado: this.fb.control(0),
      tipo: this.fb.control(0),
      cantidad: this.fb.control(0),
      nr_equipo: this.fb.control(0)
    })
//REGISTRO DESCRIPCION DE EQUIPO
    registroEquipoDescripcion(){
      if (this.equipoDescripcionForm.valid) {
        if(!this.botonEditar){
            this.getLocation()
            this.equipoDescripcionForm.patchValue({
            lat : this.latStr,
            long : this.longStr,
            nr_equipo : this.nr_equipo
          })
          this.service.crear_descripcion_equipo(this.equipoDescripcionForm.value).subscribe(
            (respuesta) => {
              console.log('Descripcion de equipo registrada:', respuesta);
              this.equipoDescripcionForm.reset()
              Swal.fire({
                icon: 'success',
                title: 'Descripción de Equipo ingresada',
                text: 'Se ha ingresado con éxito',
              })
              this.toggleLiveDemoEquipo()
              this.listarEquiposyDescripcion()
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