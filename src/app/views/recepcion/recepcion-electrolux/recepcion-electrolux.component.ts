import { Component } from '@angular/core';
import { RecepcionService } from '../../../service/recepcion.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoPicking } from '../../../models/productoPicking.interface';
import { ProductoOPL } from "../../../models/productoOPL.interface"
import { Subscription } from 'rxjs';
import { TIService } from "../../../service/ti.service";

@Component({
  selector: 'app-recepcion-electrolux',
  templateUrl: './recepcion-electrolux.component.html',
  styleUrls: ['../styles/recepcion.component.scss','./recepcion-electrolux.component.scss']
})
export class RecepcionElectroluxComponent{
  public svgContent!: SafeHtml;

  cantRecepcionados : number = 0
  cantNoRecepcionados : number = 0
  cargaActual : string = "Todas"


  subRecepcion! : Subscription

  productos : ProductoOPL [] = []
  productosVerificados : ProductoOPL [] = []
  productosPorVerificar : ProductoOPL [] = []
  productosUltimo : ProductoOPL [] = []
  codigoProducto!: string

  // cargas! : CargasComparacion []
  cargas : string [] = []

  idPortal!: string 

  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string

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

  constructor(private service: RecepcionService, private http: HttpClient, private sanitizer: DomSanitizer,
              private tiService : TIService) { }

  
  obtenerFechaActual(): string {
    const fecha = new Date();
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return year + month + day;
  }

  subRecepcionEasyCd(){
    this.subRecepcion = this.service.updateRecepcionEasyCD().subscribe((data) => {

      this.productos = data
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

  initRecepionEasyCD(){
    
    this.service.getRecepcionEasyCD().subscribe((data) => {
      
      this.cantRecepcionados = data.filter(producto => producto.Recepcion == true).length
      this.cantNoRecepcionados = data.filter(producto => producto.Recepcion == false).length

      if(data.filter(producto => producto.Recepcion == false).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Recepcion == true).length === this.productosVerificados.length){
        // console.log("esta data se repite")
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Recepcion == false)
        this.productosVerificados = data.filter(producto => producto.Recepcion == true)
      }  
      
      this.cargas = [...new Set(data.map(prod => prod.Carga+"" ))]

      // console.log(this.cargas)
    })
  }


  ngOnInit() {
    
    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    console.log(this.idPortal)
    console.log("Carga actual ",this.cargaActual)
    this.subRecepcionEasyCd()
    
    // this.tiService.get_cargas_easy_api().subscribe((data) => {
    //     this.cargas = data
    // })
    this.initRecepionEasyCD()
  }


  filterByCarga(event : any){


    // const n = this.productosPorVerificar.filter(producto => producto.Carga === nro_carga).length
    let nro_carga : string = ""

    if(typeof event === "string"){
       nro_carga = event
    }else{
      // console.log("Carga actual ",event)

      nro_carga = event.target.value
    }

    console.log("Carga actual ",nro_carga)
    

    // console.log("Carga actual ",nro_carga)
    this.cargaActual = nro_carga
    this.subRecepcion.unsubscribe();
    if(nro_carga === "Todas"){
      this.initRecepionEasyCD()
      this.subRecepcionEasyCd()

    } else {
    this.subRecepcion.unsubscribe();
    this.service.getRecepcionEasyCD().subscribe((data) => {
      // console.log("Este esd del filterByCarga init ")
      
      this.productosPorVerificar = data.filter(producto => producto.Carga === nro_carga)
      this.productosVerificados = data.filter(producto => producto.Carga === nro_carga)
      
      this.cantRecepcionados = this.productosVerificados.filter(producto => producto.Recepcion == true).length
      this.cantNoRecepcionados = this.productosPorVerificar.filter(producto => producto.Recepcion == false).length
      

      console.log(this.cantRecepcionados)
      console.log(this.cantNoRecepcionados)
      if(data.filter(producto => producto.Recepcion == false && producto.Carga === nro_carga).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Recepcion == true && producto.Carga === nro_carga).length === this.productosVerificados.length){
        // console.log("esta data se repite")
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Recepcion == false && producto.Carga === nro_carga)
        this.productosVerificados = data.filter(producto => producto.Recepcion == true && producto.Carga === nro_carga)
      }      
    })

    this.subRecepcion =  this.service.updateRecepcionEasyCD().subscribe((data) => {
      // console.log("Este esd del filterByCarga")
      this.productosPorVerificar = this.productosPorVerificar.filter(producto => producto.Carga === nro_carga)
      this.productosVerificados = this.productosVerificados.filter(producto => producto.Carga === nro_carga)

      this.cantRecepcionados = this.productosVerificados.filter(producto => producto.Recepcion == true).length
      this.cantNoRecepcionados = this.productosPorVerificar.filter(producto => producto.Recepcion == false).length
      
      if(data.filter(producto => producto.Recepcion == false && producto.Carga === nro_carga).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Recepcion == true && producto.Carga === nro_carga).length === this.productosVerificados.length){
        // console.log("esta data se repite")
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Recepcion == false && producto.Carga === nro_carga)
        this.productosVerificados = data.filter(producto => producto.Recepcion == true && producto.Carga === nro_carga)
      }      
    })
   }
    // alert("cantidad cargas : "+ n)}
  }

  cambiarTicketByInput(cod_producto: string){

    var codigo_producto = cod_producto.replace(/'/g, "-").trim().toUpperCase()

    console.log(codigo_producto)
    // codigo_producto = codigo_producto.replace(/-(\d+)/, "");
    // this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    
    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Easy CD",
      "n_guia" : codigo_producto,
      "cod_pedido" : codigo_producto,
      "cod_producto" : codigo_producto,
      "ids_usuario" : this.idPortal,
      "latitud": this.latStr,
      "longitud": this.longStr,
      "observacion" : "Actualización recepcion por pickeo en Recepción Easy CD"
      // "cod_sku" : sku
    }

    const url = `/easy_cd`

    this.productosUltimo = this.productos.filter((producto) => producto.Codigo_producto == codigo_producto ||  producto.Codigo_pedido == codigo_producto)  
      console.log(this.productos)

      if(this.productosUltimo.length == 0){
        this.productosUltimo = this.productosPorVerificar.filter((producto) => producto.Codigo_producto == codigo_producto ||  producto.Codigo_pedido == codigo_producto)
        console.log(this.productosUltimo)
      }
    
 
    this.service.updateFieldRecepcionEasyCD(body).subscribe((data : any) => {
      // alert(data.message)
      this.codigoProducto = ""
      

       this.initRecepionEasyCD()

      this.filterByCarga(this.cargaActual)

    },(error) => {
      alert(error.error.detail)
    }
    )
  }


 async cambiarTicket(arrayIndex : number, cod_pedido: string, cod_producto :string) {

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    
    const location = await this.getLocationAsync();
    const lat : string = location.coords.latitude.toString()
    const long : string = location.coords.longitude.toString()
    
    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Easy CD",
      "n_guia" : cod_pedido,
      "cod_pedido" : cod_pedido,
      "cod_producto" : cod_producto,
      "ids_usuario" : this.idPortal,
      "latitud": lat,
      "longitud": long,
      "observacion" : "Actualización recepcion por click en Recepción Easy CD"
      // "cod_sku" : sku
    }

    this.service.updateFieldRecepcionEasyCD(body).subscribe((data : any) => {
      // alert(data.message)
      this.codigoProducto = ""
      // this.initRecepionEasyCD()
      // this.filterByCarga(this.cargaActual)
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
