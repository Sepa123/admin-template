import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { Subscription } from 'rxjs';
import { LogInversaService } from 'src/app/service/log-inversa.service'
import { RutaProducto } from 'src/app/models/log_inversa/rutaProducto.interface';
import { ProductoPicking } from 'src/app/models/productoPicking.interface';
import { Estado,Subestado } from 'src/app/models/estados.interface'
import { PendienteDia } from 'src/app/models/log_inversa/pendientesDia.interface'

@Component({
  selector: 'app-recepcion-oc',
  templateUrl: './recepcion-oc.component.html',
  styleUrls: ['./recepcion-oc.component.scss']
})
export class RecepcionOcComponent {

  pendientesDia : PendienteDia [] = []

  codProducto : string = ""

  idPortal : string = ""

  nombreRuta : string = ""

  rutaProducto : RutaProducto [] = []

  productosEntregados : ProductoPicking [] = []

  productosNoEntregados : ProductoPicking [] = []

  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string

  isErrorView : boolean = false

  fecha_inicio : string =""
  fecha_fin : string =""

  estados  : Estado [] = []
  subestados : Subestado [] = []
  subestadosFull : Subestado [] = []

  fecha_min : string = ""
  fecha_max : string = ""

  fecha_seleccionada : string = ""

  isLoading : boolean = false  
  ngOnInit() {

    var fechaActual = new Date();

    this.fecha_max =  fechaActual.toISOString().split('T')[0];

    // Restar 7 días a la fecha actual
    fechaActual.setDate(fechaActual.getDate() - 7);
  
    // Formatear la fecha a un formato que acepte el atributo "max" del input date
    var fechaMaxima = fechaActual.toISOString().split('T')[0];


    this.fecha_min = fechaMaxima

    this.fecha_seleccionada = this.fecha_max

    setTimeout(() => {
      this.service.get_pendientes_dia(this.fecha_max).subscribe((data) => {
        this.pendientesDia = data
      }) 
    }, 550);
    

    this.getLocation()

    this.idPortal = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""



    this.service.get_estados_pedidos().subscribe((data : any) => {
      console.log(data) 
      this.estados = data.estado
      this.subestadosFull = data.subestado

    })
    // const fecha = new Date();

    // let fechaFormateada = fecha.toISOString().split('T')[0];

    // this.fechaPedido = fechaFormateada
  }

  seleccionFechaPendiente(){
    this.service.get_pendientes_dia(this.fecha_seleccionada).subscribe((data) => {
      this.pendientesDia = data
    }) 
  }

  seleccionSubestados(){
    
    const estado = this.formEdicion.value.Estado_final
    console.log("El estado es",estado)

    if (estado === null || estado === undefined) {
      console.log(null) // Devuelve null si es nulo o indefinido
    } else {
      this.subestados = this.subestadosFull.filter((sub) => sub.Parent_code == parseInt(estado))
      console.log(this.subestados)
      this.formEdicion.patchValue({
        Subestado_final : this.subestados[0].Code.toString()
      })
    }
    
  }


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

  constructor(public builder: FormBuilder, private service : LogInversaService) { }

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

  obtenerRutaProducto(){

    console.log("furro")
    this.rutaProducto = []
    
    this.isLoading = true

    this.productosEntregados = []
    this.productosNoEntregados = [] 
    var resultado = this.codProducto.replace(/'/g, "-").trim().toUpperCase()
    resultado = resultado.replace(/-(\d+)/, "");

    
    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "",
      "n_guia" : resultado,
      "cod_pedido" : resultado,
      "cod_producto" : resultado,
      "ids_usuario" : this.idPortal,
      "latitud" : this.latStr,
      "longitud" : this.longStr,
      "observacion" : "Obteniendo ruta producto en Recepción Logistica Inversa"
      // "cod_sku" : sku
    }

    this.service.obtener_ruta_producto(body,false).subscribe((data) => {
      this.rutaProducto = data
      this.codProducto = ""
      this.isLoading = true
      this.service.lista_productos_ruta(data[0].Ruta_ty).subscribe((data : any) => {
        
        this.isLoading = false
        this.productosEntregados = data.entregados
        this.productosNoEntregados = data.no_entregado
        
      })
    }, error => {

      this.isLoading = false
      alert(error.error.detail)
      this.codProducto = ""
    })
  }


  obtenerRutaProductoPorRuta(ruta : string){
    this.rutaProducto = []
    this.isLoading = true
    this.productosEntregados = []
    this.productosNoEntregados = [] 
    var resultado = ruta
    if(ruta == '') resultado = this.nombreRuta
    

    
    const body = {
      "id_usuario" : sessionStorage.getItem('id')+"",
      "cliente" : "",
      "n_guia" : resultado,
      "cod_pedido" : resultado,
      "cod_producto" : resultado,
      "ids_usuario" : this.idPortal,
      "latitud" : this.latStr,
      "longitud" : this.longStr,
      "observacion" : "Obteniendo ruta producto en Recepción Logistica Inversa"
      // "cod_sku" : sku
    }

    this.service.obtener_ruta_producto(body,true).subscribe((data) => {
      this.rutaProducto = data
      this.nombreRuta = ""
      
    }, error => {
      this.isLoading = false
      // alert(error.error.detail)
      this.nombreRuta = ""
    })


    this.service.lista_productos_ruta(resultado).subscribe((data : any) => {
      this.isLoading = false
      this.productosEntregados = data.entregados
      this.productosNoEntregados = data.no_entregado
      
    })
  }


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

  pedidoSeleccionado : ProductoPicking [] = []


  editarEstado(pedido : ProductoPicking){


    this.service.get_estado_producto(pedido.Codigo_pedido).subscribe((data : any) => {
      this.pedidoSeleccionado.pop()
      this.pedidoSeleccionado.push(pedido)
      let subestado = this.subestadosFull.find((dato) => dato.Code == data[0].Subestado) 
      let estado = this.estados.find((dato) => dato.Estado == data[0].Estado) 
  
      console.log("subestados")
      
      console.log()
  
      this.subestados = this.subestadosFull.filter((sub) => sub.Parent_code == estado?.Estado)
  
      this.formEdicion.patchValue({
        Id_user : sessionStorage.getItem("id")?.toString()+"",
        Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
        Estado_inicial : estado?.Estado.toString(),
        Subestado_inicial : subestado?.Code.toString(),
        Estado_final : estado?.Estado.toString(),
        Subestado_final : subestado?.Code.toString(),
        Latitud: this.latStr,
        Longitud: this.longStr,
        Origen: pedido.Notas,
        Codigo_pedido : pedido.Codigo_pedido
      })
      this.toggleLiveDemo()
      console.log(this.formEdicion.value)


      })
    
    
  }

  linkValidator() {
    const estadoFinalControl = this.formEdicion.value.Estado_final;
    const linkControl =this.formEdicion.value.Link;
  
    if (estadoFinalControl === '1' && !linkControl) {
      return false
    } else {
      return true
    }
    
  }

  registrarEdicion(){

    let isSeguro = confirm("¿Seguro que desea guardar los cambios?");
  
    if (!isSeguro) {
      return console.log("no esta seguro")
    }
  
    if(this.formEdicion.valid && this.linkValidator() ){
  
      this.service.registrar_bitacora_lg(this.formEdicion.value).subscribe((data : any) =>{
        alert(data.message)
        this.formEdicion.reset()
        this.toggleLiveDemo()
      })
    } else {
      this.isErrorView = true
    }
    
   }

}
