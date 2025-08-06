import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarifarioService {

  constructor(private http: HttpClient) { }
  
  // private apiUrl="http://localhost:8000/api"
  private apiUrl="https://hela.transyanez.cl/api/finanzas"

  getInfoList(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/infoTarifas`);
  }
  IngresarNuevaTarifa(id_usuario: any, ids_usuario: any, nombre:string, valor_inferior: any, valor_superior: any, unidad:number): Observable<any> {
    const url = `${this.apiUrl}/NuevaTarifa?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}&nombre=${nombre}&valor_inferior=${valor_inferior}&valor_superior=${valor_superior}&unidad=${unidad}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  getTipoUnidad(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/TipoUnidad`);
  }
}
