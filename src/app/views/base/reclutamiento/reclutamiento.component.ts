import { Component} from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { PortalTransyanezService } from "../../../service/portal-transyanez.service";
import {PedidoCompromisoObligatorio } from '../../../models/rutas/pedidoCompromisoObligatorios.interface'
import { FormBuilder, Validators } from '@angular/forms'
import { ComunasService } from '../../../service/comunas/comunas.service'
import {bancos, formasPago, tipoCuenta, tipoVehiculo,  marcaVehiculo, caracteristicasVehiculo  } from '../../../models/enum/bancos.json'
import { Colaborador } from '../../../models/transporte/colaborador.interface' 
import { Vehiculo, AsignarOperacion,VehiculoObservaciones } from '../../../models/transporte/vehiculo.interface' 
import { RazonSocial } from '../../../models/modalidad-de-operaciones.interface';
import { ModalidadDeOperacionesService } from '../../../service/modalidad-de-operaciones.service';
import { PanelVehiculos } from '../../../models/transporte/paneles.interface'
import { ContactoEjecutivo, EstadoContacto, listaComentarios, MotivoSubestado, Operacion, Origen, Reclutamiento, Region,TipoVehiculo,Comuna } from 'src/app/models/transporte/seleccionesReclutamiento.interface' 
// import { RecursiveAstVisitor } from '@angular/compiler';
// import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import FileSaver from 'file-saver';


@Component({
  selector: 'app-reclutamiento',
  templateUrl: './reclutamiento.component.html',
  styleUrls: ['./reclutamiento.component.scss','./reclutamiento2.component.scss']
})
export class ReclutamientoComponent {

  public rol = sessionStorage.getItem("rol_id") 
  public rol_no_permitido = ['50','90']
  

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
  reclutas : Reclutamiento [] = []
  reclutasFull : Reclutamiento [] = []
  listaPatentes : string [] = []


  buscadorVehiculo : string = ''

  isErrorView : boolean = false
  rutValido : boolean = true
  rutColaborador: boolean = true
  rutRepresentanteValido : boolean = true
  rutTitularBanco : boolean = true
  
  listaComunas : Comuna [] = []
  listaComunasFull : Comuna [] = []
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

  //Comentarios
  options : any [] = []


  /// Modales

  
  isModalOpen: boolean = false
  public visible = false;

