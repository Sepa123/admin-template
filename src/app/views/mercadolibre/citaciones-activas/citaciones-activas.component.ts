import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit,Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainCitacionS,Detalle } from "src/app/models/meli/citacionSupervisor.interface"
import {CitacionesService} from '../../../service/citaciones.service'
import { MeliService } from 'src/app/service/meli.service'

@Component({
  selector: 'app-citaciones-activas',
  templateUrl: './citaciones-activas.component.html',
  styleUrls: ['./citaciones-activas.component.scss']
})
export class CitacionesActivasComponent implements OnInit {
  
  constructor(private service: MeliService) {

  }
  
  citacionSupervisores : MainCitacionS [] = []

  detalleCitacion : Detalle [] = []

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  currentDate : string = ''
  
  ngOnInit() {
    
    this.service.getDatosCitacionSupervisor('158','20240802').subscribe((data) => {
      this.citacionSupervisores = data
    })
  }

  verDetalle(detalle : Detalle []){
    this.detalleCitacion = detalle
    this.toggleLiveDemo()
  }

}