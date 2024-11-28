import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import {PedidoCompromisoObligatorio } from 'src/app/models/rutas/pedidoCompromisoObligatorios.interface'
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { ComunasService } from '../../../service/comunas/comunas.service'
import {bancos, formasPago, tipoCuenta, tipoVehiculo,  marcaVehiculo, caracteristicasVehiculo  } from 'src/app/models/enum/bancos.json'
import { Colaborador,DetallePago } from 'src/app/models/transporte/colaborador.interface' 
import { Usuario,ObservacionDriver } from 'src/app/models/transporte/tripulacion.interface' 
import { VehiculoObservaciones } from 'src/app/models/transporte/vehiculo.interface';
import { PanelTripulacion } from 'src/app/models/transporte/paneles.interface';

@Component({
  selector: 'app-tripulacion',
  templateUrl: './tripulacion.component.html',
  styleUrls: ['./tripulacion.component.scss','../styles/cards.scss']
})
export class TripulacionComponent {

  private selectedDocAntecedentes: File | null = null;
  private selectedLicenciaConducir: File | null = null;
  private selectedCedulaIdentidad: File | null = null;
  private selectedContrato: File | null = null;
  private selectedFotoPerfil: File | null = null;
  pedidosObligatorios : PedidoCompromisoObligatorio [] = []
  tipoTripulacion : any [] =[]
  public rol = sessionStorage.getItem("rol_id") 

  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string

  constructor(private service: PortalTransyanezService,public builder: FormBuilder,private comunaService : ComunasService) { }

  isErrorView : boolean = false
  rutValido : boolean = true
  rutRepresentanteValido : boolean = true
  rutTitularBanco : boolean = true
  listaRegiones : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []
  tipoUsuario : string = "7"
  usuarioActivado : boolean | null = false
  colaboradores : Colaborador [] = []
  tripulacion : Usuario [] = []
  tripulacionFull : Usuario [] = []
  detallePago : DetallePago [] = []

  observacionDriver : ObservacionDriver [] =[]

  isModalOpen: boolean = false
  public visible = false;

