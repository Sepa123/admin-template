import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { TIService } from "src/app/service/ti.service";
import { NSEasy , NSPendientesEasyPorRegion} from 'src/app/models/nivel_servicio/nsEasy.interface'
import { Clipboard } from '@angular/cdk/clipboard';
import {NsPanelPrincipalEasy , NsPanelRegionEasy, NSPanelNoEntregasEasy} from 'src/app/models/nivel_servicio/nsPanel.interface'
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as d3 from 'd3';
import { AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-ns-easy',
  templateUrl: './ns-easy.component.html',
  styleUrls: ['./ns-easy.component.scss','./ns-easy.component2.scss']
})
export class NsEasyComponent  implements AfterViewInit {

  


// Ejemplo en tu componente TypeScript
isLoadingResumen = true;
isLoadingRegion = true;
isLoadingAvance = true;
isLoadingDetalle = true;

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
  subNsEasy! : Subscription
  subNsEasyRegion! : Subscription

  subNSPanelR! : Subscription
  subNsEasyR! : Subscription
  subNSPanelRegionR! : Subscription

  totalProductos : number = 0


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
    this.drawPieChart();
    Chart.register(ChartDataLabels);
    
    this.subNsEasy = this.service.get_ns_easy().subscribe((data) => {
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
      this.subNSPanel = this.service.get_ns_pendiente_easy_panel().subscribe((data) => {
        this.nsPanelPrincipal = [data]
  
        const label = ['No Entregados','Entregados']
        const dataset = [ data.Porcentaje_no_entrega, data.Porcentaje_entrega]
        
        this.drawPieChart();
        this.pieChartData.labels = label
        this.pieChartData.datasets[0].data = dataset
        
  
        this.subNSPanelRegion = this.service.get_ns_pendiente_easy_panel_region().subscribe((data) => {
          this.nsPanelRegion = data
          this.isLoadingRegion = false;

          this.revela = true

          this.service.get_ns_easy_panel_no_entregados().subscribe((data) => {
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

  this.subNsEasyR = this.service.get_ns_easy_update().subscribe((data) => {
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
  this.subNSPanelR = this.service.get_ns_pendiente_easy_panel_update().subscribe((data) => {

    this.cambio = false
    this.nsPanelPrincipal = [data]

    const label = ['No Entregados','Entregados']
    const dataset = [ data.Porcentaje_no_entrega, data.Porcentaje_entrega]

    this.pieChartData.labels = label
    this.pieChartData.datasets[0].data = dataset
    

    this.cambio = true
    this.subNSPanelRegion = this.service.get_ns_pendiente_easy_panel_region().subscribe((data) => {
      
      this.nsPanelRegion = data
      this.revela = true
      

      this.service.get_ns_easy_panel_no_entregados().subscribe((data) => {
        this.panelNoEntregados = data
      })
  })

  })
},2000)
  
}

ngOnDestroy(): void {

  if(this.subNSPanel) this.subNSPanel.unsubscribe()
  if(this.subNSPanelRegion) this.subNSPanelRegion.unsubscribe()
  if(this.subNsEasy) this.subNsEasy.unsubscribe()

  if(this.subNSPanelR) this.subNSPanelR.unsubscribe()
  if(this.subNSPanelRegionR) this.subNSPanelRegionR.unsubscribe()
  if(this.subNsEasyR) this.subNsEasyR.unsubscribe()
    d3.select('#d3PieChart').selectAll('*').remove();
  }
  
  ngAfterViewInit() {
    // Llama aquí para dibujar el gráfico después de que la vista esté lista
    this.drawPieChart();
  }
  private d3PieSvg: any;

  drawPieChart() {
    // Ejemplo de datos (puedes usar tus propios datos)
    const data = [
      { name: 'No Entregados', value: this.nsPanelPrincipal[0]?.Porcentaje_no_entrega ?? 0 },
      { name: 'Entregados', value: this.nsPanelPrincipal[0]?.Porcentaje_entrega ?? 0 },
      { name: 'Pendientes en ruta', value: this.nsPanelPrincipal[0]?.Porcentaje_pend_en_ruta ?? 0 }
    ];

    // Limpia el gráfico anterior si existe
    d3.select('#d3PieChart').selectAll('*').remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(['#e74c3c', '#2ecc71', '#f0f0f0']);

    const arc = d3.arc()
      .innerRadius(radius * 0.6) // <-- Cambia de 0 a 0.6 para hacer la dona
      .outerRadius(radius - 10);

    const pie = d3.pie<any>()
      .value(d => d.value)
      .sort(null);

    const svg = d3.select('#d3PieChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'd3-tooltip')
    .style('position', 'absolute')
    .style('background', '#fff')
    .style('border', '1px solid #ccc')
    .style('padding', '6px 12px')
    .style('border-radius', '4px')
    .style('pointer-events', 'none')
    .style('font-size', '1em')
    .style('color', '#333')
    .style('box-shadow', '0 2px 8px rgba(0,0,0,0.1)')
    .style('opacity', 0);

    svg
      .selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc as any)
      .attr('fill', (d) => color(d.data.name) as string)
      .attr('stroke', '#fff')
      .attr('stroke-width', '2px')
      .on('mousemove', function (event, d) {
        tooltip
          .style('opacity', 1)
          .html(` ${d.data.value}%`)
          .style('left', event.pageX + 15 + 'px')
          .style('top', event.pageY - 28 + 'px');
        d3.select(this).attr('opacity', 0.8);
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
        d3.select(this).attr('opacity', 1);
      });

// // Etiquetas
// const labelArc = d3.arc()
//   .innerRadius(radius * 0.7)
//   .outerRadius(radius * 0.7);

// svg.selectAll('text')
//   .data(pie(data))
//   .enter().append('text')
//   .filter(d => d.data.value > 0)
//   .attr('transform', d => `translate(${labelArc.centroid(d as any)})`)
//   .attr('dy', '0.35em')
//   .attr('text-anchor', 'middle')
//   .style('font-size', '1em')
//   .style('fill', '#333')
//   .text(d => `${d.data.value}%`);
// ...código existente...

const entregados = data.find(d => d.name === 'Entregados')?.value ?? 0;

// Añade el texto en el centro de la dona
svg.append('text')
  .attr('text-anchor', 'middle')
  .attr('dy', '0.35em')
  .style('font-size', '2.2em')
  .style('font-weight', 'bold')
  .style('fill', 'black') // mismo color que el segmento de entregados
  .text(`${entregados}%`);
    // --- Leyenda personalizada ---
const legend = d3.select('#d3PieLegend');
legend.selectAll('*').remove(); // Limpia leyenda anterior

const legendItem = legend.selectAll('.legend-item')
  .data(data)
  .enter()
  .append('div')
  .attr('class', 'legend-item')
  .style('display', 'flex')
  .style('align-items', 'center')
  .style('margin', '4px 0');

legendItem.append('span')
  .style('display', 'inline-block')
  .style('width', '16px')
  .style('height', '16px')
  .style('margin-right', '8px')
  .style('background-color', d => color(d.name) as string)
  .style('border-radius', '3px');

legendItem.append('span')
  .text(d => `${d.name}`);
  }


  

  // Si tus datos cambian y quieres actualizar el gráfico:
  ngOnChanges() {
    this.drawPieChart();
  }

}