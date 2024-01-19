import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NombreRutaService {
  private codigo!: string;
  private bultos!: number;
  private driver!: string;
  private patente!: string;
  private isUpdate: boolean = false
  private fecha! : string
  private despachador! : string

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

  setDataDriver(driver: string, patente: string,despachador : string){
    this.driver = driver
    this.patente = patente
    this.despachador = despachador
    this.driver == "" && this.patente == "" ? this.isUpdate = false : this.isUpdate = true
  }

  setFechaRuta(fecha : string){
    this.fecha = fecha
  }

  getFechaRuta(){
    return this.fecha
  }

  getDataDriver(){

    return {
      "driver": this.driver,
      "patente" : this.patente,
      "despachador" : this.despachador,
      "isUpdate": this.isUpdate
    }
  }
}
