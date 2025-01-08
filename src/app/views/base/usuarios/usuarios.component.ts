import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { PortalTransyanezService } from "../../../service/portal-transyanez.service";
import {PedidoCompromisoObligatorio } from '../../../models/rutas/pedidoCompromisoObligatorios.interface'
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { ComunasService } from '../../../service/comunas/comunas.service'
import {bancos, formasPago, tipoCuenta, tipoVehiculo,  marcaVehiculo, caracteristicasVehiculo  } from '../../../models/enum/bancos.json'
import { Colaborador,DetallePago } from '../../../models/transporte/colaborador.interface' 

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  private selectedConstitucion: File | null = null;
  private selectedCertRRPP: File | null = null;
  private selectedCertViPoderes: File | null = null;
  private selectedRegistroComercio: File | null = null;
  private selectedDocBancario: File | null = null;
  pedidosObligatorios : PedidoCompromisoObligatorio [] = []
  estadoTransporte : any [] =[]


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
  detallePago : DetallePago [] = []

  isModalOpen: boolean = false
  public visible = false;

  toggleLiveDemo() {

    this.selectedConstitucion = null;
    this.selectedCertRRPP = null;
    this.selectedCertViPoderes = null;
    this.selectedRegistroComercio = null;
    this.selectedDocBancario = null;
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

  showPosition(position: any): any{
    this.latitude = position.coords.latitude
    this.longitud= position.coords.longitude 
    this.latStr = this.latitude.toString()
    this.longStr = this.longitud.toString()
  }
  
  getLocationAsync(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, (error) => {
        reject(error);
      });
    } else {
      reject("Localización no disponible");
    }
  });
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

  this.selectedConstitucion = null;
  this.selectedCertRRPP = null;
  this.selectedCertViPoderes = null;
  this.selectedRegistroComercio = null;
  this.selectedDocBancario = null;
    this.form.reset()
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




  tipoRazon : string = ""
   
  tipoCuentas : any [] = tipoCuenta
  banco : any [] = bancos
  formaPago : any [] = formasPago


  checkDetallePago : boolean = false

  nombreColaborador : string = ""

  descargarDocBancario : string | null = null
  descargarConstitucionLegal : string | null = null
  descargarCertRRPP : string | null = null
  descargarCertPoderes : string | null = null
  descargarRegistroComercio: string | null = null


  /// vehiculos 
  tipoVehiculos : any [] = tipoVehiculo
  marcaVehiculo : any [] = marcaVehiculo
  caracteristicasVehiculo : any [] = caracteristicasVehiculo

  form = this.builder.group({
    Razon_social : this.builder.control("" , [Validators.required]),
    Tipo_razon : this.builder.control("7" ),
    Rut : this.builder.control("" , [Validators.required]),
    Email : this.builder.control("" , [Validators.required, Validators.email]),
    Celular : this.builder.control("" ),
    Telefono : this.builder.control("" ),
    Fecha_nacimiento : this.builder.control("" ),
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
    Giro: this.builder.control("" ),
    Modificacion: this.builder.control("" ),
    Latitud: this.builder.control("" ),
    Longitud: this.builder.control("" ),
    Origen: this.builder.control("" ),
    Chofer :  this.builder.control(false ),
    Peoneta :  this.builder.control(false ),
    Abogado : this.builder.control(0 ),
    Seguridad :this.builder.control(0 ),
  })

  formBancario = this.builder.group({
    Id_razon_social : this.builder.control("" , [Validators.required]),
    Rut_titular_cta_bancaria : this.builder.control("", [Validators.required] ),
    Titular_cta : this.builder.control("", [Validators.required] ),
    Numero_cta : this.builder.control("",[Validators.required]  ),
    Banco : this.builder.control("",[Validators.required]  ),
    Email : this.builder.control("" , [Validators.email]),
    Tipo_cta : this.builder.control("", [Validators.required]  ),
    Forma_pago : this.builder.control("", [Validators.required]  ),
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
  })

  formVehiculo = this.builder.group({
    Id_user  : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    Id_razon_social : this.builder.control("" ),
    Rut_colaborador : this.builder.control("" ),
    Razon_social : this.builder.control("" ),
    Ppu : this.builder.control("" ),
    Tipo : this.builder.control("" ),
    Caracteristicas  : this.builder.control(""),
    Marca  : this.builder.control("" ),
    Modelo  : this.builder.control("" ),
    Ano  : this.builder.control("" ),
    Region : this.builder.control("" ),
    Comuna : this.builder.control("" ),
    Estado : this.builder.control("" ),
    Capacidad_carga_kg : this.builder.control("" ),
    Capacidad_carga_m3 : this.builder.control("" ),
    Platform_load_capacity_kg : this.builder.control("" ),
    Crane_load_capacity_kg : this.builder.control("" ),
    Permiso_circulacion_fec_venc : this.builder.control("" ),
    Soap_fec_venc : this.builder.control("" ),
    Revision_tecnica_fec_venc : this.builder.control("" ),
  })

  buscarColaboradoresPorNombre(){
    if(this.nombreColaborador == ""){
      this.service.obtenerColaboradores().subscribe((data) => {
        this.colaboradores = data
      })
    }else{
      this.service.buscarColaboradores(this.nombreColaborador).subscribe((data) => {
        this.colaboradores = data
      })
    }
    
  }

  ngOnInit() : void {
    this.comunaService.getListaRegiones().subscribe((data : any) => {
      this.listaRegiones = data
    })

    this.comunaService.getListaComunas().subscribe((data : any) => {
      this.listaComunas = data
      this.listaComunasFull = this.listaComunas
      this.form.patchValue({
        Region : '1',
        Comuna : '1'
      })
    })

    this.service.obtenerColaboradores().subscribe((data) => {
      this.colaboradores = data

      this.service.getMarcasVehiculos().subscribe((data : any) => {
        this.marcaVehiculo = data
      
        this.service.getEstadoTransporte().subscribe((data : any) => {
          this.estadoTransporte = data
         })
      })
    })

  }

  pv : boolean = true

  activate( activo : boolean,tipo_usuario : string){
    this.pv = activo
    this.tipoUsuario = tipo_usuario
  }

  onFileSelected(event: any, tipo_doc : string) {

    if(tipo_doc == 'doc_bancario') this.selectedDocBancario = event.target.files[0];
    if(tipo_doc == 'doc_constitucion') this.selectedConstitucion = event.target.files[0];
    if(tipo_doc == 'doc_RRPP') this.selectedCertRRPP = event.target.files[0];
    if(tipo_doc == 'doc_vigencia') this.selectedCertViPoderes = event.target.files[0];
    if(tipo_doc == 'registro_comercio') this.selectedRegistroComercio = event.target.files[0];

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
    

  }


  activarUsuario(activar : boolean){
    const rut = this.form.value.Rut
    
    // this.service.activarColaborador(rut+'',activar).subscribe((mes : any) => {
    //   this.service.obtenerColaboradores().subscribe((data) => {
    //     this.colaboradores = data
    //     alert(mes.message)
    //     this.toggleLiveDemo()
    //   })
    // })
  }

  buscarComunas(event: any){
    const selectedRegionId = event.target.value;
    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )
  }

  revisarDatos(rut : string, tipo_razon : string){
    this.tipoRazon = tipo_razon
    const colaborador =this.colaboradores.filter(colab => colab.Rut == rut)[0]

    this.service.obtenerDetallePago(colaborador.Id+'').subscribe(data => {
      const detallePago = data[0] 
      this.usuarioActivado = colaborador.Activo

      this.form.reset()

      if(detallePago == undefined){

        this.checkDetallePago = false
        this.form.patchValue({
          Rut : colaborador.Rut,
          Razon_social : colaborador.Razon_social,
          Email : colaborador.Email_rep_legal,
          Celular : colaborador.Celular,
          Telefono : colaborador.Telefono,
          Region : colaborador.Region,
          Comuna : colaborador.Comuna,
          Direccion: colaborador.Direccion,
          Representante_legal : colaborador.Representante_legal,
          Rut_representante_legal : colaborador.Rut_representante_legal,
          Giro: colaborador.Giro,
          Abogado : colaborador.Abogado

        })
        this.descargarDocBancario = null
        this.descargarConstitucionLegal = colaborador.Pdf_legal_contitution
        this.descargarCertPoderes = colaborador.Pdf_validity_of_powers
        this.descargarCertRRPP =colaborador.Pdf_certificate_rrpp
  
        this.descargarRegistroComercio = colaborador.Pdf_registration_comerce
        this.toggleLiveDemo()

      } else{

        this.checkDetallePago = true
        this.form.patchValue({
          Rut : colaborador.Rut,
          Razon_social : colaborador.Razon_social,
          Email : colaborador.Email_rep_legal,
          Celular : colaborador.Celular,
          Telefono : colaborador.Telefono,
          Region : colaborador.Region,
          Comuna : colaborador.Comuna,
          Direccion: colaborador.Direccion,
          Representante_legal : colaborador.Representante_legal,
          Rut_representante_legal : colaborador.Rut_representante_legal,
          Rut_titular_cta_bancaria : detallePago.Rut_cuenta,
          Titular_cta : detallePago.Titular_cuenta,
          Numero_cta : detallePago.Numero_cuenta,
          Banco : detallePago.Banco+'',
          Tipo_cta : detallePago.Tipo_cuenta+'',
          Forma_pago: detallePago.Forma_pago+'',
          Giro: colaborador.Giro,
          Abogado : colaborador.Abogado
        })
      this.descargarDocBancario = detallePago.Pdf_documento
      this.descargarConstitucionLegal = colaborador.Pdf_legal_contitution
      this.descargarCertPoderes = colaborador.Pdf_validity_of_powers
      this.descargarCertRRPP =colaborador.Pdf_certificate_rrpp
 
      this.descargarRegistroComercio = colaborador.Pdf_registration_comerce
      this.toggleLiveDemo()
    }
    })

  }

  registrar(){

    this.form.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
    })

    this.isErrorView = false

    if(this.form.valid){

      this.formBancario.patchValue({
        Id_user : this.form.value.Id_user,
        Ids_user : this.form.value.Ids_user,
        Id_razon_social : "0",
        Rut_titular_cta_bancaria : this.form.value.Rut_titular_cta_bancaria,
        Titular_cta : this.form.value.Titular_cta,
        Numero_cta : this.form.value.Numero_cta,
        Banco : this.form.value.Banco,
        Email : this.form.value.Email,
        Tipo_cta : this.form.value.Tipo_cta,
        Forma_pago: this.form.value.Forma_pago
      })

      this.form.patchValue({
        Tipo_razon : this.tipoUsuario
      })

      this.service.registrarColaborador(this.form.value).subscribe((data : any) => {
        alert(data.message)

        const nombre = this.form.value.Rut + ""
        // this.form.reset();
      
        this.uploadFile(this.selectedCertRRPP,'cert_rrpp',nombre)
        this.uploadFile(this.selectedCertViPoderes,'cert_vig_poderes',nombre)
        this.uploadFile(this.selectedConstitucion,'constitucion_legal',nombre)
        this.uploadFile(this.selectedRegistroComercio,'registro_comercio',nombre)


        this.formBancario.patchValue({
          Id_razon_social : data.razon
        })

        this.form.reset();

        if(this.formBancario.valid){
          this.service.registrarDetallePago(this.formBancario.value).subscribe((data : any) => {
            this.formBancario.reset()
            this.uploadFile(this.selectedDocBancario,'documento_bancario',nombre)
  
            this.service.obtenerColaboradores().subscribe((data) => {
              this.colaboradores = data
              this.toggleLiveAgregar()
            })
          })
        } else{
          this.service.obtenerColaboradores().subscribe((data) => {
            this.colaboradores = data
            this.toggleLiveAgregar()
          })
        }
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
      Origen : '/transporte/colaboradores'
    })
    this.isErrorView = false

    if(this.form.valid){

      this.formBancario.patchValue({
        Id_user : this.form.value.Id_user,
        Ids_user : this.form.value.Ids_user,
        Id_razon_social : "0",
        Rut_titular_cta_bancaria : this.form.value.Rut_titular_cta_bancaria,
        Titular_cta : this.form.value.Titular_cta,
        Numero_cta : this.form.value.Numero_cta,
        Banco : this.form.value.Banco,
        Email : this.form.value.Email,
        Tipo_cta : this.form.value.Tipo_cta,
        Forma_pago: this.form.value.Forma_pago
      })

      this.form.patchValue({
        Tipo_razon : this.tipoUsuario
      })

      this.service.actualizarColaborador(this.form.value).subscribe((data : any) => {
        alert(data.message)

        const nombre = this.form.value.Rut + ""
        // this.form.reset();
      
        this.uploadFile(this.selectedCertRRPP,'cert_rrpp',nombre)
        this.uploadFile(this.selectedCertViPoderes,'cert_vig_poderes',nombre)
        this.uploadFile(this.selectedConstitucion,'constitucion_legal',nombre)
        this.uploadFile(this.selectedRegistroComercio,'registro_comercio',nombre)


        this.formBancario.patchValue({
          Id_razon_social : data.razon
        })

        
        if(this.checkDetallePago == true){
          this.service.actualizarDetallePago(this.formBancario.value).subscribe((data : any) => {
            this.formBancario.reset()
            this.uploadFile(this.selectedDocBancario,'documento_bancario',nombre)
  
            this.service.obtenerColaboradores().subscribe((data) => {
              this.colaboradores = data
              this.toggleLiveDemo()
            })
          })
        }else {
          if(this.formBancario.valid){
            this.service.registrarDetallePago(this.formBancario.value).subscribe((data : any) => {
              this.formBancario.reset()
              this.uploadFile(this.selectedDocBancario,'documento_bancario',nombre)
    
              this.service.obtenerColaboradores().subscribe((data) => {
                this.colaboradores = data
                this.toggleLiveDemo()
              })
            })
          } else{
            this.service.obtenerColaboradores().subscribe((data) => {
              this.colaboradores = data
              this.toggleLiveDemo()
            })
          }
        }
        
        

        
      })
    }else{
      this.isErrorView = true
      alert("Hay datos incorrectos")
    }

  }

 


 ngOnDestroy(): void {


  }

}
