import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NombreRutaService {
  private codigo!: string;

  constructor() { }

  setCodigo(codigo: string) {
    this.codigo = codigo;
  }

  getCodigo() {
    return this.codigo;
  }
}
