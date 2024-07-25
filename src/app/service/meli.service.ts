import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prefactura,ResumenPrefactura } from "../models/meli/prefactura.interface"

@Injectable({
  providedIn: 'root'
})
export class MeliService {

  // private apiurl = 'http://localhost:8000/api/meli';
  private apiurl = "https://hela.transyanez.cl/api/meli"

  constructor(private http: HttpClient) { }

  subirExcelPrefactura(formData : any, id_usuario : string, ids_usuario : string){
    return this.http.post(this.apiurl+`/subir/prefactura?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}`, formData)
  }


  subirExcelPrefacturaMensual(formData : any, id_usuario : string, ids_usuario : string){
    return this.http.post(this.apiurl+`/subir/prefactura/billing-meli?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}`, formData)
  }

  subirExcelPrefacturaDiaria(formData : any, id_usuario : string, ids_usuario : string){
    return this.http.post(this.apiurl+`/subir/prefactura/diario?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}`, formData)
  }

  getDatosPrefactura(ano : string, mes : string){
    return this.http.get<Prefactura []>(this.apiurl+`/prefacturas?ano=${ano}&mes=${mes}` )
  }

  download_prefactura_excel( ano : string, mes : string) {
    this.http.get(`${this.apiurl}/descargar/prefacturas?ano=${ano}&mes=${mes}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      // a.download =`inventario-${dia}.xlsx`; 
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  getResumenDatosPrefactura(){
    return this.http.get<ResumenPrefactura>(this.apiurl+`/resumen/prefacturas` )
  }
}
