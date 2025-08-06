import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { ListaMenu, ListaUsuarios, Menu } from '../models/panel/panel.interface';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(private http: HttpClient) { }

  apiurl="https://hela.transyanez.cl/api/panel"
  // apiurl = "http://127.0.0.1:8000/api/panel"

  get_lista_pefiles() {
    return this.http.get<Menu []>(this.apiurl + "/lista/perfiles")
  }

  get_lista_usuarios() {
    return this.http.get<ListaUsuarios []>(this.apiurl + "/lista/usuarios")
  }

  get_menu_usuarios(id_usuario: number) {
    return this.http.get<ListaMenu []>(this.apiurl + `/menu/usuario?id_usuario=${id_usuario}`)
  }


  actualizar_permisos_usuarios(body : any) {
    return this.http.post(this.apiurl + "/actualizar/permisos/usuarios", body)
  }

  
}
