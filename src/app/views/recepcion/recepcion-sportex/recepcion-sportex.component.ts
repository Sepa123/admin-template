import { Component } from '@angular/core';
import { RecepcionService } from 'src/app/service/recepcion.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoPicking } from 'src/app/models/productoPicking.interface';
import { ProductoOPL } from "src/app/models/productoOPL.interface"
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recepcion-sportex',
  templateUrl: './recepcion-sportex.component.html',
  styleUrls: ['../styles/recepcion.component.scss']
})
export class RecepcionSportexComponent {
  public svgContent!: SafeHtml;

  subRecepcion! : Subscription

  cantVerificados : number = 0
  cantNoVerificados : number = 0

  productosVerificados : ProductoOPL [] =[]
  productosPorVerificar : ProductoOPL [] = []
  codigoProducto!: string

  idPortal! : string


  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string


  constructor(private service: RecepcionService, private http: HttpClient, private sanitizer: DomSanitizer) { }

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
  
  obtenerFechaActual(): string {
    const fecha = new Date();
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return year + month + day;
  }

  initRecepcionSportex(){
      this.service.getRecepcionSportex().subscribe((data) => {

      this.cantVerificados = data.filter(producto => producto.Pistoleado == true).length
      this.cantNoVerificados = data.filter(producto => producto.Pistoleado == false).length

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

  subRecepcionSportex(){
    this.subRecepcion = this.service.updateRecepcionSportex().subscribe((data) => {

      this.cantVerificados = data.filter(producto => producto.Pistoleado == true).length
      this.cantNoVerificados = data.filter(producto => producto.Pistoleado == false).length

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


  ngOnInit() {
    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    this.initRecepcionSportex()
    this.subRecepcionSportex()
  }

  cambiarTicketByInput(cod_producto: string){

    var codigo_producto = cod_producto.replace(/'/g, "-").trim().toUpperCase()
  
    codigo_producto = codigo_producto.replace(/-(\d+)/, "");


    
    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Sportex",
      "n_guia" : codigo_producto,
      "cod_pedido" : codigo_producto,
      "cod_producto" : codigo_producto,
      "ids_usuario" : this.idPortal,
      "latitud": this.latStr,
      "longitud": this.longStr
      // "cod_sku" : sku
    }

    const url = `/sportex`

    this.service.updateVerifiedByInput(url,body).subscribe((data : any) => {
      // alert(data.message)
      this.initRecepcionSportex()
      this.codigoProducto = ""
    },(error) => {
      alert(error.error.detail)
    }
    )
  }

  async cambiarTicket(arrayIndex : number, cod_pedido: string, cod_producto :string) {
    
    const location = await this.getLocationAsync();
    
    this.productosPorVerificar[arrayIndex].Pistoleado = true

    const lat : string = location.coords.latitude.toString()
    const long : string = location.coords.longitude.toString()
    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Sportex",
      "n_guia" : cod_pedido,
      "cod_pedido" : cod_pedido,
      "cod_producto" : cod_producto,
      "ids_usuario" : this.idPortal,
      "latitud": lat,
      "longitud": long
    }

    this.service.updateVerified(body).subscribe((data : any) => {
      // alert(data.message)
      this.initRecepcionSportex()
      this.codigoProducto = ""
    })
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.subRecepcion.unsubscribe();
  }
}
