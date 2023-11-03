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
    tipo : Tipo [] = []

     //datos geo
    latitude!: number
    longitud! : number
    latStr!: string
    longStr!: string

    botonEditar : boolean = false


  

    
    constructor(private service: InventarioTIService, private fb:FormBuilder) {
         }

         ngOnInit(){
  
          this.service.get_lista_descripcion_por_equipo().subscribe((data)=>{
            this.equipos = data
     
          })

          this.service.get_lista_de_departamentos().subscribe((data)=> {
            this.departamentos = data
          })

          this.service.get_lista_de_tipos_equipos().subscribe((data)=>{
            this.tipo= data
          })

          this.service.get_lista_datos_personales().subscribe((data)=>{
            this.personas = data
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
   
    asignacionForm = this.fb.group({
      id_user : this.fb.control(parseInt(sessionStorage['id']), [Validators.required]),
      ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
      lat: this.fb.control(""),
      long: this.fb.control(""),
      equipo: this.fb.control(0),
      persona: this.fb.control(0),
      fecha_entrega: this.fb.control(""),
      estado: this.fb.control(false),
      fecha_devolucion: this.fb.control(""),
      observacion: this.fb.control(""),
      nombre_equipo: this.fb.control(""),
      folio: this.fb.control(""),
      departamento : this.fb.control(0)
      
    })

    registrarAsignacion(){
      if(this.asignacionForm.valid){
        if(!this.botonEditar){
          this.getLocation()
          this.asignacionForm.patchValue({
          lat : this.latStr,
          long: this.longStr
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

    muestra(){
      console.log(this.asignacionForm.value.nombre_equipo)
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
        this.botonEditar = true
        this.asignacionForm.patchValue({    
          estado: producto.estado,
          fecha_entrega: producto.fecha_entrega,
          fecha_devolucion: (producto.fecha_devolucion !== undefined) ? producto.fecha_devolucion : null,
          observacion: producto.observacion,
          folio: producto.folio,
        }) 
        this.toggleLiveDemoAsignar()
       }
  
  
}