  toggleLiveDemo() {
    this.form.reset()
    this.form.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Region: "1",
      Operacion_postula : this.listaOperacion[0].Id+"",
      Tipo_vehiculo : "1",
      Origen_contacto : "1",
      Comuna : "1"
    })
    this.rutValido = true
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
  

  public visibleComentarios = false;

  abrirModalComentario(id_recluta :number){
    this.selectedOption.Id_recluta = id_recluta+''
    this.selectedOption.Id_user = sessionStorage.getItem("id")?.toString()+"",
    this.selectedOption.Ids_user = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
    this.toggleLiveComentarios()
  }

  toggleLiveComentarios() {
    this.comentario = ''
    this.selectedOption.Latitud = this.latStr
    this.selectedOption.Longitud = this.longStr

    this.visibleComentarios = !this.visibleComentarios;
  }


  handleLiveComentariosChange(event: any) {
    this.visibleComentarios = event;
  }

  visibleListaComentarios : boolean = false

  toggleLiveListaComentarios() {

    this.visibleListaComentarios = !this.visibleListaComentarios;
  }


  handleLiveListaComentariosChange(event: any) {
    this.visibleListaComentarios = event;
  }

  listaComentarios : listaComentarios [] =[]

  abrirModalListaComentario(id_recluta :number){
    this.service.listaComentariosRecluta(id_recluta).subscribe(data => {
      this.listaComentarios = data
      this.toggleLiveListaComentarios()
    })
    
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

  isModalOpenAgregar: boolean = false
  public visibleAgregar = false;

  
  filtrarPatente() {
    if (this.buscadorVehiculo.length > 0) {
      this.reclutas = this.reclutasFull.filter(ruta => ruta.Ppu.toLowerCase().includes(this.buscadorVehiculo.toLowerCase()))
      this.pestana  = this.reclutasFull.filter(ruta => ruta.Ppu.toLowerCase().includes(this.buscadorVehiculo.toLowerCase()))[0].Pestana
    } else {
      this.reclutas = this.reclutasFull.filter(ruta => ruta.Pestana == 1)
    }
  }


  toggleLiveAgregar() {
    this.rutValido = true
    this.form.reset()
    this.form.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Region: "1",
      Operacion_postula : this.listaOperacion[0].Id+"",
      Tipo_vehiculo : "1",
      Origen_contacto : "1",
      Inicio_actividades_factura: true,
      Giro: "1"
    })
    this.isErrorView = false
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
    Id_reclutamiento : this.builder.control("" ),
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    Region: this.builder.control("" ),
    Comuna: this.builder.control("1" ),
    Operacion_postula : this.builder.control("" ),
    Nombre_contacto : this.builder.control("" , [Validators.required]),
    Telefono : this.builder.control("",[Validators.pattern(/^\+?\d{7,15}$/)]),
    Tipo_vehiculo : this.builder.control("" ),
    Origen_contacto : this.builder.control(""),
    Estado_contacto : this.builder.control("" ),
    Motivo_subestado : this.builder.control("" ),
    Contacto_ejecutivo : this.builder.control("" ),
    Razon_social : this.builder.control("" ),
    Rut_empresa : this.builder.control("" ),
    Internalizado : this.builder.control("" ),
    Latitud: this.builder.control("" ),
    Longitud: this.builder.control("" ),
    Capacidad: this.builder.control("" ),
    Pais: this.builder.control("" ),
    Correo: this.builder.control("",[ Validators.email] ),
    Ppu: this.builder.control("",[Validators.maxLength(6)]),
    Metros_cubicos: this.builder.control("",[Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    Cant_vehiculos: this.builder.control("" ),
    Inicio_actividades_factura: this.builder.control(true),
    Giro: this.builder.control("1")
  })

  time!: Date;

  cantNuevos : number = 0
  cantProces : number = 0
  cantRechazado: number = 0
  cantParaIngreso : number = 0
  cantIngresado : number = 0
  






  ngOnInit() : void {
    this.getLocation()
    this.time = new Date()
    interval(1000)
      .pipe(
        map(() => new Date())
      )
      .subscribe(time => {
        
        this.time = time;
      });

    this.service.getSeleccionesReclutamiento().subscribe((data) => {

      this.listaComunas = data.Comuna
      this.listaComunasFull = data.Comuna
      this.listaRegiones = data.Region
      this.listaOperacion = data.Operacion
      this.listaOrigen = data.Origen
      this.listaTipoVehiculo = data.Tipo_vehiculo
      this.listaContactoEjecutivo = data.Contacto_ejecutivo
      this.listaMotivo = data.Motivo_subestado
      this.listaEstadoContacto = data.Estado_contacto
      this.options = data.Comentarios



      this.form.patchValue({
        Id_user : sessionStorage.getItem("id")?.toString()+"",
        Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
        Region: "1",
        Operacion_postula : data.Operacion[0].Id+"",
        Tipo_vehiculo : "1",
        Origen_contacto : "1",
        Inicio_actividades_factura: true,
        Giro: "1",
        Comuna : "1"
      })

      this.service.getDatosReclutas().subscribe((data) => {
        this.reclutas = data
        this.reclutasFull = data

        this.reclutas = this.reclutasFull.filter(ruta => ruta.Pestana == 1)
        this.cantNuevos = this.reclutasFull.filter(ruta => ruta.Pestana == 1).length
        this.cantProces = this.reclutasFull.filter(ruta => ruta.Pestana == 2).length
        this.cantRechazado = this.reclutasFull.filter(ruta => ruta.Pestana == 3).length
        this.cantParaIngreso = this.reclutasFull.filter(ruta => ruta.Pestana == 4).length
        this.cantIngresado = this.reclutasFull.filter(ruta => ruta.Pestana == 5).length

        this.listaPatentes = this.reclutasFull.map(ruta => ruta.Ppu).filter((value, index, self) => self.indexOf(value) === index)
        console.log(this.listaPatentes)
      })



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

    if(this.form.value.Rut_empresa){
      if(rut == 'Rut_empresa') this.rutValido = Fn.validaRut(this.form.value.Rut_empresa?.trim()) ? true : false
    }

    
    

  }


//   filtrarTabla(campo: string) {
//     const idRuta = this.textoIdRuta.toLowerCase();
//     const patente = this.textoPatente.toLowerCase();
//     const conductor = this.textoConductor.toLowerCase();

//     const resultado: any[] = [];
//     const maxResults = 100; // Ejemplo: limitar los resultados a los primeros 100

//     for (let i = 0; i < this.ListaPrefacturaFull.length; i++) {
//         const lista = this.ListaPrefacturaFull[i];
//         if (
//             lista.Id_de_ruta.toString().toLowerCase().startsWith(idRuta) &&
//             lista.Patente.toString().toLowerCase().startsWith(patente) &&
//             lista.Conductor.toString().toLowerCase().startsWith(conductor)
//         ) {
//             resultado.push(lista);
//             if (resultado.length >= maxResults) {
//                 break; // Terminar el bucle si se alcanza el máximo de resultados
//             }
//         }
//     }

//     this.ListaPrefactura = resultado;
//     // console.log(this.ListaPrefactura);
// }

  buscarComunas(event: any){
    const selectedRegionId = event.target.value;
    this.listaComunas = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )
    this.form.patchValue({
      Comuna : this.listaComunas[0].Id_comuna
    }
    )

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

  regionSeleccionada : number = 0

  registrarCandidato(){
    this.form.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Latitud : this.latStr,
      Longitud : this.longStr
    })

    this.verificaRut('Rut_empresa')



    this.isErrorView = false

    if(this.form.valid && (this.form.value.Correo !== null || this.form.value.Telefono !== null)){
      this.service.registrarCandidiato(this.form.value).subscribe((data : any) => {
        alert(data.message)
        this.service.getDatosReclutas().subscribe((data) => {
          this.reclutas = data
          this.reclutasFull = data
          this.reclutas = this.reclutasFull.filter(ruta => ruta.Pestana == 1)
          this.cantNuevos = this.reclutasFull.filter(ruta => ruta.Pestana == 1).length
          this.cantProces = this.reclutasFull.filter(ruta => ruta.Pestana == 2).length
          this.cantRechazado = this.reclutasFull.filter(ruta => ruta.Pestana == 3).length
          this.cantParaIngreso = this.reclutasFull.filter(ruta => ruta.Pestana == 4).length
          this.cantIngresado = this.reclutasFull.filter(ruta => ruta.Pestana == 5).length
          this.toggleLiveAgregar()
        })
        
      }, error => {

        if(error.status == 422){


          error.error.detail.map((err : any) => {
            alert( 'Error con el campo '+err.loc[1] + ': '+ err.msg)

          })

          // console.log(error.error.detail.length)
          // alert( 'Error con el campo '+error.error.detail[0].loc[1] + ': '+ error.error.detail[0].msg)
        } else {
          alert(error.error.detail)
        }
        
       
      }
    
    )
      

    }else{
      this.isErrorView = true
      alert("Hay datos incorrectos")
    }
  }

  verDatosReclutas(recluta : Reclutamiento){
    this.toggleLiveDemo()
    this.form.patchValue({
      Id_reclutamiento : recluta.Id_reclutamiento + '',
      Region : recluta.Region+"",
      Operacion_postula: recluta.Operacion_postula,
      Nombre_contacto : recluta.Nombre,
      Telefono:recluta.Telefono,
      Tipo_vehiculo: recluta.Tipo_vehiculo+"",
      Origen_contacto: recluta.Origen_contacto+"",
      Estado_contacto : recluta.Estado_contacto+"",
      Motivo_subestado : recluta.Motivo_subestado+"",
      Contacto_ejecutivo : recluta.Contacto_ejecutivo,
      Razon_social : recluta.Razon_social,
      Rut_empresa : recluta.Rut_empresa,
      Pais: recluta.Pais+"",
      Inicio_actividades_factura : recluta.Inicio_actividades_factura,
      Giro : recluta.Giro +'',
      Cant_vehiculos : recluta.Cantidad_vehiculo+'',
      Correo : recluta.Correo,
      Ppu : recluta.Ppu,
      Metros_cubicos: recluta.Metros_cubicos+'',
      Comuna: recluta.Comuna+'',
      Capacidad :recluta.Capacidad+''
    })
    
  }

  actualizarDatosRecluta(){
    this.form.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Latitud : this.latStr,
      Longitud : this.longStr
    })

    this.verificaRut('Rut_empresa')


    this.isErrorView = false

    if(this.form.valid){
      this.service.actualizarCandidiato(this.form.value).subscribe((data : any) => {
        alert(data.message)
        this.service.getDatosReclutas().subscribe((data) => {
          this.reclutas = data
          this.reclutasFull = data
          this.reclutas = this.reclutasFull.filter(ruta => ruta.Pestana == 1)

          this.cantNuevos = this.reclutasFull.filter(ruta => ruta.Pestana == 1).length
          this.cantProces = this.reclutasFull.filter(ruta => ruta.Pestana == 2).length
          this.cantRechazado = this.reclutasFull.filter(ruta => ruta.Pestana == 3).length
          this.cantParaIngreso = this.reclutasFull.filter(ruta => ruta.Pestana == 4).length
          this.cantIngresado = this.reclutasFull.filter(ruta => ruta.Pestana == 5).length

          
          this.toggleLiveDemo()
        })
      }, error => {
        if(error.status == 422){


          error.error.detail.map((err : any) => {
            alert( 'Error con el campo '+err.loc[1] + ': '+ err.msg)

          })

          // console.log(error.error.detail.length)
          // alert( 'Error con el campo '+error.error.detail[0].loc[1] + ': '+ error.error.detail[0].msg)
        } else {
          alert(error.error.detail)
        }
      }
    
    )

    }else{
      this.isErrorView = true
      alert("Hay datos incorrectos")
    }
 
  }




