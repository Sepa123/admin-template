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
  pedidosFull!: PedidoSinCompromiso[]
  fechaIngresoList!: string[]
  fechaCompromisoList!: any[]

  private origen = ["Easy CD","Sportex","Electrolux","Easy Tienda"]


  ngOnInit():void {
    this.getData()
  }

  getData() {
    this.service.get_pedidos_sin_despacho().subscribe((data) => {
      this.pedidos = data
      this.pedidosFull = data
      this.isLoadingTable = false

      this.fechaIngresoList = [...new Set(this.pedidos.map((pedido) => JSON.stringify(pedido.Fecha_ingreso)
        ).map(str => (JSON.parse(str))))];   

      // this.fechaIngresoList.sort((a: string, b: string) => {
      //   const fechaA: Date = new Date(a);
      //   const fechaB: Date = new Date(b);
      //   return fechaA.getTime() - fechaB.getTime();
      // });
 
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

  filterByFecha() : void {
    var fechaHoy = new Date();
    var año = fechaHoy.getFullYear();
    var mes = fechaHoy.getMonth() + 1; 
    var dia = fechaHoy.getDate();

    // Formato de fecha YYYY-MM-DD
    var fechaHoyString = año + '-' + mes.toString().padStart(2, '0') + '-' + dia.toString().padStart(2, '0');

    this.pedidos = this.pedidos.filter((pedido) => pedido.Fecha_ingreso != fechaHoyString)
  }

  getFullData(){
    this.pedidos = this.pedidosFull
  }
} 
