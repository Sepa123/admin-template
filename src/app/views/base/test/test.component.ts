import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Nominatim } from '../../../models/nominatim.interface'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  // direccion : string = "circunvalacion 772, puente alto"
  constructor (private http: HttpClient){

  }

  dataRecov! : Nominatim []
  direccion : string = ""


  buscarDatosDireccion(){
    this.http.get<Nominatim []>(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${this.direccion}`).subscribe((data) => {
      console.log(data)
      this.dataRecov = data
      console.log("Latitud :",this.dataRecov[0].lat)
      console.log("Longitud :",this.dataRecov[0].lon)
      console.log("Direccion: ",this.dataRecov[0].display_name)
    })
  }
}
