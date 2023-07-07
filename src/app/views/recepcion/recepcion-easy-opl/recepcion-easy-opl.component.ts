import { Component, OnDestroy } from '@angular/core';
import { RecepcionService } from 'src/app/service/recepcion.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoPicking } from 'src/app/models/productoPicking.interface';
import { ProductoOPL } from "src/app/models/productoOPL.interface"
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recepcion-easy-opl',
  templateUrl: './recepcion-easy-opl.component.html',
  styleUrls: ['../styles/recepcion.component.scss']
})
export class RecepcionEasyOplComponent {
  public svgContent!: SafeHtml;

  subRecepcion! : Subscription

  productosVerificados : ProductoOPL [] =[]
  productosPorVerificar : ProductoOPL [] = []
  codigoProducto!: string

  idPortal! : string


  constructor(private service: RecepcionService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    this.subRecepcion = this.service.updateRecepcionEasyOPL().subscribe((data) => {
      if(data.filter(producto => producto.Pistoleado == false).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Pistoleado == true).length === this.productosVerificados.length){
        console.log("esta data se repite")
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Pistoleado == false)
        this.productosVerificados = data.filter(producto => producto.Pistoleado == true)
      }      
      console.log("Cantidad de productos por verificar",this.productosPorVerificar.length)
      console.log("Cantidad de productos verificados",this.productosVerificados.length)
    })
  }


  cambiarTicketByInput(cod_producto: string){

    var codigo_producto = cod_producto.replace(/'/g, "-").trim().toUpperCase()
  
    codigo_producto = codigo_producto.replace(/-(\d+)/, "");

    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Easy OPL",
      "n_guia" : codigo_producto,
      "cod_pedido" : codigo_producto,
      "cod_producto" : codigo_producto,
      "ids_usuario" : this.idPortal 
      // "cod_sku" : sku
    }

    const url = `/easy_opl`

    this.service.updateVerifiedByInput(url,body).subscribe((data : any) => {
      // alert(data.message)
      this.codigoProducto = ""
    },(error) => {
      alert(error.error.detail)
    }
    )
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.subRecepcion.unsubscribe();
  }

  cambiarTicket(arrayIndex : number, cod_pedido: string, cod_producto :string) {
    this.productosPorVerificar[arrayIndex].Pistoleado = true
    
    // let productoAbajo = this.productosOPL.splice(arrayIndex,1);
    // console.log(productoAbajo)
    // this.productosOPL.push(productoAbajo[0])
    

    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Easy OPL",
      "n_guia" : cod_pedido,
      "cod_pedido" : cod_pedido,
      "cod_producto" : cod_producto,
      "ids_usuario" : this.idPortal 
      // "cod_sku" : sku
    }


    this.service.updateVerified(body).subscribe((data : any) => {
      // alert(data.message)
      this.codigoProducto = ""
    })
  }
}
