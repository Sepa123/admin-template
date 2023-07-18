import { Component } from '@angular/core';
import { RecepcionService } from 'src/app/service/recepcion.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoOPL } from "src/app/models/productoOPL.interface"
import { TIService } from "src/app/service/ti.service";
import { CargasComparacion } from 'src/app/models/cargasComparacion.interface';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-easy-cd',
  templateUrl: './easy-cd.component.html',
  styleUrls: ['./easy-cd.component.scss']
})
export class EasyCdComponent {
  public svgContent!: SafeHtml;

  cantVerificados : number = 0
  cantNoVerificados : number = 0
  cargaActual : string = "Todas"


  subRecepcion! : Subscription

  productosVerificados : ProductoOPL [] = []
  productosPorVerificar : ProductoOPL [] = []
  codigoProducto!: string

  cargas! : CargasComparacion []

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

  subRecepcionEasyCd(){
    this.subRecepcion = this.service.updateRecepcionEasyCD().subscribe((data) => {
      this.cantVerificados = data.filter(producto => producto.Pistoleado == true).length
      this.cantNoVerificados = data.filter(producto => producto.Pistoleado == false).length

      if(data.filter(producto => producto.Pistoleado == false).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Pistoleado == true).length === this.productosVerificados.length){
        // console.log("esta data se repite")
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Pistoleado == false)
        this.productosVerificados = data.filter(producto => producto.Pistoleado == true)
      }      
    })
  }

  initRecepionEasyCD(){
    this.service.getRecepcionEasyCD().subscribe((data) => {
      this.cantVerificados = data.filter(producto => producto.Pistoleado == true).length
      this.cantNoVerificados = data.filter(producto => producto.Pistoleado == false).length

      if(data.filter(producto => producto.Pistoleado == false).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Pistoleado == true).length === this.productosVerificados.length){
        // console.log("esta data se repite")
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Pistoleado == false)
        this.productosVerificados = data.filter(producto => producto.Pistoleado == true)
      }      
    })
  }


  ngOnInit() {
    
    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    console.log(this.idPortal)
    this.subRecepcionEasyCd()
    
    this.tiService.get_cargas_easy_api().subscribe((data) => {
        this.cargas = data
    })
    this.initRecepionEasyCD()
  }


  filterByCarga(nro_carga : string){
    
    // const n = this.productosPorVerificar.filter(producto => producto.Carga === nro_carga).length
    this.cargaActual = nro_carga
    this.subRecepcion.unsubscribe();
    if(nro_carga === "Todas"){
      this.initRecepionEasyCD()
      this.subRecepcionEasyCd()

    } else {
    this.subRecepcion.unsubscribe();
    this.service.getRecepcionEasyCD().subscribe((data) => {
      console.log("Este esd del filterByCarga init ")
      
      this.productosPorVerificar = data.filter(producto => producto.Carga === nro_carga)
      this.productosVerificados = data.filter(producto => producto.Carga === nro_carga)
      
      this.cantVerificados = this.productosVerificados.filter(producto => producto.Pistoleado == true).length
      this.cantNoVerificados = this.productosPorVerificar.filter(producto => producto.Pistoleado == false).length
      

      console.log(this.cantVerificados)
      console.log(this.cantNoVerificados)
      if(data.filter(producto => producto.Pistoleado == false && producto.Carga === nro_carga).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Pistoleado == true && producto.Carga === nro_carga).length === this.productosVerificados.length){
        console.log("esta data se repite")
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Pistoleado == false && producto.Carga === nro_carga)
        this.productosVerificados = data.filter(producto => producto.Pistoleado == true && producto.Carga === nro_carga)
      }      
    })

    this.subRecepcion =  this.service.updateRecepcionEasyCD().subscribe((data) => {
      console.log("Este esd del filterByCarga update")
      this.productosPorVerificar = this.productosPorVerificar.filter(producto => producto.Carga === nro_carga)
      this.productosVerificados = this.productosVerificados.filter(producto => producto.Carga === nro_carga)

      this.cantVerificados = this.productosVerificados.filter(producto => producto.Pistoleado == true).length
      this.cantNoVerificados = this.productosPorVerificar.filter(producto => producto.Pistoleado == false).length
      
      if(data.filter(producto => producto.Pistoleado == false && producto.Carga === nro_carga).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Pistoleado == true && producto.Carga === nro_carga).length === this.productosVerificados.length){
        console.log("esta data se repite")
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Pistoleado == false && producto.Carga === nro_carga)
        this.productosVerificados = data.filter(producto => producto.Pistoleado == true && producto.Carga === nro_carga)
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

    this.service.updateVerifiedByInput(url,body).subscribe((data : any) => {
      // alert(data.message)
      this.codigoProducto = ""
      this.initRecepionEasyCD()
    },(error) => {
      alert(error.error.detail)
    }
    )
  }


  cambiarTicket(arrayIndex : number, cod_pedido: string, cod_producto :string) {
    this.productosPorVerificar[arrayIndex].Pistoleado = true

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

    this.service.updateVerified(body).subscribe((data : any) => {
      // alert(data.message)
      this.codigoProducto = ""
      this.initRecepionEasyCD()
    })
  }


 ngOnDestroy(): void {
  // Cancelar la suscripción al destruir el componente
  this.subRecepcion.unsubscribe();
}
}

