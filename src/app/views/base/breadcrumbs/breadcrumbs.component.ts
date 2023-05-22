import { Component, OnInit } from '@angular/core';
import { TIService } from "src/app/service/ti.service";
import { Carga } from 'src/app/models/cargas.interface';
import { ReporteEasyRegion } from 'src/app/models/reporteEasyRegion.interface';

import { PedidoEasyOPL } from 'src/app/models/pedidoEasyOPL.interface';
import { PedidosSinTienda } from 'src/app/models/pedidoSinTienda.interface';
import { Observable, interval, switchMap, Subscription } from 'rxjs';
@Component({
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  // public items = <any>[];
  subscription!: Subscription
  subscriptionRegion!: Subscription

  isLoadingCarga: boolean = true
  isLoadingEasyRegion: boolean = true
  isLoadingEasyOPL: boolean = true
  isLoadingSinTienda: boolean = true
  noData: boolean = false
  
  constructor( private service : TIService ) {}



  carga!: Carga[]
  ocultarTabla: boolean = true
  pedidoSinTiendas! : PedidosSinTienda[]
  pedidoEasyOPL! : PedidoEasyOPL[]

  easyRegion!:ReporteEasyRegion[]


  ngOnInit(): void{
    this.subscription = this.service.Getcargas().subscribe((data) => {
      this.carga = data;
      this.isLoadingCarga = false;
    })

    this.subscriptionRegion = this.service.get_reportes_easy_region().subscribe(data => {
      this.easyRegion = data;
      this.isLoadingEasyRegion = false;
    })

    this.service.get_pedidos_sin_tienda().subscribe((data) => {
      this.pedidoSinTiendas = data
      this.isLoadingSinTienda = false
      
      if(this.pedidoSinTiendas.length === 0){
        this.noData = true
      }
    })

    this.service.get_pedidos_tienda_easy_opl().subscribe((data) => {
      this.pedidoEasyOPL = data
      this.isLoadingEasyOPL = false
    })
  }


  hideTable() {
    return this.ocultarTabla = false;  
  }

  showTable() {
    return this.ocultarTabla = true;  
  }


  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.subscription.unsubscribe();
    this.subscriptionRegion.unsubscribe();
  }
}
