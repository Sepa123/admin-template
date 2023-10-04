import { Component } from '@angular/core';
import { RsvService } from 'src/app/service/rsv.service'
import { EstructuraRSV } from 'src/app/models/estructuraRSV.interface';
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent {

  listaEstructura : EstructuraRSV [] = []
  estructuraSeleccion : string = ""

  constructor(private service : RsvService) {}

  ngOnInit(){
    this.service.get_lista_estructura().subscribe(data => {
      this.listaEstructura = data
    })
  }

  selecccionarEstructura(){
    alert(this.estructuraSeleccion)
  }
}
