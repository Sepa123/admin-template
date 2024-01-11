import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class LogInversaService {

  constructor(private http: HttpClient) { }

  apiurl="https://hela.transyanez.cl/api/log_inversa"
  // apiurl = "http://127.0.0.1:8000/api/log_inversa"

  get_estados_pedidos() {
    return this.http.get(this.apiurl + "/estados")
  }

  registrar_bitacora_lg(body : any) {
    return this.http.post(this.apiurl + "/registrar",body)
  }

  descargar_pendientes(body : any,fecha_inicio: string,fecha_fin : string) {
    this.http.post(this.apiurl + "/pendientes/descargar", body, {responseType:"blob"}).subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download =`Resumen_pendientes_${fecha_inicio}_${fecha_fin}.xlsx`; 
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

}
