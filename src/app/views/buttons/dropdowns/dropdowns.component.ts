import { Component,OnInit } from '@angular/core';
import { TIService } from 'src/app/service/ti.service';
import { PedidoSinCompromiso } from 'src/app/models/pedidoSinCompromiso.interface';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})
export class DropdownsComponent implements OnInit{

  public colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  isLoadingTable: boolean = true;

  constructor(private service:TIService) { }

  pedidos!: PedidoSinCompromiso[]

  private origen = ["Easy CD","Sportex","Electrolux","Easy OPL"]


  ngOnInit():void {
    this.getData()
  }

  getData() {
    this.service.get_pedidos_sin_despacho().subscribe((data) => {
      this.pedidos = data
      this.isLoadingTable = false
    })
  }
  downloadPedidos () {
    this.service.get_pedidos_sin_despacho_descarga()
  }

  sortByName(origen: any) : void{
    this.pedidos.sort((a, b) => {

      const nombreA = a.Origen;
      const nombreB = b.Origen;

      if (nombreA === this.origen[origen]) {
        return -1;
      } else if (nombreB === this.origen[origen]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
} 
