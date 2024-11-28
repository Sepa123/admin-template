import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { MainCampos } from 'src/app/models/transporte/trabajemos.interface'

@Injectable({
  providedIn: 'root'
})
export class TrabajemosService {

  constructor(private http: HttpClient) { }

  // apiurl="https://hela.transyanez.cl/api/v2/externo"
  apiurl = "http://127.0.0.1:8000/api/v2/externo"


  get_campos_registro() {
    return this.http.get<MainCampos>(this.apiurl + "/campos")
  }

  registrar_externos(body : any) {
    return this.http.post(this.apiurl + "/registar/candidato",body)
  }
}
