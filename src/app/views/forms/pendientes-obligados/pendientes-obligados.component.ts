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


  pedidosObligatorios : PedidoCompromisoObligatorio [] = []

  constructor(private service: RutasService,) { }

  ngOnInit() : void {
    this.service.get_codigo_obligatorio_por_dia('20240420').subscribe((data) => {
      this.pedidosObligatorios = data
    })
  }

  descargarExcel(){
    this.service.download_codigo_obligatorio_por_dia('20240420')
  }

 ngOnDestroy(): void {


  }

}