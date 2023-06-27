import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TIService } from 'src/app/service/ti.service';
import { DashboardChartsData, IChartProps, IChartPropsProductos} from './dashboard-charts-data';
import { Subscription } from 'rxjs';
import { ReporteHistorico } from 'src/app/models/reporteHistorico.interface';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public isLoadingTable: boolean = true;
  

  constructor(private chartsData: DashboardChartsData, private service:TIService) {
  }
  
  public mainChart: IChartProps = {};
  public chartProductos : IChartPropsProductos = {};

  public chart: Array<IChartProps> = [];

  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('semana 1')
  });

  suscriptionReportes!: Subscription
  reportesHistoricos!: ReporteHistorico[];
  reportesHistoricosHoy!: ReporteHistorico[];
  arrayMeses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre",
                "Noviembre","Diciembre"]
  totalSemanas!: number 
  mesActual! : string 
  ordenCompra!: number [];
  ordenCompraHoy!: number [];

 // TODO: Ordenar tabla por origen
  
  ngOnInit(): void {
    var fecha = new Date();

    // Obtener el mes actual (se devuelve un valor entre 0 y 11)
    var mes = fecha.getMonth();
    var año = fecha.getFullYear();

    var fechaInicio = new Date(año, mes, 1);

    var diaInicio = fechaInicio.getDay();

    // Calcula el número de días restantes en la primera semana
    var diasPrimeraSemana = 7 - diaInicio;

    // Crea una nueva fecha con el último día del mes
    var fechaFin = new Date(año, mes + 1, 0);

    // Calcula el número total de semanas en el mes
    this.totalSemanas = Math.ceil((fechaFin.getDate() - diasPrimeraSemana) / 7) + 1;

    this.mesActual = this.arrayMeses[mes]

    // const datosSessionStorage = sessionStorage.getItem('reportesHistoricos');
    this.initCharts();
    this.getDataHistorico();
    this.getDataHistoricoHoy();

  }

  getDataHistorico() {
    this.service.get_historico_mensual().subscribe((data) => {
      this.reportesHistoricos = data
      this.ordenCompra = this.reportesHistoricos.map(reporte => (reporte.Electrolux + reporte.Sportex + reporte.Easy + reporte.Easy_OPL))
      this.reportesHistoricos.shift()

      console.log(this.ordenCompra)

      // sessionStorage.setItem("reportesHistoricos", JSON.stringify(this.reportesHistoricos))
      // sessionStorage.setItem("")
      this.isLoadingTable = false;
    })
  }

  getDataHistoricoHoy() {
    this.suscriptionReportes =  this.service.get_historico_mensual_hoy().subscribe((data) => {
      this.reportesHistoricosHoy = data
      this.ordenCompraHoy = this.reportesHistoricosHoy.map(reporte => (reporte.Electrolux + reporte.Sportex + reporte.Easy + reporte.Easy_OPL))
      // this.isLoadingTable = false;
    })
  }


  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
    this.chartProductos = this.chartsData.chartProducto;
  }

  setTrafficPeriod(value: string ,index : number): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.chartsData.initChartProducto(value,index);
    this.initCharts();
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.suscriptionReportes.unsubscribe();
  }
}

