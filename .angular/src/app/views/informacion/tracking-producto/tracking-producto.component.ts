import { Component } from '@angular/core';
import { RutasService } from 'src/app/service/rutas.service';
import { TocService } from 'src/app/service/toc.service';
import { TrackingBeetrack,LineaProducto } from 'src/app/models/trackingBeetrack.interface'
import { ProductoPicking,FacturaElectrolux } from 'src/app/models/productoPicking.interface';
import { TocTracking } from 'src/app/models/tocTracking.interface'
import { BitacoraLITracking } from "src/app/models/log_inversa/bitacoraLITracking.interface" 

@Component({
  selector: 'app-tracking-producto',
  templateUrl: './tracking-producto.component.html',
  styleUrls: ['./tracking-producto.component.scss']
})
export class TrackingProductoComponent {
  isOK : boolean = false

  bitacoraLI : BitacoraLITracking [] = []

  arrayError : boolean [] = [false,false,false,false]

  indexCambiado : any[] = []

  arrayTOCTracking : TocTracking [] = []

  factura : any [] = []

  isTrackingBeetrack : boolean = false
  codigoPick! : string

  codigoPickeado : string = ""

  trackingBeetrack : TrackingBeetrack [] = []

  linea_producto : LineaProducto = {
    "Cliente": "Easy OPL",
    "Linea": [0,0,0,0,0]
  }


  ruta_hela : string [] = []

  linea_cambio = [0,0,0,0,0]

  public rol = sessionStorage.getItem("rol_id") 

  productosRuta : ProductoPicking [] = []

  fechaIngresoSistema : string = ""
  regex = /\*/;

  observacionActual : string | null = ""

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

  verObservacion(obs : string | null){
    if(obs === null || obs === ""){
      this.observacionActual = "Sin observación"
    }else{
      this.observacionActual = obs
    }
    this.toggleLiveDemo()
  }

  constructor (private service: RutasService, private tocService : TocService){

  }

  convertir_int(num : string){
    console.log(parseInt(num))
    return parseInt(num)
  }


  ngOnInit(){

  }

  buscarFacturaElectrolux(pedido : string){
    this.service.get_factura_electrolux(pedido).subscribe((data : any) => {
      this.factura = data
    })
  }

  zeroEnUno(arr : any []){
      console.log(arr)
      const newArr = arr.map((value,i) => {
          if( value == 0 ){
            this.indexCambiado.push(i)
            return 1
          } else if(value > 1) {
            this.indexCambiado.push(i)
            return 2
          }
          else {
            return 0
          }
        })
      for(let i = arr.lastIndexOf(1); i< newArr.length; i++){
          if(newArr[i] == 2){
            newArr[i - 1] = 1
          }else{
            newArr[i] = 0
          }
          
      }

      console.log("New arreglo", newArr)

      return newArr
    }

    getClassCondition(numeroString: string): any {
      const numero = parseInt(numeroString);
      console.log(numero)
      if (numero >= 1) {
        return true;
      } else {
        return false;
      }
    }

  convertirCerosUnos(arr : any []) {
    let result = [];
    const uno = arr.indexOf(1)

    for( let i = 0; i < arr.length ;i++) {
      if(i < uno){
        result.push(1)
      }else{
        result.push(0)
      }
    }
    return result
  }

  reemplazarHastaUltimoUno(arr1: any [], arr2 : any[]) {
    let lastIndex = arr2.lastIndexOf(1);
    if (lastIndex === -1) {
      return arr1; // Si no hay '1' en el segundo arreglo, no se realiza ningún reemplazo
    }
  
    let result = arr1.slice(); // Crear una copia del primer arreglo para no modificarlo directamente
  
    for (let i = 0; i <= lastIndex && i < arr1.length; i++) {
      if (arr2[i] === 1 ) {
        result[i] = 1;
      }
    }
  
    return result;
  }

