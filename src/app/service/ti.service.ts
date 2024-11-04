import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
// 
import { Carga } from "../models/cargas.interface";
import { NroCargasPorHora } from "../models/nroCargasPorHora.interface"
import { ReporteHora } from "../models/reporteHora.interface"
import { ReporteHistorico } from "../models/reporteHistorico.interface";
import { ReporteProductosEntregados } from "../models/reporteProductosEntregados.interface";
import { ReporteEasyRegion } from "../models/reporteEasyRegion.interface"
import { PedidoSinCompromiso } from "../models/pedidoSinCompromiso.interface"
import { Pedidos } from "../models/pedido.interface"
import { RutaBeetrackHoy } from "../models/rutaBeetrackHoy.interface"
import { PedidoEasyOPL } from "../models/pedidoEasyOPL.interface"
import { PedidosSinTienda } from "../models/pedidoSinTienda.interface"
import { PedidosPendientes } from "../models/pedidoPendiente.interface" 
import { ProductoPicking } from "src/app/models/productoPicking.interface"
import { CargasComparacion } from '../models/cargasComparacion.interface';
import { NSBeetrackRango } from '../models/nsBeetrackRango.interface'
import { PendienteBodega } from '../models/pendienteBodega.interface'
import { NsVerificado } from '../models/nsVerificado.interface'
import { MainNs } from '../models/nivel_servicio/nsFechaCompromisoReal.interface'
import { MainNsDriver } from '../models/nivel_servicio/nsDrivers.interface'
import { NSEasy , NSPendientesEasyPorRegion} from '../models/nivel_servicio/nsEasy.interface'
import { interval,Observable, switchMap  } from 'rxjs';
import {NsPanelPrincipalEasy , NsPanelRegionEasy ,NSPanelNoEntregasEasy} from '../models/nivel_servicio/nsPanel.interface'


@Injectable({
  providedIn: 'root'
})
export class TIService {

  constructor(private http: HttpClient) { }

  apiurl="https://hela.transyanez.cl/api/reportes"
  // apiurl = "http://127.0.0.1:8000/api/reportes"
  
  Getcargas(): Observable<any>{
    return interval(3500).pipe( switchMap(() => this.http.get<Carga[]>(this.apiurl+"/cargas_easy")))
  }

  get_ns_beetrack_por_rango_fecha(fecha_inicio : string, fecha_termino : string) {
    return this.http.get<NSBeetrackRango []>(this.apiurl+`/NS_beetrack/rango?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_termino}`)
  }

  //UPDATE VALOR DE LA RUTA
  update_valor_ruta(body : any[]){
    return this.http.put(this.apiurl + "/NS_beetrack/rango", body)
  }