  toggleLiveDemo() {

    if (document.getElementById('cert_antecedentes')) (document.getElementById('cert_antecedentes') as HTMLInputElement).value = '';
    if (document.getElementById('licencia_conducir')) (document.getElementById('licencia_conducir') as HTMLInputElement).value = '';
    if (document.getElementById('cedula_identidad')) (document.getElementById('cedula_identidad') as HTMLInputElement).value = '';
    if (document.getElementById('contrato')) (document.getElementById('contrato') as HTMLInputElement).value = '';
    if (document.getElementById('foto_perfil')) (document.getElementById('foto_perfil') as HTMLInputElement).value = '';
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


  formatearRUT(rut: string): string {
    // Separar el número del dígito verificador
    const partes = rut.split("-");
    let numero = partes[0];
    const digitoVerificador = partes[1];

    // Aplicar separador de miles al número
    numero = numero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Unir número y dígito verificador con guión
    return numero + "-" + digitoVerificador;
}

  isModalOpenAgregar: boolean = false
  public visibleAgregar = false;

  toggleLiveAgregar() {

    if (document.getElementById('A_cert_antecedentes')) (document.getElementById('A_cert_antecedentes') as HTMLInputElement).value = '';
    if (document.getElementById('A_licencia_conducir')) (document.getElementById('A_licencia_conducir') as HTMLInputElement).value = '';
    if (document.getElementById('A_cedula_identidad')) (document.getElementById('A_cedula_identidad') as HTMLInputElement).value = '';
    if (document.getElementById('A_contrato')) (document.getElementById('A_contrato') as HTMLInputElement).value = '';
    if (document.getElementById('A_foto_perfil')) (document.getElementById('A_foto_perfil') as HTMLInputElement).value = '';


    this.form.reset()

    this.form.patchValue({
      Rut_razon_social: '',
      Region : '1',
      Comuna : '1',
      Tipo_usuario : '1'
    })
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


  cambiarEstadoTripulacion(id: number,){
    const body ={
      "id" : id,
    }
    this.service.actualizarEstadoTripulacion(body).subscribe((data) => {
      console.log("actualizado")
    })
  }

  tipoRazon : string = ""
   
  tipoCuentas : any [] = tipoCuenta
  banco : any [] = bancos
  formaPago : any [] = formasPago


  checkDetallePago : boolean = false

  nombreColaborador : string = ""

  descargarDocAntecedentes : string | null = null
  descargarFotoPerfil : string | null = null
  descargarLicenciaConducir : string | null = null
  descargarCedulaIdentidad : string | null = null
  descargarContrato: string | null = null


  /// vehiculos 
  tipoVehiculos : any [] = tipoVehiculo
  marcaVehiculo : any [] = marcaVehiculo
  caracteristicasVehiculo : any [] = caracteristicasVehiculo

  ObservacionVehiculos: VehiculoObservaciones [] = []

  panelTripulacion : PanelTripulacion = {
    "Total": 0,
    "Activos": 0,
    "Drivers_Activos": 0,
    "Peonetas_Activos": 0
  }

  public visibleIconos = false;

  toggleLiveIconos() {

    

    this.selectedDocAntecedentes = null;
    this.selectedLicenciaConducir = null;
    this.selectedCedulaIdentidad = null;
    this.selectedContrato = null;
    this.selectedFotoPerfil = null;
    this.visibleIconos = !this.visibleIconos;
  }

  handleLiveIconosChange(event: any) {
    this.visibleIconos = event;
  }

  descargarObservacionVehiculos(){


    this.service.descargarVehiculosObservaciones()
  
   }
  

  form = this.builder.group({
    Nombre_razon_social : this.builder.control("",[Validators.required] ),
    Rut_razon_social : this.builder.control("" ,[Validators.required] ),
    Nombre_completo : this.builder.control("" , [Validators.required]),
    Nro_serie_cedula : this.builder.control("" ),
    Rut : this.builder.control("" , [Validators.required]),
    Email : this.builder.control("" , [Validators.required, Validators.email]),
    Birthday : this.builder.control("" ),
    Telefono : this.builder.control("" ),
    Tipo_usuario : this.builder.control("1" ),
    Domicilio : this.builder.control("" , [Validators.required]),
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    // Documentacion_comercial_banco : this.builder.control("" , [Validators.required]),
    Comuna: this.builder.control("" , [Validators.required]),
    Region: this.builder.control("" , [Validators.required]),
    Fec_venc_lic_conducir : this.builder.control("" ),
    Modificacion: this.builder.control("" ),
    Latitud: this.builder.control("" ),
    Longitud: this.builder.control("" ),
    Origen: this.builder.control("" ),
    Chofer :  this.builder.control(false ),
    Peoneta :  this.builder.control(false ),
    Abogado : this.builder.control(0 ),
    Seguridad :this.builder.control(0 ),
    Rut_seleccionado: this.builder.control("" ),
  })

  mostrarTipoTripulacion(tipoS : number){   
    if(tipoS && this,this.tipoTripulacion.length != 0){
      return this.tipoTripulacion.filter(tipo => tipo.Id == tipoS)[0].Tripulacion
    }else{
      return ''
    }
    
  }

  buscarColaboradoresPorNombre(){
    if(this.nombreColaborador == ""){
      // this.service.getUsuariosTransporte().subscribe((data) => {
      //   this.tripulacionFull = data
      //   this.tripulacion = data
      // })
      this.tripulacion = this.tripulacionFull
    }else{
      this.tripulacion = this.tripulacionFull.filter(t => t.Nombre_completo.toLowerCase().includes(this.nombreColaborador.toLowerCase())
                                                    || t.Razon_social.toLowerCase().includes(this.nombreColaborador.toLowerCase())
                                                    || t.Rut.toLowerCase().includes(this.nombreColaborador.toLowerCase()))

    }
    
  }

  ngOnInit() : void {

    this.getLocation()

    this.service.getSeleccioneTripulacion().subscribe((data : any) => {
      this.listaRegiones = data.Region
      this.listaComunas = data.Comuna
      this.listaComunasFull = this.listaComunas
      this.form.patchValue({
        Region : '1',
        Comuna : '1',
        Tipo_usuario : '1',
      })
      this.marcaVehiculo = data.Marca_vehiculo
      this.tipoTripulacion = data.Tipo_tripulacion

      this.service.getpanelTripulacion().subscribe(data => {
        this.panelTripulacion= data
      })
    })

    this.service.getObservacionesDriver().subscribe(data => {
      this.observacionDriver = data
    })

    this.service.getUsuariosTransporte().subscribe((data) => {
      this.tripulacion = data
      this.tripulacionFull = data
      this.service.obtenerColaboradores().subscribe((data) => {
            this.colaboradores = data
      })
    })
  }

  pv : boolean = true

  activate( activo : boolean,tipo_usuario : string){
    this.pv = activo
    this.tipoUsuario = tipo_usuario
  }

  onFileSelected(event: any, tipo_doc : string) {

    if(tipo_doc == 'cert_antecedentes') this.selectedDocAntecedentes = event.target.files[0];
    if(tipo_doc == 'licencia_conducir') this.selectedLicenciaConducir = event.target.files[0];
    if(tipo_doc == 'cedula_identidad') this.selectedCedulaIdentidad = event.target.files[0];
    if(tipo_doc == 'contrato') this.selectedContrato = event.target.files[0];
    if(tipo_doc == 'foto_perfil') this.selectedFotoPerfil = event.target.files[0];

  }
  
  rutSeleccionado : string = ""

  

  seleccionarRut(){
    const colaborador = this.colaboradores.filter( colab => colab.Rut == this.form.value.Rut_razon_social )[0]
    this.form.patchValue({
      // Nombre_completo : colaborador.Razon_social,
      Nombre_razon_social : colaborador.Razon_social,
      // Telefono : colaborador.Telefono,
      // Region : colaborador.Region+'',
      // Comuna: colaborador.Comuna+'',
      Rut_seleccionado : colaborador.Rut+''
    })

    this.rutSeleccionado = this.form.value.Rut+''
  }

  descargarArchivo(archivo : string | null){
    if(archivo){
      this.service.downloadArchivos(archivo)
    }
    
  }

  uploadFile(selectedFile: File | null ,tipo_archivo : string, nombre : string){

    if (selectedFile) {
    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);

    this.service.subirDocumentosTripulacion(formData, tipo_archivo,nombre).subscribe(
      (data : any) => {
        console.log('Archivo subido exitosamente');
        // Lógica adicional en caso de éxito.
      },
      (error) => {

        alert('Error al subir el archivo')
      }
    );

    }   
  }


  uploadFotoPerfil(selectedFile: File | null , nombre : string){
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
  
      this.service.subirFotoPerfilUsuario(formData,nombre).subscribe(
        (data : any) => {
          console.log('Archivo subido exitosamente');
          // Lógica adicional en caso de éxito.
        },
        (error) => {
  
          alert('Error al subir el archivo')
        }
      );
  
      }   
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

    this.rutValido = Fn.validaRut(this.form.value.Rut?.trim()) ? true : false

    

  }


