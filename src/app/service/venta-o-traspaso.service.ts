import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaOTraspasoService {

  constructor(private http: HttpClient) { }

  private apiUrl="http://localhost:8000/api"

  getInfoPpu(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/InfoPpu');
  }

  getInfoEmpresas(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/InfoEmp');
  }

  changeRazonSocial(razon_id: number, id: number ): Observable<any> {
    const url = `${this.apiUrl}/InsertChangeRazon?razon_id=${razon_id}&id=${id}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  bitacora(id_ppu: number, id_razon_Antigua: number, id_razon_nueva:number, observacion:string ): Observable<any> {
    const url = `${this.apiUrl}/bitacora?id_ppu=${id_ppu}&id_razon_Antigua=${id_razon_Antigua}&id_razon_nueva=${id_razon_nueva}&observacion=${observacion}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
