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
  //datos genericos
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

  //datos geo
  latitude!: string
  longitud! :string 

  //datos exclusivos para easy opl algunos compartidos con electrolux
  productosPorVerificarByCP : ProductoOPL [] = []
  codProductoModal! : string
  ArrCodScanner : string [] = []
  isModalOpen: boolean = false
  largo!: number
  public visible = false;
  fechaAnterior = this.obtenerFechaActual()

  



  constructor(private service: RecepcionService, private http: HttpClient, private sanitizer: DomSanitizer,
              private tiService : TIService) { }


    //en caso de que haya un codigo repetido se abre modal para verificar o seleccionar
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

  
  obtenerFechaActual(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - 1)
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return day +"/"+ month+"/"+ year;
  }
  getLocation(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      console.log("Localización no disponible");
    }
  }
  showPosition(position: any): any{
        this.latitude = position.coords.latitude
        this.longitud= position.coords.longitude 
        
        
    
    console.log("Longitud : " , this.longitud, "latitud :", this.latitude)
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
  cambiarTicketByInput(cod_producto: string) {
    let codigo_producto = cod_producto.replace(/'/g, "-").trim().toUpperCase();
    this.nombreCliente.forEach((cliente) => {
      if (cliente === "Easy Tienda") {
        // Lógica para "Easy Tienda"
        this.ArrCodScanner.push(cod_producto);
        if (this.ArrCodScanner.length === 9) {
          console.log(this.ArrCodScanner);
          this.ArrCodScanner = [];
        }
  
        const patronNum = /^\d{10}$/;
        const num_pedido = cod_producto;
        if (num_pedido.trim().length === 10 && patronNum.test(num_pedido.trim())) {
          cod_producto = `SUBORDEN N ${num_pedido}`;
        }
  
        let codigo_product = cod_producto.replace(/'/g, "-").trim().toUpperCase();
        codigo_product = codigo_product.replace(/-(\d+)/, "");
  
        const regex = /SUBORDEN\sN\s(\d{10})/;
        const match = codigo_product.match(regex);
  
        if (match) {
          const suborden = match[1];
  
          this.service.checkEasyOPLByPedido(codigo_producto).subscribe((data) => {
            this.productosPorVerificarByCP = data;
            this.largo = this.productosPorVerificarByCP.length;
  
            if (this.largo > 1) {
              this.codigoProducto = this.productosPorVerificarByCP[0].Codigo_pedido;
              this.codProductoModal = this.productosPorVerificarByCP[0].Codigo_pedido;
              console.log("Se muestra este código: ", this.codProductoModal);
              this.toggleLiveDemo();
            } else {
              const body = {
                "id_usuario": sessionStorage.getItem('id') + "",
                "cliente": "Easy OPL",
                "n_guia": codigo_product,
                "cod_pedido": codigo_product,
                "cod_producto": codigo_product,
                "ids_usuario": this.idPortal,
                "sku": this.productosPorVerificarByCP[0].SKU
              };
              this.service.updateFieldRecepcionEasyOPL(body).subscribe((data: any) => {
                // alert(data.message)
                this.initRecepcionProductos();
                this.codigoProducto = "";
              }, (error) => {
                alert(error.error.detail);
              });
            }
          });
        }
      } else if (cliente == "Easy") {
        const body = {
          "id_usuario": sessionStorage.getItem('id') + "",
          "cliente": "Easy CD",
          "n_guia": codigo_producto,
          "cod_pedido": codigo_producto,
          "cod_producto": codigo_producto,
          "ids_usuario": this.idPortal
          // "cod_sku" : sku
        }
        const url = `/easy_cd`
  
        this.service.updateFieldRecepcionEasyCD(body).subscribe((data: any) => {
          // alert(data.message)
          this.codigoProducto = ""
          this.initRecepcionProductos()
        }, (error) => {
          alert(error.error.detail)
        })
      } else if (cliente == "Sportex") {
        codigo_producto = codigo_producto.replace(/-(\d+)/, "");
        const body = {
          "id_usuario": sessionStorage.getItem('id') + "",
          "cliente": cliente,
          "n_guia": codigo_producto,
          "cod_pedido": codigo_producto,
          "cod_producto": codigo_producto,
          "ids_usuario": this.idPortal
          // "cod_sku" : sku
        }
        const url = `/sportex`
  
        this.service.updateVerifiedByInput(url, body).subscribe((data: any) => {
          // alert(data.message)
          this.codigoProducto = ""
          this.initRecepcionProductos()
        }, (error) => {
          alert(error.error.detail)
        })
      } else if (cliente == "Electrolux") {
        this.service.checkElectroluxByPedido(cod_producto).subscribe((data) => {
          this.productosPorVerificarByCP = data
          this.largo = this.productosPorVerificarByCP.length
  
          if (this.largo > 1) {
            this.codigoProducto = cod_producto
            this.toggleLiveDemo()
          } else {
            codigo_producto = codigo_producto.replace(/-(\d+)/, "");
            const body = {
              "id_usuario": sessionStorage.getItem('id') + "",
              "cliente": cliente,
              "n_guia": codigo_producto,
              "cod_pedido": codigo_producto,
              "cod_producto": codigo_producto,
              "ids_usuario": this.idPortal
              // "cod_sku" : sku
            }
           
            const url = `/electrolux`
  
            this.service.updateVerifiedByInput(url, body).subscribe((data: any) => {
              // alert(data.message)
              this.codigoProducto = ""
              this.initRecepcionProductos()
            }, (error) => {
              alert(error.error.detail)
            })
          }
        }, (error) => {
          alert(error.error.detail)
        })
      }
    });
  }
  
 

  cambiarTicket(arrayIndex : number, cod_pedido: string, cod_producto :string) {
    

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""

    this.nombreCliente.forEach((cliente) =>{
        if(cliente == "Easy Tienda"){
            let sku = this.productosPorVerificar[arrayIndex].SKU
            if(this.productosPorVerificarByCP.length != 0){
            this.productosPorVerificarByCP[arrayIndex].Recepcion = true
            sku = this.productosPorVerificarByCP[arrayIndex].SKU
        }else{
            this.productosPorVerificar[arrayIndex].Recepcion = true
            }
            const body = {
                "id_usuario" : sessionStorage.getItem('id')+"",
                "cliente" : "Easy OPL",
                "n_guia" : cod_pedido,
                "cod_pedido" : cod_pedido,
                "cod_producto" : cod_producto,
                "ids_usuario" : this.idPortal,
                "sku" : sku
              }
          
              const url = `/easy_opl`

              this.service.updateFieldRecepcionEasyOPL(body).subscribe((data : any) => {
                // alert(data.message)
                this.codigoProducto = ""
                this.initRecepcionProductos()
              },(error) => {
                alert(error.error.detail)
              }
              )
        }if(cliente=="Easy"){
            this.productosPorVerificar[arrayIndex].Recepcion = true
            const body = {
                "id_usuario" : sessionStorage.getItem('id')+"",
                "cliente" : "Easy CD",
                "n_guia" : cod_pedido,
                "cod_pedido" : cod_pedido,
                "cod_producto" : cod_producto,
                "ids_usuario" : this.idPortal
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
        }if(cliente=="Sportex"){
            this.productosPorVerificar[arrayIndex].Pistoleado = true
            this.productosPorVerificar[arrayIndex].Recepcion = true
            const body = {
                "id_usuario" : sessionStorage.getItem('id')+"",
                "cliente" : cliente,
                "n_guia" : cod_pedido,
                "cod_pedido" : cod_pedido,
                "cod_producto" : cod_producto,
                "ids_usuario" : this.idPortal
              }
          
              const url = `/sportex`

              this.service.updateVerified(body).subscribe((data : any) => {
                // alert(data.message)
                this.codigoProducto = ""
                this.initRecepcionProductos()
              },(error) => {
                alert(error.error.detail)
              }
              )
        }if(cliente=="Electrolux"){
            let sku = this.productosPorVerificar[arrayIndex].SKU
            if(this.productosPorVerificarByCP.length != 0){
                this.productosPorVerificarByCP[arrayIndex].Pistoleado = true
                sku = this.productosPorVerificarByCP[arrayIndex].SKU
               }else {
                 this.productosPorVerificar[arrayIndex].Pistoleado = true
               }
            const body = {
                "id_usuario" : sessionStorage.getItem('id')+"",
                "cliente" : cliente,
                "n_guia" : cod_pedido,
                "cod_pedido" : cod_pedido,
                "cod_producto" : sku,
                "ids_usuario" : this.idPortal
              }
          
              const url = `/electrolux`

              this.service.updateVerified(body).subscribe((data : any) => {
                // alert(data.message)
                this.codigoProducto = ""
                this.initRecepcionProductos()
              },(error) => {
                alert(error.error.detail)
              }
              )
        }     
    })
  }


 ngOnDestroy(): void {
  // Cancelar la suscripción al destruir el componente
  this.subRecepcion.unsubscribe();
}
}
