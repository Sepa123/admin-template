import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup , } from '@angular/forms';
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
  
  disabledButtons:boolean = false;

  constructor(private chartsData: DashboardChartsData, private service:TIService) {
  }
  
  public mainChart: IChartProps = {};
  public chartProductos : IChartPropsProductos = {};

  public chart: Array<IChartProps> = [];

  public  mesesRadioGroup = new UntypedFormGroup({
    mesesRadio: new UntypedFormControl('')
  });

  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('semana 1')
  });

  suscriptionReportes!: Subscription
  reportesHistoricos!: ReporteHistorico[];
  reportesHistoricosHoy!: ReporteHistorico[];
  arrayMeses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre",
                "Noviembre","Diciembre"]
  mesesAb = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SET", "OCT", "NOV", "DIC"]

  totalSemanas!: number 
  mesActual! : string 
  ordenCompra!: number [];
  ordenCompraHoy!: number [];

  arrSemanas! : string [][];
  
  ngOnInit(): void {
    
    

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

  obtenerSemanasDelMes(mes: number, año: number): string[][] {
    const fechas: string[][] = [];
  
    // Obtener la primera fecha del mes
    const primeraFecha = new Date(año, mes - 1, 1);
  
    // Obtener el primer lunes del mes
    const primerLunes = new Date(primeraFecha.getTime());
    primerLunes.setDate(primeraFecha.getDate() + ((7 - primeraFecha.getDay() + 1) % 7));
  
    // Recorrer las semanas del mes
    let semana = 0;
    while (primerLunes.getMonth() === mes - 1) {
      fechas[semana] = [];
      for (let i = 0; i < 7; i++) {
        const fecha = new Date(primerLunes.getTime());
        fecha.setDate(primerLunes.getDate() + i);
        const fechaFormateada = fecha.toISOString().slice(0, 10);
        fechas[semana].push(fechaFormateada);
      }
      primerLunes.setDate(primerLunes.getDate() + 7);
      semana++;
    }
  
    return fechas;
  }

  setMes(mes:string) {
    this.mesesRadioGroup.setValue({mesesRadio : mes})
    var indexMes = this.mesesAb.findIndex(isMes => isMes == mes)
    var fecha = new Date();
    var año = fecha.getFullYear();

    // var fechaInicio = new Date(año, indexMes, 1);
    // var diaInicio = fechaInicio.getDay();
    // var diasPrimeraSemana = 7 - diaInicio;
    // var fechaFin = new Date(año, indexMes + 1, 0);
    // this.totalSemanas = Math.ceil((fechaFin.getDate() - diasPrimeraSemana) / 7) ;

    this.arrSemanas = this.obtenerSemanasDelMes(indexMes + 1,año)
    this.totalSemanas = this.arrSemanas.length
    const fecha_inicio = this.arrSemanas[0][0]
    const fecha_termino = this.arrSemanas[this.arrSemanas.length-1][6]

    console.log(fecha_inicio, fecha_termino)
  
    console.log(this.arrSemanas)
    this.mesActual = this.arrayMeses[indexMes]

    // this.service.get_reporte_producto_rango(fecha_inicio, fecha_termino).subscribe(data => {
    //   console.log(data)
    // },
    // ((error) => {
    //   console.log(error.error.detail)
    // }))

  }

  setTrafficPeriod(value: string ,index : number): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.disabledButtons = true;

    console.log(value)
    // this.mesesRadioGroup.setValue({mesesRadio : this.mesActual})
    

    // this.service.get_reporte_producto_rango("2023-06-01","2023-07-01").subscribe(producto => {
    //   console.log(producto)
    // })

    // this.arrSemanas
    this.chartsData.initMainChart(value);
    this.chartsData.initChartProducto(this.mesActual,index,this.arrSemanas[index]);
    this.initCharts();

    setTimeout(() => {
      // Realiza la lógica deseada
      console.log('Opción seleccionada:', value);
      this.chartsData.initChartProducto(this.mesActual,index,this.arrSemanas[index]);
      this.disabledButtons = false; // Desbloquea los botones
    }, 2000);


  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.suscriptionReportes.unsubscribe();
  }
}
