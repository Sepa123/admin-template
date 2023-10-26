import { Component } from '@angular/core';
import { AreatiService } from 'src/app/service/areati.service';
import {ListaFuncion} from 'src/app/models/areati/listaFuncion.interface'

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.scss']
})
export class FuncionesComponent {
  
  constructor (private service : AreatiService) {}

  listaFunciones : ListaFuncion [] = []

  ngOnInit(){
    this.service.get_lista_funciones().subscribe(data => {
      this.listaFunciones = data
    })
  }
}
