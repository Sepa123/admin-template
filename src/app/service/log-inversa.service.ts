import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { RutaProducto } from 'src/app/models/log_inversa/rutaProducto.interface'
import { PendienteDia } from 'src/app/models/log_inversa/pendientesDia.interface'
import { BodegaVirtual } from 'src/app/models/log_inversa/bodegaVirtual.interface'
import { ProductoPicking } from '../models/productoPicking.interface';
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

  get_estados_pedidos_logistica_inversa() {
    return this.http.get(this.apiurl + "/estados/li")
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

  obtener_ruta_producto(body : any,tipo: boolean){
    if (tipo == false) { 
      return this.http.post<RutaProducto []>(this.apiurl + "/ruta/buscar/producto",body)
    } else {
      return this.http.post<RutaProducto []>(this.apiurl + "/ruta/buscar/nombre",body)
    }
  }

  lista_productos_ruta(ruta : string){
    return this.http.get(this.apiurl + `/ruta?nombre_ruta=${ruta}`)
  }

  get_estado_producto(cod_pedido : string){
    return this.http.get(this.apiurl + `/ruta/estados?cod_pedido=${cod_pedido}`)
  }



  get_pendientes_dia(fecha : string){
    return this.http.get<PendienteDia []>(this.apiurl + `/pendientes?fecha=${fecha}`)
  }

  get_bodega_virtual(){
    return this.http.get<BodegaVirtual []>(this.apiurl + `/bodega-virtual`)
  }

  reingresar_a_operacion(body : any){
    return this.http.post(this.apiurl + "/reingresar/operacion",body)
  }

  



}
