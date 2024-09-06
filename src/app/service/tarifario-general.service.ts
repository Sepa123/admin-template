import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarifarioGeneralService {

  constructor(private http: HttpClient) { }

   private apiUrl="http://localhost:8000/api"

   getOperacion(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getOperacion`);
  }
  getCentroOperacion(id_op: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getCentroOperacion?id_op=${id_op}`);
  }

  getTipoVehiculo(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getTipoVehiculo`);
  }
  GetCaracteristicasTarifa(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/GetCaracteristicasTarifa`);
  }
  
  getPeriodicidad(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getPeriodicidad`);
  }
  getInfoTable(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getInfoTable`);
  }
  getInfoTableSearch(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/infoTableToSearch`);
  }
  getCentroFiltro(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/CentroFilter`);
  }


  NuevaTarifa(id_usuario: any, ids_usuario: any, latitud:any, longitud: any, operacion: number, centro_operacion:number, tipo_vehiculo: number, capacidad:number, periodicidad:any, tarifa:any): Observable<any> {
    const url = `${this.apiUrl}/NuevaTarifa?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}&latitud=${latitud}&longitud=${longitud}&operacion=${operacion}&centro_operacion=${centro_operacion}&tipo_vehiculo=${tipo_vehiculo}&capacidad=${capacidad}&periodicidad=${periodicidad}&tarifa=${tarifa}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  insertDate(id : number, fecha_de_caducidad: string ): Observable<any> {
    const url = `${this.apiUrl}/insertDate?id=${id}&fecha_de_caducidad=${fecha_de_caducidad}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
