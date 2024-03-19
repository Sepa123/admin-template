import { Component } from '@angular/core';
import { RutasService } from 'src/app/service/rutas.service';
import { seguimientoRuta } from 'src/app/models/TOC/seguimientoRuta.interface'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seguimiento-ruta',
  templateUrl: './seguimiento-ruta.component.html',
  styleUrls: ['./seguimiento-ruta.component.scss']
})
export class SeguimientoRutaComponent {

  constructor( private service : RutasService){

  }

  subSegRuta! : Subscription

  listaPatentes : string [] = []

  clienteSeleccionado : string = ""

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

  patenteSeleccionada :string = 'Seleccione una Patente'

  segRuta : seguimientoRuta [] = []
  segRutaFull : seguimientoRuta [] = []
 
  obsPedidos : string [] = []
  ngOnInit(){

    this.service.get_seguimiento_ruta().subscribe((data) => {
      this.segRuta = data
      this.segRutaFull = data
      this.segRuta.map((ruta) => {
        if(ruta.Obs_total_pedidos){
          ruta.obs = ruta.Obs_total_pedidos?.split("@")
          this.listaPatentes.push(ruta.Ppu)
        } else {
          ruta.obs = []
          this.listaPatentes.push(ruta.Ppu)
        }

        
      })

      this.listaPatentes = [...new Set(this.listaPatentes)];

      
    })

    this.subSeguimiento()
  }

  filtrarPantente(){
    console.log(this.patenteSeleccionada )
    if( this.patenteSeleccionada == 'Seleccione una Patente') return alert("Seleccione una patente por favor")
    if( this.patenteSeleccionada == 'Todas'){
      console.log("sos")
      this.segRuta = this.segRutaFull
    }else {
      this.segRuta = this.segRutaFull.filter(ruta => ruta.Ppu == this.patenteSeleccionada)
    }
    
  }

  subSeguimiento(){
    this.subSegRuta = this.service.update_seguimiento_ruta().subscribe((data) => {

      this.segRutaFull = data

      if( this.patenteSeleccionada == 'Todas' ||  this.patenteSeleccionada == 'Seleccione una Patente'  ||  this.patenteSeleccionada == ''){
        console.log("sos")
        this.segRuta = this.segRutaFull
      }else {
        this.segRuta = this.segRutaFull.filter(ruta => ruta.Ppu == this.patenteSeleccionada)
      }
    })
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.subSegRuta.unsubscribe();
  }


  verObservacion(listaPedidos : string [], cliente : string){

    this.clienteSeleccionado = cliente

    this.obsPedidos = listaPedidos

    this.toggleLiveDemo()
  }


}
