import { Component } from '@angular/core';
import { AreatiService } from 'src/app/service/areati.service';
import {ListaFuncion} from 'src/app/models/areati/listaFuncion.interface'

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.scss']
})
export class FuncionesComponent {
  
  funcionSeleccionada : ListaFuncion [] = []
  constructor (private service : AreatiService) {
  }

  buscador : string = ""
  listaFunciones : ListaFuncion [] = []
  listaFuncionesFull : ListaFuncion [] = []

  isParametro : boolean= false
  

  isModalOpen: boolean = false
  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  
  openModal(){
    this.isModalOpen = true
  }

  closeModal(){
    this.isModalOpen = false
  }

  ngOnInit(){
    this.service.get_lista_funciones().subscribe(data => {
      this.listaFuncionesFull = data
      this.listaFunciones = data
    })
  }

  buscarFuncion(){
    if(this.buscador === "") return alert("Ingrese una palabra clave ")
    const data = this.listaFuncionesFull.filter(fun => fun.Palabras_clave.includes(this.buscador.trim()))
    console.log(data.length)
    if(data.length == 0) return alert("Palabra clave no encontrada ")
    this.listaFunciones = data
  }

  restablecerData(){
    this.listaFunciones = this.listaFuncionesFull
  }


  verParametros(funcion : ListaFuncion ){
    this.funcionSeleccionada = [funcion]
    this.toggleLiveDemo()
  }

  verTablasImpactadas(funcion : ListaFuncion ){
    this.funcionSeleccionada = [funcion]
    this.toggleLiveDemo()
  }

  verArrays(funcion : ListaFuncion, parametro : boolean ){
    this.isParametro = parametro
    this.funcionSeleccionada = [funcion]
    this.toggleLiveDemo()
  }

  
}
