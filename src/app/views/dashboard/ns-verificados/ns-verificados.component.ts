import { Component, OnInit } from '@angular/core';
import { PedidoService } from  'src/app/service/pedido.service'
import { PedidoSinCompromiso } from 'src/app/models/pedidoSinCompromiso.interface';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { TIService } from 'src/app/service/ti.service';
import { NsVerificado } from 'src/app/models/nsVerificado.interface'

@Component({
  selector: 'app-ns-verificados',
  templateUrl: './ns-verificados.component.html',
  styleUrls: ['./ns-verificados.component.scss']
})
export class NsVerificadosComponent {

  public colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  isLoadingTable: boolean = true;

  constructor(private service:TIService) { }

  nsVerificados : NsVerificado [] = []

  fechaNs : string = ""


  loadPedidos : boolean = true

  buscarNsPorFecha(){
    this.nsVerificados = []
    this.isLoadingTable = true
    const fecharFormateada = this.fechaNs.split('-').join('')
    this.service.get_ns_verificados(fecharFormateada).subscribe(data => {
      this.nsVerificados = data
      this.isLoadingTable = false
    })
  }

  ngOnInit():void {

    const fecha = new Date();
    let fechaFormateada = fecha.toLocaleDateString().split('-').reverse().join('-')
    // let fechaFormateada = fecha.toISOString().split('T')[0];

    console.log(fechaFormateada)
    this.fechaNs = fechaFormateada

    setTimeout(() => {
      this.service.get_ns_verificados(this.fechaNs).subscribe(data => {
      
      this.nsVerificados = data
      this.isLoadingTable = false
    })
    }, 700);

  }

 ngOnDestroy(): void {

  }


}
