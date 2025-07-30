import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import {PedidoCompromisoObligatorio } from 'src/app/models/rutas/pedidoCompromisoObligatorios.interface'
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { ComunasService } from '../../../service/comunas/comunas.service'
import {bancos, formasPago, tipoCuenta, tipoVehiculo,  marcaVehiculo, caracteristicasVehiculo  } from 'src/app/models/enum/bancos.json'
import { Colaborador } from 'src/app/models/transporte/colaborador.interface' 
import { Vehiculo, AsignarOperacion } from 'src/app/models/transporte/vehiculo.interface' 
import { RazonSocial } from 'src/app/models/modalidad-de-operaciones.interface';
import { ModalidadDeOperacionesService } from 'src/app/service/modalidad-de-operaciones.service';
import { CentroOperacion } from 'src/app/models/operacion/centroOperacion.interface';
import { ROLES_ENUM } from 'src/app/models/enum/roles.enum';
import { SidebarService } from '../../../service/sidebar/sidebar.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent  {


  private selectedPermisoCirculacion: File | null = null;
  private selectedRevisionTecnica: File | null = null;
  private selectedSOAP: File | null = null;
  private selectedPadron: File | null = null;
  private selectedCertGases: File | null = null;
  public rol = sessionStorage.getItem("rol_id") 

  isLoadingFull: boolean = true;
  rolesMeli : string [] = ['80', '81','50']
  descargarPermisoCirculacion : string | null = null
  descargarRevisionTecnica : string | null = null
  descargarSOAP : string | null = null
  descargarPadron : string | null = null
  descargarCertGases: string | null = null

  pedidosObligatorios : PedidoCompromisoObligatorio [] = []

  constructor(private service: PortalTransyanezService,public builder: FormBuilder,private permisoService: SidebarService,
    private MoService: ModalidadDeOperacionesService
  ) { }

  buscadorVehiculo : string = ''

  isErrorView : boolean = false
  rutValido : boolean = true
  rutColaborador: boolean = true
  rutRepresentanteValido : boolean = true
  rutTitularBanco : boolean = true
  listaRegiones : any [] = []
  listaRegionesFiltro : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []
  tipoUsuario : string = "7"

  colaboradores : Colaborador [] = []

  vehiculos : Vehiculo [] = []
  vehiculosFull : Vehiculo [] = []

   
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
  listaPatentes : any [] = []

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
    Disponible : this.builder.control(false),
    Habilitado : this.builder.control(false ),
    Gps : this.builder.control(false),
    Imei :this.builder.control(""),
    Oc_instalacion : this.builder.control(""),
    Fecha_instalacion : this.builder.control(""),
    Id_gps : this.builder.control("")
    // Habilitado : this.builder.control(false ),
  })


  geBgColorOp(contenido : string){
    if (contenido == null) return ''
    return this.modalidadOperacionFull.filter(op => op.nombre == contenido)[0].color
  }

  geBgColorCo(contenido : string){
    if (contenido == null) return ''
    const id_op = this.centroOperacionFull.filter(op => op.Centro == contenido)[0].Id_op
    return this.modalidadOperacionFull.filter(op => op.id == id_op)[0].color
  }

  permiso : boolean = false

  ngOnInit() : void {

    this.permiso = this.permisoService.getPermiso()

    this.service.getSeleccionesVehiculos().subscribe((data) => {
      this.listaRegiones = data.Region
      this.marcaVehiculo = data.Marca_vehiculo
      // this.ObservacionVehiculos = data.Vehiculos_observaciones
      this.tipoVehiculos = data.Tipo_vehiculo
      this.listaComunas = data.Comuna
      this.listaComunasFull = this.listaComunas

      this.formVehiculo.patchValue({
        Region : '1',
        Comuna : '1'
      })

    })



    // this.comunaService.getListaRegiones().subscribe((data : any) => {
    //   this.listaRegiones = data

    //   this.service.getMarcasVehiculos().subscribe((data : any) => {
    //     this.marcaVehiculo = data
    //   })
    // })

    this.MoService.getRazonesSocial().subscribe((data) => {
      data.map( op => {
        if(op.color == null){
          op.color = this.getColor(op.id)
        }
      })

      this.modalidadOperacion = data
      this.modalidadOperacionFull = data

      this.MoService.getCentroOperaciones().subscribe(data => {
        this.centroOperacionFull = data
        this.centroOperacionLista = data
        this.centroOperacion = data

        this.service.buscarVehiculosMasOperaciones().subscribe((data) => {
          data.map(v => {
            if(v.Operaciones[0] == null){
              v.Operaciones = []
            }else{
              // v.Operaciones =  v.Operaciones.map((op : any) => this.convertirOperaciones(op))
              v.Operaciones = [...new Set(v.Operaciones.map((op : any) => this.convertirOperaciones(op)))];
           
            }
            if(v.Centro_operaciones[0] == null){
              v.Centro_operaciones = []
            }else{
              v.Centro_operaciones =  v.Centro_operaciones.map((co : any) => this.convertirCentroOperaciones(co))
            }
          })
          this.vehiculos = data
          this.isLoadingFull = false
          this.vehiculosFull = this.vehiculos

          this.listaPatentes = this.vehiculosFull.map(v => v.Ppu)
          this.listaRegionesFiltro = [... new Set(data.map( lista => lista.Region))]
          this.listaRegionesFiltro =this.listaRegiones.filter((r) => this.listaRegionesFiltro.includes(parseInt(r.Id_region)))
          this.service.obtenerColaboradores().subscribe((data) => {
            this.colaboradores = data
          })
        })
    })
      // this.buscarCentroOperacion()
      // this.verificarOperacionVehiculo()
  
      // const operacion = this.modalidadOperacion.filter( op => op.id == vehiculo.Agency_id)
  
    })

    

    // this.comunaService.getListaComunas().subscribe((data : any) => {
    //   this.listaComunas = data
    //   this.listaComunasFull = this.listaComunas
    //   this.formVehiculo.patchValue({
    //     Region : '1',
    //     Comuna : '1'
    //   })
    // })

   
  }

  colorMap : any [] = []

  generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

