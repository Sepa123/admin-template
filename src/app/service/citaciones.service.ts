import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { S } from '@fullcalendar/core/internal-common';


@Injectable({
  providedIn: 'root'
})
export class CitacionesService {

  // private apiUrl = 'http://localhost:8000/api';
  apiUrl = "https://hela.transyanez.cl/api/meli"
  constructor(private http: HttpClient) { }

  getModalidadOperacion(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/modalidad_operacion');
  }


  getConductoresList(): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/conductoresList');
  }

  
  getPeonetaList(): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/peonetaList');
  }

  getEstadoList(): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/estadoList');
  }

  getOperaciones(): Observable<any>{
    return this.http.get<any>(this.apiUrl + `/citacionOperacionFecha?fecha=20240607&id=1`);
  }
  getPpu(): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/citacion_cop?fecha=2024-06-07&op=23&cop=222');
  }
  actualizarEstadoPpu(estado: any, id: any): Observable<any> {
    const url = `${this.apiUrl}/actualizar_estadoPpu?estado=${estado}&id=${id}`;
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  actualizarRutaMeli(ruta_meli: any, id: any): Observable<any> {
    const url = `${this.apiUrl}/actualizar_rutaMeli?ruta_meli=${ruta_meli}&id=${id}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getEstadosSeleccionados(id_estado: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/nombreCitacion?id_estado=${id_estado}`);
}

  getPatenteCitacion(op:number, cop:number, fecha:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/api/patentesPorCitacion?op=${op}&cop=${cop}&fecha=${fecha}`);
  }

}