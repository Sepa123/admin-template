import { Component,OnInit } from '@angular/core';
import { TIService } from "src/app/service/ti.service";
import { Carga } from 'src/app/models/cargas.interface';
import { NroCargasPorHora } from "src/app/models/nroCargasPorHora.interface"
import { ReporteEasyRegion } from 'src/app/models/reporteEasyRegion.interface';
import { CargasComparacion } from 'src/app/models/cargasComparacion.interface';
import { PedidoEasyOPL } from 'src/app/models/pedidoEasyOPL.interface';
import { PedidosSinTienda } from 'src/app/models/pedidoSinTienda.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss']
})
export class EstadoComponent implements OnInit {
  // public items = <any>[];
  subscription!: Subscription
  subscriptionRegion!: Subscription
  subCargasEasyAPI!: Subscription
  subCargasEasyWMS!: Subscription

  isLoadingCargaComparacionAPI: boolean = true
  isLoadingCargaComparacionWMS: boolean = true
  isLoadingCarga: boolean = true
  isLoadingEasyRegion: boolean = true
  isLoadingEasyOPL: boolean = true
  isLoadingSinTienda: boolean = true
  noData: boolean = false
  
  constructor( private service : TIService ) {}

  cargasEasyAPI!: CargasComparacion[]
  cargasEasyWMS!: CargasComparacion[]
  ocultarTablaComparacion: boolean = true
  // carga!: Carga[]
  cargaHora! : NroCargasPorHora[]
  ocultarTabla: boolean = true
  pedidoSinTiendas! : PedidosSinTienda[]
  pedidoEasyOPL! : PedidoEasyOPL[]

  easyRegion!:ReporteEasyRegion[]


  ngOnInit(): void{
    this.service.get_cargas_por_hora_init().subscribe((data) => {
      this.cargaHora = data;
      this.isLoadingCarga = false;
    })
    
    this.subscription = this.service.get_cargas_por_hora().subscribe((data) => {
      this.cargaHora = data;
      this.isLoadingCarga = false;
    })

    this.subscriptionRegion = this.service.get_reportes_easy_region().subscribe(data => {
      this.easyRegion = data;
      this.isLoadingEasyRegion = false;
    })

    this.subscripcionCargasComparacion()

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

    this.service.get_cargas_easy_api().subscribe(data => {
      this.cargasEasyAPI = data
      this.isLoadingCargaComparacionAPI = false;
    })

    this.service.get_cargas_easy_wms().subscribe(data => {
      this.cargasEasyWMS = data
      this.isLoadingCargaComparacionWMS = false;
    })
  }

  subscripcionCargasComparacion () {
    this.subCargasEasyAPI = this.service.get_cargas_easy_api_update().subscribe( update_data => {
      this.cargasEasyAPI = update_data
    })

    this.subCargasEasyWMS = this.service.get_cargas_easy_wms_update().subscribe( update_data => {
      this.cargasEasyWMS = update_data
    })
  }


  hideTable() {
    return this.ocultarTabla = false;  
  }

  showTable() {
    return this.ocultarTabla = true;  
  }

  hideTableComparacion() {
    return this.ocultarTablaComparacion = false;  
  }

  showTableComparacion() {
    return this.ocultarTablaComparacion = true;  
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    
    this.subscription.unsubscribe();
    this.subscriptionRegion.unsubscribe();
    this.subCargasEasyAPI.unsubscribe();
    this.subCargasEasyWMS.unsubscribe();
  }
}
