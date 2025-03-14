import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionyMantencionService {

  constructor(private http: HttpClient) { }

  // apiUrl = "http://localhost:8000/api";
  apiUrl = "https://hela.transyanez.cl/api/panel";
  images = "https://hela.transyanez.cl/api/panel/image";
  
    getUsuarios(): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/cargarUsuarios/GestionyMantencion');
    }
    
    getFotoPerfil(filename: string): Observable<Blob> {
      return this.http.get(`${this.images}/foto_perfil/${filename}`, {
        responseType: 'blob'
      });
    }
    
    getAreas(): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/area/');
    }

    getRoles(): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/Rol');
    }
}