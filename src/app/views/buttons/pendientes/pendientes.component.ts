import { Component, OnInit } from '@angular/core';
import { PedidoService } from  'src/app/service/pedido.service'
import { PedidoSinCompromiso } from 'src/app/models/pedidoSinCompromiso.interface';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit{

  public colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  isLoadingTable: boolean = true;

  constructor(private service:PedidoService) { }

  pedidos: PedidoSinCompromiso[] = []
  pedidosFull : PedidoSinCompromiso[] = []
  fechaIngresoList!: string[]
  fechaCompromisoList!: any[]
  comunas : string[] = []
  regiones : string[] = []
  // offset : number [] = [0,200,400,600,800,1000,1200]
  offset : number [] = [0,100,200,300,400,500,600,700,800,900,1000,1100,1200]
  timeout : number [] = [1000,1000,1000,1000,1000,1000,1000]



  fecha_min : string = ""
  fecha_max : string = ""

  cantidad! : number  

  loadPedidos : boolean = true

  origen: any[] = []


  ngOnInit():void {
    // this.getData()
    this.getPedidos()
    // const body = { "Fecha_inicio" : "null", "Fecha_fin": "20230831" }
    // this.service.test_pendientes("null","null").subscribe((data) => {
    //   this.pedidosFull = data
    //   this.pedidos = this.pedidosFull
    //   this.isLoadingTable = false
    //   this.origen = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Origen)
    //     ).map(str => (JSON.parse(str))))]
    //   this.comunas = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Comuna)
    //     ).map(str => (JSON.parse(str))))]

    //   this.regiones = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Region)
    //     ).map(str => (JSON.parse(str))))]
    //   this.loadPedidos = false
    //   this.cantidad = this.pedidos.length
    // }, (error) => {
    //   alert(error.error.detail)
    // })
  }

  getPedidos() {

    // Crear un arreglo para almacenar las referencias a los setTimeout
      const timeouts : any = [];
      let cantActual : number = 1

      for (let i = 0; i < this.offset.length; i++) {
        const timeoutId = setTimeout(() => {
          this.service.buscar_rutas_pendientes(this.offset[i]).subscribe((data) => {
            // console.log(data.length);
            if (data.length === 0) {
              cantActual = 0
              this.isLoadingTable = false
              // alert("productos pendientes listo")
              clearTimeout(timeouts[i]);
            } else {
              for (let j = 0; j < data.length; j++) {
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
              this.cantidad = this.pedidos.length;

            }
          }, error => {
            alert(error.error.detail)
          });
        }, 18320 * i);
        // Guardar la referencia al setTimeout en el arreglo
        timeouts.push(timeoutId);
      }
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

  filterByFecha() : void {
    var fechaHoy = new Date();
    var año = fechaHoy.getFullYear();
    var mes = fechaHoy.getMonth() + 1; 
    var dia = fechaHoy.getDate();

    // Formato de fecha YYYY-MM-DD
    var fechaHoyString = año + '-' + mes.toString().padStart(2, '0') + '-' + dia.toString().padStart(2, '0');

    this.pedidos = this.pedidos.filter((pedido) => pedido.Fecha_ingreso != fechaHoyString)
    this.cantidad = this.pedidos.length
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
     this.cantidad = this.pedidos.length
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

 downloadExcel() : void{
  // Agrega una fila vacía al principio de los datos

  const datos: any[][] = [[]];

  datos.push(["Origen","Cod. Entrega","Fecha Ingreso","Fecha Compromiso","Región","Comuna","Descripción","Bultos","Estado","Subestado","Verificado","Recibido"])

  this.pedidosFull.forEach((pedido) => {
      const fila: any[] = [];
      fila.push(pedido.Origen, pedido.Cod_entrega, pedido.Fecha_ingreso, pedido.Fecha_compromiso, pedido.Region, pedido.Comuna, pedido.Descripcion, pedido.Bultos,
                pedido.Estado,pedido.Subestado,pedido.Verificado, pedido.Recibido); 
      datos.push(fila);
    });

  let date = new Date();
  const fechaActual = date.toISOString().split('T')[0];
  // Crea un libro de Excel a partir de los datos
  const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
  const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
  XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');

  // Descarga el archivo Excel `Quadminds_Manual_${fechaActual}.xlsx` 
  
  const nombreArchivo = `Pedidos-pendientes-${fechaActual}.xlsx`;
  // Nombre del archivo Excel a descargar 
  XLSX.writeFile(libroExcel, nombreArchivo);

}
} 

