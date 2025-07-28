import { Component } from '@angular/core';
// import { TIService } from 'src/app/service/ti.service';
import { RutasService } from 'src/app/service/rutas.service';
import { ProductosService } from 'src/app/service/productos.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { ProductoPicking } from 'src/app/models/productoPicking.interface';
import { ProductosPorSKU } from 'src/app/models/productoPorSKU.interface';
import * as XLSX from 'xlsx';
import * as levenshtein from 'fastest-levenshtein';

@Component({
  selector: 'app-buscar-sku',
  templateUrl: './buscar-sku.component.html',
  styleUrls: ['./buscar-sku.component.scss']
})
export class BuscarSkuComponent {

  codigoSKU! : string
  isData! : boolean 

  productosSKU! : ProductosPorSKU []
  arrayProductosIngresados : ProductosPorSKU[] [] = []
  productosEnTabla : string [] = []


  public svgContent!: SafeHtml;

  constructor(private service: RutasService,private productoService: ProductosService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  calcularDiferencias(arrayRuta : ProductosPorSKU []) {
    const fechaActual = new Date();
    arrayRuta.forEach(item => {
      const fecha = new Date(item.Fecha_pedido);
      const diferencia = fecha.getTime() - fechaActual.getTime();
      const diferenciaDias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
      item.Diferencias_dias = diferenciaDias;
    });
  }

  ngOnInit () {
    this.isData = false

  }

  getProductoSKU (codigo : string) {
    this.productoService.getProductosPorSKU(codigo).subscribe((data) => {
      this.productosSKU = data
      this.calcularDiferencias(this.productosSKU)
      this.codigoSKU = ""
      this.isData = true
    },
    ((error) => {
      this.codigoSKU = ""
      this.isData = false
      alert(error.error.detail)
    }))
  }
}
