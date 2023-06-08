import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
// 

import { ProductoPicking } from "src/app/models/productoPicking.interface"


import { interval,Observable, switchMap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutasService {


  constructor(private http: HttpClient) { }

  apiurl="http://34.225.63.221:84/api/rutas"
  // apiurl = "http://127.0.0.1:8000/api/rutas"

  get_rutas_manual(pedido: string) {
    // return this.http.get<ProductoPicking[]>(this.apiurl + "/buscar/ruta/{producto_id}")
    return this.http.get<ProductoPicking[]>(this.apiurl + `/buscar/${pedido}`)
  }

  insert_rutas_manual(data : ProductoPicking [][]){
    return this.http.post(this.apiurl + '/agregar',data)
  }
}
