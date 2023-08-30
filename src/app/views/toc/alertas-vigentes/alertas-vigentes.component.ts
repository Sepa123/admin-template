import { Component } from '@angular/core';
import { TocService } from 'src/app/service/toc.service'
import { AlertasVigente } from 'src/app/models/alertasVigentes.interface';
import { UsuarioTOC } from 'src/app/models/usuariosTOC.interface'


@Component({
  selector: 'app-alertas-vigentes',
  templateUrl: './alertas-vigentes.component.html',
  styleUrls: ['./alertas-vigentes.component.scss']
})
export class AlertasVigentesComponent {
  chart: any;

  regex = /\*/;

  alertasVigentes : AlertasVigente [] = []

  usuariosTOC : UsuarioTOC [] = []

  nombreUsuario : any [] = []

  cantidad_bitacora : number [] = []

  observacionActual : string | null = ""

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


  constructor( private service : TocService){

  }

  verObservacion(obs : string | null){
    if(obs === null || obs === ""){
      this.observacionActual = "Sin observación"
    }else{
      this.observacionActual = obs
    }
    this.toggleLiveDemo()
  }

  updateData() : void{
   
  }

  ngOnInit(){
    
    this.service.buscar_alertas_vigentes().subscribe((data) => {
      this.alertasVigentes = data
      this.alertasVigentes.map(alertas => {
        if (alertas.Direccion == null) {
          alertas.Direccion = 'sin direccion*'
        }
        //  :  alertas.Direccion = alertas.Direccion
      })
    })
  }
}