isLightColor(color : string) {
  // Convert hex color to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Calculate luminosity
  const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // A value above 128 is considered light
  return luminosity > 128;
}

generateLightRandomColor() {
  let color;
  do {
      color = this.generateRandomColor();
  } while (!this.isLightColor(color));
  return color;
}

  getColor(number : number) {
    // Verificar si el número ya tiene un color asignado
    if (this.colorMap[number]) {
        // Si ya tiene un color, devolverlo
        return this.colorMap[number];
    } else {
        // Si no tiene un color asignado, asignar uno nuevo
        const newColor = this.generateLightRandomColor();
        this.colorMap[number] = newColor;
        return newColor;
    }
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

    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )
    this.formVehiculo.patchValue({
      Comuna : this.listaComunas[0].Id_comuna
    })
  }

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

    this.formVehiculo.patchValue({
      Estado : this.formVehiculo.value.Disponible
    })

    if(this.formVehiculo.valid && this.form.value.Rut != 'Seleccione un colaborador'){
      this.service.registrarVehiculos(this.formVehiculo.value).subscribe((data :any) => {

        const nombre = this.formVehiculo.value.Ppu + ""


        this.uploadFileVehiculos(this.selectedPermisoCirculacion,'permiso_circulacion',nombre)
        this.uploadFileVehiculos(this.selectedRevisionTecnica,'revision_tecnica',nombre)
        this.uploadFileVehiculos(this.selectedSOAP,'soap',nombre)
        this.uploadFileVehiculos(this.selectedPadron,'padron',nombre)
        this.uploadFileVehiculos(this.selectedCertGases,'cert_gases',nombre)

        alert(data.message)

        this.service.buscarVehiculosMasOperaciones().subscribe((data) => {
          this.vehiculos = data
          this.vehiculosFull = this.vehiculos
          this.listaRegionesFiltro = [... new Set(data.map( lista => lista.Region))]
          this.listaRegionesFiltro =this.listaRegiones.filter((r) => this.listaRegionesFiltro.includes(parseInt(r.Id_region)))
          this.toggleLiveAgregar()

        })

        

        
      })

    }else {
      alert('error al ingresar los datos')

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
      Estado : datosVehiculo.Disponible,
      Capacidad_carga_kg : datosVehiculo.Capacidad_carga_kg+'',
      Capacidad_carga_m3 : datosVehiculo.Capacidad_carga_m3+'',
      Platform_load_capacity_kg : datosVehiculo.Platform_load_capacity_kg+'',
      Crane_load_capacity_kg : datosVehiculo.Crane_load_capacity_kg+'',
      Permiso_circulacion_fec_venc : datosVehiculo.Permiso_circulacion_fec_venc,
      Soap_fec_venc : datosVehiculo.Soap_fec_venc,
      Revision_tecnica_fec_venc : datosVehiculo.Revision_tecnica_fec_venc,
      Disponible : datosVehiculo.Disponible,
      Habilitado : datosVehiculo.Habilitado,
      Id_gps : datosVehiculo.Id_gps+'',
      Gps : datosVehiculo.Gps,
      Imei :datosVehiculo.Imei,
      Oc_instalacion : datosVehiculo.Oc_instalacion,
      Fecha_instalacion : datosVehiculo.Fecha_instalacion,
    })

    this.descargarPermisoCirculacion  = datosVehiculo.Registration_certificate
    this.descargarRevisionTecnica = datosVehiculo.Pdf_revision_tecnica
    this.descargarSOAP  = datosVehiculo.Pdf_soap
    this.descargarPadron = datosVehiculo.Pdf_padron
    this.descargarCertGases  = datosVehiculo.Pdf_gases_certification

    this.toggleLiveDemo()
  }

  descargarArchivo(archivo : string | null){
    if(archivo){
      this.service.downloadArchivos(archivo)
    }
    
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

  sortTableEstado(orden : boolean){
    if(orden){
      this.vehiculos.sort((a,b) => Number(a.Estado) - Number(b.Estado))
    }else{
      this.vehiculos.sort((a,b) => Number(b.Estado) - Number(a.Estado))
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
    }else{
      this.vehiculos = this.vehiculosFull.filter( v => v.Region == this.regionSeleccionada)
    }

    
  }

  actualizarDatosVehiculo(){

    this.isErrorView = false


    if(this.formVehiculo.valid){

      this.service.actualizarVehiculo(this.formVehiculo.value).subscribe((data : any) => {

        alert(data.message)

        const nombre = this.formVehiculo.value.Ppu + ""
        // this.form.reset();
      
        this.uploadFileVehiculos(this.selectedPermisoCirculacion,'permiso_circulacion',nombre)
        this.uploadFileVehiculos(this.selectedRevisionTecnica,'revision_tecnica',nombre)
        this.uploadFileVehiculos(this.selectedSOAP,'soap',nombre)
        this.uploadFileVehiculos(this.selectedPadron,'padron',nombre)
        this.uploadFileVehiculos(this.selectedCertGases,'cert_gases',nombre)

        this.service.buscarVehiculosMasOperaciones().subscribe((data) => {
          this.vehiculos = data
          this.vehiculosFull = this.vehiculos
          this.listaRegionesFiltro = [... new Set(data.map( lista => lista.Region))]
          this.listaRegionesFiltro =this.listaRegiones.filter((r) => this.listaRegionesFiltro.includes(parseInt(r.Id_region)))
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

  if(this.idOperacion== 0 && this.IdCentroOperacion == 0){
    this.vehiculos = this.vehiculosFull
    if(this.regionSeleccionada == 0){
      this.vehiculos = this.vehiculosFull
    }else{
      this.vehiculos = this.vehiculos.filter( v => v.Region == this.regionSeleccionada)
    }

  } else{
    /// usamos el service para buscar las patentes asociadas a una operacion
    this.service.buscarIdVehiculo(this.idOperacion,this.IdCentroOperacion).subscribe((data : any) => {

      this.vehiculos = this.vehiculosFull.filter(v => data.Vehiculo.includes(v.Id))
  
      if(this.regionSeleccionada == 0){
        this.vehiculos = this.vehiculos
      }else{
        this.vehiculos = this.vehiculos.filter( v => v.Region == this.regionSeleccionada)
      }
    })
  }
 }

 //buscarVehiculoPorPatente

 patenteSeleccionada : string = ''

 buscarVehiculoPorPatente(){
  this.isLoadingFull = true
  this.vehiculos = this.vehiculosFull.filter(v => v.Ppu == this.patenteSeleccionada)
   this.isLoadingFull = false
 }

//  listaComunasFull

 descargarDatosVehiculos(){

  const datos_send = this.vehiculos.map((v) => {
    return { ...v,
      Tipo : this.tipoVehiculos.filter(f => f.id == v.Tipo)[0].name,
      Region : this.listaRegiones.filter(f => f.Id_region == v.Region)[0].Nombre_region,
      // Comuna : this.listaComunasFull.filter(f => f.Id_comuna == v.Comuna)[0].Nombre_comuna,
      Operaciones : v.Operaciones.join(', '),
      Centro_operaciones : v.Centro_operaciones.join(', ')
    }
  })

  this.service.descargar_vehiculos_buscados(datos_send)

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
  this.IdCentroOperacion = 0

  this.estaAsignadoCO()
  
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


convertirOperaciones(id : number){
  if(id == null) return 'nada'


  return this.modalidadOperacion.filter(v => v.id == id)[0].nombre
}

convertirCentroOperaciones(id : number){
  if(id == null) return 'nada'
  return this.centroOperacionFull.filter(v => v.Id == id)[0].Centro
}

convertirRegion(id: number){
  if(this.listaRegiones.length !=0){
    return this.listaRegiones.filter(r => r.Id_region == id )[0].Nombre_region
  }else{
    return ""
  }
}

ngAfterViewInit() {
  document.querySelectorAll('.borderDemo').forEach((element : any) => {
    const text = element.getAttribute('data-text');

    const color = this.getColor(text);
    element.style.backgroundColor = color;
  });
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
    const filtro = this.centroOperacionFull.filter( co => co.Id == this.IdCentroOperacion)[0]

    if(filtro.Estado == true){
      this.isAsignado = false
      return false
    }else{
      this.isAsignado = true
      return true
    }
  }
  
  
  
}

 ngOnDestroy(): void {


  }


  

}
