import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
//  Modelos
import { BitacoraLITracking } from "../models/log_inversa/bitacoraLITracking.interface" 
import { RutaEnActivo } from "../models/rutaEnActivo.interface"
import { ProductoPicking, FacturaElectrolux } from "../models/productoPicking.interface"
import { NombresRutasActivas } from "../models/nombresRutasActivas.interface"
import { TrackingBeetrack, LineaProducto } from '../models/trackingBeetrack.interface'
import { TocTracking } from '../models/tocTracking.interface'
import { AlertaConductor } from '../models/alertaConductor.interface'
import { interval,Observable, switchMap  } from 'rxjs';
import { CantidadUnidadesRutaActiva } from '../models/cantidadUnidadesRutaActiva.interface'
import { ComunaRutas } from '../models/comunaRutas.interface'
import { seguimientoRuta } from '../models/TOC/seguimientoRuta.interface'
import {PedidoCompromisoObligatorio } from '../models/rutas/pedidoCompromisoObligatorios.interface'
import { VehiculoDisponible,PatenteDisponible } from '../models/rutas/vehiculosDisponibles.interface'
import { MainCamposClientes, RutasTy, RutasTyTemp } from '../models/rutas/rutas.interface';
@Injectable({
  providedIn: 'root'
})
export class RutasService {


  constructor(private http: HttpClient) { }

  apiurl = "https://hela.transyanez.cl/api/rutas"
  // apiurl = "http://127.0.0.1:8000/api/rutas"


  /// metodo get alv chido
  // get_rutas_manual(pedido: string) {
  //   return this.http.get<ProductoPicking[]>(this.apiurl + `/buscar/${pedido}`)
  // }
  //reportes de rutas mensuales
  get_reporte_rutas_mensuales(mes : string) {
    return this.http.get(this.apiurl + `/reporte/mensual?mes=${mes}`)

  }

  registrar_producto_en_despacho_ruta(body : any) {
    return this.http.post(this.apiurl + `/agregar/porDespachoRuta`, body)

  }

  get_reporte_rutas_diaria(dia : string) {
    return this.http.get(this.apiurl + `/reporte/diario?dia=${dia}`)

  }

  get_reporte_rutas_diario_excel(dia : string) {
    return this.http.get(this.apiurl + `/reporte/diario/excel/descargar?dia=${dia}`)

  }

