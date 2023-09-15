import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoPicking } from 'src/app/models/productoPicking.interface'; 
import { CargaQuadmind } from '../models/cargas/cargaQuadmind.interface';
@Injectable({
  providedIn: 'root'
})
export class CargaService {

  constructor(private http : HttpClient) { }

  apiurl="https://hela.transyanez.cl/api/cargas"
  // apiurl = "http://127.0.0.1:8000/api/cargas"

  get_quadmind() {
    return this.http.get<CargaQuadmind[]>(this.apiurl+"/quadminds")
  }

  get_quadmind_separado(tienda : string) {
    return this.http.get<CargaQuadmind[]>(this.apiurl+"/quadminds"+tienda)
  }

  get_quadmind_limit(offset : number) {
    return this.http.get<CargaQuadmind[]>(this.apiurl+`/quadminds/limit?offset=${offset}`)
  }

  send_quadmind_download(body : CargaQuadmind[]) {
    return this.http.post(this.apiurl+"/quadminds/descargar", body)
  }

  asignar_ruta_quadmind(id_usuario : any) {
    return this.http.post(this.apiurl + `/quadminds/asignar?id_usuario=${id_usuario}`, id_usuario)
  }


  upload_quadmind_manual(formData : any, id_usuario : string){
    return this.http.post(this.apiurl+`/quadminds/subir-archivo?id_usuario=${id_usuario}`, formData)
  }
}
