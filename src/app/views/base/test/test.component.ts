import { Component, OnInit } from '@angular/core';
import { PedidoService } from  'src/app/service/pedido.service'
import { PedidoSinCompromiso } from 'src/app/models/pedidoSinCompromiso.interface';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { TIService } from 'src/app/service/ti.service';
import { NsVerificado } from 'src/app/models/nsVerificado.interface'
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  public colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  isLoadingTable: boolean = true;

  constructor(private service:TIService, private rutaService : RutasService) { }

  subPedido! :Subscription

  body : any = {

  }

  nsVerificados : NsVerificado [] = []

  fechaNs : string = ""


  loadPedidos : boolean = true


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



  ngOnInit():void {


  }

 ngOnDestroy(): void {

  }

}