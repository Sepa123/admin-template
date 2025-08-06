import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RazonSocial } from '../models/modalidad-de-operaciones.interface';
import { CentroOperacion } from '../models/operacion/centroOperacion.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalidadDeOperacionesService {

  constructor(private http : HttpClient) { }

  // apiurl = "http://localhost:8000/api/operacion"
  apiurl="https://hela.transyanez.cl/api/operacion"
  // http://localhost:8000/Api/Modalidad

  getRazonesSocial(){
    return this.http.get<RazonSocial[]>(this.apiurl + '/modalidad')
  }

  updateServicioOperacion(body : any): Observable<any> {
    return this.http.put(`${this.apiurl}/actualizar/servicio/operacion`, body);
  }

  updateItemStatus(id: number, estado: boolean): Observable<any> {
    return this.http.post(`${this.apiurl}/actualizar_estado`, { id, estado });
  }

  getCentroOperacion(id_op : number){
    return this.http.get<CentroOperacion []>(this.apiurl + `/ver/centro_operacion?id_op=${id_op}`)
  }


  buscarModalidadOperacion(nombre : string){
    return this.http.get<RazonSocial[]>(this.apiurl + `/modalidad/buscar?nombre=${nombre}`)
  }

  agregarCentroOperacion(data:any){
    return this.http.post(this.apiurl + '/agregar/centro_operacion',data)
  }

  seleccionablesGrupoOperacion(){
    return this.http.get(this.apiurl + '/grupo_operaciones/campos')
  }

  centroOperacionAsigandoAVehiculo(id_op:number,id_ppu:number){
    return this.http.get<CentroOperacion []>(this.apiurl + `/ver/centro_operacion/asignado?id_op=${id_op}&id_ppu=${id_ppu}`)
  }

  getCentroOperaciones(){
    return this.http.get<CentroOperacion []>(this.apiurl + `/ver/centros_operaciones`)
  }

  EliminarCentroOperacion(id : number){
    return this.http.delete(this.apiurl+`/eliminar/centro_operacion?id=${id}`)
  }



}
