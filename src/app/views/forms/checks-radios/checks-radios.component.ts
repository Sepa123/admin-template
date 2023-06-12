import { Component } from '@angular/core';
import { RutasService } from 'src/app/service/rutas.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { RutaEnActivo } from "src/app/models/rutaEnActivo.interface"


@Component({
  selector: 'app-checks-radios',
  templateUrl: './checks-radios.component.html',
  styleUrls: ['./checks-radios.component.scss']
})
export class ChecksRadiosComponent {

  rutaEnActivo! : RutaEnActivo []
  arraySKU: any[] = []
  arrayProducto: any[] = []

  constructor(private service: RutasService) { }

  ngOnInit() {
    this.service.get_rutas_en_activo(6).subscribe((data) => {
      // console.log(data)
      this.rutaEnActivo = data

      this.rutaEnActivo.map(ruta => {
        ruta.arraySKU = ruta.SKU.split('@')
        ruta.arrayProductos = ruta.Producto.split('@')
      })
      // let producto = this.rutaEnActivo.Codigo_producto.split(' @ ');
      // // this.productoPicking.numero = 1
      
      // this.arrayCodigo.push([...codigo]);
      // this.arrayDescripcion.push([...descripciones]);

      // this.productoPicking.arrayCodigo = this.arrayCodigo.pop()
      // this.productoPicking.arrayDescripcion = this.arrayDescripcion.pop()
      
    })
  }

}
