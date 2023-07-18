import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
// 
import { RutaEnActivo } from "src/app/models/rutaEnActivo.interface"
import { ProductoPicking } from "src/app/models/productoPicking.interface"
import { NombresRutasActivas } from "src/app/models/nombresRutasActivas.interface"
import { interval,Observable, switchMap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutasService {


  constructor(private http: HttpClient) { }

  apiurl = "https://hela.transyanez.cl/api/rutas"
  // apiurl = "http://127.0.0.1:8000/api/rutas"

  get_rutas_manual(pedido: string) {
    // return this.http.get<ProductoPicking[]>(this.apiurl + "/buscar/ruta/{producto_id}")
    return this.http.get<ProductoPicking[]>(this.apiurl + `/buscar/${pedido}`)
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

  delete_producto_ruta_activa(cod_producto: string) {
    return this.http.delete(this.apiurl + `/eliminar/producto/${cod_producto}`)
  }

  insert_ruta_existente_activa(data : ProductoPicking [][]){
    return this.http.post(this.apiurl + '/agregar/ruta_activa_existente',data)
  }

  download_ruta_activa(nombre_ruta : string){
    this.http.get(this.apiurl + `/descargar?nombre_ruta=${nombre_ruta}`, {responseType:"blob"})
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

    this.http.get(this.apiurl + `/beetrack/${id_ruta}/descargar`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `beetrack-${nombre_ruta}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }
}
