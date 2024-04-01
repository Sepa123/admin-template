import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { RsvService } from 'src/app/service/rsv.service'
import { CatalogoRSV,ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface';
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import { ComunasService } from 'src/app/service/comunas/comunas.service';
import { DetalleVenta, NotaVenta , NotaVentaProducto, DetalleVentaTotal} from 'src/app/models/notaVenta.interface';
import { TipoDespacho } from 'src/app/models/tipoDespacho.inteface'
import { EvaluacionPedidoRSV} from 'src/app/models/evaluacionPedidoRSV.interface'
import { UnidadNoPreparada } from 'src/app/models/unidadNoPreparada.interface';
import { ArmarVenta } from 'src/app/models/armarVenta.interface';

@Component({
  selector: 'app-armar-venta',
  templateUrl: './armar-venta.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class ArmarVentaComponent {

  listaVenta : NotaVenta [] = []

  idVentaSelec! : number 

  isNotaProducto : boolean = false

  Numero_factura : string = ""

  fechaPreparacion : string = ""
  fechaEntrega : string = ""
  isEntregado : boolean = false

  isBarcode : boolean = false
  mostrarDetalle : boolean = false

  listaVentaDetalle : NotaVentaProducto [] = []
  listaBarcodeDetalle : DetalleVenta [] = []

  MesSeleccionado : string = ""
  AnoSeleccionado : string =""
  añoActual : string =""

  sucursalSeleccionada : string = ""

  datosVenta : ArmarVenta [] =[]

  unidadNoPreparada : UnidadNoPreparada [] = []

  listaAnos : string [] = []
  meses : any [] = []

  sucursales : SucursalRSV [] = []

  public rol = sessionStorage.getItem("rol_id") 

  ventaGenerada : NotaVenta [] = []
  detalleVentaGenerada : NotaVentaProducto [] = []

  // modales 
  isModalOpen: boolean = false
  public visible = false;
  unidAgregada : number = 0

  etiqueta : string = ""

  codProductoOriginal : string = ""

  codProductoReemplazo : string = ""




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

    this.getLocation();
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

    const añoInicial = 2021;
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
    this.mostrarDetalle = false
    if ( sucursal == ""){
      return alert ("Por favor, seleccione una sucursal")
    }

    this.service.get_nota_venta_por_mes_y_sucursal(año,sucursal).subscribe(data => {
      // this.listaVenta = data.filter(venta => venta.Preparado == false || venta.Entregado == false)
      this.listaVenta = data
      this.listaVenta = this.listaVenta.filter(lista => lista.Preparado == false)
      if(this.rol !== '5'){
        this.listaVenta  = this.listaVenta.filter(sucursal => sucursal.Sucursal !== 2)
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

    console.log("Fecha preparacion,",this.fechaPreparacion)
    console.log("fecha_despacho,",this.fechaEntrega)
    console.log("isEntregado,",this.isEntregado)

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

  seleccionarVenta(cod_ty : number, N_factura : string){
    this.Numero_factura = N_factura

    this.mostrarDetalle = false
    this.service.get_nota_venta_por_id(cod_ty+"").subscribe((nv) => {
      this.ventaGenerada.pop()
      this.ventaGenerada.push(nv)
      this.service.get_detalle_venta_por_id_venta(parseInt(cod_ty+"")).subscribe((detalle) => {
        this.detalleVentaGenerada = detalle
        this.detalleVentaGenerada.map(detalle => {
          detalle.UnidadesAgregadas = 0
          
        })
      this.service.get_cantidad_actual(cod_ty+"").subscribe((objeto2) => {
          this.detalleVentaGenerada.map((detalle, i) => {
            let codigo_producto = detalle.Codigo

            let objetoCorrespondiente = objeto2.find(obj => obj.Codigo_producto === codigo_producto);
            
            if (objetoCorrespondiente) {
              detalle.UnidadesAgregadas = objetoCorrespondiente.Total;
            } 

            if (detalle.UnidadesAgregadas == detalle.Unidades) {
              detalle.CheckListo = true
            }
      
          })

          const body = {
            "Nota_venta" : cod_ty,
            "Sucursal" : this.sucursalSeleccionada
          }

          this.service.Armar_venta(body).subscribe((data) => {
            this.datosVenta = data  

            this.detalleVentaGenerada.map(detalle => {
              let dato = this.datosVenta.find( dato => dato.Codigo == detalle.Codigo)
              if(dato !== undefined){
                detalle.Paquetes = dato.Paquetes
                detalle.Und = dato.Unidades
                detalle.Retorno = dato.Retorno
              }
            })

            this.mostrarDetalle = true

            this.service.get_detalle_venta_barcode_por_id_venta(cod_ty).subscribe(data => {
              this.listaBarcodeDetalle = []
              this.listaBarcodeDetalle = data
            })
          })
        })
        
      })
    })
  }

  pruebaSuma(){
    const sumaUndAgregadas = this.detalleVentaGenerada.reduce((acum, curr) => acum + curr.UnidadesAgregadas, 0)

      const sumaUndTotales = this.detalleVentaGenerada.reduce((acum, curr) => acum + curr.Unidades, 0)

      console.log("Unidades agregadas",sumaUndAgregadas)
      console.log("Unidades sumaUndTotales",sumaUndTotales)

      console.log(sumaUndTotales - sumaUndAgregadas)
  }


  latitude: number = 0;
  longitude: number = 0;

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
      }, (error) => {
        console.error(`Error getting location: ${error.message}`);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  


  pickEtiqueta(){
    
    const resultado = this.etiqueta.replace(/"/g, '@').replace(/'/g, '-').toUpperCase()
    let cod_producto = resultado.split('@')[0].split('-')[0]
    const regex = /([a-zA-Z]+)@/;
    const color : any = regex.exec(resultado);
    const Id_etiqueta = resultado.split('@')[1].split('-')[0]

    this.service.get_codigo_por_barcode(resultado).subscribe((codbar : any) => {
      cod_producto = codbar.Codigo

    
      console.log(this.detalleVentaGenerada.filter((cod : any) => cod.Codigo == cod_producto))
      if (this.detalleVentaGenerada.filter((cod : any) => cod.Codigo == cod_producto).length == 0) {
        this.etiqueta = ""
        return alert("el producto de esta etiqueta no se encuentra en esta venta")
      }

      const uni = this.detalleVentaGenerada.filter((cod : any) => cod.Codigo == cod_producto)[0].Unidades
      const uniAgregadas = this.detalleVentaGenerada.filter((cod : any) => cod.Codigo == cod_producto)[0].UnidadesAgregadas

      if (uni == 0 || uni == null){
        return alert("Por favor agregue las unidades a seleccionar para este paquete")
      }
      
      const body = {
        "Bar_code" : resultado.trim(),
        "Codigo_producto": cod_producto,
        "Unidades" : uni,
        "Id_user" : sessionStorage.getItem("id")?.toString()+"",
        "Ids_user" : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", 
        "Id_nota_venta": this.detalleVentaGenerada[0].Id_venta,
        "Uni_agregadas" : uniAgregadas,
        "Lat": this.latitude.toString(),
        "Lng": this.longitude.toString(),
        "Id_venta": this.detalleVentaGenerada[0].Id_venta,
        "Cantidad": 1
      }

      this.service.actualizar_stock_etiqueta(body).subscribe((data : any) => {
        alert(data.message)
        this.unidAgregada = parseInt(data.unid_x_paq)
        console.log( )
        this.detalleVentaGenerada.map(detalle => {
          if (detalle.Codigo == cod_producto){
            detalle.UnidadesAgregadas += this.unidAgregada
            if (detalle.UnidadesAgregadas == detalle.Unidades) {
              detalle.CheckListo = true
            }
          }
        })

        const sumaUndAgregadas = this.detalleVentaGenerada.reduce((acum, curr) => acum + curr.UnidadesAgregadas, 0)

        const sumaUndTotales = this.detalleVentaGenerada.reduce((acum, curr) => acum + curr.Unidades, 0)

        console.log("Unidades agregadas",sumaUndAgregadas)
        console.log("Unidades sumaUndTotales",sumaUndTotales)

        console.log(sumaUndTotales - sumaUndAgregadas)

        if( (sumaUndTotales - sumaUndAgregadas) == 0){
          console.log("me voy por aqui")
          this.service.update_preparado_venta_rsv(body).subscribe((data) => {
            console.log(data)
          } )
        }


        
      }, error => {
        alert(error.error.detail)
      })

    this.etiqueta = ""

    console.log(body)

  })

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
      "Id_nota_venta": this.detalleVentaGenerada[0].Id_venta,
      "Id_etiqueta": codigo_r.split('@')[1].split('-')[0],
      "Bar_code_antiguo": codigo_o,
      "Bar_code_nuevo": codigo_r,
    }

    console.log(body)
    if(this.listaBarcodeDetalle.find(lista => lista.Bar_code == codigo_r)){
      return alert('la etiqueta que quiere reemplazar ya se encuentra en esta venta')
    }
    if(this.listaBarcodeDetalle.find(lista => lista.Bar_code == codigo_o)){
      if(this.detalleVentaGenerada.find(detalle => detalle.Codigo == cod_producto_o)){
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
