import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import {PedidoCompromisoObligatorio } from 'src/app/models/rutas/pedidoCompromisoObligatorios.interface'
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { ComunasService } from '../../../service/comunas/comunas.service'
import {bancos, formasPago, tipoCuenta, tipoVehiculo,  marcaVehiculo, caracteristicasVehiculo  } from 'src/app/models/enum/bancos.json'
import { Colaborador } from 'src/app/models/transporte/colaborador.interface' 
import { Vehiculo } from 'src/app/models/transporte/vehiculo.interface' 


@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent {


  private selectedPermisoCirculacion: File | null = null;
  private selectedRevisionTecnica: File | null = null;
  private selectedSOAP: File | null = null;
  private selectedPadron: File | null = null;
  private selectedCertGases: File | null = null;


  descargarPermisoCirculacion : string | null = null
  descargarRevisionTecnica : string | null = null
  descargarSOAP : string | null = null
  descargarPadron : string | null = null
  descargarCertGases: string | null = null

  pedidosObligatorios : PedidoCompromisoObligatorio [] = []

  constructor(private service: PortalTransyanezService,public builder: FormBuilder,private comunaService : ComunasService) { }

  buscadorVehiculo : string = ''

  isErrorView : boolean = false
  rutValido : boolean = true
  rutColaborador: boolean = true
  rutRepresentanteValido : boolean = true
  rutTitularBanco : boolean = true
  listaRegiones : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []
  tipoUsuario : string = "7"

  colaboradores : Colaborador [] = []

  vehiculos : Vehiculo [] = []

   
  tipoCuentas : any [] = tipoCuenta
  banco : any [] = bancos
  formaPago : any [] = formasPago



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
  const colaborador = this.colaboradores.filter( colab => colab.Rut == this.formVehiculo.value.Rut_colaborador )[0]
  console.log(colaborador.Razon_social)
  this.formVehiculo.patchValue({
    Razon_social : colaborador.Razon_social,
  //   Telefono : colaborador.Telefono,
    // Region : colaborador.Region+'',
    // Comuna: colaborador.Comuna+'',
  })
}
  isModalOpenAgregar: boolean = false
  public visibleAgregar = false;

  toggleLiveAgregar() {
    this.formVehiculo.reset()
    this.formVehiculo.patchValue({
      Id_user  : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Rut_colaborador :'Seleccione un colaborador',
      Region : '1',
      Comuna : '1',
      Tipo : '1',
      Marca : '1',
      Capacidad_carga_m3 : '0',
      Platform_load_capacity_kg : '0',
      Capacidad_carga_kg : '0',
      Crane_load_capacity_kg : '0'
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



  /// vehiculos 
  tipoVehiculos : any [] = tipoVehiculo
  marcaVehiculo : any [] = marcaVehiculo
  caracteristicasVehiculo : any [] = caracteristicasVehiculo

  form = this.builder.group({
    Razon_social : this.builder.control("" , [Validators.required]),
    Tipo_razon : this.builder.control("7" ),
    Rut : this.builder.control("" , [Validators.required]),
    Email : this.builder.control("" , [Validators.required, Validators.email]),
    Celular : this.builder.control("" , [Validators.required]),
    Telefono : this.builder.control("" ),
    Fecha_nacimiento : this.builder.control("" , [Validators.required]),
    Direccion : this.builder.control("" , [Validators.required]),
    Representante_legal :this.builder.control("" ),
    Rut_representante_legal :this.builder.control("" ),
    Email_representante_legal :this.builder.control("" ),
    Rut_titular_cta_bancaria : this.builder.control("" ),
    Titular_cta : this.builder.control("" ),
    Numero_cta : this.builder.control("" ),
    Banco : this.builder.control("" ),
    Tipo_cta : this.builder.control("" ),
    Forma_pago : this.builder.control("" ),
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    // Documentacion_comercial_banco : this.builder.control("" , [Validators.required]),
    Comuna: this.builder.control("" , [Validators.required]),
    Region: this.builder.control("" , [Validators.required]),
  })



  formBancario = this.builder.group({
    Id_razon_social : this.builder.control("" , [Validators.required]),
    Rut_titular_cta_bancaria : this.builder.control("" ),
    Titular_cta : this.builder.control("" ),
    Numero_cta : this.builder.control("" ),
    Banco : this.builder.control("" ),
    Email : this.builder.control("" , [Validators.email]),
    Tipo_cta : this.builder.control("" ),
    Forma_pago : this.builder.control("" ),
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
  })

  formVehiculo = this.builder.group({
    Id_user  : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    razon_id : this.builder.control(null ),
    Rut_colaborador : this.builder.control("" ),
    Razon_social : this.builder.control("" ),
    Ppu : this.builder.control("" ),
    Tipo : this.builder.control("" ),
    // Caracteristicas  : this.builder.control(""),
    Marca  : this.builder.control("" ),
    Modelo  : this.builder.control("" ),
    Ano  : this.builder.control("" ),
    Region : this.builder.control("" ),
    Comuna : this.builder.control("" ),
    Estado : this.builder.control(false),
    Capacidad_carga_kg : this.builder.control("" ),
    Capacidad_carga_m3 : this.builder.control("" ),
    Platform_load_capacity_kg : this.builder.control("" ),
    Crane_load_capacity_kg : this.builder.control("" ),
    Permiso_circulacion_fec_venc : this.builder.control("" ),
    Soap_fec_venc : this.builder.control("" ),
    Revision_tecnica_fec_venc : this.builder.control("" ),
  })

  ngOnInit() : void {
    this.comunaService.getListaRegiones().subscribe((data : any) => {
      this.listaRegiones = data
    })

    this.comunaService.getListaComunas().subscribe((data : any) => {
      this.listaComunas = data
      this.listaComunasFull = this.listaComunas
      this.formVehiculo.patchValue({
        Region : '1',
        Comuna : '1'
      })
    })

    this.service.buscarVehiculos().subscribe((data) => {
      this.vehiculos = data
      this.service.obtenerColaboradores().subscribe((data) => {
        this.colaboradores = data
      })
    })

    
    // Uso de la función
    // console.log(Fn.validaRut('27962409-2') ? 'Valido' : 'inválido');

  }

  pv : boolean = true

  activate( activo : boolean,tipo_usuario : string){
    this.pv = activo
    this.tipoUsuario = tipo_usuario
  }

  onFileSelected(event: any, tipo_doc : string) {

    if(tipo_doc == 'permiso_circulacion' ) this.selectedPermisoCirculacion = event.target.files[0];
    if(tipo_doc == 'revision_tecnica' ) this.selectedRevisionTecnica = event.target.files[0];
    if(tipo_doc == 'soap' ) this.selectedSOAP = event.target.files[0];
    if(tipo_doc == 'padron' ) this.selectedPadron = event.target.files[0];
    if(tipo_doc == 'cert_gases' ) this.selectedCertGases = event.target.files[0];
  }
  
  uploadFile(selectedFile: File | null ,tipo_archivo : string, nombre : string){

    if (selectedFile) {
    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);

    this.service.subirDocumentos(formData, tipo_archivo,nombre).subscribe(
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

    if(rut == 'colab') this.rutValido = Fn.validaRut(this.form.value.Rut?.trim()) ? true : false
    if(rut == 'cta_banco') this.rutTitularBanco = Fn.validaRut(this.form.value.Rut_titular_cta_bancaria?.trim()) ? true : false
    if(rut == 'representante') this.rutRepresentanteValido = Fn.validaRut(this.form.value.Rut_representante_legal?.trim()) ? true : false
    if(rut == 'colab_vehiculo') this.rutColaborador = Fn.validaRut(this.formVehiculo.value.Rut_colaborador?.trim()) ? true : false

  }


  buscarComunas(event: any){
    const selectedRegionId = event.target.value;
    console.log('Región seleccionada:', selectedRegionId);
    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )
    this.formVehiculo.patchValue({
      Comuna : this.listaComunas[0].Id_comuna
    })
  }

  // registrar(){
  //   console.log(this.form.value)
  //   this.isErrorView = false

  //   if(this.form.valid){

  //     this.formBancario.patchValue({
  //       Id_user : this.form.value.Id_user,
  //       Ids_user : this.form.value.Ids_user,
  //       Id_razon_social : "0",
  //       Rut_titular_cta_bancaria : this.form.value.Rut_titular_cta_bancaria,
  //       Titular_cta : this.form.value.Titular_cta,
  //       Numero_cta : this.form.value.Numero_cta,
  //       Banco : this.form.value.Banco,
  //       Email : this.form.value.Email,
  //       Tipo_cta : this.form.value.Tipo_cta,
  //       Forma_pago: this.form.value.Forma_pago
  //     })

  //     this.form.patchValue({
  //       Tipo_razon : this.tipoUsuario
  //     })

  //     console.log(this.form.value)

  //     this.service.registrarColaborador(this.form.value).subscribe((data : any) => {
  //       console.log("El registro si llego", data)
  //       alert(data.message)

  //       const nombre = this.form.value.Rut + ""
  //       // this.form.reset();
      
  //       this.uploadFile(this.selectedCertRRPP,'cert_rrpp',nombre)
  //       this.uploadFile(this.selectedCertViPoderes,'cert_vig_poderes',nombre)
  //       this.uploadFile(this.selectedConstitucion,'constitucion_legal',nombre)
  //       this.uploadFile(this.selectedRegistroComercio,'registro_comercio',nombre)


  //       this.formBancario.patchValue({
  //         Id_razon_social : data.razon
  //       })

  //       this.form.reset();
        
  //       this.service.registrarDetallePago(this.formBancario.value).subscribe((data : any) => {
  //         this.formBancario.reset()
  //         this.uploadFile(this.selectedDocBancario,'documento_bancario',nombre)

          
  //       })

        
  //     })
  //   }else{
  //     this.isErrorView = true
  //     alert("Hay datos incorrectos")
  //   }

  // }


  /// Modulo Vehiculo

  uploadFileVehiculos(selectedFile: File | null ,tipo_archivo : string, nombre : string){

    if (selectedFile) {
    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);

    this.service.subirDocumentosVehiculos(formData, tipo_archivo,nombre).subscribe(
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

  registrarVehiculo(){
    this.isErrorView = false

    console.log(this.formVehiculo.value)

    if(this.formVehiculo.valid && this.form.value.Rut != 'Seleccione un colaborador'){
      this.service.registrarVehiculos(this.formVehiculo.value).subscribe((data :any) => {

        const nombre = this.formVehiculo.value.Ppu + ""


        this.uploadFileVehiculos(this.selectedPermisoCirculacion,'permiso_circulacion',nombre)
        this.uploadFileVehiculos(this.selectedRevisionTecnica,'revision_tecnica',nombre)
        this.uploadFileVehiculos(this.selectedSOAP,'soap',nombre)
        this.uploadFileVehiculos(this.selectedPadron,'padron',nombre)
        this.uploadFileVehiculos(this.selectedCertGases,'cert_gases',nombre)

        alert(data.message)

      })

    }else {
      alert('error al ingresar los datos')
      console.log(this.formVehiculo.value)
    }

  }


  revisarDatosVehiculo(ppu : string){
    const datosVehiculo = this.vehiculos.filter(vehiculo => vehiculo.Ppu == ppu)[0]
    this.formVehiculo.patchValue({
      Id_user  : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      // razon_id : datosVehiculo.Razon_id,
      Rut_colaborador : datosVehiculo.Rut,
      Razon_social :datosVehiculo.Razon_social,
      Marca  : datosVehiculo.Marca+'',
      Modelo  : datosVehiculo.Modelo,
      Ppu : datosVehiculo.Ppu,
      Tipo : datosVehiculo.Tipo+'',
      // Caracteristicas  : datosVehiculo.carac,
      Ano  : datosVehiculo.Ano+'',
      Region : datosVehiculo.Region+'',
      Comuna : datosVehiculo.Comuna+'',
      Estado : datosVehiculo.Estado,
      Capacidad_carga_kg : datosVehiculo.Capacidad_carga_kg+'',
      Capacidad_carga_m3 : datosVehiculo.Capacidad_carga_m3+'',
      Platform_load_capacity_kg : datosVehiculo.Platform_load_capacity_kg+'',
      Crane_load_capacity_kg : datosVehiculo.Crane_load_capacity_kg+'',
      Permiso_circulacion_fec_venc : datosVehiculo.Permiso_circulacion_fec_venc,
      Soap_fec_venc : datosVehiculo.Soap_fec_venc,
      Revision_tecnica_fec_venc : datosVehiculo.Revision_tecnica_fec_venc,
    })

    this.descargarPermisoCirculacion  = datosVehiculo.Registration_certificate
    this.descargarRevisionTecnica = datosVehiculo.Pdf_revision_tecnica
    this.descargarSOAP  = datosVehiculo.Pdf_soap
    this.descargarPadron = datosVehiculo.Pdf_padron
    this.descargarCertGases  = datosVehiculo.Pdf_gases_certification


    console.log(datosVehiculo)
    this.toggleLiveDemo()
  }

  descargarArchivo(archivo : string | null){
    if(archivo){
      this.service.downloadArchivos(archivo)
    }
    
  }


  actualizarDatosVehiculo(){

    this.isErrorView = false

    console.log(this.formVehiculo.value.Estado)

    if(this.formVehiculo.valid){

      this.service.actualizarVehiculo(this.formVehiculo.value).subscribe((data : any) => {
        console.log("El registro si llego", data)
        alert(data.message)

        const nombre = this.formVehiculo.value.Ppu + ""
        // this.form.reset();
      
        this.uploadFileVehiculos(this.selectedPermisoCirculacion,'permiso_circulacion',nombre)
        this.uploadFileVehiculos(this.selectedRevisionTecnica,'revision_tecnica',nombre)
        this.uploadFileVehiculos(this.selectedSOAP,'soap',nombre)
        this.uploadFileVehiculos(this.selectedPadron,'padron',nombre)
        this.uploadFileVehiculos(this.selectedCertGases,'cert_gases',nombre)

        this.service.buscarVehiculos().subscribe((data) => {
          this.vehiculos = data
          this.toggleLiveDemo()
        })
      }, error => {
        alert(error.error.detail)
      })
    }else{
      this.isErrorView = true
      alert("Hay datos incorrectos")
    }

  }


 veficarColabExiste(rut: string | null | undefined){
  if (rut){
    this.service.verificarColaborador(rut).subscribe((data : any) => {
      this.formVehiculo.patchValue({
        razon_id : data.razon_id,
        Razon_social : data.razon_social,
      })
  
    }, error => {
      alert(error.error.detail)
    })

  }
  
 }

 buscarVehiculoFiltro(){
  if(this.buscadorVehiculo == '') {
    this.vehiculos = []
  } else {
    this.service.buscarVehiculo(this.buscadorVehiculo).subscribe((data) => {
      this.vehiculos = data
    })
  }
 }

 ngOnDestroy(): void {


  }


  

}
