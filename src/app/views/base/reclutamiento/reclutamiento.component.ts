import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import {PedidoCompromisoObligatorio } from 'src/app/models/rutas/pedidoCompromisoObligatorios.interface'
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { ComunasService } from '../../../service/comunas/comunas.service'
import {bancos, formasPago, tipoCuenta, tipoVehiculo,  marcaVehiculo, caracteristicasVehiculo  } from 'src/app/models/enum/bancos.json'
import { Colaborador } from 'src/app/models/transporte/colaborador.interface' 
import { Vehiculo, AsignarOperacion,VehiculoObservaciones } from 'src/app/models/transporte/vehiculo.interface' 
import { RazonSocial } from 'src/app/models/modalidad-de-operaciones.interface';
import { ModalidadDeOperacionesService } from 'src/app/service/modalidad-de-operaciones.service';
import { CentroOperacion } from 'src/app/models/operacion/centroOperacion.interface';
import { PanelVehiculos } from 'src/app/models/transporte/paneles.interface'
import { ContactoEjecutivo, EstadoContacto, MainSeleccionReclutamiento, MotivoSubestado, Operacion, Origen, Region,TipoVehiculo } from 'src/app/models/transporte/seleccionesReclutamiento.interface' 

@Component({
  selector: 'app-reclutamiento',
  templateUrl: './reclutamiento.component.html',
  styleUrls: ['./reclutamiento.component.scss']
})
export class ReclutamientoComponent {

  public rol = sessionStorage.getItem("rol_id") 
  public rol_no_permitido = ['71','72','50']
  
  descargarPermisoCirculacion : string | null = null
  descargarRevisionTecnica : string | null = null
  descargarSOAP : string | null = null
  descargarPadron : string | null = null
  descargarCertGases: string | null = null

  pedidosObligatorios : PedidoCompromisoObligatorio [] = []

  constructor(private service: PortalTransyanezService,public builder: FormBuilder,private comunaService : ComunasService,
    private MoService: ModalidadDeOperacionesService
  ) { }


  /// seleccion de reclutamiento
  listaRegiones : Region [] = []
  listaRegionesFiltro : Region [] = []

  listaOperacion : Operacion [] = []
  listaOrigen : Origen [] = []
  listaTipoVehiculo : TipoVehiculo [] = []
  listaContactoEjecutivo: ContactoEjecutivo [] = []
  listaMotivo: MotivoSubestado [] = []
  listaEstadoContacto: EstadoContacto [] = []



  buscadorVehiculo : string = ''

  isErrorView : boolean = false
  rutValido : boolean = true
  rutColaborador: boolean = true
  rutRepresentanteValido : boolean = true
  rutTitularBanco : boolean = true
  
  listaComunas : any [] = []
  listaComunasFull : any [] = []
  tipoUsuario : string = "7"

  colaboradores : Colaborador [] = []

  vehiculos : Vehiculo [] = []
  vehiculosFull : Vehiculo [] = []

   
  tipoCuentas : any [] = tipoCuenta
  banco : any [] = bancos
  formaPago : any [] = formasPago

  ObservacionVehiculos: VehiculoObservaciones [] = []

  panelVehiculos : PanelVehiculos = {
    "Total": 0,
    "Vehiculos_Habilitados": 0,
    "Habilitados_con_GPS": 0,
    "Habilitados_sin_GPS": 0
}

  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string


  /// Modales

  
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

  public visibleIconos = false;

  toggleLiveIconos() {
    this.visibleIconos = !this.visibleIconos;
  }

  get vehiculosHabilitados() {
    return this.vehiculos.filter(c => c.Habilitado).length;
  }

