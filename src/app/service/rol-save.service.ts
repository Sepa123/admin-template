import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolSaveService {

  private rol_id!: string;
  // private bultos!: number;
  // private driver!: string;
  // private patente!: string;
  // private isUpdate: boolean = false

  constructor() { }
 // Para el obtener el nombre de la ruta
  setRol(rol_id: string) {
    this.rol_id = rol_id;
  }

  getRol() {
    return this.rol_id;
  }

  // para obtener la cantidad de bultos

}
