import { Component } from '@angular/core';
import { RutasService } from 'src/app/service/rutas.service';
import { TrackingBeetrack,LineaProducto } from 'src/app/models/trackingBeetrack.interface'
import { ProductoPicking } from 'src/app/models/productoPicking.interface';

@Component({
  selector: 'app-tracking-producto',
  templateUrl: './tracking-producto.component.html',
  styleUrls: ['./tracking-producto.component.scss']
})
export class TrackingProductoComponent {
  isOK : boolean = false

  arrayError : boolean [] = [false,false,false]

  indexCambiado : any[] = []

  isTrackingBeetrack : boolean = false
  codigoPick! : string

  codigoPickeado : string = ""

  trackingBeetrack : TrackingBeetrack [] = []

  linea_producto : LineaProducto = {
    "Cliente": "Easy OPL",
    "Linea": ["0","0","0","0","0"]
  }

  linea_cambio = ["0","0","0","0","0"]

  productosRuta : ProductoPicking [] = []

  fechaIngresoSistema : string = ""

  constructor (private service: RutasService){

  }


  ngOnInit(){

  }

  zeroEnUno(arr : any []){
    // console.log(arr)
      const newArr = arr.map((value,i) => {
          if( value == "0"){
            this.indexCambiado.push(i)
            return "1"
          } else {
            return "0"
          }
        })
      for(let i = arr.lastIndexOf("1"); i< newArr.length; i++){
          newArr[i] = "0"
      }

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
    const uno = arr.indexOf("1")

    for( let i = 0; i < arr.length ;i++) {
      if(i < uno){
        result.push('1')
      }else{
        result.push('0')
      }
    }
    return result
  }

  reemplazarHastaUltimoUno(arr1: any [], arr2 : any[]) {
    let lastIndex = arr2.lastIndexOf('1');
    if (lastIndex === -1) {
      return arr1; // Si no hay '1' en el segundo arreglo, no se realiza ningún reemplazo
    }
  
    let result = arr1.slice(); // Crear una copia del primer arreglo para no modificarlo directamente
  
    for (let i = 0; i <= lastIndex && i < arr1.length; i++) {
      if (arr2[i] === '1') {
        result[i] = '1';
      }
    }
  
    return result;
  }

  isWarning(arr : any [],indexesToReplace : any []){
      return arr.map((value, index) => {
        return indexesToReplace.includes(index) ? "1" : value;
      });
  }

  buscarTrackBeetrack(codigo : string){
      this.fechaIngresoSistema = ""
      this.isOK = false
      this.codigoPick = ""
      this.trackingBeetrack = []
      this.linea_cambio = ["0","0","0","0","0"]
      this.linea_producto = {
        "Cliente": "",
        "Linea": ["0", "0","0","0","0"]
      }
      this.arrayError = [false,false,false]

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
      console.log(this.linea_producto.Linea)
      this.linea_cambio = this.zeroEnUno(this.linea_producto.Linea)
      this.linea_producto.Linea = this.reemplazarHastaUltimoUno(this.linea_producto.Linea,this.linea_cambio)
      this.isOK = true
      this.codigoPickeado = resultado
    }, error => {
      this.arrayError[1] = true
    })

    this.service.get_rutas_manual_sin_filtro(codigo).subscribe((data) => {
      this.productosRuta = data
      this.codigoPickeado = codigo
      // console.log(data)
      this.isOK = true
    }, error => {
      this.arrayError[2] = true
    })

    const todosSonTrue = this.arrayError.every((elemento) => elemento === true)
    if(todosSonTrue) {
      alert("El codigo no es valido")
    }
  }

}
