import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { SeleccionesDescuentos, SeleccionOperaciones , Descuentos} from '../models/finanzas/descuentos.interface'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FinanzasService {

  constructor(private http: HttpClient) { }
  
  // private apiUrl="http://localhost:8000/api/finanzas"
  private apiUrl="https://hela.transyanez.cl/api/finanzas"

  private apiUrlTest="http://localhost:8000/api/"

  seleccionesDescuentos(){
    return this.http.get< SeleccionesDescuentos>(`${this.apiUrl}/selecciones/descuentos`);
  }

  seleccionesOperaciones(){
    return this.http.get< SeleccionOperaciones []>(`${this.apiUrl}/selecciones/operaciones`);
  }


 obtenerDescuentos(fecha_ini : string, fecha_fin : string){
    return this.http.get<Descuentos []>(`${this.apiUrl}/obtener/descuentos?fecha_ini=${fecha_ini}&fecha_fin=${fecha_fin}`);
  }


  subirArchivoAdjunto(formData : any, id : string){
    return this.http.post(`${this.apiUrl}/subir/archivo?id=${id}`, formData)
  }



  guardarDescuento(formData : any){
    return this.http.post(`${this.apiUrl}/guardar/descuento`, formData)
  }


  actualizarDescuento(form :any){
    return this.http.put(`${this.apiUrl}/actualizar/descuento`, form)
  }

  descargarArchivoAdjunto(name_file : string){
    return this.http.get(`${this.apiUrl}/descargar/archivo?name_file=${name_file}`, { responseType: 'blob' });
  }

  actualizarAplica(id: number, nuevoValor: boolean): Observable<any> {
    const body = { id, nuevo_valor: nuevoValor };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.patch(`${this.apiUrlTest}ActualizarAplica/`, body, { headers });
  }
}
