import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionGpsService {

  constructor(private http: HttpClient) { }
  // private apiUrl = 'http://localhost:8000/api';
  private apiUrl="https://hela.transyanez.cl/api/transporte"

  getInfoList(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getInfoTable`);
  }

  oc_instalacion(oc_instalacion: any, id: any): Observable<any> {
    const url = `${this.apiUrl}/oc_instalación?oc_instalacion=${oc_instalacion}&id=${id}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  oc_baja(oc_baja: any, id: any): Observable<any> {
    const url = `${this.apiUrl}/oc_baja?oc_baja=${oc_baja}&id=${id}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  monto(monto: any, id: any): Observable<any> {
    const url = `${this.apiUrl}/monto?monto=${monto}&id=${id}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  descontado(descontado: any, id: any): Observable<any> {
    const url = `${this.apiUrl}/descontado?descontado=${descontado}&id=${id}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  devuelto(devuelto: any, id: any): Observable<any> {
    const url = `${this.apiUrl}/devuelto?devuelto=${devuelto}&id=${id}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}