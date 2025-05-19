import { Component, OnInit } from '@angular/core';
// import { TIService } from "src/app/service/ti.service";
// import { Carga } from 'src/app/models/cargas.interface';
// import { NroCargasPorHora } from "src/app/models/nroCargasPorHora.interface"
// import { ReporteEasyRegion } from 'src/app/models/reporteEasyRegion.interface';
// import { CargasComparacion } from 'src/app/models/cargasComparacion.interface';
// import { PedidoEasyOPL } from 'src/app/models/pedidoEasyOPL.interface';
// import { PedidosSinTienda } from 'src/app/models/pedidoSinTienda.interface';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosComponent implements OnInit {
  // public items = <any>[];
  subscription!: Subscription
  subscriptionRegion!: Subscription
  subCargasEasyAPI!: Subscription
  subCargasEasyWMS!: Subscription

  isLoadingCargaComparacionAPI: boolean = true
  isLoadingCargaComparacionWMS: boolean = true
  isLoadingCarga: boolean = true
  isLoadingEasyRegion: boolean = true
  isLoadingEasyOPL: boolean = true
  isLoadingSinTienda: boolean = true
  noData: boolean = false
  
  dataencontrada: any[] = [];
  countdown: number = 60; //
  
  private intervalId: any; // ID del intervalo para limpiar después
  // constructor( private service : TIService, private http: HttpClient,) {}

  constructor(
    private http: HttpClient
  ) {}
  // cargasEasyAPI!: CargasComparacion[]
  // cargasEasyWMS!: CargasComparacion[]
  // ocultarTablaComparacion: boolean = true
  // // carga!: Carga[]
  // cargaHora! : NroCargasPorHora[]
  // ocultarTabla: boolean = true
  // pedidoSinTiendas! : PedidosSinTienda[]
  // pedidoEasyOPL! : PedidoEasyOPL[]

  // easyRegion!:ReporteEasyRegion[]


  ngOnInit(): void{
    
  

    // setTimeout(() => {
    //   this.service.get_cargas_por_hora_init().subscribe((data) => {
    //     this.cargaHora = data;
    //     this.isLoadingCarga = false;
    //   })

    // }, 2100);
    
    // this.subscription = this.service.get_cargas_por_hora().subscribe((data) => {
    //   this.cargaHora = data;
    //   this.isLoadingCarga = false;
    // })

    // this.subscriptionRegion = this.service.get_reportes_easy_region().subscribe(data => {
    //   this.easyRegion = data;
    //   this.isLoadingEasyRegion = false;
    // })

    // this.subscripcionCargasComparacion()


    // setTimeout(() => {
    //   this.service.get_pedidos_sin_tienda().subscribe((data) => {
    //     this.pedidoSinTiendas = data
    //     this.isLoadingSinTienda = false
        
    //     if(this.pedidoSinTiendas.length === 0){
    //       this.noData = true
    //     }
    //   })
    // }, 400);

    // setTimeout(() => {
    //   console.log("Delayed for 1 second.");
    // }, 700);

    // setTimeout(() => {
    //   this.service.get_pedidos_tienda_easy_opl().subscribe((data) => {
    //     this.pedidoEasyOPL = data
    //     this.isLoadingEasyOPL = false
    //   })
    // }, 1000);

    // setTimeout(() => {
    //   this.service.get_cargas_easy_api().subscribe(data => {
    //     this.cargasEasyAPI = data
    //     this.isLoadingCargaComparacionAPI = false;
    //   })
  
    //   this.service.get_cargas_easy_wms().subscribe(data => {
    //     this.cargasEasyWMS = data
    //     this.isLoadingCargaComparacionWMS = false;
    //   })
    // }, 1300); 
    this.getCount();
    this.getData();
    this.getClientesEntregas();
    this.intervalId = setInterval(() => {
      this.getData();
      this.getClientesEntregas();
      this.resetCountdown();
    }, 60000); // 60000 ms = 60 segundos
    // Configurar un intervalo para limpiar el caché cada 30 segundos
    
    this.startCountdown();
  }
  

  // intervalo para refrescar cada 30 segundos
  private countdownIntervalId: any;
  startCountdown(): void {
      // Configurar el intervalo para actualizar la cuenta regresiva cada segundo
      this.countdownIntervalId = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--; // Reducir la cuenta regresiva
          
        } else {
          this.resetCountdown(); // Reiniciar la cuenta regresiva cuando llegue a 0
        }
      }, 1000); // 1 segundo
    }

  resetCountdown(): void {
    this.countdown = 60; // Reiniciar la cuenta regresiva a 30 segundos
  }

  private svg: any;
  private margin = { top: 20, right: 30, bottom: 50, left: 30 };
  private width = 575 - this.margin.left - this.margin.right;
  private height = 300 - this.margin.top - this.margin.bottom;

  private createSvg(): void {
    this.svg = d3
      .select('#lineChart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

private drawChart(): void {
  // Limpiar el contenedor del gráfico antes de dibujar
  d3.select('#lineChart').selectAll('*').remove();

  // Crear el contenedor SVG
  this.createSvg();

  // Parsear la hora y crear una nueva propiedad para no modificar el valor original
  const parseTime = d3.timeParse('%H:%M');
  this.dataencontrada.forEach((d) => {
    d.Hora_Ingreso_Parsed = parseTime(d.Hora_Ingreso); // Nueva propiedad
  });

  // Crear las escalas
  const x = d3
    .scaleTime()
    .domain(d3.extent(this.dataencontrada, (d: any) => d.Hora_Ingreso_Parsed) as [Date, Date])
    .range([0, this.width]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(this.dataencontrada, (d: any) => d.Entregas) as number])
    .range([this.height, 0]);

  // Agregar el eje X
  this.svg
    .append('g')
    .attr('transform', `translate(0,${this.height})`)
    .call(
      d3.axisBottom(x).tickFormat((domainValue: Date | d3.NumberValue) => {
        if (domainValue instanceof Date) {
          return d3.timeFormat('%H:%M')(domainValue); // Formatear si es una fecha
        }
        return ''; // Devolver una cadena vacía si no es una fecha
      })
    );

  // Agregar el eje Y
  this.svg.append('g').call(d3.axisLeft(y));

  // Agregar la línea
  this.svg
    .append('path')
    .datum(this.dataencontrada)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr(
      'd',
      d3
        .line()
        .x((d: any) => x(d.Hora_Ingreso_Parsed))
        .y((d: any) => y(d.Entregas))
    );

  // Agregar puntos
  this.svg
    .selectAll('circle')
    .data(this.dataencontrada)
    .enter()
    .append('circle')
    .attr('cx', (d: any) => x(d.Hora_Ingreso_Parsed))
    .attr('cy', (d: any) => y(d.Entregas))
    .attr('r', 4)
    .attr('fill', 'steelblue');

  // Agregar tooltips
  const tooltip = d3
    .select('#lineChart')
    .append('div')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('background', '#fff')
    .style('border', '1px solid #ccc')
    .style('padding', '5px')
    .style('border-radius', '5px');

  this.svg
    .selectAll('circle')
    .on('mouseover', (event: any, d: any) => {
      tooltip
        .style('opacity', 1)
        .html(`Hora: ${d.Hora_Ingreso}<br>Entregas: ${d.Entregas}`)
        .style('left', event.pageX + 'px')
        .style('top', event.pageY - 28 + 'px');
    })
    .on('mouseout', () => {
      tooltip.style('opacity', 0);
    });
}

//   subscripcionCargasComparacion () {
//     this.subCargasEasyAPI = this.service.get_cargas_easy_api_update().subscribe( update_data => {
//       this.cargasEasyAPI = update_data
//     })

//     this.subCargasEasyWMS = this.service.get_cargas_easy_wms_update().subscribe( update_data => {
//       this.cargasEasyWMS = update_data
//     })
//   }

    private readonly baseImageUrl =
    'https://hela.transyanez.cl/api/panel/image/foto_perfil/'; // URL base
    totalPedidos: number = 0; // Contador de todos los pedidos
    totalBultos: number = 0;  // Contador de todos los bultos
    TableData: any[] = [];
    isLoadingTableData: boolean = false; // Para controlar la carga de datos de la tabla
    isLoadingChartData: boolean = false; // Para controlar la carga de datos del gráfico
    
getData(): void {
  if (this.isLoadingTableData || this.isLoadingChartData) {
    console.log('La carga de datos ya está en progreso.');
    return;
  }

  this.isLoadingTableData = true;
  this.isLoadingChartData = true;

  const url = 'http://127.0.0.1:8000/api/resumenHoraProductos';

  this.http.get(url).subscribe(
    (response: any) => {
      const newData = (response as { resultados: any[] }).resultados;

      // Procesar datos para la tabla
      this.TableData = [...newData];
      this.TableData.forEach((item: any) => {
        item.imageClienteUrl =
          this.baseImageUrl + (item.imagen_cliente || 'default.jpg');
      });

      
      // Procesar datos para el gráfico
      const today = new Date().toISOString().split('T')[0];
      this.dataencontrada = newData.filter((item: any) => item.Fecha === today);

      this.drawChart();
    },
    (error: any) => {
      console.error('Error al obtener los datos:', error);
    },
    () => {
      this.isLoadingTableData = false;
      this.isLoadingChartData = false;
    }
  );
}

clientesEntregas: any[] = [];

getClientesEntregas(): void {
  const url = 'http://127.0.0.1:8000/api/Cliente-Png-entregas';
  const baseImageUrl = 'https://hela.transyanez.cl/api/panel/image/foto_perfil/';

  this.http.get(url).subscribe(
    (response: any) => {
      // Si la respuesta es { resultados: [...] }
      const data = Array.isArray(response) ? response : response.resultados;
      this.clientesEntregas = (data as any[]).map(item => ({
        ...item,
        imagen_cliente_url: baseImageUrl + (item.imagen_cliente || 'default.jpg')
      }));
    },
    (error: any) => {
      console.error('Error al obtener los datos de clientes entregas:', error);
    }
  );
}

Count:  any[] = [];
getCount(): void {
  const url = 'http://127.0.0.1:8000/api/Count';

  this.http.get(url).subscribe(
    (response: any) => {
      // Si la respuesta es { resultados: [...] }
      const data = Array.isArray(response) ? response : response.resultados;
      this.Count = data
    },
    (error: any) => {
      console.error('Error al obtener los datos de clientes entregas:', error);
    }
  );
}

//   hideTable() {
//     return this.ocultarTabla = false;  
//   }

//   showTable() {
//     return this.ocultarTabla = true;  
//   }

//   hideTableComparacion() {
//     return this.ocultarTablaComparacion = false;  
//   }

//   showTableComparacion() {
//     return this.ocultarTablaComparacion = true;  
//   }

 ngOnDestroy(): void {
//     // Cancelar la suscripción al destruir el componente
     // Limpiar el intervalo al destruir el componente
     // Limpiar los intervalos al destruir el componente
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.countdownIntervalId) {
      clearInterval(this.countdownIntervalId);
    }
//     this.subscription.unsubscribe();
//     this.subscriptionRegion.unsubscribe();
//     this.subCargasEasyAPI.unsubscribe();
//     this.subCargasEasyWMS.unsubscribe();

   }
}