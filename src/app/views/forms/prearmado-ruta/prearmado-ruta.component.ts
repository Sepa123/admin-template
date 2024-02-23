import { Component,OnInit } from '@angular/core';
import { PedidoService } from  'src/app/service/pedido.service'
import { RutasService } from 'src/app/service/rutas.service';
import { PedidoSinCompromiso } from 'src/app/models/pedidoSinCompromiso.interface';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prearmado-ruta',
  templateUrl: './prearmado-ruta.component.html',
  styleUrls: ['./prearmado-ruta.component.scss']
})
export class PrearmadoRutaComponent {
public colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  isLoadingTable: boolean = true;

  constructor(private service:PedidoService, private rutaService : RutasService) { }

  pedidos: PedidoSinCompromiso[] = []
  pedidosFull : PedidoSinCompromiso[] = []
  fechaIngresoList!: string[]
  fechaCompromisoList!: any[]

  comunas : string[] = []
  comunasSeleccionadas: string[] = [];

  regiones : string[] = []
  offset : number [] = [0,100,200,300,400,500,600,700,800,900,1000,1100,1200]

  subPedido! :Subscription
  private timeouts: any[] = [];

  body : any = {
    Codigos: "",
    Fecha_ruta : "",
    Id_user : ""
  }

  bultoSeleccionados : number = 0

  pedidosSeleccionados : number = 0
  bultosSeleccionados : number = 0

  fecha_min : string = ""
  fecha_max : string = ""

  fecha_ruta : string = ""

  cantidad! : number  
  cantidadBultos! : number

  loadPedidos : boolean = true

  origen: any[] = []

  observacionActual : string | null = ""

  isModalOpen: boolean = false
  public visible = false;

  tienda : string [] = ["easy_cd","easy_opl","retiro_tienda","sportex-electrolux","fin"]

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

  
  fecha_inicio : string =""
  fecha_fin : string =""

  ngOnInit():void {
    // this.getData()
    // this.getPedidos()


    this.service.get_fechas().subscribe((data : any) => {
      this.fecha_inicio = data.Fecha_inicio
      this.fecha_fin = data.Fecha_fin

      this.getPedidos()


     // this.retiroTienda()

    // this.pendienteseOpl()
    })
  }

  // getPedidos() {

  //   // Crear un arreglo para almacenar las referencias a los setTimeout
  //     let cantActual : number = 1

  //     for (let i = 0; i < this.offset.length; i++) {
  //       const timeoutId = setTimeout(() => {
  //         this.subPedido = this.service.buscar_rutas_pendientes(this.offset[i]).subscribe((data) => {
  //           // console.log(data.length);
  //           if (data.length === 0) {
  //             cantActual = 0
  //             this.isLoadingTable = false
  //             // alert("productos pendientes listo")
  //             clearTimeout(this.timeouts[i]);
  //           } else {
  //             for (let j = 0; j < data.length; j++) {
  //               data[j].Seleccionado = false
  //               // console.log("pedido N", j);
  //               this.pedidos.push(data[j]);
  //               this.pedidos = this.pedidosFull
  //               this.origen = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Origen)
  //                 ).map(str => (JSON.parse(str))))]
  //               this.comunas = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Comuna)
  //                 ).map(str => (JSON.parse(str))))]

  //               this.regiones = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Region)
  //                 ).map(str => (JSON.parse(str))))]
  //               this.loadPedidos = false
  //               this.cantidad = this.pedidos.length
  //             }
  //             this.loadPedidos = false;
  //             // this.cantidad = this.pedidos.length;
  //             // this.cantidadBultos = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length
  //             this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
  //             this.cantidadBultos = this.pedidos.length
  //             // this.cantidadBultos = this.pedidos.reduce((acum, pedido) => acum + pedido.Bultos, 0)

  //           }
  //         }, error => {
  //           alert(error.error.detail)
  //         });
  //       }, 18320 * i);
  //       // Guardar la referencia al setTimeout en el arreglo
  //       this.timeouts.push(timeoutId);
  //     }
  // }

  seleccionarTodo(){
    this.pedidos.map(pedido => {
      pedido.Seleccionado = true
    })

    const codigos = [...new Set(this.pedidos.filter(pedido => pedido.Seleccionado == true).map(seleccion => seleccion.Cod_entrega))]
      this.bultoSeleccionados = this.pedidos.filter(pedido => pedido.Seleccionado == true).map(seleccion => seleccion.Cod_entrega).length
      this.pedidosSeleccionados =  codigos.length 
  }