  downloadBeetrackNSRango(fecha_inicio : string, fecha_fin : string ){
    this.http.get(this.apiurl+`/NS_beetrack/rango/descargar?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `NS_Beetrack.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
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

  downloadResumenQuadmineCompromiso() {
    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];

    this.http.get(this.apiurl+"/quadminds/fecha_compromiso", {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `Carga_Quadminds_Fecha_compromiso_${fechaActual}-hh24miss.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  downloadResumenQuadmindTamano() {
    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];

    this.http.get(this.apiurl+"/quadminds/tamano", {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `Carga_Quadminds_tamano_${fechaActual}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }
  
  get_quadmind() {
    return this.http.get<ProductoPicking[]>(this.apiurl+"/clientes/json")
  }
  

  get_historico_mensual(){
    return this.http.get<ReporteHistorico[]>(this.apiurl+"/historico/mensual")
    // return this.http.get<ReporteHistorico[]>(this.apiurl+"/historico/mensual")
  }

  get_productos_mensual(){
    return this.http.get<ReporteProductosEntregados[]>(this.apiurl+"/productos/mensual")
  }

  get_reporte_producto_rango(inicio:string, termino:string){
    return this.http.get<ReporteProductosEntregados[]>(this.apiurl+`/productos/rango?inicio=${inicio}&termino=${termino}`)
  }

  get_reporte_hora(): Observable<any> {
    return interval(15000).pipe( switchMap(() => this.http.get<ReporteHora[]>(this.apiurl+"/hora")))
  }

  get_reportes_easy_region(): Observable<any> {
    return interval(10000).pipe( switchMap(() => this.http.get<ReporteEasyRegion[]>(this.apiurl+"/productos/easy_region")))
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
  // actualizar cada  minutos
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

  get_rutas_manual(pedido: string) {
    return this.http.get<ProductoPicking[]>(this.apiurl + `/buscar/ruta/${pedido}`)
    
  }

  // cargas por hora
  get_cargas_por_hora_init(){
    
    return this.http.get<NroCargasPorHora[]>(this.apiurl + "/cargas_por_hora")
  }

  get_cargas_por_hora(){
    
    return interval(40000).pipe(switchMap(() => this.http.get<NroCargasPorHora[]>(this.apiurl + "/cargas_por_hora")))
  }

  get_historico_mensual_hoy():  Observable<any>{
    return interval(10000).pipe( switchMap(() => this.http.get<ReporteHistorico[]>(this.apiurl+"/historico/hoy")))
  }

  get_pedidos_update():  Observable<any>{
    return interval(110000).pipe( switchMap(() => this.http.get<Pedidos[]>(this.apiurl + "/pedidos")))
  }

  get_ruta_beetrack_hoy_update():  Observable<any>{
    return interval(60000).pipe( switchMap(() => this.http.get<RutaBeetrackHoy[]>(this.apiurl + "/ruta/beetrack/hoy")))
  }
 
  /// Pedidos pendientes actualización cada 2 minutos
  
  get_pedidos_pendientes_total_update() {
    return interval(118000).pipe(switchMap(() => this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/total")))
  }

  get_pedidos_pendientes_entregados_update() {
    return interval(112000).pipe(switchMap(() => this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/entregados")))
  }

  get_pedidos_pendientes_no_entregados_update() {
    return interval(110000).pipe(switchMap(() => this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/no_entregados")))
  }

  get_pedidos_pendientes_en_ruta_update() {
    return interval(110000).pipe(switchMap(() => this.http.get<PedidosPendientes[]>(this.apiurl + "/pedidos/pendientes/en_ruta")))
  }


  get_cargas_easy_api_update() : Observable<any> {
    return interval(120000).pipe(switchMap(() => this.http.get<CargasComparacion[]>(this.apiurl + "/cargas_easy/api")))
  }

  get_cargas_easy_wms_update() : Observable<any> {
    return interval(120000).pipe(switchMap(() => this.http.get<CargasComparacion[]>(this.apiurl + "/cargas_easy/wms")))
  }
  

  //

  get_productos_picking() {
    return this.http.get<ProductoPicking>(this.apiurl + "/buscar/producto")
  }

  get_producto_picking(id: string) {
    return this.http.get<ProductoPicking>(this.apiurl +`/buscar/producto/${id}`)

  }

  // comparacion de cargas easy API  VS WMS

  get_cargas_easy_api() {
    return this.http.get<CargasComparacion[]>(this.apiurl + "/cargas_easy/api")
  }

  get_cargas_easy_wms() {
    return this.http.get<CargasComparacion[]>(this.apiurl + "/cargas_easy/wms")
  }

  // pendientes en bodega

  get_pendientes_bodega(){
    return this.http.get <PendienteBodega []>(this.apiurl + "/pendientes/bodega")
  }


  update_pendiente_bodega() : Observable<any>{
    return interval(30900).pipe(switchMap(() => this.http.get<PendienteBodega []>(this.apiurl + "/pendientes/bodega") ))  
  }


  get_ns_verificados(fecha_inicio : string,fecha_fin: string){
    return this.http.get <NsVerificado []>(this.apiurl + `/ns/verificados?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`)

  }


  get_ns_fecha_compromiso_real(fecha: string){
    return this.http.get<MainNs>(this.apiurl + `/ns/fecha_c_real?fecha=${fecha}`)

  }


  ns_fecha_compromiso_real_update(fecha: string){

    return interval(41200).pipe(switchMap(() => this.http.get<MainNs>(this.apiurl + `/ns/fecha_c_real?fecha=${fecha}`)))  
    // return this.http.get<MainNs>(this.apiurl + `/ns/fecha_c_real?fecha=${fecha}`)

  }


  get_ns_fecha_compromiso_real_tienda(fecha: string, tienda : string){
    return this.http.get<MainNs>(this.apiurl + `/ns/fecha_c_real/easy?fecha=${fecha}&tienda=${tienda}`)

  }

  get_ns_drivers(fecha_inicio: string, fecha_fin : string){
    return this.http.get<MainNsDriver>(this.apiurl + `/ns/drivers?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`)

  }

  downloadNSDriver(fecha_inicio : string, fecha_fin : string ){
    this.http.get(this.apiurl+`/ns/drivers/descargar?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `NS_Drivers.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  /// NS easy
  get_ns_easy(){
    return this.http.get<NSEasy []>(this.apiurl + `/ns/easy`)

  }

  get_ns_pendiente_easy_por_region(){
    return this.http.get<NSPendientesEasyPorRegion[]>(this.apiurl + `/ns/pendiente/easy/por-region`)

  }

  get_ns_pendiente_easy_panel(){
    return this.http.get<NsPanelPrincipalEasy>(this.apiurl + `/ns/easy/panel`)

  }

  

  get_ns_pendiente_easy_panel_region(){
    return this.http.get<NsPanelRegionEasy []>(this.apiurl + `/ns/easy/panel/regiones`)

  }


  get_ns_easy_panel_no_entregados(){
    return this.http.get<NSPanelNoEntregasEasy []>(this.apiurl + `/ns/easy/panel/no_entregados`)
  }

  /// NS electrolux
  get_ns_electrolux(){
    return this.http.get<NSEasy []>(this.apiurl + `/ns/electrolux`)

  }


  get_ns_pendiente_electrolux_panel(){
    return this.http.get<NsPanelPrincipalEasy>(this.apiurl + `/ns/electrolux/panel`)

  }


  get_ns_pendiente_electrolux_panel_region(){
    return this.http.get<NsPanelRegionEasy []>(this.apiurl + `/ns/electrolux/panel/regiones`)

  }


  get_ns_electrolux_panel_no_entregados(){
    return this.http.get<NSPanelNoEntregasEasy []>(this.apiurl + `/ns/electrolux/panel/no_entregados`)
  }

  descargar_ns_drivers_easy(body : any){
    this.http.post(this.apiurl + `/ns/easy/descargar`,body, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `NS_easy.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }


  /// unpdate ns Easy
  get_ns_easy_update() : Observable<any> {
    return interval(120000).pipe(switchMap(() => this.http.get<NSEasy []>(this.apiurl + `/ns/easy`)))
  }


  get_ns_pendiente_easy_panel_update(){
    return interval(120000).pipe(switchMap(() => this.http.get<NsPanelPrincipalEasy>(this.apiurl + `/ns/easy/panel`)))

  }

  get_ns_pendiente_easy_panel_region_update(){
    return interval(120000).pipe(switchMap(() => this.http.get<NsPanelRegionEasy []>(this.apiurl + `/ns/easy/panel/regiones`)))
  }

  /// unpdate ns Electrolux
  get_ns_electrolux_update() : Observable<any> {
    return interval(120000).pipe(switchMap(() => this.http.get<NSEasy []>(this.apiurl + `/ns/electrolux`)))
  }


  get_ns_pendiente_electrolux_panel_update(){
    return interval(120000).pipe(switchMap(() => this.http.get<NsPanelPrincipalEasy>(this.apiurl + `/ns/electrolux/panel`)))

  }




}
