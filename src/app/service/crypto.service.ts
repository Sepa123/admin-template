import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  // private apiUrl = 'http://localhost:8000'; // Cambia esto por la URL de tu API si es diferente
  private apiUrl="https://hela.transyanez.cl/api"

  constructor(private http: HttpClient) {}

  // Método para obtener la clave pública
  getPublicKey(): Observable<any> {
    return this.http.get(`${this.apiUrl}/public-key`);
  }

  // Método para enviar datos cifrados y recibir los datos descifrados
  decryptData(encryptedData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/decrypt`, encryptedData);
  }
}
