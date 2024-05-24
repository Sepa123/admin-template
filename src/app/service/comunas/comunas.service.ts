import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComunasService {

  constructor(private http : HttpClient) { }

  apiurl="https://hela.transyanez.cl/api/lista"
  // apiurl = "http://127.0.0.1:8000/api/lista"

  getListaRegiones(){
    return this.http.get<any[]>(this.apiurl + "/region")
  }

  getListaComunas(){
    return this.http.get<any[]>(this.apiurl + "/comuna")
  }
}