  handleLiveIconosChange(event: any) {
    this.visibleIconos = event;
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

  formatearRUT(rut: string | null): string {
    // Separar el número del dígito verificador
    if(rut){
      const partes = rut.split("-");
      let numero = partes[0];
      const digitoVerificador = partes[1];

      // Aplicar separador de miles al número
      numero = numero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      // Unir número y dígito verificador con guión
      return numero + "-" + digitoVerificador;

    }else{
      return ''
    }
    
}

seleccionarRut(){
  // const colaborador = this.colaboradores.filter( colab => colab.Rut == this.formVehiculo.value.Rut_colaborador )[0]
  // this.formVehiculo.patchValue({
  //   Razon_social : colaborador.Razon_social,
  // //   Telefono : colaborador.Telefono,
  //   // Region : colaborador.Region+'',
  //   // Comuna: colaborador.Comuna+'',
  // })
}
  isModalOpenAgregar: boolean = false
  public visibleAgregar = false;

  toggleLiveAgregar() {

    this.visibleAgregar = !this.visibleAgregar;
  }

  handleLiveAgregaChange(event: any) {
    this.visibleAgregar = event;
  }
  
  openModalAgrega(){
    this.isModalOpenAgregar = true
  }

  closeModalAgrega(){
    this.isModalOpenAgregar = false
  }



  /// vehiculos 
  tipoVehiculos : any [] = tipoVehiculo
  marcaVehiculo : any [] = marcaVehiculo
  caracteristicasVehiculo : any [] = caracteristicasVehiculo

  form = this.builder.group({
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    Region: this.builder.control("" , [Validators.required]),
    Operacion_postula : this.builder.control("" , [Validators.required]),
    Nombre_contacto : this.builder.control("" , [Validators.required]),
    Telefono : this.builder.control("" ),
    Tipo_vehiculo : this.builder.control("", [Validators.required] ),
    Origen_contacto : this.builder.control("", [Validators.required] ),
    Estado_contacto : this.builder.control("", [Validators.required] ),
    Motivo_subestado : this.builder.control("" ),
    Contacto_ejecutivo : this.builder.control("" ),
    Razon_social : this.builder.control("" ),
    Rut_empresa : this.builder.control("" ),
    Internalizado : this.builder.control("" ),
    Latitud: this.builder.control("" ),
    Longitud: this.builder.control("" ),
  })



  cantVehiculo : number = 0
  ngOnInit() : void {
    this.getLocation()

    this.service.getSeleccionesReclutamiento().subscribe((data) => {

      this.listaRegiones = data.Region
      this.listaOperacion = data.Operacion
      this.listaOrigen = data.Origen
      this.listaTipoVehiculo = data.Tipo_vehiculo
      this.listaContactoEjecutivo = data.Contacto_ejecutivo
      this.listaMotivo = data.Motivo_subestado
      this.listaEstadoContacto = data.Estado_contacto
    })
  }

  pv : boolean = true

  activate( activo : boolean,tipo_usuario : string){
    this.pv = activo
    this.tipoUsuario = tipo_usuario
  }

  verificaRut(rut : string){
    var Fn = {
      // Valida el rut con su cadena completa "XXXXXXXX-X"
      validaRut : function (rutCompleto : any) {
        rutCompleto = rutCompleto.replace("‐","-");
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
          return false;
        var tmp   = rutCompleto.split('-');
        var digv  = tmp[1]; 
        var rut   = tmp[0];
        if ( digv == 'K' ) digv = 'k' ;
        
        return (Fn.dv(rut) == digv );
      },
      dv : function(T : any){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
          S=(S+T%10*(9-M++%6))%11;
        return S?S-1:'k';
      }
    }

    // if(rut == 'colab') this.rutValido = Fn.validaRut(this.form.value.Rut?.trim()) ? true : false
    // if(rut == 'cta_banco') this.rutTitularBanco = Fn.validaRut(this.form.value.Rut_titular_cta_bancaria?.trim()) ? true : false
    // if(rut == 'representante') this.rutRepresentanteValido = Fn.validaRut(this.form.value.Rut_representante_legal?.trim()) ? true : false
    // if(rut == 'colab_vehiculo') this.rutColaborador = Fn.validaRut(this.formVehiculo.value.Rut_colaborador?.trim()) ? true : false

  }


  buscarComunas(event: any){
    const selectedRegionId = event.target.value;
    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )

  }



  sortOrder : boolean = true

  sortTable(orden : boolean){
    if(orden){
      this.vehiculos.sort((a,b) => a.Ppu.localeCompare(b.Ppu))
    }else{
      this.vehiculos.sort((a,b) => b.Ppu.localeCompare(a.Ppu))
    }
    this.sortOrder = !this.sortOrder
    
  }

  sortOrderEstado : boolean = true

