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

  cantVerificados : number = 0
  cantNoVerificados : number = 0

  productosVerificados : ProductoOPL [] =[]
  productosPorVerificar : ProductoOPL [] = []

  productosPorVerificarByCP : ProductoOPL [] = []
  codigoProducto!: string
  codProductoModal! : string

  ArrCodScanner : string [] = []

  isModalOpen: boolean = false

  idPortal!: string

  largo!: number

  public visible = false;

    //datos geo
    latitude!: number
    longitud! :number
    latStr!: string
    longStr!: string

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

  getLocation(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position)

      });
    } else {
      console.log("Localización no disponible");
    }
  }
  showPosition(position: any): any{
        this.latitude = position.coords.latitude
        this.longitud= position.coords.longitude 
       this.latStr = this.latitude.toString()
        this.longStr = this.longitud.toString()

    console.log("Longitud : " , this.longStr, "latitud :", this.latStr)
  }
  getLocationAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position);
        }, (error) => {
          reject(error);
        });
      } else {
        reject("Localización no disponible");
      }
    });
  }

  subRecepcionEasyOPL(){
    this.subRecepcion = this.service.updateRecepcionEasyOPL().subscribe((data) => {

      this.cantNoVerificados = data.filter(producto => producto.Recepcion == false).length
      this.cantVerificados = data.filter(producto => producto.Recepcion == true).length

      if(data.filter(producto => producto.Recepcion == false).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Recepcion == true).length === this.productosVerificados.length){

      }else{
        this.productosPorVerificar = data.filter(producto => producto.Recepcion == false)
        this.productosVerificados = data.filter(producto => producto.Recepcion == true)
      }      
      // console.log("Cantidad de productos por verificar",this.productosPorVerificar.length)
      // console.log("Cantidad de productos verificados",this.productosVerificados.length)
    })
  }

  initRecepcionEasyOPL(){
      this.service.getRecepcionEasyOPL().subscribe((data) => {

      this.cantNoVerificados = data.filter(producto => producto.Recepcion == false).length
      this.cantVerificados = data.filter(producto => producto.Recepcion == true).length

      if(data.filter(producto => producto.Recepcion == false).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Recepcion == true).length === this.productosVerificados.length){

      }else{
        this.productosPorVerificar = data.filter(producto => producto.Recepcion == false)
        this.productosVerificados = data.filter(producto => producto.Recepcion == true)
      }      
      // console.log("Cantidad de productos por verificar",this.productosPorVerificar.length)
      // console.log("Cantidad de productos verificados",this.productosVerificados.length)
    })
  }

  constructor(private service: RecepcionService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    
    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    this.initRecepcionEasyOPL()
    this.subRecepcionEasyOPL()
  }


  cambiarTicketByInput(cod_producto: string){
    this.ArrCodScanner.push(cod_producto)
    if (this.ArrCodScanner.length === 9 ){
      console.log(this.ArrCodScanner)


      this.ArrCodScanner = []
    } 
        
    const patronNum = /^\d{10}$/
    const num_pedido = cod_producto


    if (num_pedido.trim().length === 10 && patronNum.test(num_pedido.trim())){
      
      cod_producto = `SUBORDEN N ${num_pedido}`
    }

    // console.log(cod_producto)
    
    var codigo_producto = cod_producto.replace(/'/g, "-").trim().toUpperCase()
    codigo_producto = codigo_producto.replace(/-(\d+)/, "");

    const regex = /SUBORDEN\sN\s(\d{10})/;
    const match = codigo_producto.match(regex);

    if (match) {
      const suborden = match[1];

    this.service.checkEasyOPLByPedido(codigo_producto).subscribe((data) => {
      this.productosPorVerificarByCP = data
      this.largo = this.productosPorVerificarByCP.length

      if(this.largo > 1){
        this.codigoProducto =  this.productosPorVerificarByCP[0].Codigo_pedido
        this.codProductoModal = this.productosPorVerificarByCP[0].Codigo_pedido
        console.log("Se muestra este codigo: ",this.codProductoModal)
        this.toggleLiveDemo()
      }else{
        // console.log(this.productosPorVerificarByCP[0].SKU)
      

          const body = {
            "id_usuario" : sessionStorage.getItem('id')+"",
            "cliente" : "Easy OPL",
            "n_guia" : codigo_producto,
            "cod_pedido" : codigo_producto,
            "cod_producto" : codigo_producto,
            "ids_usuario" : this.idPortal,
            "sku" : this.productosPorVerificarByCP[0].SKU,
            "latitud": this.latStr,
            "longitud": this.longStr
          }

          // const url = `/easy_opl`


          
          this.service.updateFieldRecepcionEasyOPL(body).subscribe((data : any) => {
            // alert(data.message)
            this.initRecepcionEasyOPL()
            this.codigoProducto = ""
          },(error) => {
            alert(error.error.detail)
          }
          )
      }
    })
  } else {
    console.log("No se encontró ningún número de SubOrden.");
    this.codigoProducto = ""
  }
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.subRecepcion.unsubscribe();
  }

  async cambiarTicket(arrayIndex : number, cod_pedido: string, cod_producto :string) {
    
    const location = await this.getLocationAsync();

    let sku = this.productosPorVerificar[arrayIndex].SKU
    if(this.productosPorVerificarByCP.length != 0){
      this.productosPorVerificarByCP[arrayIndex].Recepcion = true
      sku = this.productosPorVerificarByCP[arrayIndex].SKU
     }else{
      this.productosPorVerificar[arrayIndex].Recepcion = true
     }
    // let productoAbajo = this.productosOPL.splice(arrayIndex,1);
    // console.log(productoAbajo)
    // this.productosOPL.push(productoAbajo[0])
    
    const lat : string = location.coords.latitude.toString()
    const long : string = location.coords.longitude.toString()
     
    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Easy OPL",
      "n_guia" : cod_pedido,
      "cod_pedido" : cod_pedido,
      "cod_producto" : cod_producto,
      "ids_usuario" : this.idPortal, 
      "sku" : sku,
      "latitud": lat,
      "longitud": long
    }


    this.service.updateFieldRecepcionEasyOPL(body).subscribe((data : any) => {
      // alert(data.message)
      this.initRecepcionEasyOPL()
      this.codigoProducto = ""
    })
  }
}
