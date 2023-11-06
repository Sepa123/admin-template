import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval,Observable, switchMap  } from 'rxjs';
import {CatalogoRSV, ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface'
import { EtiquetaRSV } from 'src/app/models/etiquetaRSV.interface'
import { CargaRSV } from 'src/app/models/cargaRSV.interface'
import {SucursalRSV} from 'src/app/models/sucursalRSV.interface'
import { InventarioSucursal } from 'src/app/models/inventarioSucursal.interface'
import { DatosCargaRSV } from 'src/app/models/datosCargaRSV.interface'
import { TipoDespacho } from 'src/app/models/tipoDespacho.inteface'
import { EvaluacionPedidoRSV} from 'src/app/models/evaluacionPedidoRSV.interface'
import {EstructuraRSV} from 'src/app/models/estructuraRSV.interface'
import { MatchSucursalRSV } from '../models/matchSucursalRSV.interface';
import { DetalleVenta, NotaVenta , NotaVentaProducto } from '../models/notaVenta.interface';
import { PesoPosicionSucursal } from "src/app/models/pesoPosicionSucursal.interface"
import { PaquetesAbiertosRSV } from '../models/inventarioPaquetesAbiertos.interface';
import {ReimpresionEtiqueta} from '../models/reimpresionEtiqueta.interface'
import { TipoEstructura } from 'src/app/models/tipoEstructuraRSV.interface'
import {BitacoraRSV} from '../models/bitacoraRsv.interface'

@Injectable({
  providedIn: 'root'
})
export class RsvService {

  constructor( private http : HttpClient) { }

  apiurl = "https://hela.transyanez.cl/api/rsv"
  // apiurl = "http://127.0.0.1:8000/api/rsv" 

  //Y

   //lista de paquetes abiertos


   get_lista_paquetes_abiertos(sucursal : number){
    return this.http.get<PaquetesAbiertosRSV[]>(this.apiurl + `/lista-paquetes/${sucursal}`)
  }

  downloadReimpresionEtiquetasExcel( nombre_carga : string, codigo : number, tipo : string) {
    this.http.get(`${this.apiurl}/etiquetas/reimprimir/descargar?codigo=${codigo}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download =`${nombre_carga}-${codigo}-${tipo}.xlsx`; 
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  downloadReimpresionEtiquetasUnicasExcel(nombre_carga : string, codigo : string , tipo : string, bar_code: string) {
    this.http.get(`${this.apiurl}/unica/etiqueta/descargar?nombre_carga=${nombre_carga}&codigo=${codigo}&tipo=${tipo}&bar_code=${bar_code}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `${nombre_carga}-${codigo}-${tipo}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }


  get_abrir_paquete_nuevo_rsv(bar_code: string){
    return this.http.get<PaquetesAbiertosRSV[]>(this.apiurl+`/abrir/paquete/${bar_code}`
      )
  }

  bitacora_rsv(body : any){
    return this.http.put<BitacoraRSV[]>(this.apiurl+"/bitacora/rsv",body)
  }


  //datos de la sucursal especificos


  get_sucursal() {
    return this.http.get<SucursalRSV[]>(this.apiurl+"/producto")
  }

  update_ubicacion_bybId(body : any){
    return this.http.put(this.apiurl + "/producto/editar", body)
  }
  validar_sucursal_barc_code(barCode : string){
    return this.http.get<MatchSucursalRSV[]>(this.apiurl + `/sucursal/valida/${barCode}`)
  }

  get_producto_pickeado(){
    return this.http.get<EtiquetaRSV[]>(this.apiurl+"/etiqueta")  
  }

  get_producto_porId(barCode : string){
    return this.http.get<EtiquetaRSV[]>(this.apiurl+`/producto/${barCode}`)
  }

  get_sucursal_porId(id : number){
    return this.http.get<SucursalRSV[]>(this.apiurl+`/sucursal/${id}`)
  }

  // /Y

  get_catalogo_rsv() {
    return this.http.get<CatalogoRSV[]>(this.apiurl + `/catalogo`)
  }

  get_colores_rsv() {
    return this.http.get<ColoresRSV[]>(this.apiurl + `/colores`)
  }

  agregar_nuevo_producto_rsv(body : any) {
    return this.http.post(this.apiurl + "/agregar/producto", body)
  }

  buscar_producto_existente_rsv(codigo : string) {
    return this.http.get(this.apiurl + `/buscar/${codigo}`)
  }

  editar_producto_rsv(body : any) {
    return this.http.put(this.apiurl + "/editar/producto", body)
  }

  agregar_nuevo_catalogo(body : any){
    return this.http.post(this.apiurl + "/agregar/carga", body)
  }

  get_carga_rsv(){
    return this.http.get<CargaRSV []>(this.apiurl + "/cargas")
  }
  /// obtener datos carga por nombre carga DatosCargaRSV

  get_datos_carga_por_nombre_rsv(nombre_carga : string){
    return this.http.get<DatosCargaRSV []>(this.apiurl + `/datos/etiquetas/carga/${nombre_carga}`)
  }

  // filtrar carga por nombre carga
  get_carga_por_nombre_carga_rsv(nombre_carga : string){
    return this.http.get<CargaRSV []>(this.apiurl + `/cargas/nombre_carga/${nombre_carga}`)
  }
  // lista de solo nombre carga y si tienen etiquetas generadas
  get_listar_cargas(){
    return this.http.get<CargaRSV []>(this.apiurl + "/listar/cargas")
  }

  // lista de solo nombre carga y si tienen etiquetas generadas filtrado por mes
  get_listar_cargas_por_mes(mes : string){
    return this.http.get<CargaRSV []>(this.apiurl + `/listar/cargas/mes?mes=${mes}`)
  }

  // lista de solo nombre carga y si tienen etiquetas generadas
  generar_etiquetas_por_nombre_carga(nombre_carga : string){
    return this.http.get<CargaRSV []>(this.apiurl + `/generar/etiquetas?nombre_carga=${nombre_carga}`)
  }

  // datos de productos de etiquetas hechas

  get_dato_producto_etiquetas(nombre_carga : string){
    return this.http.get<EtiquetaRSV[]>(this.apiurl + `/datos/etiquetas/productos?nombre_carga=${nombre_carga}`)
  }

  // filtrar catalogo por color

  catalogo_por_colo_sin_filtro(){
    return this.http.get<CatalogoPorColor[]>(this.apiurl + `/catalogo/color/sin_filtro`)
  }


  filtrar_catalogo_por_color(color : number){
    return this.http.get<CatalogoPorColor[]>(this.apiurl + `/catalogo/color?color=${color}`)
  }

  // buscar si nombre_carga existe
  buscar_carga_por_nombre_carga(nombre_carga : string){
    return this.http.get(this.apiurl + `/carga/buscar?nombre_carga=${nombre_carga}`)
  }

  // byscar las etiquetas 
  get_etiquetas(){
    return this.http.get<EtiquetaRSV[]>(this.apiurl + "/etiquetas")
  }


  //Update cada 15 segundos o 2 minutos

  updateProductoSinRecepcion(){
    return interval(12000).pipe(switchMap(()=> this.http.get<EtiquetaRSV[]>(this.apiurl+"/etiquetas")))
  }


  //etiquetas de carga

  getEtiquetaPorCarga(nombre_carga : string, codigo : string){
    return this.http.get<EtiquetaRSV[]>(this.apiurl + `/etiquetas/carga?nombre_carga=${nombre_carga}&codigo=${codigo}`) 
  }

  ///  etiquetas/carga/descargar

  downloadEtiquetasExcel(nombre_carga : string, codigo : string , tipo : string) {
    this.http.get(this.apiurl + `/etiquetas/carga/descargar?nombre_carga=${nombre_carga}&codigo=${codigo}&tipo=${tipo}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `${nombre_carga}-${codigo}-${tipo}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

 

  get_sucursales(){
    return this.http.get<SucursalRSV[]>(this.apiurl + "/sucursales") 
  }
 /// sucursal
  get_inventario_por_sucursales(sucursal : number){
    return this.http.get<InventarioSucursal[]>(this.apiurl + `/inventario/sucursales/${sucursal}`) 
  }

  // editar/carga

  update_carga( body : any){
    return this.http.put(this.apiurl + "/editar/carga", body)
  }

  //eliminar listad de cargas

  delete_lista_codigos_carga( lista_codigos : string , nombre_carga : string){
    return this.http.put(this.apiurl + "/eliminar/cargas", { lista : lista_codigos ,
                                                             nombre_carga : nombre_carga})
  }

  /// sucursal
  get_tipo_despacho(){
    return this.http.get<TipoDespacho[]>(this.apiurl + `/tipo/despacho`) 
  }

  insert_nota_venta(body : any){
    return this.http.post(this.apiurl + `/agregar/nota_venta`,body) 
  }

  /// Generar Codigo de factura de ventas
  verificar_existencia_producto( body : any){
    return this.http.post<EvaluacionPedidoRSV>(this.apiurl + `/verificar/existencia/producto`,body) 
  }

  /// Generar Codigo de factura de ventas
  get_codigo_facturas_ventas(){
    return this.http.get(this.apiurl + `/obtener/factura/venta`) 
  }

  /// obtener lista estructura
  get_lista_estructura(){
    return this.http.get<EstructuraRSV []>(this.apiurl + `/lista/estructura`) 
  }

  get_nota_venta_por_mes_y_sucursal(mes: string, sucursal : string){
    return this.http.get<NotaVenta []>(this.apiurl + `/notas_ventas/lista?mes=${mes}&sucursal=${sucursal}`) 
  }

  // /notas_ventas/detalle/lista

  get_detalle_venta_barcode_por_id_venta(id_venta : number){
    return this.http.get<DetalleVenta []>(this.apiurl + `/notas_ventas/detalle/lista/barcode?id_venta=${id_venta}`) 
  }

  // /notas_ventas/detalle/lista/barcode

  get_detalle_venta_por_id_venta(id_venta : number){
    return this.http.get<NotaVentaProducto []>(this.apiurl + `/notas_ventas/detalle/lista?id_venta=${id_venta}`) 
  }

  update_despacho_nota_venta(body : any){
    return this.http.put(this.apiurl+ "/actualizar/estado/nota_venta", body) 
  }

  generar_codigo_factura(tipo_retiro : number){
    return this.http.get(this.apiurl + `/codigo/factura/venta?retiro=${tipo_retiro}`) 
  }

  get_peso_posicion_sucursal(estructura : string, sucursal : number){
    return this.http.get<PesoPosicionSucursal []>(this.apiurl + `/peso/posicion/sucursal?estructura=${estructura}&sucursal=${sucursal}`) 
  }

  // suma de inventarios

  calcular_suma_peso_posicion_sucursal(body : any){
    // return this.http.get(this.apiurl + `/peso/posicion/sucursal/suma?estructura=${estructura}&sucursal=${sucursal}`) 
    return this.http.post(this.apiurl + `/peso/posicion/sucursal/suma`, body) 
  }
  

  //descargar Inventario sucursal

  downloadInventarioSucursalExcel(sucursal : number, nombre : string ) {
    this.http.get(this.apiurl + `/inventario/sucursales/${sucursal}/descargar`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `Inventario-sucursal-${nombre}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  downloadListaCargaExcel(nombre_carga : string){
    this.http.get(this.apiurl + `/datos/etiquetas/carga/${nombre_carga}/descargar`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `Lista-${nombre_carga}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

   // tipo de estructura rsv

   get_tipo_estructura(){
    return this.http.get<TipoEstructura []>(this.apiurl + `/tipo/estructura`) 
  }

   update_datos_estructura(body : any){
    return this.http.put(this.apiurl+"/actualizar/estructura",body)
  }

  //lista de ventas 

  get_lista_venta_por_sucursal(sucursal : string){
    return this.http.get<NotaVenta []>(this.apiurl + `/notas_ventas/lista/completa?sucursal=${sucursal}`) 
  }

  get_stock_producto(body : any){
    return this.http.post<NotaVenta []>(this.apiurl + `/verificar/stock/producto`, body) 
  }

  //update catalogo unidades con etiqueta

  update_unid_con_etiqueta(body: any){

    return this.http.put(this.apiurl+"/actualizar_unid_con_etiquetas", body)
  }

  //listar unidades sin etiqueta

    get_unidades_sin_etiqueta_rsv(){
      return this.http.get<CatalogoRSV[]>(this.apiurl + `/catalogo-unidades-sin-etiqueta`)
    }
  
}
