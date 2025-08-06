import { Component } from '@angular/core';
// import { TIService } from 'src/app/service/ti.service';
// import { RutasService } from 'src/app/service/rutas.service';

import { ProductosService } from 'src/app/service/productos.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoPicking } from 'src/app/models/productoPicking.interface';
import { ProductoOPL } from "src/app/models/productoOPL.interface"
import * as XLSX from 'xlsx';
import * as levenshtein from 'fastest-levenshtein';


@Component({
  selector: 'app-recepcion-opl',
  templateUrl: './recepcion-opl.component.html',
  styleUrls: ['./recepcion-opl.component.scss']
})
export class RecepcionOplComponent {

  public svgContent!: SafeHtml;

  productosOPL! : ProductoOPL []
  codigoProducto!: string



  constructor(private service: ProductosService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  
  obtenerFechaActual(): string {
    const fecha = new Date();
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return year + month + day;
  }

  buscarProductoOPL(codigo : string) {
    this.service.getProductosPickingOPLBySKU(codigo).subscribe(data => {
      this.productosOPL = data
    },
    ((error) => {
      alert(error.error.detail)
    }))

  }

  ngOnInit() {
    this.service.getProductosPickingOPL().subscribe((data) => {
      this.productosOPL = data
    })
  }

  cambiarTicket(arrayIndex : number, cod_pedido: string, sku :string) {
    this.productosOPL[arrayIndex].Pistoleado = true
    let productoAbajo = this.productosOPL.splice(arrayIndex,1);
    console.log(productoAbajo)
    this.productosOPL.push(productoAbajo[0])
    

    const body = {
      "cod_producto" : cod_pedido,
      "cod_sku" : sku
    }

    this.service.updateProductoPickingOPL(body).subscribe((data : any) => {
      alert(data.message)
    })
  }
  
}
