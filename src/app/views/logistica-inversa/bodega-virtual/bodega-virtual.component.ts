import { Component } from '@angular/core';
import { PedidoService } from  'src/app/service/pedido.service'
import { PedidoSinCompromiso } from 'src/app/models/pedidoSinCompromiso.interface';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { Subscription } from 'rxjs';
import { LogInversaService } from 'src/app/service/log-inversa.service'
import { Estado,Subestado } from 'src/app/models/estados.interface'
import { BodegaVirtual } from 'src/app/models/log_inversa/bodegaVirtual.interface'

@Component({
  selector: 'app-bodega-virtual',
  templateUrl: './bodega-virtual.component.html',
  styleUrls: ['./bodega-virtual.component.scss']
})
export class BodegaVirtualComponent {

  constructor(public builder: FormBuilder, private service:LogInversaService) { }


  cantVerificados : number = 0
  cantNoVerificados : number = 0
  cargaActual : string = "Todas"

  public rol = sessionStorage.getItem("rol_id") 
  subRecepcion! : Subscription

  
  productosVerificados : BodegaVirtual [] = []
  productosPorVerificar : BodegaVirtual [] = []
  productosUltimo : BodegaVirtual [] = []
  codigoProducto!: string

  // cargas! : CargasComparacion []
   cargas : string [] = []

  idPortal!: string 

  
  obtenerFechaActual(): string {
    const fecha = new Date();
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
  
    return year + month + day;
  }

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

  subRecepcionEasyCd(){
    // this.subRecepcion = this.service.updateRecepcionEasyCD().subscribe((data) => {
    //   this.cantVerificados = data.filter(producto => producto.Pistoleado == true).length
    //   this.cantNoVerificados = data.filter(producto => producto.Pistoleado == false).length

    //   if(data.filter(producto => producto.Pistoleado == false).length === this.productosPorVerificar.length
    //   && data.filter(producto => producto.Pistoleado == true).length === this.productosVerificados.length){
    //     // console.log("esta data se repite")
    //   }else{
    //     this.productosPorVerificar = data.filter(producto => producto.Pistoleado == false)
    //     this.productosVerificados = data.filter(producto => producto.Pistoleado == true)
    //   }      
    // })
  }

  initBodegaVirtual(){

    this.service.get_bodega_virtual().subscribe((data) => {
      this.cantVerificados = 0
      this.cantNoVerificados = data.length

      this.productosPorVerificar = data


      
      // this.cargas = [...new Set(data.map(prod => prod.+"" ))]

      // console.log(this.cargas)
    })
  }


  ngOnInit() {
    this.getLocation()
    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    console.log(this.idPortal)
    // this.subRecepcionEasyCd()
    
    // // this.tiService.get_cargas_easy_api().subscribe((data) => {
    // //     this.cargas = data
    // // })
    this.initBodegaVirtual()
  }


