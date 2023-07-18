import { Component } from '@angular/core';
import { RecepcionService } from 'src/app/service/recepcion.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoPicking } from 'src/app/models/productoPicking.interface';
import { ProductoOPL } from "src/app/models/productoOPL.interface"
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recepcion-electrolux',
  templateUrl: './recepcion-electrolux.component.html',
  styleUrls: ['../styles/recepcion.component.scss']
})
export class RecepcionElectroluxComponent {
  public svgContent!: SafeHtml;

  subRecepcion! : Subscription

  cantVerificados : number = 0
  cantNoVerificados : number = 0

  productosVerificados : ProductoOPL [] =[]
  productosPorVerificar : ProductoOPL [] = []

  productosPorVerificarByCP : ProductoOPL [] = []
  codigoProducto!: string

  isModalOpen: boolean = false

  idPortal!: string

  largo!: number

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  
  openModal(){
    
    this.isModalOpen = true

    console.log(this.isModalOpen)
  }

  closeModal(){
    this.isModalOpen = false
  }


  constructor(private service: RecepcionService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  
  obtenerFechaActual(): string {
    const fecha = new Date();
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return year + month + day;
  }

  initRecepcionElectrolux(){
      this.service.getRecepcionElectrolux().subscribe((data) => {

      this.cantNoVerificados = data.filter(producto => producto.Pistoleado == false).length 
      this.cantVerificados = data.filter(producto => producto.Pistoleado == true).length 

      if(data.filter(producto => producto.Pistoleado == false).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Pistoleado == true).length === this.productosVerificados.length){
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Pistoleado == false)
        this.productosVerificados = data.filter(producto => producto.Pistoleado == true)
      }      
    })
  }

  subRecepcionElectrolux(){
    this.subRecepcion = this.service.updateRecepcionElectrolux().subscribe((data) => {

      this.cantNoVerificados = data.filter(producto => producto.Pistoleado == false).length 
      this.cantVerificados = data.filter(producto => producto.Pistoleado == true).length 

      if(data.filter(producto => producto.Pistoleado == false).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Pistoleado == true).length === this.productosVerificados.length){
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Pistoleado == false)
        this.productosVerificados = data.filter(producto => producto.Pistoleado == true)
      }      
    })
  }


  ngOnInit() {
    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    
    this.initRecepcionElectrolux()
    this.subRecepcionElectrolux()

    
  }

  cambiarTicketByInput(cod_producto: string){
    this.service.checkElectroluxByPedido(cod_producto).subscribe((data) => {
      this.productosPorVerificarByCP = data
      this.largo = this.productosPorVerificarByCP.length

      if(this.largo > 1){
        this.codigoProducto = cod_producto
        this.toggleLiveDemo()
      }else {
      
      var codigo_producto = cod_producto.replace(/'/g, "-").trim().toUpperCase()
    
      codigo_producto = codigo_producto.replace(/-(\d+)/, "");
  
      const body = {
        "id_usuario" : sessionStorage.getItem('id')+"",
        "cliente" : "Electrolux",
        "n_guia" : codigo_producto,
        "cod_pedido" : codigo_producto,
        "cod_producto" : codigo_producto,
        "ids_usuario" : this.idPortal 
        // "cod_sku" : sku
      }
  
      const url = `/electrolux`
  
      this.service.updateVerifiedByInput(url,body).subscribe((data : any) => {
        // alert(data.message)
        this.codigoProducto = ""
        this.initRecepcionElectrolux()
      },(error) => {
        alert(error.error.detail)
      }
      )
    }
      
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
    
    console.log(this.productosPorVerificarByCP)
    if(this.productosPorVerificarByCP.length != 0){
     this.productosPorVerificarByCP[arrayIndex].Pistoleado = true
    }else {
      this.productosPorVerificar[arrayIndex].Pistoleado = true
    }
    // let productoAbajo = this.productosOPL.splice(arrayIndex,1);
    // console.log(productoAbajo)
    // this.productosOPL.push(productoAbajo[0])
    
    
    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Electrolux",
      "n_guia" : cod_pedido,
      "cod_pedido" : cod_pedido,
      "cod_producto" : cod_producto,
      "ids_usuario" : this.idPortal 
      // "cod_sku" : sku
    }


    this.service.updateVerified(body).subscribe((data : any) => {
      // alert(data.message)
      
      this.codigoProducto = ""
      this.initRecepcionElectrolux()
    })
  }
}
