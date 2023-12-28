import { Component } from '@angular/core';
import { RutasService } from 'src/app/service/rutas.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ProductoPicking } from 'src/app/models/productoPicking.interface';
import { NombresRutasActivas } from "src/app/models/nombresRutasActivas.interface"
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
@Component({
  selector: 'app-buscar-ruta',
  templateUrl: './buscar-ruta.component.html',
  styleUrls: ['./buscar-ruta.component.scss']
})
export class BuscarRutaComponent {


  idUsuario!: string
  idPedido! : string
  idPortal! : string
  arrayRuta! : ProductoPicking []

  productoRuta : ProductoPicking [] = []
  arrProductosRuta: ProductoPicking[] = []

  arrayRutasIngresados : ProductoPicking[] [] = []

  arrNombreRutas : NombresRutasActivas [] = []
  rutaSeleccionada : string = 'Seleccione una ruta'
  nombreRuta : string = ''


  posicion : number = 0
  fechaPedido!: string

  observacionActual : string | null = ""

  isModalOpen: boolean = false
  public visible = false;

  Descripcion_producto : string = ""

  // tabla productos ruta

  isLoadingTable : boolean = false
  pedidosIngresados : number = 0


  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arrayRutasIngresados, event.previousIndex, event.currentIndex);

    this.arrayRutasIngresados.forEach((array, i) => {
      array.forEach(ruta => {
        ruta.Posicion = i + 1
      })
    })

  }
  

  constructor(private service: RutasService, private sanitizer: DomSanitizer) { }

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


  calcularDiferencias(arrayRuta : ProductoPicking []) {
    const fechaActual = new Date();
    arrayRuta.forEach(item => {
      const fecha = new Date(item.Fecha_pedido);
      const diferencia = fecha.getTime() - fechaActual.getTime();
      const diferenciaDias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
      item.Diferencias_dias = diferenciaDias;
    });
  }

  ngOnInit() {

    this.getLocation()

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    this.idUsuario = sessionStorage.getItem("id")+""
    const fecha = new Date();

    let fechaFormateada = fecha.toISOString().split('T')[0];

    this.fechaPedido = fechaFormateada

    this.service.get_rutas_activas().subscribe((data) => {
      this.arrNombreRutas = data
      console.log(this.arrNombreRutas)
    })
  }


  getRuta(pedido: string) {
    var resultado = pedido.replace(/'/g, "-").trim().toUpperCase()
    resultado = resultado.replace(/-(\d+)/, "");


    // this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""

    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "",
      "n_guia" : resultado,
      "cod_pedido" : resultado,
      "cod_producto" : resultado,
      "ids_usuario" : this.idPortal,
      "latitud" : this.latStr,
      "longitud" : this.longStr
      // "cod_sku" : sku
    }

    this.service.get_datos_producto_en_ruta(body).subscribe((data) => { 

      this.productoRuta = data

      this.arrProductosRuta.push(this.productoRuta[0])

      this.Descripcion_producto = this.productoRuta[0].Descripcion_producto

      this.nombreRuta = this.productoRuta[0].Nombre_ruta+""

      if(this.arrayRutasIngresados.length == 0){

      } else {
        this.arrayRutasIngresados.map((ruta) => {
          let res = ruta.filter((prod) =>  prod.Codigo_pedido == resultado || prod.Codigo_producto == resultado)
          console.log(res)
          if(res.length !== 0){
            ruta[0].Encontrado = true
          } 
          
       })
      }
    },
    ((error) => {
      this.idPedido = ""
      alert(error.error.detail)
    }))

  }

  cambiarEncontrado(index : number){
    this.arrayRutasIngresados[index][0].Encontrado = !this.arrayRutasIngresados[index][0].Encontrado
  }

  seleccionarRuta(){

    if(this.rutaSeleccionada == 'Seleccione una ruta') return console.log("selecciona una ruta zoquete")
    this.arrayRutasIngresados = []
    this.isLoadingTable =true
    this.service.get_ruta_by_nombre_ruta(this.rutaSeleccionada).subscribe((data) => {
      this.arrayRuta = data
      this.fechaPedido = this.arrayRuta[0].Fecha_ruta+""
      const agrupadoPorPosicion : any = {};
      data.forEach((elemento) => {

        // Obtenemos la posición del elemento
        const posicion = elemento["Posicion"];
        elemento["Estado"] = elemento["Estado"] === "Entregado" ? true : false
        elemento["Provincia"] =  elemento["Provincia"] === null  ? 'Otro' : elemento["Provincia"]
        elemento["Encontrado"] = false

        
        // elemento["DP"] = false
        // Si la posición no está present e en el objeto agrupadoPorPosicion,
        // la inicializamos como un array vacío

        if (!agrupadoPorPosicion.hasOwnProperty(posicion)) {
            agrupadoPorPosicion[posicion] = [];
        }
    
        // Agregamos el elemento actual al array correspondiente a su posición
        agrupadoPorPosicion[posicion].push(elemento);

        this.pedidosIngresados = posicion

        
    });
    
    // Convertimos el objeto en un array de arrays
    const arrayDeArray : ProductoPicking [] [] = Object.values(agrupadoPorPosicion);
    
    // Imprimimos el resultado
    console.log( "Array de array",arrayDeArray);

    arrayDeArray.forEach(array => {

      let prueba = array.filter(dato => this.arrProductosRuta.some(some => some.Codigo_pedido == dato.Codigo_pedido || some.Codigo_producto == dato.Codigo_producto))
      if(prueba.length != 0){
        array[0].Encontrado = true
      }
      this.arrayRutasIngresados.push(array)
    });

      
    this.calcularDiferencias(this.arrayRuta)

      // this.arrayRutasIngresados.unshift(this.arrayRuta)
      this.isLoadingTable = false

    })

  }



}
