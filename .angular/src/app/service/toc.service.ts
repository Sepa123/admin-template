import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ProductoToc } from '../models/productosToc.interface'
import { Subestados } from '../models/subestados.interface';
import { Codigo1 } from '../models/Codigos1.interface';
import { ObservacionTOC } from '../models/ObservacionesTOC.interface'
import { AlertasVigente, BitacoraRango } from '../models/alertasVigentes.interface'
import { UsuarioTOC } from '../models/usuariosTOC.interface'
import { interval,Observable, switchMap  } from 'rxjs';
import { ActividadDiariaTOC } from '../models/actividadesDiariasTOC.interface'
import { BackofficeUsuarioTOC } from '../models/backofficeUsuarioTOC.interface'
import { TocTracking } from '../models/tocTracking.interface'
import { EditarTOC, AlertaExistenteTOC } from '../models/editarTOC.interface'
import { MainDifFechasEasy,Dato } from '../models/TOC/difFechasEasy.interface'
import { MainProductoIngresado, DatoPI } from '../models/TOC/productosIngresadosEasy.interface'
import {MainTelefonosTruncados, DatoTelefonos} from '../models/TOC/telefonosTruncados.interface'
import { ProductoAdelanto } from '../models/TOC/productosAdelanto.interface'
import {MainCamposBT, BitacoraTiendaTOC} from '../models/TOC/camposBitTienda.interface'
import {PanelAlertasTOC, DatosAlertasVigentes} from '../models/TOC/alertaVigentes.interface'
import { ClienteTOC } from '../models/TOC/bitacora.interface';


@Injectable({
  providedIn: 'root'
})
export class TocService {

  constructor(private http: HttpClient) { }


  httpOptions = {
  "headers": {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json"
  },
  "responseType": "blob"
}

  
  apiurl = "https://hela.transyanez.cl/api/toc"
  // apiurl = "http://127.0.0.1:8000/api/toc"


  buscar_clientes_toc(){
    return this.http.get<ClienteTOC>(this.apiurl + `/clientes`)
  }


  buscar_producto_toc(cod_producto : string,id_cliente : string | null | undefined){
    return this.http.get<ProductoToc>(this.apiurl + `/buscar_producto?cod_producto=${cod_producto}&id_cliente=${id_cliente}`)
  }

  insert_bitacora_toc(body : any){
    return this.http.post(this.apiurl + "/registrar_bitacora", body)
  }

  buscar_subestados(){
    return this.http.get<Subestados []>(this.apiurl + "/subestados")
  }

  buscar_codigos1(){
    return this.http.get<Codigo1 []>(this.apiurl + "/codigos1")
  }

  buscar_observaciones_usuario(id_usuario : string){
    return this.http.get<ObservacionTOC []>(this.apiurl + `/observaciones/${id_usuario}`)
  }

  buscar_alertas_vigentes(){
    return this.http.get<AlertasVigente []>(this.apiurl + "/alertas-vigentes")
  }

  nombres_usuarios_toc(fecha_inicio : string, fecha_fin : string){
    return this.http.get<UsuarioTOC []>(this.apiurl + `/bitacoras/usuarios?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`)
  }

  bitacoras_rango_fecha(fecha_inicio : string, fecha_fin : string ): Observable<any>{
    return this.http.get<BitacoraRango []>(this.apiurl + `/bitacoras/rango?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`)
  }

  actividad_diaria_usuario(ids_usuario : string, fecha : string){
    return this.http.get<ActividadDiariaTOC []>(this.apiurl + `/actividad_diaria?ids_usuario=${ids_usuario}&fecha=${fecha}`)
  }

  backoffice_usuario(ids_usuario : string){
    return this.http.get<BackofficeUsuarioTOC []>(this.apiurl + `/backoffice/usuario?ids_usuario=${ids_usuario}`)
  }

  get_nombre_usu_hela(ids_usuario : string){
    return this.http.get(this.apiurl + `/usuario/hela/${ids_usuario}`)
  }

  get_nombre_usu_portal(ids_usuario : string){
    return this.http.get(this.apiurl + `/usuario/portal/${ids_usuario}`)
  }

  toc_tracking(cod_producto : string){
    return this.http.get<TocTracking []>(this.apiurl + `/tracking?cod_producto=${cod_producto}`)
  }


  editar_alerta_toc(body : any){
    return this.http.put(this.apiurl + "/editar",body)
  }

  buscar_alerta_by_ids_transyanez(Ids_transyanez : string) {
    return this.http.get<AlertaExistenteTOC []>(this.apiurl + `/buscar/alerta/${Ids_transyanez}`)
  }

  buscar_guia_by_codigo(codigo : string){
    return this.http.get(this.apiurl + `/guia/${codigo}`)
  }

  get_diferencia_fechas_easy(fecha_inicio : string,fecha_fin : string,offset : number){
    return this.http.get<MainDifFechasEasy>(this.apiurl + `/diferencia/fechas/easy?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&offset=${offset}`)
  }

  get_productos_ingresados_easy(fecha_inicio : string,fecha_fin : string,offset : number){
    return this.http.get<MainProductoIngresado>(this.apiurl + `/productos_ingresados/fechas/easy?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&offset=${offset}`)
  }

  get_telefonos_truncados(fecha_inicio : string,fecha_fin : string,offset : number){
    return this.http.get<MainTelefonosTruncados>(this.apiurl + `/telefonos/truncados?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&offset=${offset}`)
  }


  download_reporte_easy_diferencia(body : Dato [], var_random : string, fusion_fecha : string){
    this.http.post(this.apiurl + `/diferencia/fechas/easy/descargar`, body,{responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `Diferencia_Easy_${fusion_fecha}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  download_reporte_telefonos_truncados(rango : string [] [], fusion_fecha : string, fecha_inicio : string, fecha_fin : string){
    this.http.post(this.apiurl + `/telefonos/truncados/descargar`,  {'Rango_fecha' :rango , 'Fecha_inicio_f' : fecha_inicio, 'Fecha_final_f' : fecha_fin },{responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `Telefonos_truncados_${fusion_fecha}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  download_productos_ingresados_easy(body : DatoPI [], rango : string [] [], fusion_fecha : string, fecha_inicio : string, fecha_fin : string){
    this.http.post(this.apiurl + `/productos_ingresados/fechas/easy/descargar`, {'Rango_fecha' :rango, 'Fecha_inicio_f' : fecha_inicio, 'Fecha_final_f' : fecha_fin },{responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `Productos_${fusion_fecha}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  buscar_productos_adelanto(){
    return this.http.get<ProductoAdelanto []>(this.apiurl + `/productos/adelanto`)
  }


  campos_bitacora_tienda(){
    return this.http.get<MainCamposBT>(this.apiurl + `/bitacora/tienda/campos`)
  }

  get_panel_alertas_toc(){
    return this.http.get<PanelAlertasTOC>(this.apiurl + `/alertas_vigentes/panel`)
  }

  get_datos_alertas_toc(){
    return this.http.get<DatosAlertasVigentes>(this.apiurl + `/alertas_vigentes/datos`)
  }

  insert_bitacora_tienda_toc(body : any){
    return this.http.post(this.apiurl + "/registrar_bitacora_tienda", body)
  }

  get_bitacora_tiendas_toc(fecha_inicio : string, fecha_fin : string){
    return this.http.get<BitacoraTiendaTOC []>(this.apiurl + `/bitacoras/tienda?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`)
  }
}
