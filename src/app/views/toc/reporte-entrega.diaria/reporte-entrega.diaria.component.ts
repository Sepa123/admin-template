import { Component, ElementRef, ViewChild} from '@angular/core';
import { ComunaRutas } from 'src/app/models/comunaRutas.interface';
import { CantidadUnidadesRutaActiva } from 'src/app/models/cantidadUnidadesRutaActiva.interface';
import { RutaEnActivo } from "src/app/models/rutaEnActivo.interface"
import { NombresRutasActivas } from "src/app/models/nombresRutasActivas.interface"
import { HttpClient } from '@angular/common/http';
import { NombreRutaService } from 'src/app/service/nombre-ruta.service';
import { Router } from '@angular/router';
import { TocService } from 'src/app/service/toc.service'
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType, DatasetController } from 'chart.js';
import { ReporteEntregaDiariaService } from 'src/app/service/reporte-entrega-diaria.service';
import { ReporteEstadoEntregas, ReporteEfectividadConductor, ReporteEntregasConductor, NombreRegion, Tienda } from 'src/app/models/reporteEntregaDiaria.interface';
import { RutasService } from 'src/app/service/rutas.service'
import { NumberLiteralType } from 'typescript/lib/tsserverlibrary';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-reporte-entrega.diaria',
  templateUrl: './reporte-entrega.diaria.component.html',
  styleUrls: ['./reporte-entrega.diaria.component.scss'],
})
export class ReporteEntregaDiariaComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  listaUnidades: CantidadUnidadesRutaActiva[] = [];
  contadorNS: number = 0;
  arrayEntregasConductor: ReporteEstadoEntregas[] = [];

  arrayeConductor: ReporteEfectividadConductor[] = [];

  arrayProductosConductor: ReporteEntregasConductor[] = [];

  arrayRegion: NombreRegion [] =[];

  Tiendas: string[] = ['Electrolux' ,'Easy'];
  arrayTiendas: Tienda [] = [];
  public Descripcion: string[] = [];

  public Total: number[] = [];
  // model! : NgbDateStruct
  mostrarContenido: boolean = false;
  nombreRutaActual!: string;
  cantBultos!: number;
  isClicked: boolean = false;
  isActive: boolean = false;
  isRuta: boolean = false;
  

  listaRegiones : any [] = []
  TiendaFull:  Tienda[]=[]
  tiendaSeleccionada: string = "Tienda"
  regionSeleccionada: string = ""
  listaComunas: ComunaRutas[]=[]
  listaTiendas: Tienda[]=[]
  tienda?: string;
  region?: string;

  idRuta!: number;
  rutaEnActivo!: RutaEnActivo[];
  nombresRutas!: NombresRutasActivas[];
  nombreRuta: NombresRutasActivas[] = [];
  arraySKU: any[] = [];
  arrayProducto: any[] = [];
  arrayDirecciones: string[] = [];

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      datalabels:{
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
        
      display: true
      }
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['nada'],
    datasets: [
      {
        data: [1],
      },
    ],
  };

  public pieChartType: ChartType = 'pie';

  data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#E7E9ED',
          '#36A2EB',
        ],
        hoverOffset: 4,
      },
    ],
  };
  isLoadingTable: boolean = true;
  isLoadingFull: boolean = false;

  tiendaFiltrada : string [] = [];
  fechaActual!: string;

  patenteRuta!: string;
  driverRuta!: string;
  despachador!: string;
  isDriver: boolean = false;
  public chartVisible = false;
  public graficoVisible = false;
  fecha: string = '';
  loadingRuta: boolean = false;

  loadingArchivo: boolean = false;

  isModalOpen: boolean = false;
  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }
  toggleContent() {
    this.mostrarContenido = !this.mostrarContenido;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  openModal() {
    this.isModalOpen = true;

    console.log(this.isModalOpen);
  }

  closeModal() {
    this.isModalOpen = false;
  }

  constructor(
    private service2: ReporteEntregaDiariaService,
    private service: RutasService,
    private nombreRutaService: NombreRutaService,
    private router: Router,
    private http: HttpClient
  ) {}

  agregar(label: string[], data: number[]) {
    this.pieChartData.labels = label;
    this.pieChartData.datasets[0].data = data;

    this.chartVisible = true;
  }
  arregloFechas(fecha: string) {
    const fechas = [];
    let fechaActual = new Date(fecha);

    if (fecha) {
      fechas.push(this.formatearFecha(this.fecha));
    } else {
      while (fechaActual <= new Date(fecha)) {
        const fechaFormateada = fechaActual
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, ''); // Formatea como 'YYYYMMDD'
        fechas.push(fechaFormateada);
        fechaActual.setDate(fechaActual.getDate() + 1); // Avanza un día
      }
      fechas.push(this.formatearFecha(this.fecha));
    }

    return fechas;
  }



  buscar() {
    this.contadorNS = 0;
    this.isLoadingFull = false;
    this.isLoadingTable = true;
    this.chartVisible = false;
    this.Descripcion = [];
    this.Total = [];
    if (this.fecha == '') {
      return alert('Por favor ingrese una fecha');
    }
    console.log(this.fecha);
    const fecha_f = this.formatearFecha(this.fecha);

    console.log(fecha_f);
    const arrayFechas = this.arregloFechas(this.fecha);

    if (this.validarDiferenciaFechas(this.fecha) == false)
      return alert('La diferencia entre las fechas debe ser de un día o más');

    let myset = [...new Set(arrayFechas)];
    let fechaFormateada = fecha_f.toString().split('T')[0];
    myset.map((fecha, i) => {
      setTimeout(() => {});

    

      this.getEstadoEntregas(fechaFormateada, this.tienda, this.region);
      this.service2
        .EntregasFechaConductor(fechaFormateada)
        .subscribe((usuarios) => {
          this.arrayEntregasConductor = usuarios;
          console.log(this.arrayEntregasConductor);

          this.arrayEntregasConductor.map((En) => {
            this.Descripcion.push(En.Descripcion);
            this.Total.push(En.Total);
          });

          this.agregar(this.Descripcion, this.Total);
          console.log(this.data);
        });

      // this.bitacoraTOCRangoFecha(fecha_inicio_f,fecha_fin_f)
    });
  }

  formatearFecha(fecha: string) {
    return fecha.replaceAll('-', '');
  }

  getEstadoEntregas(fecha: string, tienda: any, region: any) {
    this.chartVisible = false;
    this.graficoVisible = false;
    this.Descripcion = []; // Limpiamos el arreglo de descripciones
    this.Total = [];
    this.service2
      .EntregasFechaConductor(fecha, tienda, region)
      .subscribe((data) => {
        this.arrayEntregasConductor = data;
        console.log(this.arrayEntregasConductor);
        this.arrayEntregasConductor.map((En) => {
          this.Descripcion.push(En.Descripcion);
          this.Total.push(En.Total);
          this.agregar(this.Descripcion, this.Total);
        });
        this.chartVisible = true;
        this.graficoVisible = true;
      });
  }

  getReporteConductor(fecha: string, tienda?: any, region?: any) {
    this.arrayProductosConductor = [];
    this.service2
      .reporteEntregaConductor(fecha, tienda, region)
      .subscribe((data) => {
        this.arrayProductosConductor = data;
        console.log(this.arrayProductosConductor);
      });

    // this.service.get_lista_funciones(codigo).subscribe(data =>
    //   {this.arrayProductos = data;
    //   console.log(this.arrayProductos)})
  }

  getEfectividadConductor(fecha: string, tienda?: any, region?: any) {
    this.arrayeConductor = [];
    this.service2
      .eficienciaConductor(fecha, tienda, region)
      .subscribe((data) => {
        this.arrayeConductor = [data];
        console.log(this.arrayeConductor);
      });

    //       // this.service.get_lista_funciones(codigo).subscribe(data =>
    //       //   {this.arrayProductos = data;
    //       //   console.log(this.arrayProductos)})
  }

  getNombreByFecha(dateObj: any) {
    this.isClicked = false;
    this.isActive = false;
    this.isDriver = false;
    this.rutaEnActivo = [];
    this.nombreRutaActual = '';
    if (dateObj === undefined) return alert('Por favor ingrese una fecha');
    // const formattedDate = `${dateObj.year}-${dateObj.month.toString().padStart(2, '0')}-${dateObj.day.toString().padStart(2, '0')}`;
    if (
      (this.tienda == '' ||
        this.tiendaSeleccionada == 'Todas' ||
        this.tiendaSeleccionada == 'Tienda') &&
      (this.regionSeleccionada == 'Todas' ||
        this.regionSeleccionada == 'Region')
    ) {
      this.service.get_nombres_ruta(dateObj).subscribe((data) => {
        data.length == 0 ? (this.isRuta = false) : (this.isRuta = true);
        this.nombresRutas = data;
        this.nombresRutas.map((ruta) => {
          if (ruta.Estado === false) {
            ruta.Verificado = true;
            ruta.Alerta = false;
          }
        });
      });
      // } else {
      //   this.service.filtrar_nombre_rutas_activa_by_comuna(dateObj, this.comunaSeleccionada,this.regionSeleccionada).subscribe((data) => {
      //     data.length == 0 ? this.isRuta = false : this.isRuta = true
      //     this.nombresRutas = data
      //     this.nombresRutas.map((ruta) => {
      //       if (ruta.Estado === false ){
      //         ruta.Verificado = true
      //         ruta.Alerta = false
      //       }
      //     })

      //   })
    }
  }
  validarDiferenciaFechas(fecha: string): boolean {
    // Convertir las cadenas de fecha en objetos de fecha (Date)
    const fechaInicioDt = new Date(fecha);

    // Verificar que la primera fecha no sea mayor a la segunda fecha
    // if (fechaInicioDt > fechaFinDt) {
    //   console.error("La Fecha_inicio no puede ser mayor que Fecha_fin.");
    //   return false;
    // }

    // Calcular la diferencia en días entre las dos fechas
    // const diferenciaMs = fechaFinDt.getTime() - fechaInicioDt.getTime();
    // const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    return true;
  }
  getRegiones(){
    this.service2.getNombreRegion().subscribe(
      data => { this.arrayRegion = data;
      console.log(this.arrayRegion)
    })
    
  }

  // Método para filtrar los datos según la región seleccionada por el usuario
  filtrarPorRegion() {
    // Verificar si se ha seleccionado una región válida
    if (this.regionSeleccionada !== 'Regiones') {
      // Filtrar el array de regiones para obtener solo los datos correspondientes a la región seleccionada
      this.arrayRegion = this.arrayRegion.filter((region) => region.region === this.regionSeleccionada);
      
      console.log(this.regionSeleccionada)
      
    } 
    else {
      // Si se selecciona 'Regiones', mostrar todos los datos nuevamente
      this.getRegiones();
    }
  }
    filtrarPortienda() {
      // Verificar si se ha seleccionado una región válida
      if (this.tiendaSeleccionada !== 'Tienda') {
        // Filtrar el array de regiones para obtener solo los datos correspondientes a la región seleccionada
        this.tiendaFiltrada = this.Tiendas.filter((tienda) => tienda === this.tiendaSeleccionada);
        
        console.log(this.tiendaSeleccionada)
      } else {
        // Si se selecciona 'Regiones', mostrar todos los datos nuevamente
        this.tiendaFiltrada = this.Tiendas;
      }
  
}


  ngOnInit() {
    const fecha2 = new Date();
    const ObjcurrentDate = {
      year: fecha2.getFullYear(),
      month: fecha2.getMonth() + 1,
      day: fecha2.getDate(),
    };
    

    fecha2.setHours(fecha2.getHours() - 4);

    let fechaFormateada = fecha2.toISOString().split('T')[0];

  

      this.chartVisible = false;
      this.graficoVisible = false;
      this.Descripcion = []; // Limpiamos el arreglo de descripciones
      this.Total = [];
    
    this.fechaActual = fechaFormateada;

    console.log(this.agregar(this.Descripcion, this.Total));
    this.getNombreByFecha(this.fechaActual);
    this.service2
      .EntregasFechaConductor(fechaFormateada, undefined, undefined)
      .subscribe((data) => {
        this.arrayEntregasConductor = data;
        console.log(this.arrayEntregasConductor);
        this.arrayEntregasConductor.map((En) => {
          this.Descripcion.push(En.Descripcion);
          this.Total.push(En.Total);
          this.agregar(this.Descripcion, this.Total);
        });
        this.chartVisible = true;
        this.graficoVisible = true;
       

        this.arrayProductosConductor = [];
        this.service2
          .reporteEntregaConductor(fechaFormateada, undefined, undefined)
          .subscribe((data) => {
            this.arrayProductosConductor = data;
            console.log(this.arrayProductosConductor);
          });

        this.arrayeConductor = [];
        this.service2
          .eficienciaConductor(fechaFormateada, undefined, undefined)
          .subscribe((data) => {
            this.arrayeConductor = [data];
            console.log(this.arrayeConductor);
          });
      }); this.isLoadingTable = false;
      
      this.getRegiones()
  }
}


    
  



