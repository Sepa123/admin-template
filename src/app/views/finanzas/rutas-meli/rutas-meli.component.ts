import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit,Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainCitacionS,Detalle } from "../../../models/meli/citacionSupervisor.interface"
import {CitacionesService} from '../../../service/citaciones.service'
import { MeliService } from '../../../service/meli.service'
import { MainCitacionA,CamposPorOperacion, ResumenSupervisores, PanelResumenMelis } from "../../../models/meli/citacionActiva.interface"
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import * as XLSX from 'xlsx';
import { ReporteMeliFinanza } from '../../../models/meli/reporteMeliFinanzas.interface';

@Component({
  selector: 'app-rutas-meli',
  templateUrl: './rutas-meli.component.html',
  styleUrls: ['./rutas-meli.component.scss']
})
export class RutasMeliComponent {
  
  constructor(private service: MeliService) {

  }


  panelRsumenMeli : PanelResumenMelis = {
      "Total": 0,
      "En_proforma": 0,
      "Sin_proforma": 0,
      "Descuentos": 0
    }

  textoPeriodo : any = ''
  textoIdRuta : any = ''
  textoPatente : any = ''
  textoFiltro : any = ''
  textoConductor : any = ''
  
  citacionSupervisores : MainCitacionS [] = []
  operacionCampo : CamposPorOperacion [] = []

  detalleCitacion : Detalle [] = []
  rol =   sessionStorage.getItem("rol_id")+''
  public visible = false;
  public chartVisible = false
  public graficoVisible = false
  operacion : string = ''
  centroOperacion : string = ''

  subidoOk : boolean = false

  tipoOperacion : string = ''

  observacionPatente : string = ''

  indexActualPatente : number = 0

  fecha_inicio : string = ''
  fecha_fin : string = ''

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  currentDate : string = ''
  minDate : string = ''
  maxDate : string = ''

  estadosCitacion : any = []

  public id_usuario = sessionStorage.getItem('id') + ''


  public visibleObservacion = false;

  toggleLiveObservacion() {
    this.visibleObservacion = !this.visibleObservacion;
  }

  handleLiveObservacionChange(event: any) {
    this.visibleObservacion = event;
  }

  obtenerFechas(){
    let hoy = new Date();

    let año = hoy.getFullYear();
    let mes = ("0" + (hoy.getMonth() + 1)).slice(-2); // Los meses comienzan en 0
    let día = ("0" + hoy.getDate()).slice(-2);

    this.currentDate = `${año}-${mes}-${día}`;

    hoy.setDate(hoy.getDate() - 4);

    let minAño = hoy.getFullYear();
    let minMes = ("0" + (hoy.getMonth() + 1)).slice(-2); // Los meses comienzan en 0
    let MinDía = ("0" + hoy.getDate()).slice(-2);
    this.minDate = `${minAño}-${minMes}-${MinDía}`;
  }
  

  onDateChange(event: any) {
    const rawDate = event.target.value;
    if (rawDate) {
      this.chartVisible = false
      this.graficoVisible = false
      const [year, month, day] = rawDate.split('-');

      const fecha = `${year}-${month}-${day}`;
      // this.getModalidades();

      this.currentDate = fecha

      this.service.getDatosCitacionSupervisor(this.id_usuario,fecha).subscribe((data) => {
        this.citacionSupervisores = data
        
        console.log(this.citacionSupervisores[0].Id_operacion)
        this.chartVisible = true
        this.graficoVisible = true
        
      }, error => {
        this.citacionSupervisores = []
      })
    }

    
  }
  
  ngOnInit() {
    this.getLocation()
    
    this.obtenerFechas()

    


    // let hoy = new Date();

    // let año = hoy.getFullYear();
    // let mes = ("0" + (hoy.getMonth() + 1)).slice(-2); // Los meses comienzan en 0
    // let día = ("0" + hoy.getDate()).slice(-2);

    // this.currentDate = `${año}-${mes}-${día}`;
  
  }

  idOperacion : number = 0
  idCentroOperacion : number = 0
 

  
  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string

