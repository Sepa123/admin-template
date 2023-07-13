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

  setDataDriver(driver: string, patente: string){
    this.driver = driver
    this.patente = patente
    this.driver == "" && this.patente == "" ? this.isUpdate = false : this.isUpdate = true


  }

  getDataDriver(){

    return {
      "driver": this.driver,
      "patente" : this.patente,
      "isUpdate": this.isUpdate
    }
  }
}
