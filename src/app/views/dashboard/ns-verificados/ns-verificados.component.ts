import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from  'src/app/service/pedido.service'
import { PedidoSinCompromiso } from 'src/app/models/pedidoSinCompromiso.interface';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { TIService } from 'src/app/service/ti.service';
import { NsVerificado } from 'src/app/models/nsVerificado.interface'
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-ns-verificados',
  templateUrl: './ns-verificados.component.html',
  styleUrls: ['./ns-verificados.component.scss']
})
export class NsVerificadosComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
    //   datalabels: {
    //     color: 'black', // Color del texto
    //     formatter: (value, context) => {
    //         const dataset = context.chart.data.datasets[context.datasetIndex];
    //         console.log("ASSDAS")
    //         if(dataset.data[0] == null || dataset.data[1] == null) {return 0}
    //         else{

    //           let total = parseFloat(dataset.data[0].toString()) + parseFloat(dataset.data[1].toString())
    //           let porcentaje = ((value / total) * 100).toFixed(2) + '%';
    //           console.log(porcentaje)
    //           return porcentaje
    //         }
    //     },
    //     display: true // Mostrar etiquetas de datos
    // },
      legend: {
        display: true,
        position: 'right',
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ["nada"],
    datasets: [
      {
        data: [1],
      },
    ],
  };

  agregar(label : string [], data : number []){

    this.pieChartData.labels = label
    this.pieChartData.datasets[0].data = data

    this.chartVisible = true
   }

  public pieChartType: ChartType = 'pie';

  public chartVisible = false
  public graficoVisible = false

  isLoadingTable: boolean = true;

  constructor(private service:TIService) { }

  nsVerificados : NsVerificado [] = []

  fechaNs : string = ""


  loadPedidos : boolean = true

  nombreTienda : string [] = ["Verificados", "Total registros"]

  porcentaje : number [] = []



  options = {
    plugins : {
      legend: {
        display: true,
        // position : 'right'
      },
    },
  }

  data = {
    labels: [
      'green',
      'Red'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: ['#33FF36', '#F41414'],
      hoverOffset: 4
    }],
  };

  buscarNsPorFecha(){
    this.nsVerificados = []
    this.isLoadingTable = true
    this.graficoVisible = false
    const fecharFormateada = this.fechaNs.split('-').join('')
    this.service.get_ns_verificados(fecharFormateada).subscribe(data => {
      
      this.nsVerificados = data
      this.porcentaje = []
      this.porcentaje.push(this.nsVerificados[4].Productos_verificados)
      this.porcentaje.push(this.nsVerificados[4].Total_registros)
      this.agregar(this.nombreTienda,  this.porcentaje)
      this.graficoVisible = true
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
      this.porcentaje.push(this.nsVerificados[4].Productos_verificados)
      this.porcentaje.push(this.nsVerificados[4].Total_registros)
      this.agregar(this.nombreTienda,  this.porcentaje)
      this.graficoVisible = true
      this.isLoadingTable = false
    })
    }, 700);

  }

 ngOnDestroy(): void {

  }


}
