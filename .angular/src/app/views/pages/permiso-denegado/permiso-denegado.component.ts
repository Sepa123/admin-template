import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-permiso-denegado',
  templateUrl: './permiso-denegado.component.html',
  styleUrls: ['./permiso-denegado.component.scss']
})
export class PermisoDenegadoComponent {

  constructor(private location:Location){

  }
  
  volver(){
    this.location.back()
  }
}
