import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class RetiroClienteService {

  constructor(private http: HttpClient) { }

  apiurl = "https://hela.transyanez.cl/api/clientes"
  // apiurl = "http://127.0.0.1:8000/api/rutas"


  registrar_retiro_cliente(pedido: any) {

    return this.http.post(this.apiurl + `/retiro/registrar`,pedido)
  }
}
