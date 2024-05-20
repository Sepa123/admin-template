import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RazonSocial } from '../models/modalidad-de-operaciones.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModalidadDeOperacionesService {

  constructor(private http : HttpClient) { }

  apiurl = "http://localhost:8000/Api/"
  apiUrl2 = "http://localhost:8000"
  // http://localhost:8000/Api/Modalidad
  
  getRazonesSocial(){
    return this.http.get<RazonSocial[]>(this.apiurl + 'Modalidad')
  }
  updateItemStatus(id: number, estado: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl2}/actualizar_estado`, { id, estado });
  }

}
  