  isWarning(arr : any [],indexesToReplace : any []){
      return arr.map((value, index) => {
        return indexesToReplace.includes(index) ? 1 : value;
      });
  }

  isElux : boolean = false
  buscarTrackBeetrack(codigo : string){
    this.isElux = false
    
      this.factura = []
      this.productosRuta = []
      this.fechaIngresoSistema = ""
      this.isOK = false
      this.codigoPick = ""
      this.trackingBeetrack = []
      this.linea_cambio = [0,0,0,0,0]
      this.linea_producto = {
        "Cliente": "",
        "Linea": [0,0,0,0,0]
      }
      this.arrayError = [false,false,false,false]

    var resultado = codigo.replace(/'/g, "-").trim().toUpperCase()
    resultado = codigo.replace(/-(\d+)/, "");

    this.service.recuperar_tracking_beetrack(resultado).subscribe((data) => {
      this.trackingBeetrack = data
      // this.fechaIngresoSistema = this.trackingBeetrack[0].Fecha_ingreso_beetrack
      this.codigoPick = ""
      this.isTrackingBeetrack = true
    }, error => {
      this.arrayError[0] = true
      this.isTrackingBeetrack = false
    })

    this.service.recuperar_fecha_ingreso_sistema(resultado).subscribe((data : any) => {
      this.fechaIngresoSistema = data.Fecha_ingreso_sistema
    })

    this.service.recuperar_linea_producto(resultado).subscribe((data)=>{
      this.linea_producto = data
      // console.log("Linea producto:",this.linea_producto.Linea.map(i=>Number(i)))
      this.linea_cambio = this.zeroEnUno(this.linea_producto.Linea.map(i=>Number(i)))
      // console.log("Linea producto cambios:",this.linea_cambio )
      this.linea_producto.Linea = this.reemplazarHastaUltimoUno(this.linea_producto.Linea.map(i=>Number(i)),this.linea_cambio)
      // this.linea_producto.Linea = ["1","1","1","1","0"]
      // console.log("Linea producto final", this.linea_producto.Linea)
      this.isOK = true
      this.codigoPickeado = resultado
    }, error => {
      this.arrayError[1] = true
    })

    this.service.get_rutas_tracking(codigo).subscribe((data) => {
      this.productosRuta = data
      this.codigoPickeado = codigo
      // console.log(data)
      this.isOK = true

      this.productosRuta.map((ruta) => {
        ruta.arrayNombreRuta = ruta.Nombre_ruta?.split("@")

      })

      // const algo = this.productosRuta[0].Nombre_ruta?.split("@")

      // if(algo !== undefined){
      //   this.ruta_hela =  algo
      // }
      

      if(this.productosRuta[0].Notas.indexOf("Electrolux") !== -1){
        this.buscarFacturaElectrolux(codigo)
        this.isElux = true
      }else {
        this.factura = []
      }
    }, error => {
      this.arrayError[2] = true
    })

    this.tocService.toc_tracking(codigo).subscribe(data => {
        this.arrayTOCTracking = data
        this.arrayTOCTracking.map(toc => {
          if (toc.Direccion == null || toc.Direccion == '') {
            toc.Direccion = 'Sin dirección*'
          }
          if (toc.Fecha_compromiso == null || toc.Fecha_compromiso == '') {
            toc.Fecha_compromiso = 'Sin Fecha Compromiso*'
          }
          if (toc.Comuna == null || toc.Comuna == '') {
            toc.Comuna = 'Sin Comuna*'
          }
        })
        
    }, error => {
      this.arrayError[3] = true
    })

    this.service.get_bitacora_li_tracking(codigo).subscribe(data => {
      this.bitacoraLI = data
    }, error => {
      this.arrayError[3] = true
    })

    const todosSonTrue = this.arrayError.every((elemento) => elemento === true)
    if(todosSonTrue) {
      alert("El codigo no es valido")
    }
  }

}
