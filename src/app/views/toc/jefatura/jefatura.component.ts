import { Component, ElementRef, ViewChild } from '@angular/core';
import { TocService } from 'src/app/service/toc.service'
import { BitacoraRango } from 'src/app/models/alertasVigentes.interface';
import { UsuarioTOC } from 'src/app/models/usuariosTOC.interface';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-jefatura',
  templateUrl: './jefatura.component.html',
  styleUrls: ['./jefatura.component.scss']
})
export class JefaturaComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      // },
      // datalabels: {
      //   formatter: (value: any, ctx: any) => {
      //     if (ctx.chart.data.labels) {
      //       return ctx.chart.data.labels[ctx.dataIndex];
      //     }
      //   },
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

  public pieChartType: ChartType = 'pie';

  isModalOpen: boolean = false
  public visible = false;

  public chartVisible = false
  public graficoVisible = false

  regex = /\*/;

  portal = /\bportal-\b/;

  contadorNS : number = 0

  public nombreUsuario : string [] = []

  public cantidadBitacora : number [] = []

  bitacorasRangos : BitacoraRango [] = []

  usuariosTOC : UsuarioTOC [] = []

  fecha_inicio : string = ""
  fecha_fin : string = ""

  observacionActual : string | null = ""
  
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
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
      hoverOffset: 4
    }],
  };
  

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


  constructor( private service : TocService, private elementRef: ElementRef){

  }

  bitacoraTOCRangoFecha(fecha_inicio : string, fecha_termino : string){
    this.bitacorasRangos = []
    this.service.bitacoras_rango_fecha(fecha_inicio,fecha_termino).subscribe(data => {
      this.bitacorasRangos = data
      this.bitacorasRangos.map((bitacora) => {
        if (bitacora.Direccion == null || bitacora.Direccion == '') {
          bitacora.Direccion = 'Sin dirección*'
        }
        if (bitacora.Fecha_Compromiso == null || bitacora.Fecha_Compromiso == '') {
          bitacora.Fecha_Compromiso = 'Sin Fecha Compromiso*'
        }
        if (bitacora.Comuna == null || bitacora.Comuna == '') {
          bitacora.Comuna = 'Sin Comuna*'
        }
      })
      this.graficoVisible = true
      this.contadorNS = this.bitacorasRangos.length
    
    })

    this.service.nombres_usuarios_toc(fecha_inicio,fecha_termino).subscribe(usuarios => {
      this.usuariosTOC = usuarios

      this.usuariosTOC.map((usu) => {
        this.nombreUsuario.push(usu.Nombre)
        this.cantidadBitacora.push(usu.Cantidad_bitacora)
      })

      // this.data.labels = this.nombreUsuario
      // this.data.datasets[0].data = this.cantidadBitacora
      
      this.agregar(this.nombreUsuario, this.cantidadBitacora)
      console.log(this.data)
    })
  }

  reemplazarIds(ids : string){
     return this.usuariosTOC.filter(data => data.Ids_usuario == ids)[0].Nombre
  }

  formatearFecha(fecha : string){
    return fecha.replaceAll("-", "")
   }

   agregar(label : string [], data : number []){

    this.pieChartData.labels = label
    this.pieChartData.datasets[0].data = data
    // this.data = {
    //   labels: label,
    //   datasets: [{
    //     label: 'My First Dataset',
    //     data: data,
    //     backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
    //     hoverOffset: 4
    //   }]
    // };

    this.chartVisible = true
   }

   buscar() {
    this.chartVisible = false
     this.nombreUsuario = []
     this.cantidadBitacora = []
    if(this.fecha_fin == "" || this.fecha_inicio == ""){
      return alert("Por favor ingrese una fecha en ambos campos")
    }
    // console.log(this.fecha_fin, this.fecha_inicio)
    const fecha_inicio_f = this.formatearFecha(this.fecha_inicio)
    const fecha_fin_f = this.formatearFecha(this.fecha_fin)

    console.log(fecha_inicio_f,fecha_fin_f)

    if (this.validarDiferenciaFechas(this.fecha_inicio,this.fecha_fin) == false) return alert("La diferencia entre las fechas debe ser de un día o más")

    this.bitacoraTOCRangoFecha(fecha_inicio_f,fecha_fin_f) 

    
   }

   validarDiferenciaFechas(fechaInicio: string, fechaFin: string): boolean {
    // Convertir las cadenas de fecha en objetos de fecha (Date)
    const fechaInicioDt = new Date(fechaInicio);
    const fechaFinDt = new Date(fechaFin);
  
    // Verificar que la primera fecha no sea mayor a la segunda fecha
    if (fechaInicioDt > fechaFinDt) {
      console.error("La Fecha_inicio no puede ser mayor que Fecha_fin.");
      return false;
    }
  
    // Calcular la diferencia en días entre las dos fechas
    const diferenciaMs = fechaFinDt.getTime() - fechaInicioDt.getTime();
    const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    return true
    // Comprobar si la diferencia en días es mayor o igual a 1
    // if (diferenciaDias >= 1) {
    //   return true;
    // } else {
    //   console.error("La diferencia entre las fechas debe ser de un día o más.");
    //   return false;
    // }

  }

  verObservacion(obs : string | null){
    if(obs === null || obs === ""){
      this.observacionActual = "Sin observación"
    }else{
      this.observacionActual = obs
    }
    this.toggleLiveDemo()
  }


  ngOnInit(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;

    this.bitacoraTOCRangoFecha(formattedDate,formattedDate) 
    // this.service.bitacoras_rango_fecha('20230801','20230831').subscribe((data) => {
    //   this.bitacorasRangos = data
    // })
  }

}
