import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prefactura,ResumenPrefactura } from "../models/meli/prefactura.interface"
import { InfoFotos, MainCitacionS } from "../models/meli/citacionSupervisor.interface"
import { MainCitacionA, ResumenSupervisores } from "../models/meli/citacionActiva.interface"
import { ReporteMeliFinanza } from "../models/meli/reporteMeliFinanzas.interface"
@Injectable({
  providedIn: 'root'
})
export class MeliService {

  // private apiurl = 'http://localhost:8000/api/meli'
  private apiurl = "https://hela.transyanez.cl/api/meli"

  constructor(private http: HttpClient) { }

  subirExcelPrefactura(formData : any, id_usuario : string, ids_usuario : string){
    return this.http.post(this.apiurl+`/subir/prefactura?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}`, formData)
  }


  subirExcelPrefacturaMensual(formData : any, id_usuario : string, ids_usuario : string){
    return this.http.post(this.apiurl+`/subir/prefactura/billing-meli?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}`, formData)
  }

  subirExcelPrefacturaDiaria(formData : any, id_usuario : string, ids_usuario : string, latitud: string, longitud : string){
    return this.http.post(this.apiurl+`/subir/prefactura/diario?id_usuario=${id_usuario}&ids_usuario=${ids_usuario}&latitud=${latitud}&longitud=${longitud}`, formData)
  }

  getDatosPrefactura(ano : string, mes : string){
    return this.http.get<Prefactura []>(this.apiurl+`/prefacturas?ano=${ano}&mes=${mes}` )
  }

  getDatosPrefacturaLimit(ano : string, mes : string){
    return this.http.get<Prefactura []>(this.apiurl+`/prefacturas/limit?ano=${ano}&mes=${mes}` )
  }

  download_prefactura_excel( ano : string, mes : string) {
    this.http.get(`${this.apiurl}/descargar/prefacturas?ano=${ano}&mes=${mes}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      // a.download =`inventario-${dia}.xlsx`; 
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  getEstadoList(): Observable<any>{
    return this.http.get<any>(this.apiurl + '/estadoList');
  }

  getResumenDatosPrefactura(){
    return this.http.get<ResumenPrefactura>(this.apiurl+`/resumen/prefacturas` )
  }


  getDatosCitacionSupervisor(id_usuario : string, fecha : string){
    return this.http.get<MainCitacionS []>(this.apiurl+`/citacion_supervisor?id_usuario=${id_usuario}&fecha=${fecha}` )
  }

  getDatosCitacionActiva(op: number,cop : number, fecha : string){
    return this.http.get<MainCitacionA []>(this.apiurl+`/citacion_activa?op=${op}&cop=${cop}&fecha=${fecha}` )
  }

  guardarDatosCitacionSupervisores(formData : any){
    return this.http.post(this.apiurl+`/citacion_supervisores/guardar`, formData)
  }

  getResumenRutaSupervisores(fecha_ini : string,fecha_fin : string,id:string){
    return this.http.get<ResumenSupervisores []>(this.apiurl+`/resumen/rutas/supervisor?fecha_ini=${fecha_ini}&fecha_fin=${fecha_fin}&usuario=${id}`)
  }

  getReporteMeliFinanza(fecha_ini : string,fecha_fin : string){
    return this.http.get<ReporteMeliFinanza []>(this.apiurl+`/listar/rutas?fecha_ini=${fecha_ini}&fecha_fin=${fecha_fin}`)
  }


  getInfoFotosPatente(ppu : string){
    return this.http.get<InfoFotos>(this.apiurl+`/image/fotos/${ppu}`)
  }

}
