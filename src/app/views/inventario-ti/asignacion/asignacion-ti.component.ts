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
      fecha_devolucion: this.fb.control(null),
      observacion: this.fb.control(""),
      nombre_equipo: this.fb.control(""),
      folio: this.fb.control(""),
      departamento : this.fb.control(0)
      
    })

    registrarAsignacion(){
      if(this.asignacionForm.valid){
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
        }
        )
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
  
  
}
