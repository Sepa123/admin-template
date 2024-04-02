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

  codProductoOriginal : string = ""

  codProductoReemplazo : string = ""

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

    this.filtrarListaVentaPorMes(años[años.length - 1]+mesActual, '1')

    this.AnoSeleccionado = años[años.length - 1]
    this.MesSeleccionado = mesActual
    this.sucursalSeleccionada = '1'

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

    console.log('fecha entrega', this.fechaEntrega)

    this.isEntregado = true
    this.isNotaProducto = false
    this.isBarcode = true
    console.log(id_venta)
    // listaVentaDetalle
    this.service.get_detalle_venta_barcode_por_id_venta(id_venta).subscribe(data => {
      this.listaBarcodeDetalle = data
      this.service.get_detalle_venta_por_id_venta(id_venta).subscribe(data => {
        this.listaVentaDetalle = data
      })
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

  reemplazarCodigos() {


    const codigo_o = this.codProductoOriginal.trim().replace(/"/g, '@').replace(/'/g, '-').toUpperCase()
    let cod_producto_o = codigo_o.split('@')[0].split('-')[0]
    let tipo_o = codigo_o.split('@')[1].split('-')[1]

    const codigo_r = this.codProductoReemplazo.trim().replace(/"/g, '@').replace(/'/g, '-').toUpperCase()
    let cod_producto_r = codigo_r.split('@')[0].split('-')[0]
    let tipo_r = codigo_r.split('@')[1].split('-')[1]


    const body = {
      "Id_user" : sessionStorage.getItem("id")?.toString()+"",
      "Ids_user" : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", 
      "Id_nota_venta": this.listaVentaDetalle[0].Id_venta,
      "Id_etiqueta": codigo_r.split('@')[1].split('-')[0],
      "Bar_code_antiguo": codigo_o,
      "Bar_code_nuevo": codigo_r,
    }

    console.log(body)
    if(this.listaBarcodeDetalle.find(lista => lista.Bar_code == codigo_r)){
      return alert('la etiqueta que quiere reemplazar ya se encuentra en esta venta')
    }
    if(this.listaBarcodeDetalle.find(lista => lista.Bar_code == codigo_o)){
      if(this.listaVentaDetalle.find(detalle => detalle.Codigo == cod_producto_o)){
        if ((cod_producto_o == cod_producto_r) && (tipo_o[0] ==  tipo_r[0]) ){


          // return alert('bien')
          this.service.reemplazar_bar_code_venta(body).subscribe((data : any) => {
            alert(data.message)
          })
        }else{
          return alert('no son el mismo tipo producto')
        }

      }else{
        alert('Este producto no se encuentra en esta venta')
      }
    } else {
      alert('Esta etiqueta no pertenece a esta venta')
    }

  }

}
