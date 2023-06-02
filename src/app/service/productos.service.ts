import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { interval,Observable, switchMap  } from 'rxjs';

// Modelos

import { ProductoSinClasificacion } from '../models/productoSinClasificacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  apiurl="http://34.225.63.221:84/api/productos"
  //apiurl = "http://127.0.0.1:8000/api/productos"
  
  getProductosSinClasificacion(){
    return  this.http.get<ProductoSinClasificacion[]>(this.apiurl+"/sin_clasificacion")
  }

  postProductoSinClasificacion(data : ProductoSinClasificacion){
    return this.http.post<ProductoSinClasificacion>(this.apiurl+"/sin_clasificacion",data)
  }
}
