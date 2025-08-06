import { Component,ElementRef ,ViewChild, AfterViewInit} from '@angular/core';
import { RsvService } from 'src/app/service/rsv.service'
import { EstructuraRSV } from 'src/app/models/estructuraRSV.interface';
import { PesoPosicionSucursal } from "src/app/models/pesoPosicionSucursal.interface"
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { TipoEstructura } from 'src/app/models/tipoEstructuraRSV.interface'


@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.component.html',
  styleUrls: ['./mantenedor.component.scss']
})
export class MantenedorComponent {

  estructuraDato : EstructuraRSV [] = []

  listaEstructura : EstructuraRSV [] = []
  estructuraSeleccion : string = ""
  sucursalSeleccion : string = ""
  sucursalesRSV : SucursalRSV [] = []
  listaPesoSucursal : PesoPosicionSucursal [] = []
  public rol = sessionStorage.getItem("rol_id")

  posicion : string = ""

  chartVisible : boolean = false

  buttonAreasFull : any [] = [
    { x: 110, y: 283, width: 32, height: 32 ,texto: "", pos : '1' },
    { x: 112, y: 328, width: 32, height: 32 ,texto: "", pos : '2'},
    { x: 112, y: 368, width: 32, height: 32 ,texto: "", pos : '3' },
    { x: 112, y: 408, width: 32, height: 32 ,texto: "", pos : '4'},

    { x: 260, y: 283, width: 32, height: 32 ,texto: "", pos : '5'},
    { x: 260, y: 328, width: 32, height: 32 ,texto: "", pos : '6'},
    { x: 260, y: 368, width: 32, height: 32 ,texto: "", pos : '7'},
    { x: 260, y: 408, width: 32, height: 32 ,texto: "", pos : '8'},

    { x: 43, y: 146, width: 32, height: 32 ,texto: "", pos : '9'},
    { x: 43, y: 114, width: 32, height: 32 ,texto: "", pos : '10'},
    { x: 43, y: 82, width: 32, height: 32 ,texto: "", pos : '11'},
    { x: 43, y: 50, width: 32, height: 32 ,texto: "", pos : '12'},
    { x: 43, y: 18, width: 32, height: 32 ,texto: "", pos : '19'},

    { x: 333, y: 146, width: 32, height: 32 ,texto: "", pos : '13'},
    { x: 333, y: 114, width: 32, height: 32 ,texto: "", pos : '14'},
    { x: 333, y: 82,  width: 32, height: 32 ,texto: "", pos : '15'},
    { x: 333, y: 50,  width: 32, height: 32 ,texto: "", pos : '16'},
    { x: 333, y: 18,  width: 32, height: 32 ,texto: "", pos : '18'},
    
    { x: 182, y: 194, width: 32, height: 32 ,texto: "", pos : '17'},
    
    // Área del primer botón (x, y, ancho, alto
    // Agrega más áreas de botón si es necesario
  ];

  isForm : boolean = false
  
   buttonAreas  = this.buttonAreasFull

  tiposEstructuras : TipoEstructura [] =[]

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

  isErrorView : boolean = false

  form = this.builder.group({
    Nombre : this.builder.control("" , [Validators.required]),
    Sucursal : this.builder.control(1,[Validators.required]),
    Tipo : this.builder.control("", [Validators.required]),
    Cant_espacios : this.builder.control(0),
    Balanceo : this.builder.control(""),
    Balanceo_derecha : this.builder.control(""),
    Balanceo_izquierda : this.builder.control(""),
    Frontis : this.builder.control(""),
    // Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    // Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),

  })

  registrarEstructura(){
    const est = this.form.value
    let balance = null
    if(est.Balanceo_derecha == "" || est.Balanceo_izquierda == ""){
      balance = null
    }else{
      balance = est.Balanceo_derecha+ " - "+est.Balanceo_izquierda
    }
    
    const tipo = this.tiposEstructuras.filter(est => est.Tipo === this.form.value.Tipo)[0].Id

    this.form.patchValue({
      Balanceo : balance,
      Tipo  : tipo.toString()
    })

    if(this.form.valid){
      this.service.update_datos_estructura(this.form.value).subscribe((data : any) => {
        console.log(data)
        alert(data.message)
      })
    }
    // alert(`cantidad frontis : ${est.Frontis?.split(" ").length},
    //        cantidad bal izquierda : ${est.Balanceo_izquierda?.split(" ").length},
    //        cantidad bal izquierda : ${est.Balanceo_derecha?.split(" ").length}`)
    // // if(this.form.value.Cant_espacios)
    
  }

  ngOnInit(){
    
    this.service.get_lista_estructura().subscribe(data => {
      this.listaEstructura = data
      this.listaEstructura.map(lista=> {
        if(lista.Balanceo == null) return lista.Arr_balancelo = ['','']
        return lista.Arr_balancelo = lista.Balanceo?.split(' - ')
      })

    })

    this.service.get_tipo_estructura().subscribe((data) => {
      this.tiposEstructuras = data
    })

    setTimeout(() => {
      this.service.get_sucursales().subscribe((data) => {
        this.sucursalesRSV = data
        if(this.rol !== '5'){
          this.sucursalesRSV = this.sucursalesRSV.filter(sucursal => sucursal.Id !== 2)
        }
      })
    },500)

  }

  seleccionarEsctuctura(){
    
    const estructura = this.listaEstructura.filter(lista => lista.Nombre === this.form.value.Nombre)[0]

    this.form.patchValue({
      Sucursal : estructura.Sucursal,
      Tipo : estructura.Tipo,
      Cant_espacios: estructura.Cantidad_espacios,
      Frontis : estructura.Frontis,
      Balanceo_derecha : estructura.Arr_balancelo[0],
      Balanceo_izquierda : estructura.Arr_balancelo[1]
    })
  }

  
  constructor(private service : RsvService, public builder: FormBuilder,) {}

}
