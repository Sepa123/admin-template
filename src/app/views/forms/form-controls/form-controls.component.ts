import { Component } from '@angular/core';
import { TIService } from 'src/app/service/ti.service';
import { ProductoPicking } from "src/app/models/productoPicking.interface"
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss']
})
export class FormControlsComponent {


  showTable : boolean = false
  idProducto! : string

  ordenesCompra! : number 
  
  arrayProductosIngresados : string[] = []
  productoPicking! : ProductoPicking

  arrayProductos : ProductoPicking [] = []
  public favoriteColor = '#26ab3c';
  public svgContent!: SafeHtml;

  constructor(private service: TIService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  loadSvg() {
    this.http
      .get('assets/svg/icons8-delete-30.svg', { responseType: 'text' })
      .subscribe((svg: string) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }
  
  deleteData(id:string) {
    this.arrayProductos =  this.arrayProductos.filter(producto => producto.Codigo_cliente != id)
    this.arrayProductosIngresados = this.arrayProductosIngresados.filter(producto => producto != id)
    sessionStorage.setItem("data", JSON.stringify(this.arrayProductos));
  }

  addData( id: string) {
    var resultado = id.replace(/'/g, "-");
    if(this.arrayProductosIngresados.includes(resultado)) {
      this.idProducto = ""
      return alert("Este producto ya fue ingresado")
    }
    this.service.get_producto_picking(resultado).subscribe((data) => {
      this.productoPicking = data
      this.productoPicking.Codigo_producto = this.productoPicking.Codigo_producto.replace(/@/g, " ")
      // this.productoPicking.Codigo_producto = this.productoPicking.Codigo_producto.replace(/@/g, " ")
      this.arrayProductos.unshift(data)
      this.arrayProductosIngresados.push(resultado)
      sessionStorage.setItem("data", JSON.stringify(this.arrayProductos));
    },
    ((error) => {
      alert(error.error.detail)
    }))

    

    // this.arrayProductosIngresados.push(resultado)
    this.idProducto = ""

  }

  downloadExcel() : void{
    // Agrega una fila vacía al principio de los datos
    const datos: any[][] = [[]];

    datos.push(["Código del Cliente","Nombre","Calle y Número","Ciudad","Provincia/Estado","Latitud","Longitud","Teléfono con código de país",
                "Email","Código de Pedido","Fecha de Pedido","Operación E/R","Código de Producto","Descripción del Producto","Cantidad de Producto","Peso", 
                "Volumen","Dinero","Duración min","Ventana horaria 1","Ventana horaria 2","Notas","Agrupador",
                "Email de Remitentes","Eliminar Pedido Si - No - Vacío","Vehículo","Habilidades"])

    this.arrayProductos.forEach((producto) => {
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
    const nombreArchivo = `Quadminds_Manual_${fechaActual}.xlsx`;
    // Nombre del archivo Excel a descargar 
    XLSX.writeFile(libroExcel, nombreArchivo);
  }

  ngOnInit (): void {

    
    this.loadSvg()

    const datosSessionStorage = sessionStorage.getItem('data');
    if (datosSessionStorage) {
      this.arrayProductos = JSON.parse(datosSessionStorage);
    }
  }
  
}
