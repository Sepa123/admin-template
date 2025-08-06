import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { TIService } from "src/app/service/ti.service";
import { NSEasy , NSPendientesEasyPorRegion} from 'src/app/models/nivel_servicio/nsEasy.interface'
import { Clipboard } from '@angular/cdk/clipboard';
import {NsPanelPrincipalEasy , NsPanelRegionEasy, NSPanelNoEntregasEasy} from 'src/app/models/nivel_servicio/nsPanel.interface'
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-ns-electrolux',
  templateUrl: './ns-electrolux.component.html',
  styleUrls: ['./ns-electrolux.component.scss']
})
export class NsElectroluxComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
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

  cambio : boolean = true
  nsEasy : NSEasy [] = []
  nsEasyRegion : NSPendientesEasyPorRegion [][] = []

  nsPanelPrincipal : NsPanelPrincipalEasy [] = [] 

  nsPanelRegion : NsPanelRegionEasy [] = []
  
  panelNoEntregados : NSPanelNoEntregasEasy [] = []
  subNSPanel! : Subscription
  subNSPanelRegion! : Subscription
  subNsElectrolux! : Subscription
  subNsElectroluxRegion! : Subscription

  subNSPanelR! : Subscription
  subNsElectroluxR! : Subscription
  subNSPanelRegionR! : Subscription

  totalProductos : number = 0

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
    
    this.subNsElectrolux = this.service.get_ns_electrolux().subscribe((data) => {
      this.nsEasy = data

      this.totalProductos = this.nsEasy.length
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
      this.subNSPanel = this.service.get_ns_pendiente_electrolux_panel().subscribe((data) => {
        this.nsPanelPrincipal = [data]
  
        const label = ['No Entregados','Entregados']
        const dataset = [ data.Porcentaje_no_entrega, data.Porcentaje_entrega]
  
        this.pieChartData.labels = label
        this.pieChartData.datasets[0].data = dataset
        
  
        this.subNSPanelRegion = this.service.get_ns_pendiente_electrolux_panel_region().subscribe((data) => {
          this.nsPanelRegion = data
          this.revela = true

          this.service.get_ns_electrolux_panel_no_entregados().subscribe((data) => {
            this.panelNoEntregados = data
          })
      })
  
      })
      
    }, 2000);

    this.ejecutarSubsRefresco();
    

    
  }
  
  descargar_ns_easy(){
    this.service.descargar_ns_drivers_easy(this.nsEasy)
}

ejecutarSubsRefresco(){
  console.log(' cosa se ejecuto')

  this.subNsElectroluxR = this.service.get_ns_electrolux_update().subscribe((data) => {
    this.nsEasy = data
    this.nsEasyRegion = []

    this.totalProductos = this.nsEasy.length
    const regiones = data.map((ns : any) => {
      return {
        "Region": ns.Region,
        "Comuna": ns.Ciudad,
        "Pendiente" : this.nsEasy.filter((easy => easy.Ciudad == ns.Ciudad)).length,
      }
    })
    


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
  this.subNSPanelR = this.service.get_ns_pendiente_electrolux_panel_update().subscribe((data) => {

    this.cambio = false
    this.nsPanelPrincipal = [data]

    const label = ['No Entregados','Entregados']
    const dataset = [ data.Porcentaje_no_entrega, data.Porcentaje_entrega]

    this.pieChartData.labels = label
    this.pieChartData.datasets[0].data = dataset
    

    this.cambio = true
    this.subNSPanelRegion = this.service.get_ns_pendiente_electrolux_panel_region().subscribe((data) => {
      this.nsPanelRegion = data
      this.revela = true

      this.service.get_ns_electrolux_panel_no_entregados().subscribe((data) => {
        this.panelNoEntregados = data
      })
  })

  })
},2000)
  
}

ngOnDestroy(): void {

  if(this.subNSPanel) this.subNSPanel.unsubscribe()
  if(this.subNSPanelRegion) this.subNSPanelRegion.unsubscribe()
  if(this.subNsElectrolux) this.subNsElectrolux.unsubscribe()

  if(this.subNSPanelR) this.subNSPanelR.unsubscribe()
  if(this.subNSPanelRegionR) this.subNSPanelRegionR.unsubscribe()
  if(this.subNsElectroluxR) this.subNsElectroluxR.unsubscribe()

  }

}