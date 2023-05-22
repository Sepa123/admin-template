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
    trafficRadio: new UntypedFormControl('Month')
  });

  suscriptionReportes!: Subscription
  reportesHistoricos!: ReporteHistorico[];
  reportesHistoricosHoy!: ReporteHistorico[];
 // TODO: Ordenar tabla por origen
  

  ngOnInit(): void {
    this.initCharts();
    this.getDataHistorico();
    this.getDataHistoricoHoy();
  }

  getDataHistorico() {
    this.service.get_historico_mensual().subscribe((data) => {
      this.reportesHistoricos = data
      this.reportesHistoricos.shift()

      this.isLoadingTable = false;
    })
  }

  getDataHistoricoHoy() {
    this.suscriptionReportes =  this.service.get_historico_mensual_hoy().subscribe((data) => {
      this.reportesHistoricosHoy = data
      // this.isLoadingTable = false;
    })
  }


  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
    this.chartProductos = this.chartsData.chartProducto;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.chartsData.initChartProducto(value);
    this.initCharts();
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.suscriptionReportes.unsubscribe();
  }
}

