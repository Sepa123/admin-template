import { Component } from '@angular/core';
import { RutasService } from 'src/app/service/rutas.service';
import { TocService } from 'src/app/service/toc.service';
import { TrackingBeetrack,LineaProducto } from 'src/app/models/trackingBeetrack.interface'
import { ProductoPicking,FacturaElectrolux } from 'src/app/models/productoPicking.interface';
import { TocTracking } from 'src/app/models/tocTracking.interface'
import { BitacoraLITracking } from "src/app/models/log_inversa/bitacoraLITracking.interface" 
import { VidaProductoService } from '../../../service/vida-producto.service';
import { vidaProducto } from 'src/app/models/vidaProducto.interface';
import { AlertasVigente } from 'src/app/models/alertasVigentes.interface';
import { AlertaExistenteTOC } from 'src/app/models/editarTOC.interface';
import { ComunasService } from 'src/app/service/comunas/comunas.service';
import { Codigo1 } from 'src/app/models/Codigos1.interface';
import { Subestados } from 'src/app/models/subestados.interface';
import { UsuarioTOC } from 'src/app/models/usuariosTOC.interface'
import { FormBuilder, Validators, ValidationErrors } from '@angular/forms'
import { BuscarCabeceraProducto } from 'src/app/models/buscar.cabecera';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  isOK : boolean = false

  Month!: string
  day!: string
  year!: string

  hour!: string 




  bitacoraLI : BitacoraLITracking [] = []

  arrayError : boolean [] = [false,false,false,false]

  indexCambiado : any[] = []

  arrayBuscarCabecera: BuscarCabeceraProducto[] = []

  arrayProductos : vidaProducto [] = []

  factura : any [] = []

  isTrackingBeetrack : boolean = false

  codigoPedido: string = ''

  codigoPick: string = ''

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
  
  Color: Number = 0;
  
  //Toc section
  alertaExistente : AlertaExistenteTOC [] = []
  guiaActual : string = ""
  arrayTOCTracking : TocTracking [] = []
  buscaAlerta : boolean = false
  formEditarTOC: any;

