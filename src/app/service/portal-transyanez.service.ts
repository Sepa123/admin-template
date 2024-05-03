import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class PortalTransyanezService {

  constructor(private http: HttpClient) { }

  // apiurl="https://hela.transyanez.cl/api/transporte"
  apiurl = "http://127.0.0.1:8000/api/transporte" 

  downloadResumenVehiculos() {
    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];

    this.http.get(this.apiurl + '/resumen_vehiculos_portal', {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `resumen_vehiculos_portal_${fechaActual}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }


 registrarColaborador(data : any){
    return this.http.post(this.apiurl+"/agregar/colaborador",data)
  }


 subirDocumentos(formData : any, tipo_archivo : string){
    return this.http.post(this.apiurl+`/colaboradores/subir-archivo?tipo_archivo=${tipo_archivo}`, formData)
  }
}
