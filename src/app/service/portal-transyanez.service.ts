import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class PortalTransyanezService {

  constructor(private http: HttpClient) { }

  apiurl = "http://34.225.63.221/api/transyanez/resumen_vehiculos_portal_"
  
  downloadResumenVehiculos() {
    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];

    this.http.get(this.apiurl+fechaActual, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `resumen_vehiculos_portal_${fechaActual}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }
}
