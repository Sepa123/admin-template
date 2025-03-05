import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainGestorActivos } from '../models/taskmaster/taskmaster.interface';

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
  
    registrar_externos(body : any) {
      return this.http.post(this.apiurl + "/registar/candidato",body)
    }
}