  sortTableDisponible(orden : boolean){
    if(orden){
      this.vehiculos.sort((a,b) => Number(a.Disponible) - Number(b.Disponible))
    }else{
      this.vehiculos.sort((a,b) => Number(b.Disponible) - Number(a.Disponible))
    }
    this.sortOrderEstado = !this.sortOrderEstado
    
  }

  sortOrderHabilitado : boolean = true

  sortTableHabilitado(orden : boolean){
    if(orden){
      this.vehiculos.sort((a,b) => Number(a.Habilitado) - Number(b.Habilitado))
    }else{
      this.vehiculos.sort((a,b) => Number(b.Habilitado) - Number(a.Habilitado))
    }
    this.sortOrderHabilitado = !this.sortOrderHabilitado
    
  }

  regionSeleccionada : number = 0

  filtrarVehiculoRegion(){
    if(this.regionSeleccionada == 0){
      this.vehiculos = this.vehiculosFull
      this.cantVehiculo = this.vehiculosFull.length
    }else{
      this.vehiculos = this.vehiculosFull.filter( v => v.Region == this.regionSeleccionada)
      this.cantVehiculo = this.vehiculos.length
    }
  }

  registrarCandidato(){
    this.form.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Latitud : this.latStr,
      Longitud : this.longStr
    })

    this.isErrorView = false

    if(this.form.valid){

      

    }else{
      this.isErrorView = true
      alert("Hay datos incorrectos")
    }
  }

  actualizarDatosVehiculo(){

  }


 veficarColabExiste(rut: string | null | undefined){
  if (rut){
    this.service.verificarColaborador(rut).subscribe((data : any) => {

    }, error => {
      alert(error.error.detail)
    })

  }
  
 }

 eliminarOpAsignadaVehiculo(id : number){
    this.service.EliminarOpVehiculo(id).subscribe((data) =>
    {
      this.MoService.centroOperacionAsigandoAVehiculo(this.idOperacion,this.IdVehiculo).subscribe((data) => {
        this.centroOperacionFull = data
        this.centroOperacionAsignado = data
        this.centroOperacionLista = data
        this.centroOperacion = data
      })
    })
 }


 buscarVehiculoFiltro(){
  if(this.buscadorVehiculo == '') {
    this.vehiculos = this.vehiculosFull
    this.cantVehiculo = this.vehiculos.length
  } else {
    this.service.buscarVehiculo(this.buscadorVehiculo).subscribe((data) => {
      this.vehiculos = data
      this.cantVehiculo = this.vehiculos.length
    })
  }
 }


 /////// tickets 

 ticketGPS : boolean = false

 checkGPS(){
   
   this.ticketGPS = !this.ticketGPS
 }

/////

modalidadOperacion : RazonSocial []= []
modalidadOperacionFull : RazonSocial []= []

visibleCO : boolean = false
IdVehiculo : number = 0
Patente : string = ''

toggleLiveCO(id_vehiculo : number) {

  const vehiculo = this.vehiculos.filter(vehiculo => vehiculo.Id == id_vehiculo)[0]

  this.IdVehiculo = id_vehiculo

  if(this.IdVehiculo == 0){
    this.visibleCO = !this.visibleCO;
  }else{
    this.Patente = vehiculo.Ppu
    this.MoService.getRazonesSocial().subscribe((data) => {
      this.modalidadOperacion = data
      this.modalidadOperacionFull = data
      this.buscarCentroOperacion()
      this.verificarOperacionVehiculo()
  
      // const operacion = this.modalidadOperacion.filter( op => op.id == vehiculo.Agency_id)
  
    })
    this.visibleCO = !this.visibleCO;
  }

  

  
  
}
   checkOperacion : AsignarOperacion [] = []
verificarOperacionVehiculo(){
  this.service.revisarOperacionVehiculo(this.IdVehiculo).subscribe((data) => {
    this.checkOperacion = data

    this.checkOperacion.filter(c => c.Id_centro_op == 1)
  })
}

handleLiveCOChange(event: any) {
  this.visibleCO = event;
}

openModalCO(){
  this.isModalOpen = true
}

closeModalCO(){
  this.isModalOpen = false
}


