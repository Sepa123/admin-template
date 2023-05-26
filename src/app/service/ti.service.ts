import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Carga } from "../models/cargas.interface";
import { ReporteHora } from "../models/reporteHora.interface"
import { ReporteHistorico } from "../models/reporteHistorico.interface";
import { ReporteProductosEntregados } from "../models/reporteProductosEntregados.interface";
import { interval,Observable, switchMap  } from 'rxjs';
import { ReporteEasyRegion } from "../models/reporteEasyRegion.interface"
import { PedidoSinCompromiso } from "../models/pedidoSinCompromiso.interface"
import { Pedidos } from "../models/pedido.interface"
import { RutaBeetrackHoy } from "../models/rutaBeetrackHoy.interface"
import { PedidoEasyOPL } from "../models/pedidoEasyOPL.interface"
import { PedidosSinTienda } from "../models/pedidoSinTienda.interface"
import { PedidosPendientes } from "../models/pedidoPendiente.interface" 
import { ProductoPicking } from "src/app/models/productoPicking.interface"

import { CacheService } from "src/app/service/cache.service"

@Injectable({
  providedIn: 'root'
})
export class TIService {

  constructor(private http: HttpClient, private cacheService: CacheService) { }

   apiurl="http://34.225.63.221:84/api/reportes"
   //apiurl= "http://127.0.0.1:8000/api/reportes"
  
  Getcargas(): Observable<any>{
    return interval(2000).pipe( switchMap(() => this.http.get<Carga[]>(this.apiurl+"/cargas_easy")))
  }
 
  downloadBeetrackMensual(){
    this.http.get(this.apiurl+"/NS_beetrack_Mensual", {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `NS_Beetrack_Mensual.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  downloadResumenQuadmine() {
    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];

    this.http.get(this.apiurl+"/clientes", {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `Carga_Quadminds_${fechaActual}-hh24miss.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  get_historico_mensual(){
    return this.http.get<ReporteHistorico[]>(this.apiurl+"/historico/mensual")
    // return this.http.get<ReporteHistorico[]>(this.apiurl+"/historico/mensual")
  }

  get_productos_mensual(){
    return this.http.get<ReporteProductosEntregados[]>(this.apiurl+"/productos/mensual")
  }

  get_reporte_hora(): Observable<any> {
    return interval(15000).pipe( switchMap(() => this.http.get<ReporteHora[]>(this.apiurl+"/hora")))
    //return this.http.get<ReporteHora[]>(this.apiurl+"/hora")
  }

  get_reportes_easy_region(): Observable<any> {

    return interval(2000).pipe( switchMap(() => this.http.get<ReporteEasyRegion[]>(this.apiurl+"/productos/easy_region")))
    // return this.http.get<ReporteEasyRegion[]>(this.apiurl+"/productos/easy_region")
  }

  get_pedidos_sin_despacho() {
    return this.http.get<PedidoSinCompromiso[]>(this.apiurl + "/pedidos/sin_despacho/")
  }
  
  get_pedidos_sin_despacho_descarga() {
    this.http.get(this.apiurl + "/pedidos/sin_despacho/descargar", {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `Pedidos_con_fecha_de_compromiso_sin_despacho.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })

  }
  // actualizar cada 5 o 10 minutos
  get_pedidos() {
    return this.http.get<Pedidos[]>(this.apiurl + "/pedidos")
  }
  // actualizar cada 10 minutos
  get_ruta_beetrack_hoy() {
    return this.http.get<RutaBeetrackHoy[]>(this.apiurl + "/ruta/beetrack/hoy")
  }

  get_pedidos_tienda_easy_opl() {
    return this.http.get<PedidoEasyOPL[]>(this.apiurl + "/pedidos/easy_opl")
  }

  get_pedidos_sin_tienda() {
    return this.http.get<PedidosSinTienda[]>(this.apiurl + "/pedidos/sin_tiendas")
  }

  get_pedidos_pendientes_total() {
    return this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/total")
  }

  get_pedidos_pendientes_entregados() {
    return this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/entregados")
  }

  get_pedidos_pendientes_no_entregados() {
    return this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/no_entregados")
  }

  get_pedidos_pendientes_en_ruta() {
    return this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/en_ruta")
  }

  
  //todo: Agregar uptade cada 15 min

  // agregar upate de 
  // get_reporte_hora()


  get_historico_mensual_hoy():  Observable<any>{
    return interval(6000).pipe( switchMap(() => this.http.get<ReporteHistorico[]>(this.apiurl+"/historico/hoy")))
  }

  get_pedidos_update():  Observable<any>{
    return interval(600000).pipe( switchMap(() => this.http.get<Pedidos[]>(this.apiurl + "/pedidos")))
  }

  get_ruta_beetrack_hoy_update():  Observable<any>{
    return interval(600000).pipe( switchMap(() => this.http.get<RutaBeetrackHoy[]>(this.apiurl + "/ruta/beetrack/hoy")))
  }
 
  /// Pedidos pendientes actualización cada 2 minutos
  
  get_pedidos_pendientes_total_update() {
    return interval(120000).pipe(switchMap(() => this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/total")))
  }

  get_pedidos_pendientes_entregados_update() {
    return interval(120000).pipe(switchMap(() => this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/entregados")))
  }

  get_pedidos_pendientes_no_entregados_update() {
    return interval(120000).pipe(switchMap(() => this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/no_entregados")))
  }

  get_pedidos_pendientes_en_ruta_update() {
    return interval(120000).pipe(switchMap(() => this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/en_ruta")))
  }

  //

  get_productos_picking() {
    return this.http.get<ProductoPicking>(this.apiurl + "/buscar/producto")
  }

  get_producto_picking(id: string) {
    return this.http.get<ProductoPicking>(this.apiurl +`/buscar/producto/${id}`)

  }

  
}
