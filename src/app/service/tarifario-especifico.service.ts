import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarifarioEspecificoService {

  constructor(private http: HttpClient) { }

  // private apiUrl="http://localhost:8000/api/finanzas/tarifarioEspecifico"
  private apiUrl="https://hela.transyanez.cl/api/finanzas/tarifarioEspecifico"

getInfoTableTE(): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/tablaTarifarioEspecifico`);
  
}
getOperacion(): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/getOperacion`);
}
getCentroOperacion(id_op: number): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/getCentroOperacion?id_op=${id_op}`);
}

getTipoVehiculo(): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/getTipoVehiculo`);
}
getPeriodicidad(): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/getPeriodicidad`);
}
getCentroFiltro(): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/CentroFilter`);
}

getColaborador(): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/Colaborador`);
}
getVehiculoFilter(id: number): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/vehiculosXpatente?id=${id}`);
}

getInfoTableSearch(): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/infoTableToSearchTe`);
}
NuevaTarifa(id_usuario: any, ids_usuario: any, latitud:any, longitud: any, ppu: number, razon_social:number,operacion: number, centro_operacion: number, periodicidad:any, tarifa:any): Observable<any> {
  const url = `${this.apiUrl}/NuevaTarifa?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}&latitud=${latitud}&longitud=${longitud}&ppu=${ppu}&razon_social=${razon_social}&operacion=${operacion}&centro_operacion=${centro_operacion}&periodicidad=${periodicidad}&tarifa=${tarifa}`; 
  return this.http.post<any>(url, {}, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}
insertDate(id : number, fecha_de_caducidad: string ): Observable<any> {
  const url = `${this.apiUrl}/insertDateTe?id=${id}&fecha_de_caducidad=${fecha_de_caducidad}`; 
  return this.http.post<any>(url, {}, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}
}

