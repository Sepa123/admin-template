import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 


@Injectable({
  providedIn: 'root'
})
export class RegistrarUsuarioService {

  constructor(private http : HttpClient) { }

  apiurl="https://hela.transyanez.cl/api/panel"
  // apiurl = "http://127.0.0.1:8000/api/panel"

  registrarNuevoUsuario(data : any) {
    return this.http.post(this.apiurl + "/registrar", data)
  }

  getDatosUsuario(id: string, server : string){
    return this.http.get(this.apiurl + `/ver/datos?id=${id}&server=${server}`)
  }


  cambiarPassword(data : any) {
    return this.http.post(this.apiurl + "/nueva/password", data)
  }

  subirImagenPerfil(formData : any, id_user : string, ids_user : string){
    return this.http.post(this.apiurl+`/subir-imagen?id_user=${id_user}&ids_user=${ids_user}`, formData)
  }

  getFotoPerfil(filename: string) {
    return this.http.get(this.apiurl+`/foto-perfil?name_file=${filename}`, { responseType: 'blob' });
  }

  actualizarDatosUsuario(formData : any){
    return this.http.put(this.apiurl+`/actualizar/datos/usuario`, formData)
  }
}