/////

modalidadOperacion : RazonSocial []= []
modalidadOperacionFull : RazonSocial []= []

visibleCO : boolean = false
IdVehiculo : number = 0
Patente : string = ''

checkOperacion : AsignarOperacion [] = []


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




// options = [
//   { value: 'grata', label: 'Grata', icon: 'fa-solid fa-face-smile', color: '#28b463' },
//   { value: 'neutral', label: 'Neutral', icon: 'fa-solid fa-face-meh-blank', color: '#eb984e' },
//   { value: 'ingrata', label: 'Ingrata', icon: 'fa-solid fa-face-frown', color: '#cd6155' }
// ];

showOptions = false;
selectedOption = {
  "Id": 1,
  "Calificacion": "Grata",
  "Icono": "fa-solid fa-face-smile",
  "Color": "#28b463 ",
  "Latitud": "",
  "Longitud": "",
  "Comentario": "",
  "Id_recluta":   "",
  "Id_user":    "",
  "Ids_user":   ""
};



toggleSelect() {
  this.showOptions = !this.showOptions;
}

selectOption(option: any) {

  this.selectedOption.Id = option.Id;
  this.selectedOption.Calificacion = option.Calificacion;
  this.selectedOption.Color = option.Color;
  this.showOptions = false;
}

comentario : string = ''

