import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
//  Modelos
import { RutaEnActivo } from "src/app/models/rutaEnActivo.interface"
import { ProductoPicking, FacturaElectrolux } from "src/app/models/productoPicking.interface"
import { NombresRutasActivas } from "src/app/models/nombresRutasActivas.interface"
import { TrackingBeetrack, LineaProducto } from 'src/app/models/trackingBeetrack.interface'
import { TocTracking } from 'src/app/models/tocTracking.interface'
import { AlertaConductor } from 'src/app/models/alertaConductor.interface'
import { interval,Observable, switchMap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutasService {


  constructor(private http: HttpClient) { }

  apiurl = "https://hela.transyanez.cl/api/rutas"
  // apiurl = "http://127.0.0.1:8000/api/rutas"

  get_rutas_manual(pedido: string) {
    return this.http.get<ProductoPicking[]>(this.apiurl + `/buscar/${pedido}`)
  }

  get_rutas_manual_sin_filtro(pedido: string) {
    return this.http.get<ProductoPicking[]>(this.apiurl + `/buscar/sin_filtro/${pedido}`)
  }

  get_factura_electrolux(pedido : string){
    return this.http.get<FacturaElectrolux >(this.apiurl + `/buscar/factura/electrolux/${pedido}`)
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

  get_nombres_ruta(fecha : string) {
    return this.http.get<NombresRutasActivas[]>(this.apiurl + `/activo/nombre_ruta?fecha=${fecha}`)
  }

  update_estado_ruta(nombre_ruta: string,data = { }) {
    return this.http.put(this.apiurl + `/actualizar/estado/activo/${nombre_ruta}`,data)
  }

  get_ruta_by_nombre_ruta(nombre_ruta : string) {
    return this.http.get<ProductoPicking[]>(this.apiurl + `/datos_ruta/${nombre_ruta}`)
  }

  delete_producto_ruta_activa(cod_producto: string,nombre_ruta: string) {
    return this.http.delete(this.apiurl + `/eliminar/producto/${cod_producto}/${nombre_ruta}`)
  }

  insert_ruta_existente_activa(fecha_ruta : string ,data : ProductoPicking [][]){
    return this.http.post(this.apiurl + `/agregar/ruta_activa_existente?fecha_ruta_nueva=${fecha_ruta}`,data)
  }

  download_ruta_activa(nombre_ruta : string, patente : string, driver : string , RutaEnActivo : RutaEnActivo []){
    this.http.post(this.apiurl + `/descargar?nombre_ruta=${nombre_ruta}&patente=${patente}&driver=${driver}`, RutaEnActivo,{responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `${nombre_ruta}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
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

  descargar_datos_beetrack_by_id(id_ruta : number,nombre_ruta: string){

    this.http.get(this.apiurl + `/beetrack/${nombre_ruta}/descargar`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `beetrack-${nombre_ruta}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
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

  verificar_pedido_en_ruta(pedido_id : number){
    return this.http.get(this.apiurl + `/pedido/en_ruta/${pedido_id}`)
  }

}
