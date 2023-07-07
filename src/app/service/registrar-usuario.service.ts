import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 


@Injectable({
  providedIn: 'root'
})
export class RegistrarUsuarioService {

  constructor(private http : HttpClient) { }

  apiurl="https://hela.transyanez.cl/api/panel"
  // apiurl = "http://127.0.0.1:8000/api/panel"

  registrarNuevoUsuario(data : any) {
    return this.http.post(this.apiurl + "/registrar", data)
  }
}