  getPedidos() {

    // Crear un arreglo para almacenar las referencias a los setTimeout
      let cantActual : number = 0

      for (let i = 0; i < this.tienda.length; i++) {
        // console.log("hola")
        const timeoutId = setTimeout(() => {
          console.log("ssdadas")
          if (this.tienda[i] === "fin") {
            cantActual = 0
            console.log("its Over")
            this.isLoadingTable = false
            // alert("productos pendientes listo")
          } else {
            this.subPedido = this.service.pendientes_choice(this.fecha_inicio,this.fecha_fin,"0",this.tienda[i]).subscribe((data) => {
              for (let j = 0; j < data.length; j++) {
                data[j].Seleccionado = false
                // console.log("pedido N", j);
                this.pedidos.push(data[j]);
                this.pedidos = this.pedidosFull
                this.origen = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Origen)
                  ).map(str => (JSON.parse(str))))]
                this.comunas = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Comuna)
                  ).map(str => (JSON.parse(str))))]
      
                this.regiones = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Region)
                  ).map(str => (JSON.parse(str))))]
                this.loadPedidos = false
                this.cantidad = this.pedidos.length
              }
              this.loadPedidos = false;
              // this.cantidad = this.pedidos.length;
              // this.cantidadBultos = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length
              this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
              this.cantidadBultos = this.pedidos.length
              // this.cantidadBultos = this.pedidos.reduce((acum, pedido) => acum + pedido.Bultos, 0)
      
            // }
          }, error => {
            alert(error.error.detail)
          });
        }
        }, 15320 * i);
        // Guardar la referencia al setTimeout en el arreglo
        this.timeouts.push(timeoutId);
        
      }
  }

  seleccionarPedido(index : number,cod_entrega : number){
    // this.pedidos[index].Cod_entrega
    this.rutaService.verificar_pedido_en_ruta(cod_entrega).subscribe((data : any) => {
      if(data.en_ruta == '1') return alert(data.message)
      this.pedidos.filter(pedido => pedido.Cod_entrega == cod_entrega).map(data => {
        data.Seleccionado = !data.Seleccionado
      })

      const codigos = [...new Set(this.pedidos.filter(pedido => pedido.Seleccionado == true).map(seleccion => seleccion.Cod_entrega))]
      this.bultoSeleccionados = this.pedidos.filter(pedido => pedido.Seleccionado == true).map(seleccion => seleccion.Cod_entrega).length
      this.pedidosSeleccionados =  codigos.length 
    })
    
    
    // this.pedidos[index].Seleccionado = !this.pedidos[index].Seleccionado
  }

  selectComuna (comunaElegida :string) {
    this.comunasSeleccionadas.push(comunaElegida)
  }

   filtrarsByComuna () {
    if(this.comunasSeleccionadas.length !== 0) this.pedidos = this.pedidosFull.filter(pedido => this.comunasSeleccionadas.includes(pedido.Comuna))
    if(this.fecha_min !== "" || this.fecha_max !== "") this.filtrarPorRangoFechaCompromiso(this.fecha_min,this.fecha_max)

    if(this.comunasSeleccionadas.length !== 0 && this.fecha_min !== "" && this.fecha_max !== ""){
      this.pedidos = this.pedidosFull.filter(pedido => this.comunasSeleccionadas.includes(pedido.Comuna) && new Date(pedido.Fecha_compromiso) >= new Date(this.fecha_min)
      && new Date(pedido.Fecha_compromiso) <= new Date(this.fecha_max))
    }
    
    this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
    this.cantidadBultos = this.pedidos.length
    // this.tablaQuadmindFilter = this.tablaQuadmindFull
  }

 getAllPedidos(){
  this.pedidos = this.pedidosFull
  this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
  this.cantidadBultos = this.pedidos.length
 }

 obtenerDiaSiguiente(){
  // Obtén la fecha actual
  let fechaActual = new Date();

  // Agrega un día a la fecha actual
  fechaActual.setDate(fechaActual.getDate() + 1);

  // Obtiene el día siguiente en formato "yyyy-mm-dd"
  let añoSiguiente = fechaActual.getFullYear();
  let mesSiguiente = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Añade un 0 si es necesario para tener dos dígitos
  let diaSiguiente = String(fechaActual.getDate()).padStart(2, '0'); // Añade un 0 si es necesario para tener dos dígitos

  let fechaSiguiente = `${añoSiguiente}-${mesSiguiente}-${diaSiguiente}`;

  return fechaSiguiente
 }


  enviarEntregas(){

    const codigos = [...new Set(this.pedidos.filter(pedido => pedido.Seleccionado == true).map(seleccion => seleccion.Cod_entrega))]
    console.log(codigos)

    this.body = {
      Codigos: codigos.toString(),
      Fecha_ruta : "",
      Id_user : sessionStorage.getItem("id")+""
    }
    this.bultoSeleccionados = this.pedidos.filter(pedido => pedido.Seleccionado == true).map(seleccion => seleccion.Cod_entrega).length
    this.pedidosSeleccionados =  codigos.length 
    console.log(codigos)
    this.toggleLiveDemo()

    this.fecha_ruta = this.obtenerDiaSiguiente()
    console.log(this.body)
  }

  guardarRuta(){
    // fecha_ruta

    if(this.fecha_ruta == "") return alert("Por favor, asigne una fecha")
    this.body.Fecha_ruta = this.fecha_ruta.replaceAll('-','')
    console.log(this.body)

    this.rutaService.armar_ruta_bloque(this.body).subscribe((data : any) => {
      alert(data)
      const separador = data.split(" ")

      console.log(separador[1])

      this.rutaService.recalcular_posicion_rutas(separador[1])

      this.toggleLiveDemo()
    }, error => {
      alert("Error al cargar los datos")
    })

  }

  getData() {
    this.service.get_pedidos_sin_despacho().subscribe((data) => {
      this.pedidos = data
      this.pedidosFull = data
      this.isLoadingTable = false
      this.origen = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Origen)
          ).map(str => (JSON.parse(str))))]

      this.comunas = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Comuna)
        ).map(str => (JSON.parse(str))))]
        this.loadPedidos = false
      // this.fechaIngresoList = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Fecha_ingreso)
      //   ).map(str => (JSON.parse(str))))];   

      // this.fechaIngresoList.sort((a: string, b: string) => {
      //   const fechaA: Date = new Date(a);
      //   const fechaB: Date = new Date(b);
      //   return fechaA.getTime() - fechaB.getTime();
      // });
 
    })   
  }


  downloadPedidos () {
    this.service.get_pedidos_sin_despacho_descarga()
  }

  sortByName(origen: any) : void{
    this.pedidos = this.pedidosFull.filter(pedido => pedido.Origen == origen)
    this.cantidad = this.pedidos.length
  }


  getFullData(){
    this.fecha_min = ""
    this.fecha_max = ""
    this.comunasSeleccionadas = []
    this.pedidos = this.pedidosFull
    // this.cantidad = this.pedidosFull.length
    this.cantidad = [...new Set(this.pedidosFull.map(seleccion => seleccion.Cod_entrega))].length;
    this.cantidadBultos = this.pedidosFull.length
  }

  OrdenFechaIngreso (){
     this.pedidos.sort((a: PedidoSinCompromiso, b: PedidoSinCompromiso) => {
        const fechaA: Date = new Date(a.Fecha_ingreso);
        const fechaB: Date = new Date(b.Fecha_ingreso);
        return fechaB.getTime() - fechaA.getTime() ;
      });
  }

  OrdenFechaCompromiso (){
    this.pedidos.sort((a: PedidoSinCompromiso, b: PedidoSinCompromiso) => {
       const fechaA: Date = new Date(a.Fecha_compromiso);
       const fechaB: Date = new Date(b.Fecha_compromiso);
       return fechaB.getTime() - fechaA.getTime() ;
     });
     this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
     this.cantidadBultos = this.pedidos.length
 }

 filtrarPorComuna (comuna : string){
  this.pedidos = this.pedidosFull.filter(pedido => pedido.Comuna == comuna)
  this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
  this.cantidadBultos = this.pedidos.length
 }

 filtrarPorRegion (region : string){
  this.pedidos = this.pedidosFull.filter(pedido => pedido.Region == region)
  this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
  this.cantidadBultos = this.pedidos.length
 }

 filtrarPorRangoFechaCompromiso(fecha_min : string,fecha_max: string){
  this.pedidos = this.pedidosFull.filter(pedido => {
    return  new Date(pedido.Fecha_compromiso) >= new Date(fecha_min)
            && new Date(pedido.Fecha_compromiso) <= new Date(fecha_max)
  })
  this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
  this.cantidadBultos = this.pedidos.length
 }

 ngOnDestroy(): void {

  this.timeouts.forEach(timeout => {
    clearTimeout(timeout);
  });
  // Cancelar la suscripción al destruir el componente
  this.subPedido.unsubscribe()
}


}
