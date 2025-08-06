import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolSaveService {

  private rol_id!: string;
  // private bultos!: number;
  // private driver!: string;
  private usuario!: string;
  private email!: string;


  constructor() { }
 // Para el obtener el nombre de la ruta
  setRol(rol_id: string) {
    this.rol_id = rol_id;
  }

  getRol() {
    return this.rol_id;
  }

  setUsuario(usuario : string, email : string){
    this.usuario = usuario;
    this.email = email;
  }

  getUsuario(){
    return this.usuario
  }

  getEmail(){
    return this.email
  }

  // para obtener la cantidad de bultos

}
