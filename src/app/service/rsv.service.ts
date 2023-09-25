import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {CatalogoRSV, ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface'

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

  editar_producto_rsv(body : any) {
    return this.http.put(this.apiurl + "/editar/producto", body)
  }

  agregar_nuevo_catalogo(body : any){
    return this.http.post(this.apiurl + "/agregar/carga", body)
  }

  get_carga_rsv(){
    return this.http.get(this.apiurl + "/cargas")
  }

  // filtrar catalogo por color

  filtrar_catalogo_por_color(color : number){
    return this.http.get<CatalogoPorColor[]>(this.apiurl + `/catalogo/color?color=${color}`)
  }

  // buscar si nombre_carga existe
  buscar_carga_por_nombre_carga(nombre_carga : string){
    return this.http.get(this.apiurl + `/carga/buscar?nombre_carga=${nombre_carga}`)
  }
}
