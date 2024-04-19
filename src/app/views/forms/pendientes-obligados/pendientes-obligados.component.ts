import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { TIService } from "src/app/service/ti.service";
import {PedidoCompromisoObligatorio } from 'src/app/models/rutas/pedidoCompromisoObligatorios.interface'


@Component({
  selector: 'app-pendientes-obligados',
  templateUrl: './pendientes-obligados.component.html',
  styleUrls: ['./pendientes-obligados.component.scss']
})
export class PendientesObligadosComponent {

  fecha_min : string = ""
  fecha_max : string = ""

  fecha_seleccionada : string = ""




  pedidosObligatorios : PedidoCompromisoObligatorio [] = []

  constructor(private service: RutasService,) { }

  ngOnInit() : void {

    var fechaActual = new Date();

    this.fecha_min =  fechaActual.toISOString().split('T')[0];

    // Restar 7 días a la fecha actual
    fechaActual.setDate(fechaActual.getDate() + 1);
  
    // Formatear la fecha a un formato que acepte el atributo "max" del input date
    var fechaMaxima = fechaActual.toISOString().split('T')[0];


    this.fecha_max = fechaMaxima

    this.fecha_seleccionada = this.fecha_min

    console.log(this.fecha_max)
    console.log(this.fecha_min)

    setTimeout(() => {
      this.service.get_codigo_obligatorio_por_dia(this.fecha_min).subscribe((data) => {
        this.pedidosObligatorios = data
      })
    }, 550);
    
  }

  descargarExcel(){
    this.service.download_codigo_obligatorio_por_dia('20240420')
  }

  buscarInformacion(){
    this.pedidosObligatorios = []
    this.service.get_codigo_obligatorio_por_dia(this.fecha_seleccionada).subscribe((data) => {
      
      this.pedidosObligatorios = data
    })
  }

 ngOnDestroy(): void {


  }

}