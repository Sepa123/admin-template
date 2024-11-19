import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import {PedidoCompromisoObligatorio } from 'src/app/models/rutas/pedidoCompromisoObligatorios.interface'
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { ComunasService } from '../../../service/comunas/comunas.service'
import {bancos, formasPago, tipoCuenta, tipoVehiculo,  marcaVehiculo, caracteristicasVehiculo  } from 'src/app/models/enum/bancos.json'
import { Colaborador,DetallePago, Patentes, Usuario } from 'src/app/models/transporte/colaborador.interface' 
import { PanelColaboradore } from 'src/app/models/transporte/paneles.interface' 
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent{

  tipoUsuario : string = "7"
  pedidosObligatorios : PedidoCompromisoObligatorio [] = []
  estadoTransporte : any [] =[]
  estadoActivoMat : boolean = false
  public rol = sessionStorage.getItem("rol_id") 

  public rol_no_permitido = ['71','50']
  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string

  panelColab : PanelColaboradore = {
    "Total": 0,
    "Colaboradores_Activos": 0,
    "Activos_con_Contrato": 0,
    "Activos_sin_Contrato": 0
}

  constructor(private service: PortalTransyanezService,public builder: FormBuilder,private comunaService : ComunasService) { }

  isErrorView : boolean = false

  activate( activo : boolean,tipo_usuario : string){
    this.pv = activo
    this.tipoUsuario = tipo_usuario
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

  /// Modal observación


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
    Activo :  this.builder.control(false ),
  })

  currentDate : string = ''
  
  ngOnInit() : void {


    this.getLocation()
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const day = String(now.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    this.currentDate = formattedDate

  }

  pv : boolean = true


  motivoDesactiva : number = 1
  fechaDesvinculacion : string = ''
  descDesviculacion : string = ''

  listaMotivosD : any [] = []


  registrar(){

    this.form.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Latitud : this.latStr,
      Longitud : this.longStr,
      Modificacion : `Datos de ${this.form.value.Rut} registrado por ${sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""}`,
      Origen : '/transporte/colaboradores'
    })

    this.isErrorView = false

    if(this.form.valid){

    }else{
      this.isErrorView = true
      alert("Hay datos incorrectos")
    }

  }



 ngOnDestroy(): void {


  }



}