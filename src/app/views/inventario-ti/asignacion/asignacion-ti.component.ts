import { Component } from '@angular/core';
import {InventarioTIService} from '../../../service/inventario-ti.service'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormArray } from '@angular/forms'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Personal } from 'src/app/models/mantenedores/personal.interface';
import {Asignacion} from 'src/app/models/mantenedores/asignacion.interface'
import {Equipo} from 'src/app/models/mantenedores/equipo.interface';
import {Departamentos} from 'src/app/models/mantenedores/departamento.interface';
import {Tipo} from 'src/app/models/mantenedores/tipo.interface';
import { EstadoInventario } from 'src/app/models/mantenedores/estado.interface';
import { AsignadosById } from 'src/app/models/mantenedores/asignacionPorId.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asignacion-ti',
  templateUrl: './asignacion-ti.component.html',
  styleUrls: ['../styles/inventario-ti.component.scss']
})
export class AsignacionTiComponent {

    public visible = false;
    
    public visible1 = false;

   objeto  : Asignacion [] = []
    isModalOpen: boolean = false
    mostrarAsignacion: boolean = false;
    asignaciones : Asignacion [] = []
    equipos : Equipo [] = []
    personas : Personal [] = []
    departamentos : Departamentos [] = []
    estados : EstadoInventario [] = []
    tipo : Tipo [] = []
    folioEntrega :Asignacion [] = []
    folioDevolucion :Asignacion [] = []
    folioE ! : any
    folioD! : any

    fechaHoy = this.obtenerFechaActual()

    equiposGenerales : Equipo []= []
    personaAsignada : AsignadosById [] = []
     //datos geo
    latitude!: number
    longitud! : number
    latStr!: string
    longStr!: string
    idTipo!: number

    botonDevolver : boolean = false

      //variables para el numero de equipo
  NB: string = 'TY-NB-'
  AC : string = 'TY-AC-'
  CL: string = 'TY-CL-'
  IM: string = 'TY-IM-'
  CI: string = 'TY-CI-'
  PT: string = 'TY-PT-'
  CH : string = 'TY-CH-'

  letra!: string
  numEquipo!: any
  leyendaEquipo!: string



  

    
    constructor(private service: InventarioTIService, private fb:FormBuilder) {
         }

         ngOnInit(){
  
          this.service.get_lista_descripcion_por_equipo().subscribe((data)=>{
            this.equipos = data
            
     
          })
          this.service.get_lista_estado_inventario().subscribe((data)=>{
            this.estados = data
          })

          this.service.get_lista_de_departamentos().subscribe((data)=> {
            this.departamentos = data
          })


          this.service.get_lista_datos_personales().subscribe((data)=>{
            this.personas = data
          })

          this.service.get_folio_entrega().subscribe((data=>{
            this.folioEntrega = data
           
            this.folioE = this.folioEntrega
            console.log("el folio", this.folioE)
          
          }))
        
          // this.service.get_folio_devolucion().subscribe((data)=>{
          //   this.folioDevolucion = data
          //   this.folioD = this.folioDevolucion

          // })

          this.service.get_lista_de_equipos_generales().subscribe((data)=>{
            this.equiposGenerales = data
            console.log("equipos",this.equiposGenerales)
        })
        }
     
    toggleLiveDemoAsignar() {
    this.visible= !this.visible;


        }

    handleLiveDemoChangeAsignar(event: any) {
    this.visible= event;
        }


    toggleLiveDemoDevolucion() {
    this.visible1= !this.visible1;
              }
      
    handleLiveDemoChangeDevolucion(event: any) {
    this.visible1= event;
  }

    openModal(){
    this.isModalOpen = true
        }

    closeModal(){
    this.isModalOpen = false
   
    }   


    
  obtenerFechaActual(): string {
    // const fecha = new Date();
    // fecha.setDate(fecha.getDate() - 1)
    // const year = fecha.getFullYear().toString();
    // const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    // const day = fecha.getDate().toString().padStart(2, '0');
  
    // return year+"/"+month+"/"+day
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - 1);
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

//  // crearPDF

//   crearPDF(){
  
//     this.service.datosPDF(body).subscribe((data)=>{

//     })
//   }
  
