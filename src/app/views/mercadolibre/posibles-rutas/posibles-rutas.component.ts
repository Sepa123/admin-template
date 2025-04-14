import { Component } from '@angular/core';
import { MeliService } from '../../../service/meli.service';
import { PosiblesRutas, Usuario } from '../../../models/meli/rutas.interface';

@Component({
  selector: 'app-posibles-rutas',
  templateUrl: './posibles-rutas.component.html',
  styleUrls: ['./posibles-rutas.component.scss']
})
export class PosiblesRutasComponent {


  constructor(private meliService: MeliService) { }

  ngOnInit(): void {    
        this.obtenerFechas()
  }

  listaPosiblesRutas : PosiblesRutas[] = [] 

  fecha_ini : string = ""
  fecha_fin : string = ""

  isLoading : boolean = false

  currentDate : string = ''
  minDate : string = ''
  maxDate : string = ''

  rol =   sessionStorage.getItem("rol_id")+''

  roles_no_permitidos = ['81','80','91']


  obtenerFechas(){
    let hoy = new Date();

    let año = hoy.getFullYear();
    let mes = ("0" + (hoy.getMonth() + 1)).slice(-2); // Los meses comienzan en 0
    let día = ("0" + hoy.getDate()).slice(-2);

    this.currentDate = `${año}-${mes}-${día}`;

    hoy.setDate(hoy.getDate() - 4);

    let minAño = hoy.getFullYear();
    let minMes = ("0" + (hoy.getMonth() + 1)).slice(-2); // Los meses comienzan en 0
    let MinDía = ("0" + hoy.getDate()).slice(-2);
    this.minDate = `${minAño}-${minMes}-${MinDía}`;
  }

  getPosiblesRutas(){
    this.listaPosiblesRutas = []
    this.isLoading  = true
    this.meliService.getPosiblesRutas(this.fecha_ini,this.fecha_fin).subscribe(data=>{
      console.log(data)
      this.listaPosiblesRutas = data
      this.isLoading  = false
    }, err => {
      alert("Error al obtener las rutas")
      this.isLoading = false
      
    } )

  }



  /// Modal

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  listaUsuarios : Usuario[] = []

  mostrarUsuarios(usuario: Usuario[]){
    this.listaUsuarios = usuario
    this.toggleLiveDemo()
    
  }

}




