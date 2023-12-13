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

  //producto sin recepcion

  getProductoSinRecepcion(){
    return this.http.get<ProductoOPL[]>(this.apiurl+"/producto_sin_recepcion")
  }

  getRecepcionEasyOPL(){
    return this.http.get<ProductoOPL[]>(this.apiurl + "/easy_opl")
  }

  getRecepcionEasyOPLDetalle(){
    return this.http.get<ProductoOPL[]>(this.apiurl + "/easy_opl/detalle")
  }

  getBultosOPL( suborden : string){
    return this.http.get<ProductoOPL>(this.apiurl + `/easy_opl/bultos?suborden=${suborden}`)
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


  //Update cada 15 segundos o 2 minutos

  updateRecepcionEasyOPLDetalle(){
    return interval(12000).pipe(switchMap(() => this.http.get<ProductoOPL[]>(this.apiurl + "/easy_opl/detalle")))
   
  }

  updateProductoSinRecepcion(){
    return interval(12000).pipe(switchMap(()=> this.http.get<ProductoOPL[]>(this.apiurl+"/producto_sin_recepcion")))
  }

  updateRecepcionEasyOPL() {
    return interval(12000).pipe(switchMap(() => this.http.get<ProductoOPL[]>(this.apiurl + "/easy_opl")))
  }

  updateRecepcionEasyCD() {
    return interval(10000).pipe(switchMap(() => this.http.get<ProductoOPL[]>(this.apiurl + "/easy_cd")))
  }

  updateRecepcionSportex() {
    return interval(10000).pipe(switchMap(() => this.http.get<ProductoOPL[]>(this.apiurl + "/sportex")))
  }

  updateRecepcionElectrolux() {
    return interval(10000).pipe(switchMap(() => this.http.get<ProductoOPL[]>(this.apiurl + "/electrolux")))
  }

  updateVerified(body: any) {
    return this.http.put(this.apiurl + "/verificar", body)
  }

  updateVerifiedOpl(body: any) {
    return this.http.put(this.apiurl + "/verificar/opl", body)
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

  updateFieldRecepcionEasyCD(body: any){
    return this.http.put(this.apiurl + "/easy_cd/actualizar", body)
  }

  updateFieldRecepcionEasyOPL(body: any){
    return this.http.put(this.apiurl + "/easy_opl/actualizar", body)
  }

  // actualizar datos de bultos de opl

  agregarBultosOpl( body : any){
    return this.http.post(this.apiurl + "/easy_opl/bultos", body)
  }

  actualizarBultosOpl( body : any){
    return this.http.put(this.apiurl + "/easy_opl/bultos", body)
  }
}