  busquedaCodigo(event: any){
    const idSeleccionado = event.target.value
    console.log(idSeleccionado, " se eligio")
    
    const encontrado = this.equiposGenerales.find(equipo => equipo.id == idSeleccionado)
    console.log("objeto",encontrado)
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
        || encontrado.tipo == 10 || encontrado.tipo == 13 || encontrado.tipo == 14){
          this.idTipo = encontrado.tipo
          this.letra = 'AC'
          this.numEquipo = encontrado.nr_equipo
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

  generarCodigo(idEquipo: number, letra : string){
    if (this.numEquipo > 99){
      this.leyendaEquipo = "TY-"+this.letra+"-"+this.numEquipo
    }else if(this.numEquipo > 9){
      this.leyendaEquipo = "TY-"+this.letra+"-0"+this.numEquipo
    }else{
      this.leyendaEquipo = "TY-"+this.letra+"-00"+this.numEquipo
    }
    console.log(this.leyendaEquipo)
    return this.leyendaEquipo
    

  }

  generarActaEntrega(id: number){
    const idEncontrado = this.asignaciones.find(equipoAsignado =>
      equipoAsignado.id == id)
      if(idEncontrado){
        const datos = {
          "id": idEncontrado.id,
          "fecha_entrega": this.fechaHoy,
         // "folio_entrega" : this.folioE,
        }
        console.log(datos)
     
       
        // this.service.actualizar_crear_acta_entrega(datos).subscribe((data)=>{

        // })
      }
      this.service.get_lista_asignados_by_id(id).subscribe((data)=>{
      this.personaAsignada = data
      console.log(this.personaAsignada)
      const body= {
        "nombres": this.personaAsignada[0].nombres,
        "apellidos": this.personaAsignada[0].apellidos,
        "rut": this.personaAsignada[0].rut,
        "cargo": this.personaAsignada[0].cargo,
        "marca": this.personaAsignada[0].marca,
        "equipo": this.personaAsignada[0].equipo,
        "serial": this.personaAsignada[0].serial,
        //"fecha_entrega": this.fechaHoy,
       // "folio_entrega" : this.folioE,
        "encargado_entrega" : sessionStorage.getItem('usuario')

      }
      console.log(body)
      this.service.datosPDF(body).subscribe((data)=>{
        console.log(data)
      })
    })
    
  }  

  

   
    asignacionForm = this.fb.group({
      id_user : this.fb.control(parseInt(sessionStorage['id']), [Validators.required]),
      ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
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
      departamento : this.fb.control(0)
      
    })

    registrarAsignacion(){
      if(this.asignacionForm.valid){
        if(!this.botonDevolver){
          this.getLocation()
          this.asignacionForm.patchValue({
          lat : this.latStr,
          long: this.longStr,
          //folio_entrega : this.folioE
            })
          this.service.crearAsignacion(this.asignacionForm.value).subscribe((respuesta)=>{
            console.log('Persona registrada:', respuesta);
            this.asignacionForm.reset()
            this.listaDeAsignaciones()
          }, 
          (error) => {
          console.error('Error al registrar la persona:', error);
          })
        }else {
        this.service.actualizar_asignacion(this.asignacionForm.value).subscribe((respuesta)=>{
          console.log('Persona registrada:', respuesta);
          this.asignacionForm.reset()
          this.listaDeAsignaciones()
        }, 
        (error) => {
          console.error('Error al registrar la persona:', error);
          })
        }
      }
    }

    listaDeAsignaciones(){
        this.mostrarAsignacion = true
        this.service.get_lista_de_asignaciones().subscribe((data)=>{
          this.asignaciones = data
  
        })
      }
    // buscarIdDeAsignacion(id: string){
    //   this.service.busquedaPorFolio(id).subscribe((data)=>{
    //     console.log("data", data)

    //     this.asignacionForm.patchValue({
    //       equipo: data.equipo,
    //       persona: data.persona,
    //       fecha_entrega: data.fecha_entrega,
    //       estado: data.estado,
    //       fecha_devolucion: (data.fecha_devolucion !== undefined) ? data.fecha_devolucion : null,
    //       observacion: data.observacion,
    //       nombre_equipo: data.nombre_equipo,
    //       folio: data.folio,
    //       departamento : data.departamento
    //     })  
    //     console.log(this.asignacionForm.value)
    //     this.toggleLiveDemoAsignar()
    //   })
      
    // }

  
      agregarDevolucion(producto : Asignacion) {
        this.botonDevolver = true
        this.asignacionForm.patchValue({    
          estado: producto.estado,
          fecha_entrega: producto.fecha_entrega,
          fecha_devolucion: (producto.fecha_devolucion !== undefined) ? producto.fecha_devolucion : null,
          observacion: producto.observacion,
          folio_entrega: producto.folio_entrega,
        }) 
        this.toggleLiveDemoAsignar()
       }
  
  
}
