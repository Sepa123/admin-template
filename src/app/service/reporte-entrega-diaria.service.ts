import { Injectable } from '@angular/core';
import { ReporteEfectividadConductor, ReporteEntregasConductor, ReporteEstadoEntregas, NombreRegion } from '../models/reporteEntregaDiaria.interface';
import { HttpClient } from '@angular/common/http';
import { interval,Observable, switchMap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteEntregaDiariaService {

  apiurl = 'https://hela.transyanez.cl/api/rutas';
  // /no_entregados/total?fecha=20240224&tienda=Easy&region=XIII continuación apiurl
  apiurl2 ='https://hela.transyanez.cl/api/rutas';
  // /media/eficiencia/conductor?fecha=20240228&tienda=undefined&region=undefined
  apiurl3 ='https://hela.transyanez.cl/api/rutas';
  // /eficiencia/conductor?fecha=20240228&tienda=undefined&region=undefined
  apiurl4 = 'https://hela.transyanez.cl/api/rutas';

  constructor(private http: HttpClient) { }

  EntregasFechaConductor(fecha : string, tienda? : any, region?: any ): Observable<any>{
    return this.http.get<ReporteEstadoEntregas []>(this.apiurl + `/no_entregados/total?fecha=${fecha}&tienda=${tienda}&region=${region}`)
  }

  eficienciaConductor(fecha: string, tienda?: any, region?: any) {  
    return this.http.get< ReporteEfectividadConductor>(this.apiurl2 +  `/media/eficiencia/conductor?fecha=${fecha}&tienda=${tienda}&region=${region}`)
  }
  reporteEntregaConductor(fecha:string, tienda?:any, region?:any ){
    return this.http.get<ReporteEntregasConductor[]>(this.apiurl3 + `/eficiencia/conductor?fecha=${fecha}&tienda=${tienda}&region=${region}`)
  }
  getNombreRegion(){
    return this.http.get<NombreRegion[]>(this.apiurl4 + '/regiones')
  }
}

