import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { CentroOperacion } from '../models/operacion/centroOperacion.interface';


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

   verCOusuario(id: string, server : string){
    return this.http.get(this.apiurl + `/centro_operacion/usuario?id=${id}&server=${server}`)
  }
  
  get_co_op_lista_coordinadores (id: string){
    return this.http.get<CentroOperacion []>(this.apiurl + `/centro_operacion/lista?id=${id}`)
  }

  asignar_usuario_a_co(formData : any){
    return this.http.post(this.apiurl+`/asignar/coordinador/co`, formData)
  }

 eliminar_usuario_de_co(formData : any){
    return this.http.post(this.apiurl+`/eliminar/coordinador/co`, formData)
  }
}
