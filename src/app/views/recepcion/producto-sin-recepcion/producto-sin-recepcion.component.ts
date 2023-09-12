import { Component } from '@angular/core';
import { RecepcionService } from '../../../service/recepcion.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoOPL } from "../../../models/productoOPL.interface"
import { TIService } from "../../../service/ti.service";
import { CargasComparacion } from '../../../models/cargasComparacion.interface';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-producto-sin-recepcion',
  templateUrl: './producto-sin-recepcion.component.html',
  styleUrls: ['../styles/recepcion.component.scss']
})
export class ProductoSinRcepcionComponent {
  public svgContent!: SafeHtml;

  cantRecepcionados : number = 0
  cantNoRecepcionados : number = 0
  clientesActuales : string = "Todas"


  subRecepcion! : Subscription

  productosVerificados : ProductoOPL [] = []
  productosPorVerificar : ProductoOPL [] = []
  codigoProducto!: string

  nombreCliente: string[] = [];
  clientes! : ProductoOPL []

  idPortal!: string 



  constructor(private service: RecepcionService, private http: HttpClient, private sanitizer: DomSanitizer,
              private tiService : TIService) { }

  
  obtenerFechaActual(): string {
    const fecha = new Date();
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return year + month + day;
  }

  subRecepcionProductos(){
    this.subRecepcion = this.service.updateProductoSinRecepcion().subscribe((data) => {
      this.cantRecepcionados = data.filter(producto => producto.Recepcion == true ).length
      this.cantNoRecepcionados = data.filter(producto => producto.Recepcion == false ).length

      if(data.filter(producto => producto.Recepcion == false).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Recepcion == true).length === this.productosVerificados.length){
        // console.log("esta data se repite")
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Recepcion == false)
        this.productosVerificados = data.filter(producto => producto.Recepcion == true)
      }      
    })
  }

  initRecepcionProductos(){
    this.service.getProductoSinRecepcion().subscribe((data) => {
      this.cantRecepcionados = data.filter(producto => producto.Recepcion == true).length
      this.cantNoRecepcionados = data.filter(producto => producto.Recepcion == false).length

      if(data.filter(producto => producto.Recepcion == false).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Recepcion == true).length === this.productosVerificados.length){
        // console.log("esta data se repite")
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Recepcion == false)
        this.productosVerificados = data.filter(producto => producto.Recepcion == true)
      }      
    })
  }


  ngOnInit() {
    
    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    console.log(this.idPortal)
    this.subRecepcionProductos()
    //obtenemos del modelo de productoOpl el dato del cliente
    this.service.getProductoSinRecepcion().subscribe((data)=>{
    this.clientes = data;
    this.datoCliente();
    })
    
   
    this.initRecepcionProductos()
  }
    datoCliente() {
        //set permite reservar datos unicos(no se repiten los nombres de clientes)
    const clientesSet = new Set<string>();
    this.clientes.forEach((producto) => {
      clientesSet.add(producto.Cliente);
    });
    //covnertir en array
    this.nombreCliente = Array.from(clientesSet);
  
}



  filterByCliente(nombreCliente : string){
    // const n = this.productosPorVerificar.filter(producto => producto.Carga === nro_carga).length
    this.clientesActuales = nombreCliente
    this.subRecepcion.unsubscribe();
    if(nombreCliente === "Todos"){
      this.initRecepcionProductos()
      this.subRecepcionProductos()

    } else {
    this.subRecepcion.unsubscribe();
    this.service.getProductoSinRecepcion().subscribe((data) => {
  
      
      this.productosPorVerificar = data.filter(producto => producto.Cliente === nombreCliente)
      this.productosVerificados = data.filter(producto => producto.Cliente === nombreCliente)
      
      this.cantRecepcionados = this.productosVerificados.filter(producto => producto.Recepcion == true).length
      this.cantNoRecepcionados = this.productosPorVerificar.filter(producto => producto.Recepcion == false).length
      

      console.log(this.cantRecepcionados)
      console.log(this.cantNoRecepcionados)
      if(data.filter(producto => producto.Recepcion == false && producto.Cliente === nombreCliente).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Recepcion == true && producto.Cliente === nombreCliente).length === this.productosVerificados.length){
   
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Recepcion == false && producto.Cliente === nombreCliente)
        this.productosVerificados = data.filter(producto => producto.Recepcion == true && producto.Cliente === nombreCliente)
      }      
    })

    this.subRecepcion =  this.service.updateProductoSinRecepcion().subscribe((data) => {
   
      this.productosPorVerificar = this.productosPorVerificar.filter(producto => producto.Cliente === nombreCliente)
      this.productosVerificados = this.productosVerificados.filter(producto => producto.Cliente === nombreCliente)

      this.cantRecepcionados = this.productosVerificados.filter(producto => producto.Recepcion == true).length
      this.cantNoRecepcionados = this.productosPorVerificar.filter(producto => producto.Recepcion == false).length
      
      if(data.filter(producto => producto.Recepcion == false && producto.Cliente === nombreCliente).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Recepcion == true && producto.Cliente === nombreCliente).length === this.productosVerificados.length){

      }else{
        this.productosPorVerificar = data.filter(producto => producto.Recepcion == false && producto.Cliente === nombreCliente)
        this.productosVerificados = data.filter(producto => producto.Recepcion == true && producto.Cliente === nombreCliente)
      }      
    })
   }
    // alert("cantidad cargas : "+ n)}
  }
  cambiarTicketByInput(cod_producto: string){

    var codigo_producto = cod_producto.replace(/'/g, "-").trim().toUpperCase()
  
    // codigo_producto = codigo_producto.replace(/-(\d+)/, "");
    // this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    
    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Easy CD",
      "n_guia" : codigo_producto,
      "cod_pedido" : codigo_producto,
      "cod_producto" : codigo_producto,
      "ids_usuario" : this.idPortal
      // "cod_sku" : sku
    }

    const url = `/easy_cd`

    this.service.updateFieldRecepcionEasyCD(body).subscribe((data : any) => {
      // alert(data.message)
      this.codigoProducto = ""
      this.initRecepcionProductos()
    },(error) => {
      alert(error.error.detail)
    }
    )
  }


  cambiarTicket(arrayIndex : number, cod_pedido: string, cod_producto :string) {
    this.productosPorVerificar[arrayIndex].Recepcion = true

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    
    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Easy CD",
      "n_guia" : cod_pedido,
      "cod_pedido" : cod_pedido,
      "cod_producto" : cod_producto,
      "ids_usuario" : this.idPortal
      // "cod_sku" : sku
    }

    this.service.updateFieldRecepcionEasyCD(body).subscribe((data : any) => {
      // alert(data.message)
      this.codigoProducto = ""
      this.initRecepcionProductos()
    },(error) => {
      alert(error.error.detail)
    }
    )
  }


 ngOnDestroy(): void {
  // Cancelar la suscripción al destruir el componente
  this.subRecepcion.unsubscribe();
}
}
