import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainGestorActivos,ListaActivos } from '../models/taskmaster/taskmaster.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskMasterService {

  constructor(private http: HttpClient) { }
  
    apiurl="https://hela.transyanez.cl/api/task"
    // apiurl = "http://127.0.0.1:8000/api/task"
  
  
    datos_seleccionables_gestor_activos() {
      return this.http.get<MainGestorActivos>(this.apiurl + "/datos/gestor-activos")
    }


    obtener_lista_activos() {
      return this.http.get<ListaActivos []>(this.apiurl + "/lista/activos")
    }
  
    registrar_activos(body : any) {
      return this.http.post(this.apiurl + "/activos",body)
    }


    subir_imagen_activos(body : any) {
      return this.http.post(this.apiurl + "/subir/fotos",body)
    }

    subirArchivoAdjunto(formData : any, id : string){
      return this.http.post(`${this.apiurl}/subir/archivo?id=${id}`, formData)
    }


    cambiar_estado_activo(body : any) {
      return this.http.put(this.apiurl + "/estado/activo",body)
    }
}
