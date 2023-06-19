import { Component } from '@angular/core';
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import { ProductoPicking } from 'src/app/models/productoPicking.interface';
import { TIService } from 'src/app/service/ti.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {

  tablaQuadmindFull! : ProductoPicking[];
  tablaQuadmindFilter! : ProductoPicking[];

  comunas!: string [];
  comunasSeleccionadas: string[] = [];

  fechasPedidos!: string []
  fechasPedidosSeleccionadas: string [] = []

  loadingQuadmind: boolean = true 
  constructor(private service: TIService) { }

  public svgContent!: SafeHtml;
  ngOnInit (): void {
    this.service.get_quadmind().subscribe(data => {
      this.tablaQuadmindFull = data
      this.comunas = [...new Set(this.tablaQuadmindFull.map(quadmind => quadmind.Ciudad ) )].sort((a,b) => a.localeCompare(b))
      this.fechasPedidos = [...new Set(this.tablaQuadmindFull.map(quadmind => quadmind.Fecha_pedido ) )].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      this.loadingQuadmind = false;
    },
    ((error) => {
      console.log(error.error.detail)
      alert("Hubo un error al cargar los datos, por favor intentelo mas tarde")
    }))
  }

  downloadQuadminds(){
    this.service.downloadResumenQuadmine()
  }

  downloadQuadmindsCompromiso(){
    this.service.downloadResumenQuadmineCompromiso()
  }

  downloadQuadmindsTamano(){
    this.service.downloadResumenQuadmindTamano()
  }
  
  filterByComuna () {
    // this.tablaQuadmindFilter = this.tablaQuadmindFull.filter(quadmind => this.comunasSeleccionadas.includes(quadmind.Ciudad) && this.fechasPedidosSeleccionadas.includes(quadmind.Fecha_pedido))
    this.tablaQuadmindFilter = this.tablaQuadmindFull.filter(quadmind => this.comunasSeleccionadas.includes(quadmind.Ciudad))
    this.downloadExcel()

    this.tablaQuadmindFilter = this.tablaQuadmindFull
  }


  selectComuna (comunaElegida :string) {
    this.comunasSeleccionadas.push(comunaElegida)
  }

  downloadExcel() : void{
    // Agrega una fila vacía al principio de los datos
    const datos: any[][] = [[]];

    datos.push(["Código del Cliente","Nombre","Calle y Número","Ciudad","Provincia/Estado","Latitud","Longitud","Teléfono con código de país",
                "Email","Código de Pedido","Fecha de Pedido","Operación E/R","Código de Producto","Descripción del Producto","Cantidad de Producto","Peso", 
                "Volumen","Dinero","Duración min","Ventana horaria 1","Ventana horaria 2","Notas","Agrupador",
                "Email de Remitentes","Eliminar Pedido Si - No - Vacío","Vehículo","Habilidades"])

    this.tablaQuadmindFilter.forEach((producto) => {
      const fila: any[] = [];
      fila.push(producto.Codigo_cliente, producto.Nombre, producto.Calle,producto.Ciudad, producto.Provincia,
                producto.Latitud, producto.Longitud, producto.Telefono,producto.Email, producto.Codigo_pedido,
                producto.Fecha_pedido, producto.Operacion, producto.Codigo_producto,producto.Descripcion_producto, producto.Cantidad_producto,
                producto.Peso, producto.Volumen, producto.Dinero, producto.Duracion_min, producto.Ventana_horaria_1,
                producto.Ventana_horaria_2, producto.Notas, producto.Agrupador,producto.Email_remitentes, producto.Eliminar_pedido,
                producto.Vehiculo, producto.Habilidades); 
    
      datos.push(fila);
    });

    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];
    // Crea un libro de Excel a partir de los datos
    const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
    const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');

    // Descarga el archivo Excel `Quadminds_Manual_${fechaActual}.xlsx` 
    const nombreArchivo = `Quadminds_${fechaActual}.xlsx`;
    // Nombre del archivo Excel a descargar 
    XLSX.writeFile(libroExcel, nombreArchivo);
  }
}
