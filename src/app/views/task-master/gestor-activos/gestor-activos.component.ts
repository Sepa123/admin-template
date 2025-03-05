import { Component, ElementRef } from '@angular/core';
import { TaskMasterService } from '../../../service/task-master.service';
import { MainGestorActivos,Categoria,TaskStatus,Region,Comuna  } from '../../../models/taskmaster/taskmaster.interface';
import * as L from 'leaflet';

import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'

@Component({
  selector: 'app-gestor-activos',
  templateUrl: './gestor-activos.component.html',
  styleUrls: ['./gestor-activos.component.scss']
})
export class GestorActivosComponent {

  constructor(private el: ElementRef,private taskMasterService: TaskMasterService,public builder: FormBuilder) { }

  listaCategoria : Categoria[] = []
  listaTaskStatus : TaskStatus[] = []
  listaRegion : Region[] = []
  listaComuna : Comuna[] = []

  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string


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

  ngOnInit() {

    this.getLocation()

    setTimeout(() => {

      const map = L.map(this.el.nativeElement.querySelector('#map')).setView([this.latitude, this.longitud], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19
      }).addTo(map);

      // Añadir un marcador
      L.marker([this.latitude, this.longitud]).addTo(map).openPopup();

      // Añadir un popup al marcador

      if (map) {
        setTimeout(() => {
          map.invalidateSize();
        }, 500); // Espera un tiempo para que el modal se haya abierto completamente
      }
      
    }, 1000);

    


    this.taskMasterService.datos_seleccionables_gestor_activos().subscribe((data) => {
      
      this.listaCategoria = data.Categorias
      this.listaTaskStatus = data.Task_status
      this.listaComuna = data.Comuna
      this.listaRegion = data.Region


    }
    )



  }

  seleccionarCategoria(event : any){

    console.log("seleccionarCategoria")
    // console.log(event)
    console.log(event.target.value) // id de la categoria seleccionada
  }



  //// Modal nuevo Activo

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
    
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }




}