guardarComentarios(){
this.selectedOption.Comentario = this.comentario

this.service.registrarComentario(this.selectedOption).subscribe((data : any) => {
    alert(data.message)
    this.toggleLiveComentarios()
}, error => {
  alert(error.error.detail)
})

}


ejecutivoSeleccionada : any 

filtrarEjecutivo(){

  if( this.ejecutivoSeleccionada == 'Seleccione Ejecutivo') return alert("Seleccione un ejectutivo por favor")
  if( this.ejecutivoSeleccionada == 'Todas'){
  
    this.reclutas = this.reclutasFull
  }else {

    this.reclutas = this.reclutasFull.filter(ruta => ruta.Nombre_contacto == this.ejecutivoSeleccionada)

  }
  
}


pestana : number = 1

filtroPestana(pestana : number){
  

  this.pestana = pestana
  if( this.ejecutivoSeleccionada == 'Seleccione Ejecutivo') return alert("Seleccione un ejectutivo por favor")
  if(this.ejecutivoSeleccionada == 'Todas' || this.ejecutivoSeleccionada == undefined){
    this.reclutas = this.reclutasFull.filter(ruta => ruta.Pestana == pestana)
  } else {
    
    
    this.reclutas = this.reclutasFull.filter(ruta => ruta.Pestana == pestana && ruta.Nombre_contacto == this.ejecutivoSeleccionada)

  }
  
}



  DescargarListaReclutamiento() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Lista Descuentos');
  
    // Encabezados de la tabla
    worksheet.columns = [
      { header: 'Región', key: 'region', width: 15 },
      { header: 'Patente', key: 'ppu', width: 20 },
      { header: 'Operación postula', key: 'operacion', width: 15 },
      { header: 'Nombre contacto', key: 'nombreContacto', width: 20 },
      { header: 'Teléfono', key: 'telefono', width: 10 },
      { header: 'Origen Contacto', key: 'origenContacto', width: 20 },
      { header: 'Estado contacto', key: 'estadoContacto', width: 10 },
      { header: 'Motivo', key: 'motivo', width: 15 },
      { header: 'Fecha creación', key: 'fechaCreacion', width: 15 },
      { header: 'Contacto ejecutivo', key: 'contactoEjecutivo', width: 15 },
    ];
  
    // Agregar filas con datos
    this.reclutas.forEach((desc) => {
      worksheet.addRow({
        region: desc.Region,
        ppu: desc.Ppu,
        operacion: desc.Operacion_nombre,
        nombreContacto: desc.Nombre,
        telefono: desc.Telefono,
        origenContacto: desc.Nombre_origen,
        estadoContacto: desc.Nombre_estados,
        motivo: desc.Nombre_motivo,
        fechaCreacion: desc.Fecha_creacion,
        contactoEjecutivo: desc.Nombre_contacto
      });
    });

  
  // Aplicar estilos condicionales
  // worksheet.eachRow((row, rowNumber) => {
  //   if (rowNumber === 1) {
  //     // Estilo para encabezados
  //     row.eachCell((cell) => {
  //       cell.font = { bold: true, color: { argb: 'FFFFFF' } };
  //       cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '007bff' } };
  //       cell.alignment = { horizontal: 'center', vertical: 'middle' };
  //     });
  //   } else {
  //     // Estilo para filas con descripción
  //     const descripcionCell = row.getCell(11); // Columna "Descripción"
  //     if (descripcionCell.value) {
  //       row.eachCell((cell) => {
  //         cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF380' } }; // Fondo amarillo
  //         cell.font = { color: { argb: '000000' } }; // Texto NEGRO
  //       });
  //     }

  //     // Estilo para toda la fila si la columna "Cobrada" es "Sí"
  //     const cobradaCell = row.getCell(12); // Columna "Cobrada"
  //     if (cobradaCell.value === 'Sí') {
  //       row.eachCell((cell) => {
  //         cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'AEF359' } }; // Fondo verde
  //         cell.font = { color: { argb: '000000' } }; // Texto negro
  //       });
  //     }
      
  //     // Estilo para toda la fila si la columna "Cobrada" es "Sí"
  //     const AplicaCell = row.getCell(15); // Columna "Cobrada"
  //     if (AplicaCell.value === 'No') {
  //       row.eachCell((cell) => {
  //         cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'BC544B' } }; // Fondo Rojo
  //         cell.font = { color: { argb: '000000' } }; // Texto negro
  //       });
  //     }
  //   }
  // });

  // Descargar el archivo Excel
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, `Lista-reclutamiento-${new Date().toISOString().split('T')[0]}.xlsx`);
  });

  
    // Descargar el archivo Excel
    // workbook.xlsx.writeBuffer().then((data) => {
    //   const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //   FileSaver.saveAs(blob, `Lista-reclutamiento-${new Date().toISOString().split('T')[0]}.xlsx`);
    // });
  }


 ngOnDestroy(): void {


  }


  

}

