import { Component, OnInit } from '@angular/core';
import { TIService } from "src/app/service/ti.service";
import { ReporteHora } from 'src/app/models/reporteHora.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hoy',
  templateUrl: './hoy.component.html',
  styleUrls: ['./hoy.component.scss']
})
export class HoyComponent implements OnInit {

  // subscription!: Subscription;
  isLoadingTable!: boolean
  total!: ReporteHora[]
  Hora!: ReporteHora[];
  subReporteHora!: Subscription;
  ordenCompra!: number []

  constructor(private service : TIService) { 
    this.isLoadingTable = true
  }
  
  ngOnInit(): void{ 
    this.subReporteHora = this.service.get_reporte_hora().subscribe((data) => {
      this.total = [data.shift()]
      this.Hora = data
      this.isLoadingTable = false

      this.ordenCompra = this.total.map(reporte => (reporte.Electrolux + reporte.Sportex + reporte.Easy_CD + reporte.Easy_OPL))

    }) 
  }
  // limites electrolux:200 
  // limites Sportex 150 
  // limites Easy

  // 85% Cuadro amarillo, 100% rojo
  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.subReporteHora.unsubscribe()
  }

}
