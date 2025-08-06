import { Component } from '@angular/core';
import { EtiquetaRSV } from 'src/app/models/etiquetaRSV.interface'
import { RsvService } from 'src/app/service/rsv.service';
@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class RecepcionComponent {


  constructor(private service :RsvService){

  }

  codigoProducto : string = ""
  cargaActual : string = ""

  cargas : string [] = []

  productosVerificados : EtiquetaRSV [] = []
  productosPorVerificar : EtiquetaRSV [] = []

  cantNoVerificados : number = 0
  cantVerificados : number = 0


  ngOnInit(){
    this.service.get_etiquetas().subscribe((data) => {
      
      // array de cargas
      this.cargas = data.map((producto) => producto.Carga)
      const set = new Set(this.cargas)
      this.cargas = [...set]

      //recuento de recepcionados y no recepcionados

      this.cantVerificados = data.filter(producto => producto.Verificado == true).length
      this.cantNoVerificados = data.filter(producto => producto.Verificado == false).length

      /// rellerar tabla con su respectiva condición
      if(data.filter(producto => producto.Verificado == false).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Verificado == true).length === this.productosVerificados.length){
        console.log("esta data se repite")
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Verificado == false)
        this.productosVerificados = data.filter(producto => producto.Verificado == true)
      }   
  
  
      // this.productosPorVerificados
    })
  }

  // this.cantRecepcionados = data.filter(producto => producto.Recepcion == true).length
  //     this.cantNoRecepcionados = data.filter(producto => producto.Recepcion == false).length

  //     if(data.filter(producto => producto.Recepcion == false).length === this.productosPorVerificar.length
  //     && data.filter(producto => producto.Recepcion == true).length === this.productosVerificados.length){
  //       // console.log("esta data se repite")
  //     }else{
  //       this.productosPorVerificar = data.filter(producto => producto.Recepcion == false)
  //       this.productosVerificados = data.filter(producto => producto.Recepcion == true)
  //     }   

  filterByCarga(carga : string){

  }

}
