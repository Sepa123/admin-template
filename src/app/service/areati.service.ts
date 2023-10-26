import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {TipoFuncion} from 'src/app/models/areati/tipoFuncion.interface'
import {ListaFuncion} from 'src/app/models/areati/listaFuncion.interface'

@Injectable({
  providedIn: 'root'
})
export class AreatiService {

  apiurl="https://hela.transyanez.cl/api/areati"
  // apiurl = "http://127.0.0.1:8000/api/areati"

  constructor(private http: HttpClient) { }

  get_lista_funciones() {
    return this.http.get<ListaFuncion []>(this.apiurl + "/listar/funcion")
  }
  
  get_lista_tipo_funciones() {
    return this.http.get<TipoFuncion []>(this.apiurl + "/tipo/funciones")
  }

 enviar_datos_funciones(body : any) {
    return this.http.post(this.apiurl + "/agregar/funcion", body)
  }
}