  filterByCarga(nro_carga : string){
    
  //   // const n = this.productosPorVerificar.filter(producto => producto.Carga === nro_carga).length
  //   this.cargaActual = nro_carga
  //   this.subRecepcion.unsubscribe();
  //   if(nro_carga === "Todas"){
  //     this.initRecepionEasyCD()
  //     this.subRecepcionEasyCd()

  //   } else {
  //   this.subRecepcion.unsubscribe();
  //   this.service.getRecepcionEasyCD().subscribe((data) => {
  //     console.log("Este esd del filterByCarga init ")
      
  //     this.productosPorVerificar = data.filter(producto => producto.Carga === nro_carga)
  //     this.productosVerificados = data.filter(producto => producto.Carga === nro_carga)
      
  //     this.cantVerificados = this.productosVerificados.filter(producto => producto.Pistoleado == true).length
  //     this.cantNoVerificados = this.productosPorVerificar.filter(producto => producto.Pistoleado == false).length
      

  //     console.log(this.cantVerificados)
  //     console.log(this.cantNoVerificados)
  //     if(data.filter(producto => producto.Pistoleado == false && producto.Carga === nro_carga).length === this.productosPorVerificar.length
  //     && data.filter(producto => producto.Pistoleado == true && producto.Carga === nro_carga).length === this.productosVerificados.length){
  //       console.log("esta data se repite")
  //     }else{
  //       this.productosPorVerificar = data.filter(producto => producto.Pistoleado == false && producto.Carga === nro_carga)
  //       this.productosVerificados = data.filter(producto => producto.Pistoleado == true && producto.Carga === nro_carga)
  //     }      
  //   })

  //   this.subRecepcion =  this.service.updateRecepcionEasyCD().subscribe((data) => {
  //     console.log("Este esd del filterByCarga update")
  //     this.productosPorVerificar = this.productosPorVerificar.filter(producto => producto.Carga === nro_carga)
  //     this.productosVerificados = this.productosVerificados.filter(producto => producto.Carga === nro_carga)

  //     this.cantVerificados = this.productosVerificados.filter(producto => producto.Pistoleado == true).length
  //     this.cantNoVerificados = this.productosPorVerificar.filter(producto => producto.Pistoleado == false).length
      
  //     if(data.filter(producto => producto.Pistoleado == false && producto.Carga === nro_carga).length === this.productosPorVerificar.length
  //     && data.filter(producto => producto.Pistoleado == true && producto.Carga === nro_carga).length === this.productosVerificados.length){
  //       console.log("esta data se repite")
  //     }else{
  //       this.productosPorVerificar = data.filter(producto => producto.Pistoleado == false && producto.Carga === nro_carga)
  //       this.productosVerificados = data.filter(producto => producto.Pistoleado == true && producto.Carga === nro_carga)
  //     }      
  //   })
  //  }
    // alert("cantidad cargas : "+ n)}
  }
  cambiarTicketByInput(cod_producto: string){

    var codigo_producto = cod_producto.replace(/'/g, "-").trim().toUpperCase()

    const producto = this.productosPorVerificar.filter(prod => prod.Entrega == codigo_producto)

    console.log(this.latStr)
    console.log(this.longStr)
    

    if(producto.length > 0){

      this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""

    const body = {
      "Id_user" : sessionStorage.getItem('id')+"",
      "Ids_user" : this.idPortal,
      "Cliente" : producto[0].Cliente,
      "Codigo_pedido" : producto[0].Entrega,   
      "Lat" :  this.latStr,
      "Long" :  this.longStr,
      "Ingreso" : "P"
    }

    this.service.reingresar_a_operacion(body).subscribe((data : any) => {
      // alert(data.message)
      this.codigoProducto = ""
      this.productosVerificados.push(producto[0])
      // this.initRecepionEasyCD()
      this.initBodegaVirtual()
    })



    } else{
      alert('El código de entrega no se encuentra en la lista')
    }
  
  
  }


  cambiarTicket(arrayIndex : number, cod_pedido: string, cliente :string) {
    // this.productosUltimo.pop()
    this.productosPorVerificar[arrayIndex].Pistoleado = true

    // this.productosUltimo.push(this.productosPorVerificar[arrayIndex])

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    
    const body = {
      "Id_user" : sessionStorage.getItem('id')+"",
      "Ids_user" : this.idPortal,
      "Cliente" : cliente,
      "Codigo_pedido" : cod_pedido,   
      "Lat" :  this.latStr,
      "Long" :  this.longStr,
      "Ingreso" : "C"
    }

    this.service.reingresar_a_operacion(body).subscribe((data : any) => {
      // alert(data.message)
      this.codigoProducto = ""
      this.productosVerificados.push(this.productosPorVerificar[arrayIndex])
      // this.initRecepionEasyCD()
      this.initBodegaVirtual()
    })
  }


 ngOnDestroy(): void {
  // Cancelar la suscripción al destruir el componente
  // this.subRecepcion.unsubscribe();
 }

}
