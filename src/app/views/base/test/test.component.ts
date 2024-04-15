import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { TIService } from "src/app/service/ti.service";
import { NSEasy , NSPendientesEasyPorRegion} from 'src/app/models/nivel_servicio/nsEasy.interface'
import { Clipboard } from '@angular/cdk/clipboard';
import {NsPanelPrincipalEasy , NsPanelRegionEasy} from 'src/app/models/nivel_servicio/nsPanel.interface'
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          return value + '%'
        },
      },
    },
  };

  public pieChartType: ChartType = 'doughnut';

  public pieChartData: ChartData<'doughnut', number[], string | string[]> = {
    labels: ["nada","nada2","nad3a"],
    datasets: [
      {
        data: [1,3,3,24234],
      },
    ],
  };

  constructor(private service: TIService,) { }

  nsEasy : NSEasy [] = []
  nsEasyRegion : NSPendientesEasyPorRegion [][] = []

  nsPanelPrincipal : NsPanelPrincipalEasy [] = [] 

  nsPanelRegion : NsPanelRegionEasy [] = []

  eliminarDuplicados(registros: NSPendientesEasyPorRegion[]): NSPendientesEasyPorRegion[] {
    const claveUnica = new Set<string>();
    const registrosUnicos: NSPendientesEasyPorRegion[] = [];

    registros.forEach((registro) => {
        const clave = `${registro.Region}-${registro.Comuna}-${registro.Pendiente}`;
        if (!claveUnica.has(clave)) {
            claveUnica.add(clave);
            registrosUnicos.push(registro);
        }
    });

    return registrosUnicos;
}
  
  revela: boolean = false
 
  ngOnInit(){

    Chart.register(ChartDataLabels);
    
    this.service.get_ns_easy().subscribe((data) => {
      this.nsEasy = data
      const regiones = data.map((ns) => {
        return {
          "Region": ns.Region,
          "Comuna": ns.Ciudad,
          "Pendiente" : this.nsEasy.filter((easy => easy.Ciudad == ns.Ciudad)).length,
        }
      })

      console.log("regiones por mero")
      
      const cantidadPendientes = this.eliminarDuplicados(regiones)

      const listaRegiones = [...new Set(cantidadPendientes.map((inventario) => inventario.Region))]
      // arr inventarios
      let array = []
      listaRegiones.map(region => {
        array = cantidadPendientes.filter( inventario => inventario.Region == region)
        this.nsEasyRegion.push(array)
      })
    })


    setTimeout(() => {
      this.service.get_ns_pendiente_easy_panel().subscribe((data) => {
        this.nsPanelPrincipal = [data]
  
        const label = ['No Entregados','Entregados']
        const dataset = [ data.Porcentaje_no_entrega, data.Porcentaje_entrega]
  
        this.pieChartData.labels = label
        this.pieChartData.datasets[0].data = dataset
        
  
        this.service.get_ns_pendiente_easy_panel_region().subscribe((data) => {
          this.nsPanelRegion = data
          this.revela = true
      })
  
      })
      
    }, 2000);

    

    
  }
  
  descargar_ns_easy(){
    this.service.descargar_ns_drivers_easy(this.nsEasy)
}

 ngOnDestroy(): void {

  }

}