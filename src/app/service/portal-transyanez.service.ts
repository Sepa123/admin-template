import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Colaborador,DetallePago } from 'src/app/models/transporte/colaborador.interface' 
import { Vehiculo } from 'src/app/models/transporte/vehiculo.interface' 

@Injectable({
  providedIn: 'root'
})
export class PortalTransyanezService {

  constructor(private http: HttpClient) { }

  apiurl="https://hela.transyanez.cl/api/transporte"
  // apiurl = "http://127.0.0.1:8000/api/transporte" 

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

  httpOptions = {
    "headers": {
      "Content-Encoding": "gzip",
      "Cache-Control": "no-cache"
    },
    "responseType": "blob"
  }


  downloadArchivos(nombre : string) {
    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];

    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', '0');


    this.http.get(this.apiurl + `/descargar?name_file=${nombre}`, {responseType:"blob", headers : {
      "Content-Encoding": "gzip",
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      const nombre_archivo = nombre.split('/')[4]
      a.download = nombre_archivo;
      
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  obtenerColaboradores(){
    return this.http.get<Colaborador []>(this.apiurl+"/ver/colaboradores")
  }

  buscarVehiculos(){
    return this.http.get<Vehiculo []>(this.apiurl+"/buscar/vehiculos")
  }



  buscarColaboradores(nombre : string){
    return this.http.get<Colaborador []>(this.apiurl+`/buscar/colaboradores?nombre=${nombre}`)
  }

  activarColaborador(rut:string, activo : boolean){
    return this.http.get(this.apiurl+`/activar/colaborador?rut=${rut}&activar=${activo}`)
  }

  obtenerDetallePago(id : string){
    return this.http.get<DetallePago []>(this.apiurl+ `/ver/detalles_pago?id=${id}`)
  }


  actualizarColaborador(data : any){
    return this.http.put(this.apiurl+"/actualizar/colaborador",data)
  }

  actualizarDetallePago(data : any){
    return this.http.put(this.apiurl+"/actualizar/colaborador/datos/banco",data)
  }

  actualizarVehiculo(data : any){
    return this.http.put(this.apiurl+"/actualizar/datos/vehiculo",data)
  }

  verificarColaborador(rut:string){
    return this.http.get(this.apiurl+`/verificar/razon_social?rut=${rut}`)
  }

  buscarVehiculo(filtro:string){
    return this.http.get<Vehiculo []>(this.apiurl+`/buscar/vehiculo/${filtro}`)
  }


 registrarColaborador(data : any){
    return this.http.post(this.apiurl+"/agregar/colaborador",data)
  }

  registrarDetallePago(data : any){
    return this.http.post(this.apiurl+"/agregar/colaborador/datos/banco",data)
  }

  registrarVehiculos(data : any){
    return this.http.post(this.apiurl+"/agregar/vehiculos",data)
  }

  


 subirDocumentos(formData : any, tipo_archivo : string, nombre : string){
    return this.http.post(this.apiurl+`/colaboradores/subir-archivo?tipo_archivo=${tipo_archivo}&nombre=${nombre}`, formData)
  }

 subirDocumentosVehiculos(formData : any, tipo_archivo : string, nombre : string){
    return this.http.post(this.apiurl+`/vehiculos/subir-archivo?tipo_archivo=${tipo_archivo}&nombre=${nombre}`, formData)
  }
}