idOperacion : number = 0
centroOperacion : CentroOperacion [] =[]
centroOperacionLista : CentroOperacion [] =[]
centroOperacionAsignado : CentroOperacion [] =[]
centroOperacionFull : CentroOperacion [] =[]


buscarCentroOperacion(){
  this.MoService.centroOperacionAsigandoAVehiculo(this.idOperacion,this.IdVehiculo).subscribe((data) => {
    this.centroOperacionFull = data
    this.centroOperacionAsignado = data
    this.centroOperacionLista = data
    this.centroOperacion = data
  })
}


buscarPorModalidadOperacion(){
  if(this.idOperacion == 0){
    this.centroOperacion = this.centroOperacionFull
    this.centroOperacionLista = this.centroOperacionFull
    
  }else{
    this.centroOperacion = this.centroOperacionFull.filter(co => co.Id_op == this.idOperacion)
    this.centroOperacionLista = this.centroOperacionFull.filter(co => co.Id_op == this.idOperacion)
  }

  this.estaAsignadoCO()
  this.IdCentroOperacion = 0
}


IdCentroOperacion : number = 0
seleccionarCentroOperacion(){
  if(this.IdCentroOperacion == 0){

  }else{
    this.centroOperacion = this.centroOperacionFull.filter(co => co.Id == this.IdCentroOperacion)
    this.centroOperacionLista = this.centroOperacionFull.filter(co => co.Id_op == this.idOperacion)
  }

  this.estaAsignadoCO()
}

convertirVehiculo(id : number){
  return this.tipoVehiculos.filter(v => v.id == id)[0].name
}

convertirRegion(id: number){
  if(this.listaRegiones.length !=0){
    return this.listaRegiones.filter(r => r.Id_region == id )[0].Nombre_region
  }else{
    return ""
  }
}


convertirOperacion(id : number){
  if(this.modalidadOperacion.length != 0){
    return this.modalidadOperacion.filter(v => v.id == id)[0].nombre
  }
  return ""
  
}


cambiarEstadoVehiculo(id: number, ppu : string){
  const body ={
    "id" : id,
    "ppu" : ppu
  }
  this.service.actualizarEstadoVehiculo(body).subscribe((data) => {
    console.log("actualizado")
  })
}




asignarOpVehiculo(id_op : number, id_centro_operacion : number){
  if(id_centro_operacion == 0 || id_op == 0){
    alert('Seleccione un centro de operacion')
  }else {
    const body = {
      "Id_user"  : sessionStorage.getItem("id")?.toString()+"",
      "Ids_user" : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      "Id_ppu" : this.IdVehiculo,
      "Id_operacion" : id_op,
      "Id_centro": id_centro_operacion,
      "Estado" : true
    }


    
    this.service.asignarOperacionVehiculo(body).subscribe((data : any) => {
      
      alert(data.message)
      this.buscarCentroOperacion()
      // this.idOperacion = 0
      // this.IdCentroOperacion = 0
      // this.toggleLiveCO(0)
    })
  }

  
}

isAsignado : boolean = false

estaAsignadoCO(){

  if(this.IdCentroOperacion == 0 ){
    this.isAsignado = false
    return false
  }else{
    const filtro = this.centroOperacion.filter( co => co.Id == this.IdCentroOperacion)[0]
    if(filtro.Estado == true){
      this.isAsignado = false
      return false
    }else{
      this.isAsignado = true
      return true
    }
  }
  
  
  
}


descargarDatosVehiculos(){

  const datos_send = this.vehiculos.map((v) => {
    return { ...v,
      Tipo : this.tipoVehiculos.filter(f => f.id == v.Tipo)[0].name,
      Region : this.listaRegiones.filter(f => f.Id_region == v.Region)[0].Nombre_region,
      // Comuna : this.listaComunasFull.filter(f => f.Id_comuna == v.Comuna)[0].Nombre_comuna,
      // Operaciones : v.Operaciones.join(', '),
      // Centro_operaciones : v.Centro_operaciones.join(', ')
    }
  })

  this.service.descargar_vehiculos_buscados_resumen(datos_send)

 }


 descargarObservacionVehiculos(){


  this.service.descargarVehiculosObservaciones()

 }

 descargarExcelATHela(){
  this.service.descargarInformeATVehiculos()
}

 ngOnDestroy(): void {


  }


  

}