  activarUsuario(activar : boolean){
    const rut = this.form.value.Rut
    
    this.service.activarColaborador(rut+'',activar).subscribe((mes : any) => {
      this.service.getUsuariosTransporte().subscribe((data) => {
        this.tripulacion = data
        this.tripulacionFull = data
        alert(mes.message)
        this.toggleLiveDemo()
      })
    })
  }

  buscarComunas(event: any){
    const selectedRegionId = event.target.value;
    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )
    this.form.patchValue({
      Comuna : this.listaComunas[0].Id_comuna
    })
  }

  Rut_razon_social : string = ''
  Nombre_razon_social : string = ''
  revisarDatos(rut : string){
    const colaborador =this.tripulacion.filter(colab => colab.Rut == rut)[0]
    this.Rut_razon_social = colaborador.Rut_razon_social
    this.Nombre_razon_social = colaborador.Razon_social

    this.form.reset()
    this.form.patchValue({
      Rut : colaborador.Rut,
      Nombre_razon_social : colaborador.Razon_social,
      Rut_razon_social : colaborador.Rut_razon_social,
      Nombre_completo : colaborador.Nombre_completo,
      Email : colaborador.Email,
      Telefono : colaborador.Telefono,
      Region : colaborador.Region+'',
      Comuna : colaborador.Comuna+'',
      Domicilio: colaborador.Domicilio,
      Tipo_usuario : colaborador.Tipo_usuario+'',
      Nro_serie_cedula : colaborador.Nro_serie_cedula,
      Birthday :colaborador.Birthday+'',
      Fec_venc_lic_conducir : colaborador.Fec_venc_lic_conducir+''
      // Birthday :colaborador.Birthday+'',
    })

    this.descargarFotoPerfil = colaborador.Jpg_foto_perfil
    this.descargarDocAntecedentes = colaborador.Pdf_antecedentes
    this.descargarLicenciaConducir = colaborador.Pdf_licencia_conducir
    this.descargarCedulaIdentidad = colaborador.Pdf_cedula_identidad
    this.descargarContrato = colaborador.Pdf_contrato
  // this.descargarCertPoderes = colaborador.Pdf_validity_of_powers
  // this.descargarCertRRPP =colaborador.Pdf_certificate_rrpp

  // this.descargarRegistroComercio = colaborador.Pdf_registration_comerce
    this.toggleLiveDemo()
  }


  sortOrder : boolean = true

  sortTable(orden : boolean){
    if(orden){
      this.tripulacion.sort((a,b) => a.Nombre_completo.localeCompare(b.Nombre_completo))
    }else{
      this.tripulacion.sort((a,b) => b.Nombre_completo.localeCompare(a.Nombre_completo))
    }
    this.sortOrder = !this.sortOrder
    
  }

  sortOrderEstado : boolean = true

  sortTableEstado(orden : boolean){
    if(orden){
      this.tripulacion.sort((a,b) => Number(a.Activo) - Number(b.Activo))
    }else{
      this.tripulacion.sort((a,b) => Number(b.Activo) - Number(a.Activo))
    }
    this.sortOrderEstado = !this.sortOrderEstado
    
  }

  registrar(){

    this.form.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Latitud : this.latStr,
      Longitud : this.longStr,
      Modificacion : `Datos de ${this.form.value.Rut} registrado por ${sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""}`,
      Origen : '/transporte/tripulacion'
    })

    this.isErrorView = false

    if(this.form.valid && this.form.value.Rut != 'Seleccione un colaborador'){

      this.service.registrarUsuario(this.form.value).subscribe((data : any) => {

        alert(data.message)

        const nombre = this.form.value.Rut + ""
        // this.form.reset();
      
        this.uploadFile(this.selectedLicenciaConducir,'licencia_conducir',nombre)
        this.uploadFile(this.selectedCedulaIdentidad,'cedula_identidad',nombre)
        this.uploadFile(this.selectedDocAntecedentes,'cert_antecedentes',nombre)
        this.uploadFile(this.selectedContrato,'contrato',nombre)
        // this.uploadFile(this.selectedFotoPerfil,'foto_perfil',nombre)
        this.uploadFotoPerfil(this.selectedFotoPerfil,nombre)
        
        this.service.getUsuariosTransporte().subscribe((data) => {
          this.tripulacion = data
          this.tripulacionFull = data
          this.toggleLiveAgregar()
          this.form.reset();
        })

        
      }, (error) => {
        alert(error.error.detail)
      })
    }else{
      this.isErrorView = true
      alert("Hay datos incorrectos")
    }

  }

  actualizarDatos(){
    this.form.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Latitud : this.latStr,
      Longitud : this.longStr,
      Modificacion : `Datos de ${this.form.value.Rut} actualizados por ${sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""}`,
      Origen : '/transporte/tripulacion'
    })
    this.isErrorView = false

    console.log(this.form.value)

    if(this.form.valid){

      this.service.actualizarTripulacion(this.form.value).subscribe((data : any) => {
        alert(data.message)

        const nombre = this.form.value.Rut + ""
        // this.form.reset();
        this.uploadFile(this.selectedLicenciaConducir,'licencia_conducir',nombre)
        this.uploadFile(this.selectedCedulaIdentidad,'cedula_identidad',nombre)
        this.uploadFile(this.selectedDocAntecedentes,'cert_antecedentes',nombre)
        this.uploadFile(this.selectedContrato,'contrato',nombre)
        // this.uploadFile(this.selectedFotoPerfil,'foto_perfil',nombre)
        this.uploadFotoPerfil(this.selectedFotoPerfil,nombre)
        
        this.service.getUsuariosTransporte().subscribe((data) => {
          this.tripulacion = data
          this.tripulacionFull = data
          this.toggleLiveDemo()
          this.form.reset();
        })


      })

      
    }else{
      this.isErrorView = true
      alert("Hay datos incorrectos")
    }

  }

 


 ngOnDestroy(): void {


  }

}

