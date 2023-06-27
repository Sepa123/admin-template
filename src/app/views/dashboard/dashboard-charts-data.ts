import { Injectable  } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';
import { TIService } from 'src/app/service/ti.service';
import { Subscription } from 'rxjs';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

export interface IChartPropsProductos {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {
  constructor(private service: TIService) {
    this.getData();
    this.initMainChart();
    this.initChartProducto("",3);

  }
  //Suscripciones

  subHistorico!:Subscription
  subProducto!:Subscription

   // Variables Reporte Historico
  historico: any[] = [];
  electrolux: any[] = [];
  easy: any[] = [];
  sportex: any[] = [];
  tiendas: any[] = [];
  dias:any[] = [];
  fecha:any[] = [];

   // Variables Reporte producto entregados
   entregado: any[] = [];
   electroluxEnt: any[] = [];
   easyEnt: any[] = [];
   sportexEnt: any[] = [];
   tiendasEnt: any[] = [];
   easyOPLEnt: any[] = [];
   diasEnt:any[] = [];
   fechaEnt:any[] = [];

   etiquetas: any[] = [];



  getWeekNumber(date : any) {
    const firstDayOfYear: any = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
  }
  getData(){
  //  this.subHistorico = this.service.get_historico_mensual().subscribe(mensual=> {
  //     this.historico = mensual

  //     for (let i = 0; i < this.historico.length; i++) {
  //       this.electrolux.push(this.historico[i].Electrolux)
  //       this.sportex.push(this.historico[i].Sportex)
  //       this.easy.push(this.historico[i].Easy)
  //       this.tiendas.push(this.historico[i].Tiendas)
  //       this.dias.push(this.historico[i].Dia)
  //       this.fecha.push(this.historico[i].Fecha)
  //     }
  // })



  this.subProducto = this.service.get_productos_mensual().subscribe(mensual=> {
    this.entregado = mensual
    ////
    this.entregado.sort((a,b) => a.Fecha - b.Fecha )
    const weeklyData = [];
    let currentWeek: any = null;
    let currentWeekData:any = [];

    this.entregado.forEach((record) => {
      const date = new Date(record.Fecha);
      const week = this.getWeekNumber(date);

      if (currentWeek === null) {
        currentWeek = week;
      }

      if (week !== currentWeek) {
        weeklyData.push({ Semana: currentWeek, Datos: currentWeekData });
        currentWeek = week;
        currentWeekData = [];
      }

      currentWeekData.push(record);
    });

    weeklyData.push({ Semana: currentWeek, Datos: currentWeekData });

    weeklyData.forEach((weekData, i: number) => {
      this.diasEnt.push(weekData.Datos.map((data : any) => data.Dia))
      this.electroluxEnt.push(weekData.Datos.map((data : any) => data.Electrolux))
      this.sportexEnt.push(weekData.Datos.map((data : any) => data.Sportex))
      this.easyEnt.push(weekData.Datos.map((data : any) => data.Easy))
      this.easyOPLEnt.push(weekData.Datos.map((data : any) => data.Easy_OPL))

    })

    // for (let i = 0; i < this.entregado.length; i++) {
    //   this.electroluxEnt.push(this.entregado[i].Electrolux)
    //   this.sportexEnt.push(this.entregado[i].Sportex)
    //   this.easyEnt.push(this.entregado[i].Easy)
    //   // this.tiendasEnt.push(this.entregado[i].Tiendas)
    //   this.easyOPLEnt.push(this.entregado[i].Easy_OPL)
    //   this.diasEnt.push(this.entregado[i].Dia)
    //   this.fechaEnt.push(this.entregado[i].Fecha)
    // }
})
  }

  public mainChart: IChartProps = {};

  public chartProducto: IChartProps = {};

  initMainChart(period: string = 'Month') {
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(getStyle('--cui-info'), 10) ?? '#20a8d8';
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    this.mainChart['elements'] = period === 'Month' ? 12 : 27;
    this.mainChart['Data1'] = this.electrolux;
    this.mainChart['Data2'] = this.sportex;
    this.mainChart['Data3'] = this.easy;
    this.mainChart['Data4'] = this.tiendas;

    let labels: string[] = [];

    labels = this.fecha;
    // labels = this.diasEnt


    const colors = [
      {
        // Electrolux
        backgroundColor: 'transparent',
        borderColor: "#003366",
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // Sportex
        backgroundColor: 'transparent',
        borderColor: '#1C2833',
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // Easy
        backgroundColor: 'transparent',
        borderColor: '#C0392B',
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // Tiendas
        backgroundColor: 'transparent',
        borderColor: '#7DCEA0',
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      }
    ];

    const datasets = [
      {
        data: this.mainChart['Data1'],
        label: 'Electrolux',
        ...colors[0]
      },
      {
        data: this.mainChart['Data2'],
        label: 'Sportex',
        ...colors[1]
      },
      {
        data: this.mainChart['Data3'],
        label: 'Easy',
        ...colors[2]
      },
      {
        data: this.mainChart['Data4'],
        label: 'Tiendas',
        ...colors[3]
      }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function(context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          max: 700,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5)
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
  }

  initChartProducto(period: string = "day", index : number) {
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    // console.log(this.electroluxEnt)
    // this.chartProducto['elements'] = period === 'Month' ? 12 : 27;
    this.chartProducto['Data1'] = this.electroluxEnt[index];
    this.chartProducto['Data2'] = this.sportexEnt[index];
    this.chartProducto['Data3'] = this.easyEnt[index];
    this.chartProducto['Data4'] = this.tiendasEnt[index];
    this.chartProducto['Data5'] = this.easyOPLEnt[index];

    let labels: string[] = [];


    // labels = this.fechaEnt;
    labels = this.diasEnt[index];


    const colors = [
      {
        // Electrolux
        backgroundColor: 'transparent',
        borderColor: "#003366",
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // Sportex
        backgroundColor: 'transparent',
        borderColor: '#1C2833',
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // Easy
        backgroundColor: 'transparent',
        borderColor: '#C0392B',
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // Tiendas
        backgroundColor: 'transparent',
        borderColor: '#7DCEA0',
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // Easy OPL
        backgroundColor: 'transparent',
        borderColor: '#641E16 ',
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
    ];

    const datasets = [
      {
        data: this.chartProducto['Data1'],
        label: 'Electrolux',
        ...colors[0]
      },
      {
        data: this.chartProducto['Data2'],
        label: 'Sportex',
        ...colors[1]
      },
      {
        data: this.chartProducto['Data3'],
        label: 'Easy',
        ...colors[2]
      },
      {
        data: this.chartProducto['Data4'],
        label: 'Tiendas',
        ...colors[3]
      },
      {
        data: this.chartProducto['Data5'],
        label: 'Easy OPL',
        ...colors[4]
      }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function(context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          max: 1500,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5)
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };

    // const grupos: any = [];
    // for (let i = 0; i < datasets[0].data.length; i += 7) {
    //   const grupo = datasets[0].data.slice(i, i + 7);
    //   grupos.push(grupo);
    // }

    // console.log(grupos)

    this.chartProducto.type = 'line';
    this.chartProducto.options = options;
    this.chartProducto.data = {
      datasets,
      labels
    };
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.subHistorico.unsubscribe();
    this.subProducto.unsubscribe();
  }

}
