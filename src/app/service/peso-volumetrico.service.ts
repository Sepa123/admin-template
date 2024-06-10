import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesoVolumetricoService {
  // private apiUrl = 'http://localhost:8000/api/transporte'; // Reemplaza con la URL de tu API

  private apiUrl = 'https://hela.transyanez.cl/api/transporte'

  constructor(private http: HttpClient) { }
  

  getSuggestions(query: any): Observable<any[]> {
    console.log(`Fetching suggestions for query: ${query}`);
    return this.http.get<any[]>(`${this.apiUrl}/buscar/sku_descripcion?sku_descripcion=${query}`);
  }
  getArrayTable(sku: any): Observable<any[]> {
    console.log (`prueba test: ${sku}`);
     return this.http.get<any[]>(`${this.apiUrl}/mostrarDatosTable?sku=${sku}`);
  }
}
