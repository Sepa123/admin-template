import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Carga } from "../models/cargas.interface"
@Injectable({
  providedIn: 'root'
})
export class TIService {

  constructor(private http: HttpClient) { }

  apiurl="http://127.0.0.1:8000/api/reportes"
  
  Getcargas(){
    return this.http.get<Carga[]>(this.apiurl+"/cargas_easy")
  }

  downloadBeetrackMensual(){
    // let date = new Date();
    // const fechaActual = date.toISOString().split('T')[0];
    this.http.get(this.apiurl+"/NS_beetrack_Mensual", {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `NS_Beetrack_Mensual.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  downloadResumenQuadmine() {
    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];

    this.http.get(this.apiurl+"/clientes", {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `Carga_Quadminds_${fechaActual}-hh24miss.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  get_historico_mensual(){
    return this.http.get("/historico/anual")
  }
}
