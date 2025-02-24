import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { S } from '@fullcalendar/core/internal-common';


@Injectable({
  providedIn: 'root'
})
export class CitacionesService {

  private apiUrl = 'http://localhost:8000/api';
  //apiUrl = "https://hela.transyanez.cl/api/meli"
  constructor(private http: HttpClient) { }

  getModalidadOperacion(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/modalidad_operacion');
  }


  getConductoresList(id_ppu:string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/conductoresList?id_ppu=${id_ppu}`);
  }

  
  // getPeonetaList(fecha:string): Observable<any>{
  //   return this.http.get<any>(`${this.apiUrl}/peonetaList?fecha=${fecha}`);
  // }

  getEstadoList(): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/estadoList');
  }

  getOperaciones(fecha:any, id :any): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/citacionOperacionFecha?fecha=${fecha}&id=${id}`);
  }
  getPpu(fecha:any,op: number, cop:number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/citacion_cop?fecha=${fecha}&op=${op}&cop=${cop}`);
  }
  actualizarEstadoPpu(estado: any, id: any, fecha:string): Observable<any> {
    const url = `${this.apiUrl}/actualizar_estadoPpu?estado=${estado}&id=${id}&fecha=${fecha}`;
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  actualizarRutaMeli(ruta_meli: any, id: any, fecha:string): Observable<any> {
    const url = `${this.apiUrl}/actualizar_rutaMeli?ruta_meli=${ruta_meli}&id=${id}&fecha=${fecha}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  actualizarTipoRuta(tipo_ruta: any, id: any, fecha:string): Observable<any> {
    const url = `${this.apiUrl}/actualizar_tipoRuta?tipo_ruta=${tipo_ruta}&id=${id}&fecha=${fecha}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getEstadosSeleccionados(id_estado: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/nombreCitacion?id_estado=${id_estado}`);
}

  getPatenteCitacion(operacionValue:number, centroOperacionValue:number, fecha:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/patentesPorCitacion?op=${operacionValue}&cop=${centroOperacionValue}&fecha=${fecha}`);
  }


  ingresarAmbulancia(id_ppu_amb: any, id: any, fecha:string, ruta_meli_amb: number, ruta_amb_interna: string): Observable<any> {
    const url = `${this.apiUrl}/Ambulancia?id_ppu_amb=${id_ppu_amb}&ruta_meli_amb=${ruta_meli_amb}&ruta_amb_interna=${ruta_amb_interna}&fecha=${fecha}&id=${id}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  ingresarDriversPeoneta(id_driver: any, fecha: string, id_ppu: any, id_peoneta?: any): Observable<any> {
    let url = `${this.apiUrl}/ingresarDriversPeoneta?id_driver=${id_driver}&fecha=${fecha}&id_ppu=${id_ppu}`;
  
    if (id_peoneta !== undefined && id_peoneta !== null) {
      url += `&id_peoneta=${id_peoneta}`;
    }
  
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getCopFiltrado(operacion:any): Observable<any>{
    return this.http.get(`${this.apiUrl}/filtro/Cop?op=${operacion}`);
  }

  getpatentesFiltradas(id_operacion: number, id_centro_op: number):Observable<any>{
    return this.http.get(`${this.apiUrl}/filtroPatentesPorIdOp_y_IdCop?id_operacion=${id_operacion}&id_centro_op=${id_centro_op}`)
  }

  getTipoRuta(): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/tipoRuta');
  }

  GetAmbulanciaCode(): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/AmbulanceCode');
  }

   

  getTipoRutaColor(id_ppu: number, fecha: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/getEstados?fecha=${fecha}&id_ppu=${id_ppu}`);
  }

  postData(ruta_amb_interna: any, id_ppu: any, fecha: string, id_ppu_amb: number, ruta_meli_amb:string): Observable<any> {
    const url = `${this.apiUrl}/SaveData?ruta_amb_interna=${ruta_amb_interna}&id_ppu=${id_ppu}&fecha=${fecha}&id_ppu_amb=${id_ppu_amb}&ruta_meli_amb=${ruta_meli_amb}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  validarData():Observable<any>{
    return this.http.get(`${this.apiUrl}/validacion`);
  }

  infoAMB( fecha: string, op:number,cop:number,  id_ppu: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/infoAMB?fecha=${fecha}&op=${op}&cop=${cop}&id_ppu=${id_ppu}`);
  }

  Bitacora(id_usuario: any, ids_usuario: any, modificacion: string, latitud: any, longitud: any, origen: string): Observable<any> {
    const url = `${this.apiUrl}/BitacoraGeneral?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}&modificacion=${modificacion}&latitud=${latitud}&longitud=${longitud}&origen=${origen}`; 
    return this.http.post<any>(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  }