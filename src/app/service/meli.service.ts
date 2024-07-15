import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prefactura } from "../models/meli/prefactura.interface"

@Injectable({
  providedIn: 'root'
})
export class MeliService {

  private apiurl = 'http://localhost:8000/api/meli';
  // private apiurl = "https://hela.transyanez.cl/api/meli"

  constructor(private http: HttpClient) { }

  subirExcelPrefactura(formData : any, id_usuario : string, ids_usuario : string){
    return this.http.post(this.apiurl+`/subir/prefactura?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}`, formData)
  }


  subirExcelPrefacturaMensual(formData : any, id_usuario : string, ids_usuario : string){
    return this.http.post(this.apiurl+`/subir/billing-meli?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}`, formData)
  }

  getDatosPrefactura(){
    return this.http.get<Prefactura []>(this.apiurl+`/prefacturas` )
  }
}
