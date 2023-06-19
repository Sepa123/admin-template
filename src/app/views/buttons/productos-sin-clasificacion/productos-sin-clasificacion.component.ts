import { Component } from '@angular/core';
import { ProductosService } from 'src/app/service/productos.service';
import { ProductoSinClasificacion } from 'src/app/models/productoSinClasificacion.interface'

@Component({
  selector: 'app-productos-sin-clasificacion',
  templateUrl: './productos-sin-clasificacion.component.html',
  styleUrls: ['./productos-sin-clasificacion.component.scss']
})
export class ProductosSinClasificacionComponent {

  productosSinClasificacion! : ProductoSinClasificacion []
  insertProducto! : ProductoSinClasificacion

  constructor(private service: ProductosService) { }

  ngOnInit():void {
    this.service.getProductosSinClasificacion().subscribe((data) => {
      this.productosSinClasificacion = data.sort((a,b) => a.Descripcion.localeCompare(b.Descripcion) )
      // console.log(this.productosSinClasificacion)
    })
  }

  addTalla(talla :string, producto : ProductoSinClasificacion) {
    producto.Talla = talla
    const id  = sessionStorage.getItem("id")
    producto.Origen = `TY (${id})`
    producto.buttonDisabled = true;

    this.service.postProductoSinClasificacion(producto).subscribe((response) => {
      // this.productosSinClasificacion = this.productosSinClasificacion.filter(productoFiltro => productoFiltro.SKU !== producto.SKU )
      // alert("producto agregado")
      
    },
    (error) => {
      alert('Error al enviar los datos');
      // Maneja el error de manera adecuada
    }
    
    )

  }


}
