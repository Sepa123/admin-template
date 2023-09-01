import { Component } from '@angular/core';
import { TocService } from 'src/app/service/toc.service'
import { AlertasVigente } from 'src/app/models/alertasVigentes.interface';
import { UsuarioTOC } from 'src/app/models/usuariosTOC.interface'
import { TocTracking } from 'src/app/models/tocTracking.interface'

@Component({
  selector: 'app-alertas-vigentes',
  templateUrl: './alertas-vigentes.component.html',
  styleUrls: ['./alertas-vigentes.component.scss']
})
export class AlertasVigentesComponent {
  chart: any;

  regex = /\*/;

  codigoPick : string = ""

  buscaAlerta : boolean = false

  alertasVigentes : AlertasVigente [] = []

  usuariosTOC : UsuarioTOC [] = []

  nombreUsuario : any [] = []

  cantidad_bitacora : number [] = []

  observacionActual : string | null = ""

  arrayTOCTracking : TocTracking [] = []

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

  buscarAlerta(codigo : string){

    this.service.toc_tracking(codigo).subscribe(data => {
      this.arrayTOCTracking = data
      this.arrayTOCTracking.map(toc => {
        if (toc.Direccion == null || toc.Direccion == '') {
          toc.Direccion = 'Sin dirección*'
        }
        if (toc.Fecha_compromiso == null || toc.Fecha_compromiso == '') {
          toc.Fecha_compromiso = 'Sin Fecha Compromiso*'
        }
        if (toc.Comuna == null || toc.Comuna == '') {
          toc.Comuna = 'Sin Comuna*'
        }
      })
      this.buscaAlerta = true
  }, error => {

  })
  }

  ngOnInit(){
    
    this.service.buscar_alertas_vigentes().subscribe((data) => {
      this.alertasVigentes = data
      this.alertasVigentes.map(alertas => {
        if (alertas.Direccion == null) {
          alertas.Direccion = 'Sin dirección*'
        }
      })
    })

    
  }
}
