import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  private latitud!: string;
  private longitud!: string;

  constructor() { }
 // Para el obtener el nombre de la ruta

  setLocalizacion(latitud: string, longitud: string) {
    this.latitud = latitud;
    this.longitud = longitud;
  }

  getLocalizacion() {
    return {
      "latitud": this.latitud,
      "patente" : this.longitud
    }
  }



}