loadingData: any;

  
verObservacion(obs : string | null){
  if(obs === null || obs === ""){
    this.observacionActual = "Sin observación"
  }else{
    this.observacionActual = obs
  }
  console.log("hola")
  this.toggleLiveDemo()
}

  getColor(Color:Number): string { 
    if (Color == 0) {
      return '#B8B8B8'; // 
    } else if (Color == 1) {
      return '#04BD41'; // 
    } else if (Color == 2) {
      return '#F52822'; // 
    } else if(Color == 3){
      return  '#ecab0f';
    } else {
      return 'No se encuentra el color'
    }
  }

  getColorLetra(Color:Number): string { 
    if (Color == 0) {
      return 'black'; // 
    } else if (Color == 1) {
      return 'white'; // 
    } else if (Color == 2) {
      return 'white'; // 
    } else if(Color == 3){
      return  'black';
    } else {
      return 'No se encuentra el color'
    }
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





  constructor (private service: VidaProductoService){
    
  }

  convertir_int(num : string){
    console.log(parseInt(num))
    return parseInt(num)
  }


  ngOnInit(){

  }

  // buscarFacturaElectrolux(pedido : string){
  //   this.service.get_factura_electrolux(pedido).subscribe((data : any) => {http://localhost:4200/
  //     this.factura = data
  //   })
  // }

  isModalEditar: boolean = false
  public visibleEditar = false;
  toggleEditar() {
    this.visibleEditar = !this.visibleEditar
  }

  handleEditar(event: any) {
    this.visibleEditar = event;
  }
  openModalEditar(){
    this.isModalEditar = true
  }

  closeModalEditar(){
    this.isModalEditar = false
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

  buscarCabecera(codigo:string){
    this.service.buscar_cabecera_producto(codigo).subscribe(data => {this.arrayBuscarCabecera = data; console.log(this.arrayBuscarCabecera)})
    console.log(this.buscarCabecera)
  }

  buscarTrackBeetrack(codigo : string){
      this.service.get_lista_funciones(codigo).subscribe(data => {this.arrayProductos = data; console.log(this.arrayProductos)})
    }
    
  buscarAlerta(codigo : string){

      this.service.toc_tracking(codigo).subscribe(data => {
        this.arrayTOCTracking = data
        // this.guiaActual = codigo
        if(data.length !== 0){
          this.service.buscar_guia_by_codigo(codigo).subscribe((data : any)=> {
            this.guiaActual = data.Guia
          })
        }
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
        this.buscaAlerta = true
        
    }, error => {
  
    })
    }
    codigoEditar  : string = ""
    updateData( codigo : string) {

      this.service.buscar_alerta_by_ids_transyanez(codigo).subscribe(data => {
        this.alertaExistente = data
        this.codigoEditar = codigo

        this.formEditarTOC.patchValue({
          Alerta : data[0].Alerta,
          Observacion : data[0].Observacion,
          Direccion_correcta : data[0].Direccion_correcta,
          Fecha_reprogramada : data[0].Fecha_Reprogramada,
          Comuna_correcta : data[0].Comuna_correcta,
          Codigo1Str : data[0].Codigo1,
          Subestado_esperado : data[0].Subestado_esperado,
          Ids_transyanez : codigo,
          Id_usuario : sessionStorage.getItem("id")?.toString()+"",
          Ids_usuario : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
          Guia : data[0].Guia
        })
        this.toggleEditar()
      })
      
    }
    

    //   this.arrayError = [false,false,false,false]

    // var resultado = codigo.replace(/'/g, "-").trim().toUpperCase()
    // resultado = codigo.replace(/-(\d+)/, "");

    // this.service.recuperar_tracking_beetrack(resultado).subscribe((data) => {
    //   this.trackingBeetrack = data
    //   // this.fechaIngresoSistema = this.trackingBeetrack[0].Fecha_ingreso_beetrack
    //   this.codigoPick = ""
    //   this.isTrackingBeetrack = true
    // }, error => {
    //   this.arrayError[0] = true
    //   this.isTrackingBeetrack = false
    // })

    // this.service.recuperar_fecha_ingreso_sistema(resultado).subscribe((data : any) => {
    //   this.fechaIngresoSistema = data.Fecha_ingreso_sistema
    // })

    // this.service.recuperar_linea_producto(resultado).subscribe((data)=>{
    //   this.linea_producto = data
    //   // console.log("Linea producto:",this.linea_producto.Linea.map(i=>Number(i)))
    //   this.linea_cambio = this.zeroEnUno(this.linea_producto.Linea.map(i=>Number(i)))
    //   // console.log("Linea producto cambios:",this.linea_cambio )
    //   this.linea_producto.Linea = this.reemplazarHastaUltimoUno(this.linea_producto.Linea.map(i=>Number(i)),this.linea_cambio)
    //   // this.linea_producto.Linea = ["1","1","1","1","0"]
    //   // console.log("Linea producto final", this.linea_producto.Linea)
    //   this.isOK = true
    //   this.codigoPickeado = resultado
    // }, error => {
    //   this.arrayError[1] = true
    // })

    // this.service.get_rutas_tracking(codigo).subscribe((data) => {
    //   this.productosRuta = data
    //   this.codigoPickeado = codigo
    //   // console.log(data)
    //   this.isOK = true

    //   this.productosRuta.map((ruta) => {
    //     ruta.arrayNombreRuta = ruta.Nombre_ruta?.split("@")

    //   })

      // const algo = this.productosRuta[0].Nombre_ruta?.split("@")

      // if(algo !== undefined){
      //   this.ruta_hela =  algo
      // }
      

//       if(this.productosRuta[0].Notas.indexOf("Electrolux") !== -1){
//         this.buscarFacturaElectrolux(codigo)
//         this.isElux = true
//       }else {
//         this.factura = []
//       }
//     }, error => {
//       this.arrayError[2] = true
//     })

//     this.tocService.toc_tracking(codigo).subscribe(data => {
//         this.arrayTOCTracking = data
//         this.arrayTOCTracking.map(toc => {
//           if (toc.Direccion == null || toc.Direccion == '') {
//             toc.Direccion = 'Sin dirección*'
//           }
//           if (toc.Fecha_compromiso == null || toc.Fecha_compromiso == '') {
//             toc.Fecha_compromiso = 'Sin Fecha Compromiso*'
//           }
//           if (toc.Comuna == null || toc.Comuna == '') {
//             toc.Comuna = 'Sin Comuna*'
//           }
//         })
        
//     }, error => {
//       this.arrayError[3] = true
//     })

//     this.service.get_bitacora_li_tracking(codigo).subscribe(data => {
//       this.bitacoraLI = data
//     }, error => {
//       this.arrayError[3] = true
//     })

//     const todosSonTrue = this.arrayError.every((elemento) => elemento === true)
//     if(todosSonTrue) {
//       alert("El codigo no es valido")
//     }

//   }

      

 }

// const boxes = document.querySelectorAll('.box')
// window.addEventListener('scroll', DisplayContent)

// function DisplayContent(){
  // const TriggerBottom=(window.innerHeight /5) *4
  
  // boxes.forEach((box)=>{
    // const topBox = box.getBoundingClientRect().top

    // if(topBox < TriggerBottom){
      // box.classList.contains("Show");
    // }else{
      // box.classList.remove("show")
    // }
  // })
// }


