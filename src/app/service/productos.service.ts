import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { interval,Observable, switchMap  } from 'rxjs';

// Modelos

import { ProductoSinClasificacion } from '../models/productoSinClasificacion.interface';
import { ProductosPorSKU } from '../models/productoPorSKU.interface';
import { ProductoOPL } from "../models/productoOPL.interface"

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  apiurl="http://34.225.63.221:84/api/productos"
  // apiurl = "http://127.0.0.1:8000/api/productos"
  
  getProductosSinClasificacion(){
    return  this.http.get<ProductoSinClasificacion[]>(this.apiurl+"/sin_clasificacion")
  }

  postProductoSinClasificacion(data : ProductoSinClasificacion){
    return this.http.post<ProductoSinClasificacion>(this.apiurl+"/sin_clasificacion",data)
  }

  getProductosPorSKU(codigo: string){
    return this.http.get<ProductosPorSKU[]>(this.apiurl+ `/buscar/sku/${codigo}`)
  }

  getProductosPickingOPL(){
    return this.http.get<ProductoOPL[]>(this.apiurl + "/recepcion/OPL")
  }
  updateProductoPickingOPL(body: any){
    return this.http.put(this.apiurl + "/actualizar/verificado/OPL", body)
  }
}
