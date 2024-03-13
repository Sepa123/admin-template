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
import { Dato } from 'src/app/models/nivel_servicio/nsFechaCompromisoReal.interface';

@Component({
  selector: 'app-ns-verificados',
  templateUrl: './ns-verificados.component.html',
  styleUrls: ['./ns-verificados.component.scss']
})
export class NsVerificadosComponent {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      datalabels: {
        color: 'black', // Color del texto
        formatter: (value, context) => {
            const dataset = context.chart.data.datasets[context.datasetIndex];
            if(dataset.data[0] == null || dataset.data[1] == null) {return 0}
            else{
              let total = parseFloat(dataset.data[0].toString()) + parseFloat(dataset.data[1].toString())
              let porcentaje = ((value / total) * 100).toFixed(2) + '%';
              return porcentaje
            }
        },
        display: true // Mostrar etiquetas de datos
    }
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ["nada"],
    datasets: [
      {
        data: [1],
        backgroundColor: [
          '#28A745',
          '#EC7063'
        ],
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

  fechaNsInicio : string = ""
  fechaNsFin : string =""

  fechaNsCompromiso : string = ""

  loadPedidos : boolean = true

  nombreTienda : string [] = ["Verificados", "Sin verificar"]

  nsTiendas : string[] = ['easy', 'opl', 'elux']

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
      'Green',
      'Red',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'],
      
      hoverOffset: 4
    }],
  };

  datosNs : Dato[] = []
  promedio : number = 0

  isLoadingTableNS : boolean = true

  buscarNsPorFecha(){
    this.nsVerificados = []
    this.isLoadingTable = true
    this.graficoVisible = false
    const fecharFormateadaInicio = this.fechaNsInicio.split('-').join('')
    const fecharFormateadaFin = this.fechaNsFin.split('-').join('')
    this.service.get_ns_verificados(fecharFormateadaInicio,fecharFormateadaFin).subscribe(data => {
      
      this.nsVerificados = data
      this.porcentaje = []
      const resta = this.nsVerificados[4].Total_registros - this.nsVerificados[4].Productos_verificados
      this.porcentaje.push(this.nsVerificados[4].Productos_verificados)
      this.porcentaje.push(resta)
      this.agregar(this.nombreTienda,  this.porcentaje)
      this.graficoVisible = true
      this.isLoadingTable = false
    })
  }

  buscarNsCompromisoPorFecha(){
    this.datosNs = []
    this.isLoadingTableNS = true
    const fecharFormateadaInicio = this.fechaNsCompromiso.split('-').join('')

    this.service.get_ns_fecha_compromiso_real_tienda(fecharFormateadaInicio,'easy').subscribe(data => {

      data.datos.map((informe) => {
        this.datosNs.push(informe)
      })

      this.service.get_ns_fecha_compromiso_real_tienda(fecharFormateadaInicio,'opl').subscribe(dataOpl => {

        dataOpl.datos.map((informe) => {
          this.datosNs.push(informe)
        })


        this.service.get_ns_fecha_compromiso_real_tienda(fecharFormateadaInicio,'elux').subscribe(dataElux => {


          dataElux.datos.map((informe) => {
            this.datosNs.push(informe)
          })

          this.isLoadingTableNS = false 
          const tota_compromiso = this.datosNs.reduce((accumulator, currentValue) => accumulator + currentValue.Compromiso_real,0,);
          const tota_entregados = this.datosNs.reduce((accumulator, currentValue) => accumulator + currentValue.Entregados,0,);
          this.promedio = (tota_entregados * 100) /tota_compromiso

          this.promedio = parseFloat(this.promedio.toFixed(2))
        
        })
      })

      // if( tienda == 'elux') {
      //   this.isLoadingTableNS = false 
      //   const tota_compromiso = this.datosNs.reduce((accumulator, currentValue) => accumulator + currentValue.Compromiso_real,0,);
      //   const tota_entregados = this.datosNs.reduce((accumulator, currentValue) => accumulator + currentValue.Entregados,0,);

      //   this.promedio = (tota_entregados * 100) /tota_compromiso
      // }
    })

    
    // this.nsTiendas.map((tienda, i) => {

    //   setTimeout(() => {
    //     this.service.get_ns_fecha_compromiso_real_tienda(fecharFormateadaInicio,tienda).subscribe(data => {

    //       data.datos.map((informe) => {
    //         this.datosNs.push(informe)
    //       })

    //       if( tienda == 'elux') {
    //         this.isLoadingTableNS = false 
    //         const tota_compromiso = this.datosNs.reduce((accumulator, currentValue) => accumulator + currentValue.Compromiso_real,0,);
    //         const tota_entregados = this.datosNs.reduce((accumulator, currentValue) => accumulator + currentValue.Entregados,0,);

    //         this.promedio = (tota_entregados * 100) /tota_compromiso
    //       }
    //     })
        
    //   }, 25000 * i);
    // })


    

    console.log(this.promedio)



    // this.service.get_ns_fecha_compromiso_real(fecharFormateadaInicio).subscribe((data) => {
    //   this.promedio = data.promedio
    //   this.datosNs = data.datos

    //   this.isLoadingTableNS = false 
    // })
  }

  ngOnInit():void {

    const fecha = new Date();
    // let fechaFormateada = fecha.toLocaleDateString().split('-').reverse().join('-')
    // let fechaFormateada = fecha.toISOString().split('T')[0];
    
        // Restar 4 horas
    fecha.setHours(fecha.getHours() - 4);

    // Formatear la fecha en el formato yyyymmdd
    const fechaFormateada = fecha.toISOString().split('T')[0];

    console.log(fechaFormateada)
    this.fechaNsInicio = fechaFormateada
    this.fechaNsFin = fechaFormateada
    this.fechaNsCompromiso = fechaFormateada

    setTimeout(() => {
      this.service.get_ns_verificados(fechaFormateada,fechaFormateada).subscribe(data => {
      this.nsVerificados = data
      const resta = this.nsVerificados[4].Total_registros - this.nsVerificados[4].Productos_verificados
      this.porcentaje.push(this.nsVerificados[4].Productos_verificados)
      this.porcentaje.push(resta)
      this.agregar(this.nombreTienda,  this.porcentaje)
      this.graficoVisible = true
      this.isLoadingTable = false
    })
    }, 700);

    this.service.get_ns_fecha_compromiso_real(fechaFormateada).subscribe((data) => {
      this.promedio = data.promedio
      this.datosNs = data.datos

      this.isLoadingTableNS = false 
    })

  }




 ngOnDestroy(): void {

  }


}
