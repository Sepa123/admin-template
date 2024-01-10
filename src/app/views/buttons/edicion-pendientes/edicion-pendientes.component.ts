import { Component, OnInit } from '@angular/core';
import { PedidoService } from  'src/app/service/pedido.service'
import { PedidoSinCompromiso } from 'src/app/models/pedidoSinCompromiso.interface';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { Subscription } from 'rxjs';
import { LogInversaService } from 'src/app/service/log-inversa.service'
import { Estado,Subestado } from 'src/app/models/estados.interface'

@Component({
  selector: 'app-edicion-pendientes',
  templateUrl: './edicion-pendientes.component.html',
  styleUrls: ['./edicion-pendientes.component.scss']
})
export class EdicionPendientesComponent {

  public colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  isLoadingTable: boolean = true;

  constructor(public builder: FormBuilder, private service:PedidoService, private lgService : LogInversaService) { }

  pedidos: PedidoSinCompromiso[] = []
  pedidosFull : PedidoSinCompromiso[] = []
  fechaIngresoList!: string[]
  fechaCompromisoList!: any[]
  comunas : string[] = []
  regiones : string[] = []
  // offset : number [] = [0,200,400,600,800,1000,1200]
  offset : number [] = [0,100,200,300,400,500,600,700,800,900,1000,1100,1200]
  timeout : number [] = [1000,1000,1000,1000,1000,1000,1000]

  subPedido! :Subscription
  private timeouts: any[] = [];

  fecha_min : string = ""
  fecha_max : string = ""

  cantidad! : number  

  loadPedidos : boolean = true

  origen: any[] = []

  isModalOpen: boolean = false
  public visible = false;

  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string

  estados  : Estado [] = []
  subestados : Subestado [] = []

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

  formEdicion = this.builder.group({
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    Estado_inicial : this.builder.control(""),
    Subestado_inicial : this.builder.control(""),
    Estado_final : this.builder.control(""),
    Subestado_final : this.builder.control(""),
    Link: this.builder.control(""),
    Observacion: this.builder.control(""),
    Latitud: this.builder.control(""),
    Longitud: this.builder.control(""),
    Origen: this.builder.control(""),
    Codigo_pedido : this.builder.control("")
  })

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

  tienda : string [] = ["easy_cd","easy_opl","retiro_tienda","sportex-electrolux","fin"]

  ngOnInit():void {
    // this.getData()
    // this.getPedidos()
    this.getLocation()
    this.lgService.get_estados_pedidos().subscribe((data : any) => {
      console.log(data) 
      this.estados = data.estado
      this.subestados = data.subestado

      // console.log(this.estado,this.subestado)


    })

    // this.service.get_fechas().subscribe((data : any) => {
    //   this.fecha_inicio = data.Fecha_inicio
    //   this.fecha_fin = data.Fecha_fin

    //   // this.getPedidos()


    //  // this.retiroTienda()

    // // this.pendienteseOpl()
    // })
  }

  pedidoSeleccionado : PedidoSinCompromiso [] = []

  editarEstado(pedido : PedidoSinCompromiso){
    this.pedidoSeleccionado.pop()
    this.pedidoSeleccionado.push(pedido)
    let subestado = this.subestados.find((dato) => dato.Nombre == pedido.Subestado) 
    let estado = this.estados.find((dato) => dato.Descripcion == pedido.Estado) 

    console.log("subestados")
    
    console.log()

    this.subestados = this.subestados.filter((sub) => sub.Parent_code == estado?.Estado)

    this.formEdicion.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Estado_inicial : estado?.Estado.toString(),
      Subestado_inicial : subestado?.Code.toString(),
      Estado_final : estado?.Estado.toString(),
      Subestado_final : subestado?.Code.toString(),
      Link: "",
      Latitud: this.latStr,
      Longitud: this.longStr,
      Origen: pedido.Origen,
      Codigo_pedido : pedido.Cod_entrega.toString()
    })
    this.toggleLiveDemo()
    console.log(pedido)
    
  }

  bloqBoton : boolean = false
  buscarPorFecha(){
    this.bloqBoton = true
    this.fecha_inicio = this.fecha_fin
    this.pedidos = [];
    this.pedidosFull = []


    this.getPedidos()
    
  }

  getPedidos() {

    // Crear un arreglo para almacenar las referencias a los setTimeout
      let cantActual : number = 0

      for (let i = 0; i < this.tienda.length; i++) {
        // console.log("hola")
        const timeoutId = setTimeout(() => {
          if (this.tienda[i] === "fin") {
            cantActual = 0
            console.log("its Over")
            this.bloqBoton = false
            this.isLoadingTable = false
            // alert("productos pendientes listo")
          } else {
            this.subPedido = this.service.pendientes_choice(this.fecha_inicio,this.fecha_fin,"0",this.tienda[i]).subscribe((data) => {
              for (let j = 0; j < data.length; j++) {
                data[j].Seleccionado = false
                // console.log("pedido N", j);
                this.pedidos.push(data[j]);
                this.pedidosFull = this.pedidos
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
              // this.cantidadBultos = this.pedidos.length
              // this.cantidadBultos = this.pedidos.reduce((acum, pedido) => acum + pedido.Bultos, 0)
               this.pedidosFull = this.pedidos
            // }
          }, error => {
            alert(error.error.detail)
          });
        }
        },5000 * i);
        // Guardar la referencia al setTimeout en el arreglo
        this.timeouts.push(timeoutId);
        
      }
  }

  ngOnDestroy(): void {

    this.timeouts.forEach(timeout => {
      clearTimeout(timeout);
    });
    // Cancelar la suscripción al destruir el componente
    this.subPedido.unsubscribe()
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
    })

    
  }
  downloadPedidos () {
    this.service.get_pedidos_sin_despacho_descarga()
  }

  sortByName(origen: any) : void{
    this.pedidos = this.pedidosFull.filter(pedido => pedido.Origen == origen)
    this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
  }

  filterByFecha() : void {
    var fechaHoy = new Date();
    var año = fechaHoy.getFullYear();
    var mes = fechaHoy.getMonth() + 1; 
    var dia = fechaHoy.getDate();

    // Formato de fecha YYYY-MM-DD
    var fechaHoyString = año + '-' + mes.toString().padStart(2, '0') + '-' + dia.toString().padStart(2, '0');

    this.pedidos = this.pedidos.filter((pedido) => pedido.Fecha_ingreso != fechaHoyString)
    this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
  }

  getFullData(){
    this.pedidos = this.pedidosFull

    this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
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
 }

 filtrarPorComuna (comuna : string){
  this.pedidos = this.pedidosFull.filter(pedido => pedido.Comuna == comuna)
  this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
 }

 filtrarPorRegion (region : string){
  this.pedidos = this.pedidosFull.filter(pedido => pedido.Region == region)
  this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
 }

 filtrarPorRangoFechaCompromiso(fecha_min : string,fecha_max: string){
  this.pedidos = this.pedidos.filter(pedido => {
    return  new Date(pedido.Fecha_compromiso) >= new Date(fecha_min)
            && new Date(pedido.Fecha_compromiso) >= new Date(fecha_max)
  })
  this.cantidad = [...new Set(this.pedidos.map(seleccion => seleccion.Cod_entrega))].length;
 }


 registrarEdicion(){

  let isSeguro = confirm("¿Seguro que desea guardar los cambios?");

  if (!isSeguro) {
    return console.log("no esta seguro")
  }

  this.lgService.registrar_bitacora_lg(this.formEdicion.value).subscribe((data) =>{
    console.log(data)
    this.formEdicion.reset()
    this.toggleLiveDemo()
  })
  
 }
 



} 
