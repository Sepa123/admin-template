import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NombreRutaService {
  private codigo!: string;
  private bultos!: number;

  constructor() { }
 // Para el obtener el nombre de la ruta
  setCodigo(codigo: string) {
    this.codigo = codigo;
  }

  getCodigo() {
    return this.codigo;
  }

  // para obtener la cantidad de bultos

  setBultos(bultos : number) {
    this.bultos = bultos
  }

  getBultos(){
    return this.bultos
  }
}
