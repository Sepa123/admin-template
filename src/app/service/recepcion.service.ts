import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { interval,Observable, switchMap  } from 'rxjs';

// Modelos

import { ProductoOPL } from "../models/productoOPL.interface"

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {

  constructor(private http : HttpClient) { }

  apiurl="https://hela.transyanez.cl/api/recepcion"
  // apiurl = "http://127.0.0.1:8000/api/recepcion"
  
  getRecepcionEasyOPL(){
    return this.http.get<ProductoOPL[]>(this.apiurl + "/easy_opl")
  }

  getRecepcionEasyCD(){
    return this.http.get<ProductoOPL[]>(this.apiurl + "/easy_cd")
  }

  getRecepcionSportex(){
    return this.http.get<ProductoOPL[]>(this.apiurl + "/sportex")
  }

  getRecepcionElectrolux(){
    return this.http.get<ProductoOPL[]>(this.apiurl + "/electrolux")
  }


  //Update cada 1-2 segundoosss

  updateRecepcionEasyOPL() {
    return interval(1300).pipe(switchMap(() => this.http.get<ProductoOPL[]>(this.apiurl + "/easy_opl")))
  }

  updateRecepcionEasyCD() {
    return interval(1300).pipe(switchMap(() => this.http.get<ProductoOPL[]>(this.apiurl + "/easy_cd")))
  }

  updateRecepcionSportex() {
    return interval(1300).pipe(switchMap(() => this.http.get<ProductoOPL[]>(this.apiurl + "/sportex")))
  }

  updateRecepcionElectrolux() {
    return interval(1300).pipe(switchMap(() => this.http.get<ProductoOPL[]>(this.apiurl + "/electrolux")))
  }

  updateVerified(body: any) {
    return this.http.put(this.apiurl + "/verificar", body)
  }

  updateVerifiedByInput(url : string, body: any) {
    return this.http.put(this.apiurl + url, body)
  }

  checkElectroluxByPedido(cod_pedido : string) {
    return this.http.get<ProductoOPL[]>(this.apiurl + `/electrolux/${cod_pedido}`)
  }

  checkEasyOPLByPedido(cod_pedido : string) {
    return this.http.get<ProductoOPL[]>(this.apiurl + `/easy_opl/${cod_pedido}`)
  }
}
