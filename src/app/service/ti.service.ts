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

@Injectable({
  providedIn: 'root'
})
export class TIService {

  constructor(private http: HttpClient) { }

  apiurl="http://34.225.63.221:84/api/reportes"
  //apiurl= "http://127.0.0.1:8000/api/reportes"
  
  Getcargas(): Observable<any>{
    return interval(2000).pipe( switchMap(() => this.http.get<Carga[]>(this.apiurl+"/cargas_easy")))
  }
 
  downloadBeetrackMensual(){
    // let date = new Date();
    // const fechaActual = date.toISOString().split('T')[0];
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

  //todo: Agregar uptade cada 15 min

  // agregar upate de 
  // get_historico_mensual() ok
  // get_reporte_hora()
  // get_pedidos() // cada media hora

  get_historico_mensual_hoy():  Observable<any>{
    return interval(6000).pipe( switchMap(() => this.http.get<ReporteHistorico[]>(this.apiurl+"/historico/hoy")))
  }
}
