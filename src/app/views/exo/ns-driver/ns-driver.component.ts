import { Component } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { TipoEstructura } from 'src/app/models/tipoEstructuraRSV.interface'
import { TIService } from 'src/app/service/ti.service';
import { MainNsDriver } from 'src/app/models/nivel_servicio/nsDrivers.interface'

@Component({
  selector: 'app-ns-driver',
  templateUrl: './ns-driver.component.html',
  styleUrls: ['./ns-driver.component.scss']
})
export class NsDriverComponent {

  chartVisible : boolean = false
  currentPage : number = 0;
  bloqBotonNext : boolean = false
  bloqBotonPrev : boolean = false

  fecha_inicio : string = ''
  fecha_fin : string = ''


  public pieChartOptions: ChartConfiguration['options'] = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      y: {
        // max : 10,
        // min: 4, 
        beginAtZero: true,
        stacked: true, // Apilar barras verticalmente
      },
    },
    plugins: {
      datalabels : {
        anchor: 'end',
        align: 'start', 
        offset : -48,
        clamp : false,
        formatter: function(context,chartObj : any) {
          // console.log(chartObj.chart['$datalabels']['_datasets'][0]['dataset']['data'][chartObj.dataIndex])
          // console.log(chartObj.chart['$datalabels']['_datasets'])

          const dataset1 = chartObj.chart.data.datasets[0].data[chartObj.dataIndex ];
          const dataset2 = chartObj.chart.data.datasets[1].data[chartObj.dataIndex ];
          const porcentaje = (dataset2 * 100) / dataset1
          
          return porcentaje.toFixed(2) + '%'
        },
      },
      legend: {
        display: true,
        position: 'top'
      },
    },
    

  };

  

  public pieChartData: ChartData<'bar', number[], string | string[]> = {
    labels: ["nada"],
    datasets: [
      {
        label:"Total Pedidos",
        data: [1],
        datalabels: {
          display: true,
        },
      },
      {
        label:"Entregados",
        data: [1],
        datalabels: {
          display: false,
        },
      }
    ],
  };

  public pieChartType: ChartType = 'bar';

  datosDrivers! : MainNsDriver

  constructor(private service : TIService){

  }

  

  buscarNsDrivers(){

    

    this.chartVisible = false

    setTimeout(() => {
      this.service.get_ns_drivers(this.fecha_inicio,this.fecha_fin).subscribe((data) => {

        this.datosDrivers = data
        
        this.pieChartData.labels = data.Patentes.slice(0,10)
        this.pieChartData.datasets[0].data = data.Pedidos.slice(0,10)
        this.pieChartData.datasets[1].data = data.Entregados.slice(0,10)
  
        this.chartVisible = true
        this.currentPage = 0
        this.bloqBotonNext = false

      })
      
    }, 500);
    

    

  }


  ngOnInit(){
    Chart.register(ChartDataLabels);

    // this.service.get_ns_drivers('02-03-2024','12-03-2024').subscribe((data) => {

    //   this.datosDrivers = data
      
    //   this.pieChartData.labels = data.Patentes.slice(0,10)
    //   this.pieChartData.datasets[0].data = data.Pedidos.slice(0,10)
    //   this.pieChartData.datasets[1].data = data.Entregados.slice(0,10)

    //   this.chartVisible = true
    //   this.currentPage = 0
    //   this.bloqBotonNext = false

    // })
    
  }

  updateChart(){
    const itemsPerPage = 10;

    const startIndex = this.currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    

    this.pieChartData.labels = this.datosDrivers.Patentes.slice(startIndex,endIndex)
    this.pieChartData.datasets[0].data = this.datosDrivers.Pedidos.slice(startIndex,endIndex)
    this.pieChartData.datasets[1].data = this.datosDrivers.Entregados.slice(startIndex,endIndex)

    this.chartVisible = true
    
  }

  prevPage() {
    this.chartVisible = false
    setTimeout(() => {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.updateChart();
        this.bloqBotonNext = false
      }
    }, 400);
    
  }

  nextPag(){
    const itemsPerPage = 10;
    this.chartVisible = false

    setTimeout(() => {
      if ((this.currentPage + 1) * itemsPerPage < this.datosDrivers.Datos.length) {
        this.currentPage++;
        this.updateChart();
        if (((((this.currentPage + 1) * itemsPerPage) + itemsPerPage) - this.datosDrivers.Datos.length) >= 10) {

        
          this.bloqBotonNext = true
        }else{
          this.bloqBotonNext = false
        }
      } 
    }, 400);
    
  }


  DescargarNS(){
      this.service.downloadNSDriver(this.fecha_inicio,this.fecha_fin)
  }

 
}
