import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoToc } from '../models/productosToc.interface'
import { Subestados } from 'src/app/models/subestados.interface';
import { Codigo1 } from 'src/app/models/Codigos1.interface';
import { ObservacionTOC } from 'src/app/models/ObservacionesTOC.interface'
import { AlertasVigente, BitacoraRango } from 'src/app/models/alertasVigentes.interface'
import { UsuarioTOC } from 'src/app/models/usuariosTOC.interface'
import { interval,Observable, switchMap  } from 'rxjs';
import { ActividadDiariaTOC } from 'src/app/models/actividadesDiariasTOC.interface'
import { BackofficeUsuarioTOC } from 'src/app/models/backofficeUsuarioTOC.interface'
import { TocTracking } from 'src/app/models/tocTracking.interface'
import { EditarTOC, AlertaExistenteTOC } from 'src/app/models/editarTOC.interface'
import { MainDifFechasEasy,Dato } from 'src/app/models/TOC/difFechasEasy.interface'

@Injectable({
  providedIn: 'root'
})
export class TocService {

  constructor(private http: HttpClient) { }

  // apiurl = "https://hela.transyanez.cl/api/toc"
  apiurl = "http://127.0.0.1:8000/api/toc"

  buscar_producto_toc(cod_producto : string){
    return this.http.get<ProductoToc>(this.apiurl + `/buscar_producto/${cod_producto}`)
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


  download_reporte_easy_diferencia(body : Dato [], var_random : string){
    this.http.post(this.apiurl + `/diferencia/fechas/easy/descargar`, body,{responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `preuba.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })

    
  }
}
