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

  listaVentaDetalle : DetalleVenta [] = []

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
    this.service.get_nota_venta_por_mes_y_sucursal(año,sucursal).subscribe(data => {
      this.listaVenta = data
      if(this.rol !== '5'){
        this.listaVenta  = this.listaVenta .filter(sucursal => sucursal.Sucursal !== 2)
      }
      
    })
  }

  verDetalle(id_venta : number){
    console.log(id_venta)
    // listaVentaDetalle
    this.service.get_detalle_venta_por_id_venta(id_venta).subscribe(data => {
      this.listaVentaDetalle = data
    })
    this.toggleLiveDemo()
  }
}
