import { Component } from '@angular/core';
import { TocService } from 'src/app/service/toc.service'
import { BitacoraRango } from 'src/app/models/alertasVigentes.interface';
import { UsuarioTOC } from 'src/app/models/usuariosTOC.interface';
import { MainProductoIngresado, DatoPI } from 'src/app/models/TOC/productosIngresadosEasy.interface'
import { MainTelefonosTruncados, DatoTelefonos } from 'src/app/models/TOC/telefonosTruncados.interface';
import { ProductoAdelanto } from 'src/app/models/TOC/productosAdelanto.interface'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-productos-adelanto',
  templateUrl: './productos-adelanto.component.html',
  styleUrls: ['./productos-adelanto.component.scss']
})
export class ProductosAdelantoComponent {

  productoAdelanto : ProductoAdelanto [] = []

  constructor( private service : TocService){

  }

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }



  ngOnInit(){
    this.service.buscar_productos_adelanto().subscribe((data) => {
      this.productoAdelanto = data
    })
  }

  descargarExcel(){

    const datos: any[][] = [[]];

    datos.push(["Nombre","Dirección",'Región',"Ciudad","Teléfono","Entrega","Descripción","Fecha Compromiso Original",
      "Fecha Reprogramada",'Observación'])

    this.productoAdelanto.forEach((pedido) => {
        const fila: any[] = [];
        fila.push(pedido.Nombre, pedido.Direccion, pedido.Region, pedido.Ciudad, pedido.Telefono, pedido.entrega,pedido.Descripcion, pedido.Fecha_comp_original, pedido.Fecha_reprogramada,pedido.Observacion); 
        datos.push(fila);
      });

    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];
    // Crea un libro de Excel a partir de los datos
    const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
    const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');

    // Descarga el archivo Excel `Quadminds_Manual_${fechaActual}.xlsx` 
    
    const nombreArchivo = `producto-adelanto-${fechaActual}.xlsx`;
    // Nombre del archivo Excel a descargar 
    XLSX.writeFile(libroExcel, nombreArchivo);
  }

  ObservacionProducto: string = ''

  verObservacion(obs: string){
    this.ObservacionProducto = obs
    this.toggleLiveDemo()
  }
}
