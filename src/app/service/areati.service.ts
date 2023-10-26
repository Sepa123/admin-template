import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class AreatiService {

  // apiurl="https://hela.transyanez.cl/api/pedidos"
  apiurl = "http://127.0.0.1:8000/api/areati"

  constructor(private http: HttpClient) { }

  get_lista_funciones() {
    return this.http.get(this.apiurl + "/listar/funcion")
  }
  
  get_lista_tipo_funciones() {
    return this.http.get(this.apiurl + "/tipo/funciones")
  }
}
