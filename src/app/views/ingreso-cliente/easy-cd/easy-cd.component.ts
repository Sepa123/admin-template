import { Component } from '@angular/core';
import { RecepcionService } from 'src/app/service/recepcion.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoOPL } from "src/app/models/productoOPL.interface"
import { TIService } from "src/app/service/ti.service";
import { Clipboard } from '@angular/cdk/clipboard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-easy-cd',
  templateUrl: './easy-cd.component.html',
  styleUrls: ['../styles/ingreso-cliente.component.scss']
})
export class EasyCdComponent {

  

  // para cambiar los styles de nav
  // public vars = {
  //   '--cui-nav-link-padding-x' : '4rem'
  // }

  public svgContent!: SafeHtml;

  cantVerificados : number = 0
  cantNoVerificados : number = 0
  cargaActual : string = "Todas"

  cargaMasiva : string = ""

  pv : boolean = true


  subRecepcion! : Subscription

  
  productosVerificados : ProductoOPL [] = []
  productosPorVerificar : ProductoOPL [] = []
  productosUltimo : ProductoOPL [] = []
  codigoProducto!: string

  // cargas! : CargasComparacion []
   cargas : string [] = []

  idPortal!: string 



  constructor(private service: RecepcionService, private http: HttpClient, private sanitizer: DomSanitizer,
              private tiService : TIService, private clipboard: Clipboard) { }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
  }

  pegar(){
    navigator.clipboard.readText().then(
      text => {
        this.cargaMasiva = text;
      }
     )
      .catch(error => {
        console.error('Cannot read clipboard text: ', error);
      }
    );
  }

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

  subirCargaMasiva(){
    const listaCarga = this.cargaMasiva.split('\n').map(numero => numero.trim());
    console.log(listaCarga);

    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Easy CD",
      "n_guia" : 'codigo_producto',
      "cod_pedido" : 'codigo_producto',
      "cod_producto" : 'codigo_producto',
      "ids_usuario" : this.idPortal,
      "observacion" : "Actualización estado masiva en Anden Easy",
      'lista_codigos': listaCarga
      // "cod_sku" : sku
    }

    this.service.updateVerifiedMasivoEasy(body).subscribe((data : any) => {
        alert(data.message)
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
      
      this.cargas = [...new Set(data.map(prod => prod.Carga+"" ))]

      // console.log(this.cargas)
    })
  }

  activate( activo : boolean){
    this.pv = activo
  }



  ngOnInit(){

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    console.log(this.idPortal)
    this.subRecepcionEasyCd()
    
    // this.tiService.get_cargas_easy_api().subscribe((data) => {
    //     this.cargas = data
    // })
    this.initRecepionEasyCD()

  }


  isModalOpen: boolean = false
  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  
  openModal(){
    this.isModalOpen = true
  }

  closeModal(){
    this.isModalOpen = false
  }

  filterByCarga(nro_carga : string){
    
    // const n = this.productosPorVerificar.filter(producto => producto.Carga === nro_carga).length
    this.cargaActual = nro_carga
    console.log(this.cargaActual)
    this.subRecepcion.unsubscribe();
    if(nro_carga === "Todas"){
      this.initRecepionEasyCD()
      this.subRecepcionEasyCd()

    } else {
    this.subRecepcion.unsubscribe();
    this.service.getRecepcionEasyCD().subscribe((data) => {
      
      this.productosPorVerificar = data.filter(producto => producto.Carga === nro_carga)
      this.productosVerificados = data.filter(producto => producto.Carga === nro_carga)
      
      this.cantVerificados = this.productosVerificados.filter(producto => producto.Pistoleado == true).length
      this.cantNoVerificados = this.productosPorVerificar.filter(producto => producto.Pistoleado == false).length
      

      console.log(this.cantVerificados)
      console.log(this.cantNoVerificados)
      if(data.filter(producto => producto.Pistoleado == false && producto.Carga === nro_carga).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Pistoleado == true && producto.Carga === nro_carga).length === this.productosVerificados.length){
      }else{
        this.productosPorVerificar = data.filter(producto => producto.Pistoleado == false && producto.Carga === nro_carga)
        this.productosVerificados = data.filter(producto => producto.Pistoleado == true && producto.Carga === nro_carga)
      }      
    })

    this.subRecepcion =  this.service.updateRecepcionEasyCD().subscribe((data) => {
      this.productosPorVerificar = this.productosPorVerificar.filter(producto => producto.Carga === nro_carga)
      this.productosVerificados = this.productosVerificados.filter(producto => producto.Carga === nro_carga)

      this.cantVerificados = this.productosVerificados.filter(producto => producto.Pistoleado == true).length
      this.cantNoVerificados = this.productosPorVerificar.filter(producto => producto.Pistoleado == false).length
      
      if(data.filter(producto => producto.Pistoleado == false && producto.Carga === nro_carga).length === this.productosPorVerificar.length
      && data.filter(producto => producto.Pistoleado == true && producto.Carga === nro_carga).length === this.productosVerificados.length){
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
      "ids_usuario" : this.idPortal,
      "observacion" : "Actualización estado por pickeo en Anden Easy"
      // "cod_sku" : sku
    }

    const url = `/easy_cd`

    this.service.updateVerifiedByInput(url,body).subscribe((data : any) => {
      // alert(data.message)
      
      this.codigoProducto = ""
      // this.initRecepionEasyCD()
      this.filterByCarga(this.cargaActual)
    },(error) => {
      alert(error.error.detail)
    }
    )
  }


  cambiarTicket(arrayIndex : number, cod_pedido: string, cod_producto :string) {
    this.productosUltimo.pop()
    this.productosPorVerificar[arrayIndex].Pistoleado = true

    this.productosUltimo.push(this.productosPorVerificar[arrayIndex])

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    
    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "Easy CD",
      "n_guia" : cod_pedido,
      "cod_pedido" : cod_pedido,
      "cod_producto" : cod_producto,
      "ids_usuario" : this.idPortal,
      "observacion" : "Actualización estado por click en Anden Easy"
      // "cod_sku" : sku
    }

    this.service.updateVerified(body).subscribe((data : any) => {
      // alert(data.message)
      this.codigoProducto = ""
      // this.initRecepionEasyCD()
      this.filterByCarga(this.cargaActual)
    })
  }


 ngOnDestroy(): void {

  }

}