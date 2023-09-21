import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {CatalogoRSV, ColoresRSV } from 'src/app/models/catalogoRSV.iterface'

@Injectable({
  providedIn: 'root'
})
export class RsvService {

  constructor( private http : HttpClient) { }

  apiurl = "https://hela.transyanez.cl/api/rsv"
  // apiurl = "http://127.0.0.1:8000/api/rsv"

  get_catalogo_rsv() {
    return this.http.get<CatalogoRSV[]>(this.apiurl + `/catalogo`)
  }

  get_colores_rsv() {
    return this.http.get<ColoresRSV[]>(this.apiurl + `/colores`)
  }

  agregar_nuevo_producto_rsv(body : any) {
    return this.http.post(this.apiurl + "/agregar/producto", body)
  }

  buscar_producto_existente_rsv(codigo : string) {
    return this.http.get(this.apiurl + `/buscar/${codigo}`)
  }
}
