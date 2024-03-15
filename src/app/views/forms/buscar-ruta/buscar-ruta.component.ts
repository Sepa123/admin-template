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

  idPedidoRuta : string = ""

  idPedidoRuta4Digitos : string = ""

  idUsuario!: string
  idPedido! : string
  idPortal! : string
  arrayRuta! : ProductoPicking []

  productoRuta : ProductoPicking [] = []
  productoRutaModal : ProductoPicking [] = []
  arrProductosRuta: ProductoPicking[] = []

  arrProductosEncontrados: ProductoPicking[] [] = []

  productoRutas4Digitos : ProductoPicking [] = []

  arrayRutasIngresados : ProductoPicking[] [] = []

  

  arrNombreRutas : NombresRutasActivas [] = []
  rutaSeleccionada : string = 'Seleccione una ruta'
  nombreRuta : string = ''


  posicion : number = 0
  fechaPedido!: string

  observacionActual : string | null = ""

  isModalOpen: boolean = false
  public visible = false;

  public visible4Digitos = false

  Descripcion_producto : string = ""

  // tabla productos ruta

  isLoadingTable : boolean = false
  pedidosIngresados : number = 0


  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string

  existeEnRuta : boolean = false
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

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  toggle4Digitos() {
    this.visible4Digitos = !this.visible4Digitos;
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
      "longitud" : this.longStr,
      "observacion" : "Pickeo producto en Despacho Ruta"
      // "cod_sku" : sku
    }

    this.service.get_datos_producto_en_ruta(body).subscribe((data) => { 

      this.productoRutaModal = data

      this.productoRuta = [data[0]]
      console.log(this.productoRuta[0].Nombre_ruta+"")
      console.log("La ruta es",this.nombreRuta)
      if (this.rutaSeleccionada == this.productoRuta[0].Nombre_ruta+""){
        this.existeEnRuta = true
      }else{
        this.existeEnRuta = false
      }

      this.arrProductosRuta.push(this.productoRuta[0])

      this.Descripcion_producto = this.productoRuta[0].Descripcion_producto

      this.nombreRuta = this.productoRuta[0].Nombre_ruta+""

      console.log(this.existeEnRuta)

      

      if(this.arrayRutasIngresados.length == 0){

      } else {
        this.arrayRutasIngresados.map((ruta, i) => {
          let res = ruta.filter((prod) =>  prod.Codigo_pedido == resultado || prod.Codigo_producto == resultado)
          console.log(res)
          if(res.length !== 0){
            ruta[0].EncontradoFull = true
            this.arrayRutasIngresados.splice(i,1)
            this.arrProductosEncontrados.push(ruta)

            this.arrProductosEncontrados = this.arrProductosEncontrados.sort((a,b) => {
              return a[0].Posicion - b[0].Posicion ;
            })
    
          } 
          
       })
      }
      this.idPedido = ""
    },
    ((error) => {
      this.idPedido = ""
      alert(error.error.detail)
    }))

  }

  agregarOCaRuta (){
    var resultado = this.idPedidoRuta.replace(/'/g, "-").trim().toUpperCase()    
    resultado = resultado.replace(/-(\d+)/, "");

    // if(this.rutasEnTabla.includes(resultado)) {
    //   this.idPedido = ""
    //   return alert("Este pedido ya fue ingresado")
    // }

    if(this.rutaSeleccionada == 'Seleccione una ruta'){
      return alert('Por favor, seleccione una ruta')
    }

    let isSeguro = confirm("¿Seguro que desea agregar este producto a la ruta?");
    if (!isSeguro) return console.log("no esta seguro")
    
    this.idUsuario = sessionStorage.getItem("id")+""
    // const fechaActual = this.obtenerFechaActual();
    // this.Nombre_ruta = sessionStorage.getItem("id") + "-"+fechaActual

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""


    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "",
      "n_guia" : resultado,
      "cod_pedido" : resultado,
      "cod_producto" : resultado,
      "ids_usuario" : this.idPortal,
      "latitud" : this.latStr,
      "longitud" : this.longStr,
      "observacion" : "Producto agregado a ruta en Despacho Ruta (prueba)",
      "ruta" : this.rutaSeleccionada,
      "id_ruta" : parseInt(this.rutaSeleccionada.split('-')[0]),
      "fecha_ruta" : this.fechaPedido
      // "cod_sku" : sku
    }
    
    this.service.registrar_producto_en_despacho_ruta(body).subscribe((data) => { 
      alert('Producto agregado exitosamente')

      this.seleccionarRuta()

    },
    ((error) => {
      this.idPedidoRuta = ""
      alert(error.error.detail)
    }))

    
    // console.log(this.arrayRutasIngresados)
    // this.todosEnRuta()
  }

  cambiarEncontrado4Digitos(index: number){

    this.productoRutas4Digitos[index].Encontrado = !this.productoRutas4Digitos[index].Encontrado 

    this.arrayRutasIngresados.map((ruta, i) => {
      let res = ruta.filter((prod) =>  prod.Codigo_pedido == this.productoRutas4Digitos[index].Codigo_pedido || prod.Codigo_producto == this.productoRutas4Digitos[index].Codigo_producto)

      console.log(res)

      if(res.length !== 0){

        const todosTienenTrue = res.every(objeto => objeto.Encontrado == true);

      if(todosTienenTrue){
        res.map((prod) => {

          prod.EncontradoFull = true

        })
        const encontrado = this.arrayRutasIngresados.splice(i,1)[0]


        console.log(index)
        console.log('me voy alv',encontrado)
        

        this.arrProductosEncontrados.push(encontrado)

        this.arrProductosEncontrados = this.arrProductosEncontrados.sort((a,b) => {
          return a[0].Posicion - b[0].Posicion ;
        })

        this.arrProductosRuta.push(res[0])
      }else {
        res.map((prod) => {

          prod.EncontradoFull = false

        })
      }
        
      }
      
  
    })

    
    // this.arrayRutasIngresados[index][0].Encontrado = !this.arrayRutasIngresados[index][0].Encontrado

    // this.arrayRutasIngresados[index][0].Notas
    

    
    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    this.idUsuario = sessionStorage.getItem("id")+""
    const body = {
      "id_usuario": parseInt(sessionStorage.getItem("id")+""),
      "cliente": this.arrayRutasIngresados[index][0].Notas,
      "n_guia": this.arrayRutasIngresados[index][0].Codigo_pedido,
      "sku": this.arrayRutasIngresados[index][0].SKU,
      "cod_pedido": this.arrayRutasIngresados[index][0].Codigo_pedido,
      "cod_producto" : this.arrayRutasIngresados[index][0].Codigo_producto,
      "ids_usuario" : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      "latitud" : this.latStr,
      "longitud" : this.longStr,
      "observacion" : "Pickeo producto en Despacho Ruta por click ticket"
    }

    this.service.registar_producto_ticket(body).subscribe((data : any) => {
      console.log(data.message)

    })

  }

  cambiarEncontrado(index : number){
    this.arrayRutasIngresados[index][0].EncontradoFull = !this.arrayRutasIngresados[index][0].EncontradoFull

    this.arrayRutasIngresados[index][0].Notas

    const encontrado = this.arrayRutasIngresados.splice(index,1)[0]
    console.log(encontrado)  

    this.arrProductosEncontrados.push(encontrado)

    this.arrProductosEncontrados = this.arrProductosEncontrados.sort((a,b) => {
      return a[0].Posicion - b[0].Posicion ;
    })


    
    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    this.idUsuario = sessionStorage.getItem("id")+""
    const body = {
      "id_usuario": parseInt(sessionStorage.getItem("id")+""),
      "cliente": this.arrayRutasIngresados[index][0].Notas,
      "n_guia": this.arrayRutasIngresados[index][0].Codigo_pedido,
      "sku": this.arrayRutasIngresados[index][0].SKU,
      "cod_pedido": this.arrayRutasIngresados[index][0].Codigo_pedido,
      "cod_producto" : this.arrayRutasIngresados[index][0].Codigo_producto,
      "ids_usuario" : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      "latitud" : this.latStr,
      "longitud" : this.longStr,
      "observacion" : "Pickeo producto en Despacho Ruta por click ticket"
    }

    this.arrProductosRuta.push(this.arrayRutasIngresados[index][0])

    this.service.registar_producto_ticket(body).subscribe((data : any) => {
      console.log(data.message)

    })
  }

  seleccionarRuta(){

    if(this.rutaSeleccionada == 'Seleccione una ruta') return console.log("selecciona una ruta zoquete")
    this.arrayRutasIngresados = []
    this.arrProductosEncontrados = []
    this.isLoadingTable =true
    this.service.get_ruta_by_nombre_ruta(this.rutaSeleccionada).subscribe((data) => {

      if (this.rutaSeleccionada == this.nombreRuta){
        this.existeEnRuta = true
      }else{
        this.existeEnRuta = false
      }

      this.nombreRuta = this.rutaSeleccionada
      this.arrayRuta = data
      this.fechaPedido = this.arrayRuta[0].Fecha_ruta+""
      const agrupadoPorPosicion : any = {};
      data.forEach((elemento) => {

        // Obtenemos la posición del elemento
        const posicion = elemento["Posicion"];
        elemento["Estado"] = elemento["Estado"] === "Entregado" ? true : false
        elemento["Provincia"] =  elemento["Provincia"] === null  ? 'Otro' : elemento["Provincia"]
        elemento["Encontrado"] = false 
        elemento["EncontradoFull"] = false

        
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


  getRutapor4Digitos(pedido: string) {

    

    var resultado = pedido.replace(/'/g, "-").trim().toUpperCase()
    resultado = resultado.replace(/-(\d+)/, "");

    if(this.rutaSeleccionada == 'Seleccione una ruta'){
      return alert('Por favor, seleccione una ruta')
    }
    
    this.productoRutas4Digitos = []

    // let isSeguro = confirm("¿Seguro que desea agregar este producto a la ruta?");
    // if (!isSeguro) return console.log("no esta seguro")


    // this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    

    this.arrayRutasIngresados.map(objeto => {
      objeto.map(prducto => {
        this.productoRutas4Digitos.push(prducto)
      })
    })

    this.productoRutas4Digitos =  this.productoRutas4Digitos.filter(producto => producto.Codigo_pedido.endsWith(resultado))

    if(this.productoRutas4Digitos.length == 0){
      this.idPedidoRuta4Digitos = ""
      return alert("No se encuentran similitudes")
    }

    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "",
      "n_guia" : resultado,
      "cod_pedido" : resultado,
      "cod_producto" : resultado,
      "ids_usuario" : this.idPortal,
      "latitud" : this.latStr,
      "longitud" : this.longStr,
      "observacion" : "Pickeo producto en Despacho Ruta"
      // "cod_sku" : sku
    }

    this.idPedidoRuta4Digitos = ""

  //   this.arrayRutasIngresados.map((ruta) => {
  //     let res = ruta.filter((prod) =>  prod.Codigo_pedido == resultado || prod.Codigo_producto == resultado)
  //     console.log(res)
  //     if(res.length !== 0){
  //       ruta[0].Encontrado = true
  //     } 
      
  //  })

    

    this.toggle4Digitos()

    

    // this.service.get_datos_producto_en_ruta_por_4_digitos(resultado).subscribe((data) => { 

    //   this.productoRutaModal = data

    //   this.productoRuta = [data[0]]
    //   console.log(this.productoRuta[0].Nombre_ruta+"")
    //   console.log("La ruta es",this.nombreRuta)
    //   if (this.rutaSeleccionada == this.productoRuta[0].Nombre_ruta+""){
    //     this.existeEnRuta = true
    //   }else{
    //     this.existeEnRuta = false
    //   }

    //   this.arrProductosRuta.push(this.productoRuta[0])

    //   this.Descripcion_producto = this.productoRuta[0].Descripcion_producto

    //   this.nombreRuta = this.productoRuta[0].Nombre_ruta+""

    //   console.log(this.existeEnRuta)

      

    //   if(this.arrayRutasIngresados.length == 0){

    //   } else {
    //     this.arrayRutasIngresados.map((ruta) => {
    //       let res = ruta.filter((prod) =>  prod.Codigo_pedido == resultado || prod.Codigo_producto == resultado)
    //       console.log(res)
    //       if(res.length !== 0){
    //         ruta[0].Encontrado = true
    //       } 
          
    //    })
    //   }
    //   this.idPedidoRuta4Digitos = ""
    // },
    // ((error) => {
    //   this.idPedidoRuta4Digitos = ""
    //   alert(error.error.detail)
    // }))

    

  }



}
