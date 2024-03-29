import { Component } from '@angular/core';
import { ROLES_ENUM } from 'src/app/models/enum/roles.enum';
import { RsvService } from 'src/app/service/rsv.service'
import { DetalleVenta, NotaVenta, NotaVentaProducto } from 'src/app/models/notaVenta.interface';
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class ListaVentasComponent {

  listaVenta : NotaVenta [] = []

  idVentaSelec! : number 

  isNotaProducto : boolean = false

  fechaPreparacion : string = ""
  fechaEntrega : string = ""
  isEntregado : boolean = false

  isBarcode : boolean = false

  listaVentaDetalle : NotaVentaProducto [] = []
  listaBarcodeDetalle : DetalleVenta [] = []

  MesSeleccionado : string = ""
  AnoSeleccionado : string =""
  añoActual : string =""

  sucursalSeleccionada : string = ""

  listaAnos : string [] = []
  meses : any [] = []

  sucursales : SucursalRSV [] = []

  public rol = sessionStorage.getItem("rol_id") 

  

  // modales 
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

  constructor(private service: RsvService) {
    this.meses = [
      { Nombre: 'Enero', Valor: '01' },
      { Nombre: 'Febrero', Valor: '02' },
      { Nombre: 'Marzo', Valor: '03' },
      { Nombre: 'Abril', Valor:'04' },
      { Nombre: 'Mayo', Valor: '05' },
      { Nombre: 'Junio', Valor:'06' },
      { Nombre: 'Julio', Valor: '07' },
      { Nombre: 'Agosto', Valor: '08' },
      { Nombre: 'Septiembre', Valor: '09' },
      { Nombre: 'Octubre', Valor: '10' },
      { Nombre: 'Noviembre', Valor: '11' },
      { Nombre: 'Diciembre', Valor: '12' }
    ]
  }

  ngOnInit(){
    this.service.get_sucursales().subscribe((data) => {
      this.sucursales = data
      console.log()
      if(this.rol !== '5'){
        this.sucursales = this.sucursales.filter(sucursal => sucursal.Id !== 2)
      }
    })

    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear().toString();
    const mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');

    const añoInicial = 2020;
    const años = [];

    for (let año = añoInicial; año <= parseInt(añoActual); año++) {
        años.push(año.toString());
    }

    this.listaAnos = años
  }

  filtrarListaVentaPorMes(año : string, sucursal : string){
    // this.arrlistaEtiquetas = []
    if ( sucursal == ""){
      return alert ("Por favor, seleccione una sucursal")
    }
    this.service.get_nota_venta_por_mes_y_sucursal(año,sucursal).subscribe(data => {
      this.listaVenta = data
      if(this.rol !== '5'){
        this.listaVenta  = this.listaVenta .filter(sucursal => sucursal.Sucursal !== 2)
      }
      
    })
  }

  verDetalle(id_venta : number, fecha_preparado : string, fecha_despacho : string , entregado : boolean){
    this.isEntregado = entregado
    this.isNotaProducto = true
    this.isBarcode = false
    this.idVentaSelec = id_venta

    this.fechaPreparacion = fecha_preparado
    this.fechaEntrega = fecha_despacho

    this.service.get_detalle_venta_por_id_venta(id_venta).subscribe(data => {
      this.listaVentaDetalle = data
    })
    this.toggleLiveDemo()
  }

  verBarCode(id_venta : number, fecha_preparado : string, fecha_despacho : string ){
    this.fechaPreparacion = fecha_preparado
    this.fechaEntrega = fecha_despacho

    this.isEntregado = true
    this.isNotaProducto = false
    this.isBarcode = true
    console.log(id_venta)
    // listaVentaDetalle
    this.service.get_detalle_venta_barcode_por_id_venta(id_venta).subscribe(data => {
      this.listaBarcodeDetalle = data
    })
    this.toggleLiveDemo()
  }
  actualizarEstadoEntrega(){

    const fechaActual = new Date();
    var año = fechaActual.getFullYear();
    // El mes es devuelto en base 0, por lo que se suma 1 al mes
    var mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); 
    var dia = String(fechaActual.getDate()).padStart(2, '0');

    console.log(fechaActual.toJSON())
    var fechaFormateada = año + '-' + mes + '-' + dia;

    var zonaHorariaOffset = fechaActual.getTimezoneOffset();
    console.log(zonaHorariaOffset)
    const body = {
      Fecha_despacho : fechaFormateada,
      Id_venta : this.idVentaSelec,
      Fecha_full_data : fechaActual
    }

    this.service.update_despacho_nota_venta(body).subscribe((data : any) => {
      console.log(data)
      alert(data.message)
      this.filtrarListaVentaPorMes(this.AnoSeleccionado+this.MesSeleccionado, this.sucursalSeleccionada)
      this.toggleLiveDemo()
    })  
    
    // alert("OK, ACTUALIZANDO ESTADO")
  }

}