  getLocation(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position)

      });
    } else {
      console.log("Localización no disponible");
    }
  }
  showPosition(position: any): any{
        this.latitude = position.coords.latitude
        this.longitud= position.coords.longitude 
       this.latStr = this.latitude.toString()
        this.longStr = this.longitud.toString()

    console.log("Longitud : " , this.longStr, "latitud :", this.latStr)
  }

  formatoFecha(fecha : any) {
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${año}${mes}${dia}`;
}

  generarParesDeFechas(rangoInicio : string, rangoFin : string) {
    const milisegundosPorDia = 24 * 60 * 60 * 1000;
    const diferenciaDiasMaxima = 8;

    // Convertir las fechas a objetos de tipo Date
    const fechaInicio = new Date(rangoInicio);
    const fechaFin = new Date(rangoFin);
    fechaInicio.setDate(fechaInicio.getDate() + 1)
    fechaFin.setDate(fechaFin.getDate() + 1)
    // Array para almacenar los pares de fechas
    const paresDeFechas = [];
    console.log(rangoInicio)

    // Iterar desde la fecha inicial hasta la fecha final
    let fechaActual = fechaInicio;
    while (fechaActual <= fechaFin) {
        // Calcular la fecha final del par
        let fechaFinalPar = new Date(fechaActual.getTime() + (diferenciaDiasMaxima * milisegundosPorDia));
        // Si la fecha final del par supera la fecha final del rango, ajustarla
        if (fechaFinalPar > fechaFin) {
            fechaFinalPar = fechaFin;
        }
        // Agregar el par de fechas al array
        paresDeFechas.push([this.formatoFecha(fechaActual), this.formatoFecha(fechaFinalPar)]);
        // Avanzar la fecha actual al comienzo del próximo par
        fechaActual = new Date(fechaFinalPar.getTime() + milisegundosPorDia);
    }

    return paresDeFechas;
}

 formatearAPesoCLP(numero : number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(numero);
}


isLoadingFull :boolean = false

  buscadorResumenNS(fecha_i: string,fecha_f: string){
  

    this.service.getReporteMeliFinanza(fecha_i,fecha_f).subscribe((data) => {

      if(data == null){
        this.panelRsumenMeli = {
          "Total": 0,
          "En_proforma": 0,
          "Sin_proforma": 0,
          "Descuentos": 0
      }

      this.isLoadingFull = false
      }else {

      

      data.map(r =>{
        r.Descuento_clp = this.formatearAPesoCLP(r.P_total_descuentos)

        this.reporteMeliFinanza.push(r)
      })
      // this.reporteMeliFinanza = data

      this.reporteMeliFinanzaFull = this.reporteMeliFinanza



      if(this.formatearFecha(this.fecha_fin) == fecha_f) {
        this.isLoadingFull = false
      }


      if (this.reporteMeliFinanza.length == 0) {
        this.panelRsumenMeli = {
            "Total": 0,
            "En_proforma": 0,
            "Sin_proforma": 0,
            "Descuentos": 0
        }

        this.isLoadingFull = false
        } else {
          this.panelRsumenMeli.Total = this.reporteMeliFinanza.length
          this.panelRsumenMeli.En_proforma = this.reporteMeliFinanza.filter(op => op.En_proforma  == true ).length
    
          this.panelRsumenMeli.Sin_proforma = this.reporteMeliFinanza.filter(op => op.En_proforma  == false ).length
          this.panelRsumenMeli.Descuentos = this.reporteMeliFinanza.filter(op => op.P_total_descuentos !== 0 ).length
        
      }
      }
   })
  }

  formatearFecha(fecha : string){
    return fecha.replaceAll("-", "")
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

  }

  buscarNsFechaSupervisor(){


    this.isLoadingFull = true

    this.reporteMeliFinanza = []

    this.panelRsumenMeli.Total = this.reporteMeliFinanza.length
    this.panelRsumenMeli.En_proforma = this.reporteMeliFinanza.filter(op => op.En_proforma  == true ).length

    this.panelRsumenMeli.Sin_proforma = this.reporteMeliFinanza.filter(op => op.En_proforma  == false ).length
    this.panelRsumenMeli.Descuentos = this.reporteMeliFinanza.filter(op => op.P_total_descuentos !== 0 ).length

    if(this.fecha_fin == "" || this.fecha_inicio == ""){
      return alert("Por favor ingrese una fecha en ambos campos")
    }
    // console.log(this.fecha_fin, this.fecha_inicio)
    const fecha_inicio_f = this.formatearFecha(this.fecha_inicio)
    const fecha_fin_f = this.formatearFecha(this.fecha_fin)

    const arrayFechas = this.generarParesDeFechas(this.fecha_inicio, this.fecha_fin)

    if (this.validarDiferenciaFechas(this.fecha_inicio,this.fecha_fin) == false) return alert("La diferencia entre las fechas debe ser de un día o más")
    
    let myset = [...new Set(arrayFechas)]

    console.log(myset)


    myset.map( (fecha , i) => {
      setTimeout(() => {
        this.buscadorResumenNS(fecha[0],fecha[1]) 
      }, 13500 * i)
      
    })


    // this.buscadorResumenNS(this.fecha_inicio,this.fecha_fin)
  }

  DescargarNS(){
    const idRuta = this.textoIdRuta.toLowerCase();
    const patente = this.textoPatente.toLowerCase();
    const conductor = this.textoConductor.toLowerCase();

    const resultado: any[] = [];

    // for (let i = 0; i < this.ListaPrefacturaFull.length; i++) {
    //     const lista = this.ListaPrefacturaFull[i];
    //     if (
    //         lista.Id_de_ruta.toString().toLowerCase().startsWith(idRuta) &&
    //         lista.Patente.toString().toLowerCase().startsWith(patente) &&
    //         lista.Conductor.toString().toLowerCase().startsWith(conductor)
    //     ) {
    //         resultado.push(lista);
    //     }
    // }

    // this.ListaPrefactura = resultado;
    
    
    
    
    const datos: any[][] = [[]];

    datos.push([
      'Fecha',
      'Modalidad',
      'Id Ruta',
      'Centro Operación',
      'Patente',
      'Tipo Vehículo',
      'Estado Ruta',
      'Driver',
      'Tipo',
      'Ruta Auxiliada',
      'Avance',
      'Total_pedidos',
      'Fallido',
      'Pendiente',
      'Kilometros',
      'Peoneta',
      'Valor Ruta',
      'Observación',
      'Ns',
      'Razón Id',
      'Razón Social',
      'Rut Empresa',
      'Patente Proforma',
    ])

    this.reporteMeliFinanza.forEach((reporte) => {
        const fila: any[] = [];

        fila.push(reporte.Fecha,reporte.Modalidad,reporte.Id_ruta, reporte.Centro_operacion,reporte.Ppu, reporte.Tipo_vehiculo,
          reporte.Estado_ruta,reporte.Driver,reporte.Tipo,reporte.Ruta_auxiliada,
          reporte.Avance, reporte.Total_pedidos,reporte.Lm_fallido,reporte.Lm_entregas,reporte.Km,reporte.Peoneta, reporte.Valor_ruta,
          reporte.Observacion, reporte.Ns, reporte.Razon_id,reporte.Razon_social,reporte.Rut_empresa, reporte.Patente_proforma
        );

        datos.push(fila);
      });

    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];
    // Crea un libro de Excel a partir de los datos
    const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
    const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');

    // Descarga el archivo Excel `Quadminds_Manual_${fechaActual}.xlsx` 
    
    const nombreArchivo = `lista-rutas-meli-${fechaActual}.xlsx`;
    // Nombre del archivo Excel a descargar 
    XLSX.writeFile(libroExcel, nombreArchivo);
  }


  verInfoAdicional(id_ruta : number){
    this.reporteMeliFinanza.map(reporte => {
      
      if(reporte.Id_ruta == id_ruta){
        if(reporte.Adicional){
          reporte.Adicional = false
        }else{
          reporte.Adicional = true
        }
      } else{
        reporte.Adicional = false
      }
    })

  }

   // Método para aplicar debouncing
   debounce(fn: Function, delay: number) {
    let timeoutId: number | undefined;
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}


  filtrarTabla(campo: string) {
    const idRuta = this.textoIdRuta.toLowerCase();
    const patente = this.textoPatente.toLowerCase();
    const conductor = this.textoConductor.toLowerCase();
    const filtro = this.textoFiltro.toLowerCase();

    const resultado: any[] = [];
    const maxResults = 200; // Ejemplo: limitar los resultados a los primeros 100

    for (let i = 0; i < this.reporteMeliFinanzaFull.length; i++) {
        const lista = this.reporteMeliFinanzaFull[i];
        if (
            lista.Ppu.toString().toLowerCase().startsWith(filtro) ||
            lista.Centro_operacion.toString().toLowerCase().startsWith(filtro) ||
            lista.Driver.toString().toLowerCase().startsWith(filtro) ||
            lista.Razon_social.toString().toLowerCase().startsWith(filtro) 
        ) {
            resultado.push(lista);
            if (resultado.length >= maxResults) {
                break; // Terminar el bucle si se alcanza el máximo de resultados
            }
        }
    }

    this.reporteMeliFinanza = resultado;

    this.panelRsumenMeli.Total = this.reporteMeliFinanza.length
    this.panelRsumenMeli.En_proforma = this.reporteMeliFinanza.filter(op => op.En_proforma  == true ).length

    this.panelRsumenMeli.Sin_proforma = this.reporteMeliFinanza.filter(op => op.En_proforma  == false ).length
    this.panelRsumenMeli.Descuentos = this.reporteMeliFinanza.filter(op => op.P_total_descuentos !== 0 ).length
}

  // Aplica debouncing a la función filtrarTabla
  filtrarTablaDebounced = this.debounce(this.filtrarTabla, 200);

  onKeyUp() {
    this.filtrarTablaDebounced('campo');
}


sortOrderPpu : boolean = true

  sortTablePpu(orden : boolean){
    if(orden){
      this.reporteMeliFinanza.sort((a,b) => a.Ppu.localeCompare(b.Ppu))
    }else{
      this.reporteMeliFinanza.sort((a,b) => b.Ppu.localeCompare(a.Ppu))
    }
    this.sortOrderPpu = !this.sortOrderPpu
    
  }

  sortOrderDriver : boolean = true

  sortTableDriver(orden : boolean){
    if(orden){
      this.reporteMeliFinanza.sort((a,b) => a.Driver.localeCompare(b.Driver))
    }else{
      this.reporteMeliFinanza.sort((a,b) => b.Driver.localeCompare(a.Driver))
    }
    this.sortOrderDriver = !this.sortOrderDriver
    
  }



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


///// tabla editada

inputText: string = '';
reporteMeliFinanza: ReporteMeliFinanza [] = [];
reporteMeliFinanzaFull: ReporteMeliFinanza [] = []

idUsuario = sessionStorage.getItem('id')+""
idsUsuario = sessionStorage.getItem('server')+'-'+this.idUsuario





}