  download_reporte_rutas_diario_excel( dia : string) {
    this.http.get(`${this.apiurl}/reporte/diario/excel/descargar?dia=${dia}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download =`inventario-${dia}.xlsx`; 
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }



  //get rutas_activas

  get_rutas_activas() {
    return this.http.get<NombresRutasActivas[]>(this.apiurl + `/buscar/rutas/activas`)

  }
  
  //metodo post zzzz

  get_rutas_manual(body: any) {
    return this.http.post<ProductoPicking[]>(this.apiurl + `/buscar`, body)
  }

  get_datos_producto_en_ruta(body: any) {
    return this.http.post<ProductoPicking[]>(this.apiurl + `/buscar/producto/ruta`, body)
  }

  get_datos_producto_en_ruta_por_4_digitos(codigo_pedido: any) {
    return this.http.get<ProductoPicking[]>(this.apiurl + `/buscar/4_digitos/${codigo_pedido}`)
  }

  get_rutas_manual_sin_filtro(pedido: string) {
    return this.http.get<ProductoPicking[]>(this.apiurl + `/buscar/sin_filtro/${pedido}`)
  }

  get_rutas_tracking(pedido: string) {
    return this.http.get<ProductoPicking[]>(this.apiurl + `/buscar/tracking/${pedido}`)
  }

  get_factura_electrolux(pedido : string){
    return this.http.get(this.apiurl + `/buscar/factura/electrolux/${pedido}`)
  }

  insert_rutas_manual(data : ProductoPicking [][], fecha_pedido : string){
    return this.http.post(this.apiurl + `/agregar?fecha_pedido=${fecha_pedido}`,data)
  }

  update_estado_producto(cod_producto: any, data = { }) {
    return this.http.put(this.apiurl +`/actualizar/estado/${cod_producto}`,data)
  }

  get_rutas_en_activo(nombre_ruta : string) {
    return this.http.get<RutaEnActivo[]>(this.apiurl + `/listar/activo?nombre_ruta=${nombre_ruta}`)
  }

  recuperar_bultos_sku( body : any){
    return this.http.post(this.apiurl + `/recuperar/bultos/sku`,body)
  }

  get_nombres_ruta(fecha : string) {
    return this.http.get<NombresRutasActivas[]>(this.apiurl + `/activo/nombre_ruta?fecha=${fecha}`)
  }

  update_estado_ruta(nombre_ruta: string,data :any) {
    return this.http.put(this.apiurl + `/actualizar/estado/activo/${nombre_ruta}`,data)
  }

  get_ruta_by_nombre_ruta(nombre_ruta : string) {
    return this.http.get<ProductoPicking[]>(this.apiurl + `/datos_ruta/${nombre_ruta}`)
  }

  delete_producto_ruta_activa(body: any, cod_producto: string) {
    return this.http.put(this.apiurl + `/eliminar/producto/${cod_producto}`,body)
  }

  delete_ruta(nombre_ruta: string) {
    return this.http.delete(this.apiurl + `/eliminar/ruta/${nombre_ruta}`)
  }

  insert_ruta_existente_activa(fecha_ruta : string ,data : ProductoPicking [][]){
    return this.http.post(this.apiurl + `/agregar/ruta_activa_existente?fecha_ruta_nueva=${fecha_ruta}`,data)
  }

  download_ruta_activa(nombre_ruta : string, patente : string, driver : string , RutaEnActivo : RutaEnActivo [], var_random : string,despachador : string){
    return this.http.post(this.apiurl + `/descargar/${var_random}?nombre_ruta=${nombre_ruta}&patente=${patente}&driver=${driver}&despachador=${despachador}`, RutaEnActivo,{responseType:"blob"})
    // .subscribe((blob:Blob) => {
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.href = url
    //   a.download = `${nombre_ruta}.xlsx`;
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    // })

    
  }

  asignar_ruta_activa(data : any) {
    return this.http.post(this.apiurl + "/asignar", data)
  }

  get_patente_driver_by_nombre_ruta(nombre_ruta : string){
    return this.http.get(this.apiurl + `/buscar_patente?nombre_ruta=${nombre_ruta}`)
  }


  update_ruta_asignada(body : any){
    return this.http.put(this.apiurl + "/actualizar/ruta_asignada", body)
  }

  //Descargar Beetrack

  descargar_datos_beetrack_by_id(id_ruta : number,nombre_ruta: string ,caracter : string){

   return this.http.get(this.apiurl + `/beetrack/${nombre_ruta}/descargar/${caracter}`, {responseType:"blob"})
    

  }

  recuperar_tracking_beetrack(codigo : string){
    return this.http.get<TrackingBeetrack[]>(this.apiurl + `/recuperar/tracking?codigo=${codigo}`)
  }

  recuperar_linea_producto(codigo : string){
    return this.http.get<LineaProducto>(this.apiurl + `/recuperar/linea/producto?codigo=${codigo}`)
  }

  recuperar_fecha_ingreso_sistema(cod_pedido : string){
    return this.http.get<any>(this.apiurl + `/fecha_ingreso_sistema/${cod_pedido}`)
  }

  geolocalizar_direcciones(direccion : any) {

    return this.http.post(this.apiurl + "/geolocalizacion",direccion)
  }

  toc_tracking(cod_producto : string){
    return this.http.get<TocTracking []>(this.apiurl + `/toc/tracking?cod_producto=${cod_producto}`)
  }

  // alerta_conductor_rutas(nombre_ruta : string){
  //   return this.http.get<AlertaConductor []>(this.apiurl + `/alerta/conductor?nombre_ruta=${nombre_ruta}`)
  // }

  alerta_conductor_rutas(nombre_ruta : string) {
    return interval(5600).pipe(switchMap(() => this.http.get<AlertaConductor []>(this.apiurl + `/alerta/conductor?nombre_ruta=${nombre_ruta}`)))
  }

  armar_ruta_bloque(body : any){
    return this.http.post(this.apiurl + "/armar/bloque", body)
  }

  recalcular_posicion_rutas(nombre_ruta : number){
    return this.http.get(this.apiurl + `/recalcular/ruta/${nombre_ruta}`)
  }

  verificar_pedido_en_ruta(pedido_id : number){
    return this.http.get(this.apiurl + `/pedido/en_ruta/${pedido_id}`)
  }

  comunas_rutas_activas(fecha : string){
    return this.http.get <ComunaRutas []>(this.apiurl + `/activo/comunas?fecha=${fecha}` )
  }

  filtrar_nombre_rutas_activa_by_comuna(fecha : string, comuna : string, region : string){
    return this.http.get<NombresRutasActivas[]>(this.apiurl + `/activo/nombre_ruta/filtro?fecha=${fecha}&comuna=${comuna}&region=${region}` )
  }


  get_cantidad_unidades_ruta_activa(nombre_ruta : string){
    return this.http.get<CantidadUnidadesRutaActiva[]>(this.apiurl + `/listar/activo/cantidad/productos?nombre_ruta=${nombre_ruta}` )  
  }

  actualizar_estado_ruta_a_true(nombre_ruta: string,data : any) {
    return this.http.put(this.apiurl + `/actualizar/estado/activo/${nombre_ruta}/abrir`,data)
  }


  eliminar_productos_por_fila(data : any) {
    return this.http.put(this.apiurl + `/eliminar/productos`,data)
  }

  get_bitacora_li_tracking(cod_pedido : string){
    return this.http.get<BitacoraLITracking[]>(this.apiurl + `/bitacora/log_inversa?cod_pedido=${cod_pedido}` )  
  }

  registar_producto_ticket(body: any) {
    return this.http.post(this.apiurl + `/encontrar/producto/ruta`, body)
  }

  get_seguimiento_ruta(){
    return this.http.get<seguimientoRuta[]>(this.apiurl + `/seguimento` )  
  }


  update_seguimiento_ruta() {
    return interval(420000).pipe(switchMap(() => this.http.get<seguimientoRuta []>(this.apiurl + `/seguimento`)))
    // return interval(15000).pipe(switchMap(() => this.http.get<seguimientoRuta []>(this.apiurl + `/seguimento`)))
  }

  get_comuna_por_ruta(fecha:string){
    return this.http.get(this.apiurl + `/comuna_por_ruta?fecha=${fecha}` )  
  }

  get_codigo_obligatorio_por_dia(fecha:string){
    return this.http.get<PedidoCompromisoObligatorio []>(this.apiurl + `/codigos/obligatorios/dia?fecha=${fecha}` )  
  }

  download_codigo_obligatorio_por_dia( fecha : string) {
    this.http.get(`${this.apiurl}/codigos/obligatorios/dia/descargar?fecha=${fecha}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download =`Pedido_compromisos_obligatorio_${fecha}.xlsx`; 
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  download_lista_comunas_rutas( fecha : string) {
    this.http.get(`${this.apiurl}/comuna_por_ruta/descargar?fecha=${fecha}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download =`Lista_comunas_rutas.xlsx`; 
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }


  get_vehiculos_disponibles_op(){
    const fecha = new Date();
    let fechaFormateada = fecha.toISOString().split('T')[0];
    return this.http.get<VehiculoDisponible []>(this.apiurl + `/vehiculos/disponibles/en_ruta?fecha=${fechaFormateada}` )  
  }


  get_lista_patentes_disponibles(){
    return this.http.get<PatenteDisponible []>(this.apiurl + `/patentes/disponibles` )  
  }

  upload_quadmind_manual(formData : any, id_usuario : string){
    return this.http.post(this.apiurl+`/quadminds/subir-archivo?id_usuario=${id_usuario}`, formData)
  }


  armar_ruta_codigos(body : any){
    return this.http.post(this.apiurl + "/armar/ruta_codigos", body)
  }

  download_excel_ejemplo() {
    this.http.get(`${this.apiurl}/archivo_ejemplo/descargar`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download =`archivo_ejemplo.xlsx`; 
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }


  upload_clientes_rutas_manuales(formData : any, id_usuario : string, ids_usuario : string, cliente : string, id_cliente : number){
    return this.http.post(this.apiurl+`/subir-archivo/rutas_manuales?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}&cliente=${cliente}&id_cliente=${id_cliente}`, formData)
  }

  // camposs modulos cliente

  get_campos_modulo_clientes(){
    return this.http.get < MainCamposClientes >(this.apiurl + `/cargas/campos`)
  }

  get_lista_rutas_manuales_temp( id_usuario : string){
    return this.http.get < RutasTyTemp []>(this.apiurl + `/lista/rutas_manuales/temp?id_usuario=${id_usuario}`)
  }


  get_lista_rutas_manuales( fecha_ini : string,fecha_fin : string,bloque: string){
    return this.http.get < RutasTy []>(this.apiurl + `/lista/rutas_manuales?fecha_ini=${fecha_ini}&fecha_fin=${fecha_fin}&bloque=${bloque}`)
  }


  // ###### limpiar rutas manuales temporales

  get_limpiar_rutas_manuales_temporales( id_usuario : string){
    return this.http.get(this.apiurl + `/limpiar/rutas_manuales/temp?id_usuario=${id_usuario}`)
  }


  // ###### procesar rutas manuales temporales

  get_procesar_rutas_manuales_temporales( id_usuario : string){
    return this.http.get(this.apiurl + `/procesar/rutas_manuales/temp?id_usuario=${id_usuario}`)
  }




  // ### archivo ejemplo para carga de rutas manuales

  download_excel_ejemplo_rutas_manuales() {
    this.http.get(`${this.apiurl}/archivo_ejemplo/rutas_manuales/descargar`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download =`excel_base_ruta_manual.xlsx`; 
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }
  
}
