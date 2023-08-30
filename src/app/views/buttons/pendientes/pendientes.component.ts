import { Component, OnInit } from '@angular/core';
import { PedidoService } from  'src/app/service/pedido.service'
import { PedidoSinCompromiso } from 'src/app/models/pedidoSinCompromiso.interface';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit{

  public colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  isLoadingTable: boolean = true;

  constructor(private service:PedidoService) { }

  pedidos!: PedidoSinCompromiso[]
  pedidosFull!: PedidoSinCompromiso[]
  fechaIngresoList!: string[]
  fechaCompromisoList!: any[]
  comunas : string[] = []
  regiones : string[] = []


  fecha_min : string = ""
  fecha_max : string = ""

  cantidad! : number  

  loadPedidos : boolean = true

  origen: any[] = []


  ngOnInit():void {
    // this.getData()
    // const body = { "Fecha_inicio" : "null", "Fecha_fin": "20230831" }
    this.service.buscar_rutas_pendientes("null","null").subscribe((data) => {
      this.pedidosFull = data
      this.pedidos = this.pedidosFull
      this.isLoadingTable = false
      this.origen = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Origen)
        ).map(str => (JSON.parse(str))))]
      this.comunas = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Comuna)
        ).map(str => (JSON.parse(str))))]

      this.regiones = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Region)
        ).map(str => (JSON.parse(str))))]
      this.loadPedidos = false
      this.cantidad = this.pedidos.length
    }, (error) => {
      alert(error.error.detail)
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
  }

  filterByFecha() : void {
    var fechaHoy = new Date();
    var año = fechaHoy.getFullYear();
    var mes = fechaHoy.getMonth() + 1; 
    var dia = fechaHoy.getDate();

    // Formato de fecha YYYY-MM-DD
    var fechaHoyString = año + '-' + mes.toString().padStart(2, '0') + '-' + dia.toString().padStart(2, '0');

    this.pedidos = this.pedidos.filter((pedido) => pedido.Fecha_ingreso != fechaHoyString)
  }

  getFullData(){
    this.pedidos = this.pedidosFull
    this.cantidad = this.pedidosFull.length
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
 }

 filtrarPorComuna (comuna : string){
  this.pedidos = this.pedidosFull.filter(pedido => pedido.Comuna == comuna)
  this.cantidad = this.pedidos.length
 }

 filtrarPorRegion (region : string){
  this.pedidos = this.pedidosFull.filter(pedido => pedido.Region == region)
  this.cantidad = this.pedidos.length
 }

 filtrarPorRangoFechaCompromiso(fecha_min : string,fecha_max: string){
  this.pedidos = this.pedidos.filter(pedido => {
    return  new Date(pedido.Fecha_compromiso) >= new Date(fecha_min)
            && new Date(pedido.Fecha_compromiso) >= new Date(fecha_max)
  })
  this.cantidad = this.pedidos.length
 }
} 

