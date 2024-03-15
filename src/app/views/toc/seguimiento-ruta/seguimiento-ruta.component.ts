import { Component } from '@angular/core';
import { RutasService } from 'src/app/service/rutas.service';
import { seguimientoRuta } from 'src/app/models/TOC/seguimientoRuta.interface'

@Component({
  selector: 'app-seguimiento-ruta',
  templateUrl: './seguimiento-ruta.component.html',
  styleUrls: ['./seguimiento-ruta.component.scss']
})
export class SeguimientoRutaComponent {

  constructor( private service : RutasService){

  }

  segRuta : seguimientoRuta [] = []

  ngOnInit(){

    this.service.get_seguimiento_ruta().subscribe((data) => {
      this.segRuta = data
    })
  }


}
