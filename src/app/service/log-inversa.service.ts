import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class LogInversaService {

  constructor(private http: HttpClient) { }

  // apiurl="https://hela.transyanez.cl/api/log_inversa"
  apiurl = "http://127.0.0.1:8000/api/log_inversa"

  get_estados_pedidos() {
    return this.http.get(this.apiurl + "/estados")
  }

  registrar_bitacora_lg(body : any) {
    return this.http.post(this.apiurl + "/registrar",body)
  }



}
