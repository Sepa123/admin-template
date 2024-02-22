import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vidaProducto } from '../models/vidaProducto.interface';
import { TocTracking } from '../models/tocTracking.interface';
import { AlertaExistenteTOC } from '../models/editarTOC.interface';
import { BuscarCabeceraProducto } from '../models/buscar.cabecera';


@Injectable({
  providedIn: 'root'
})
export class VidaProductoService {

  apiurl="https://hela.transyanez.cl/api/seguridad"
  apiurl2="https://hela.transyanez.cl/api/toc"
  apiurl3="https://hela.transyanez.cl/api/rutas/buscar/sin_filtro"
  // apiurl = "http://127.0.0.1:8000/api/areati"

  constructor(private http: HttpClient) { }

  get_lista_funciones(Cod_producto: string) {
    
    return this.http.get< vidaProducto []>(this.apiurl + "/timeline?cod_producto=" + Cod_producto)
  }
  
  buscar_guia_by_codigo(codigo : string){
    return this.http.get(this.apiurl2 + `/guia/${codigo}`)
  }
  toc_tracking(cod_producto : string){
    return this.http.get<TocTracking []>(this.apiurl2 + `/tracking?cod_producto=${cod_producto}`)
  }
  buscar_alerta_by_ids_transyanez(Ids_transyanez : string) {
    return this.http.get<AlertaExistenteTOC []>(this.apiurl + `/buscar/alerta/${Ids_transyanez}`)
  }
  
  buscar_cabecera_producto(cod_producto : string) {
    return this.http.get<BuscarCabeceraProducto []>(this.apiurl3 + `/${cod_producto}`)
  }



//   get_lista_tipo_funciones() {
//     return this.http.get<  []>(this.apiurl + "/tipo/funciones")
//   }

//  enviar_datos_funciones(body : any) {
//     return this.http.post(this.apiurl + "/agregar/funcion", body)
//   }
}

