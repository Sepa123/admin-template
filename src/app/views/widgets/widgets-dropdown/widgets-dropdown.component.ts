import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { getStyle } from '@coreui/utils';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { TIService } from 'src/app/service/ti.service';
import { Pedidos } from 'src/app/models/pedido.interface';
import { RutaBeetrackHoy } from 'src/app/models/rutaBeetrackHoy.interface'
import { Subscription } from 'rxjs';
import { PedidosPendientes } from 'src/app/models/pedidoPendiente.interface';
import { PendienteBodega } from 'src/app/models/pendienteBodega.interface';


@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {
  // isGreen: boolean = true;
  public isLoadingBeetrack: boolean = true;
  constructor(
    private changeDetectorRef: ChangeDetectorRef, private service: TIService
  ) {  
  }

  subPedidos!: Subscription
  subBeetrackHoy!: Subscription

  subPedidosPendientesTotal!: Subscription
  subPedidosPendientesEntregados!: Subscription
  subPedidosPendientesNoEntregados!: Subscription
  subPedidosPendientesEnRuta!: Subscription

  pedidos!:Pedidos[]

  ocultarTabla: boolean = true
  noData: boolean = false
  rutasBeetrackHoy!: RutaBeetrackHoy []
  rutasBeetrackHoyFullData!: RutaBeetrackHoy []
  
  regiones! : string []

  pendientesBodega : PendienteBodega [] = []
 
  pedidosPendientesTotal!: PedidosPendientes[]
  pedidosPendientesEntregados!: PedidosPendientes[]
  pedidosPendientesNoEntregados!: PedidosPendientes[]
  pedidosPendientesEnRuta!: PedidosPendientes[]

  data: any[] = [];
  options: any[] = [];
  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April'
  ];
  datasets = [
    [{
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [0, 59, 66, 84, 51, 55, 40]
    }], [{
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-info'),
      pointHoverBorderColor: getStyle('--cui-info'),
      data: [1, 18, 33, 17, 34, 22, 11]
    }], [{
      label: 'My Third dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-warning'),
      pointHoverBorderColor: getStyle('--cui-warning'),
      data: [78, 81, 80, 45, 34, 12, 40],
      fill: true
    }], 
    [{
      label: 'My Fourth dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 10],
      barPercentage: 0.7
    }]
  ];
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };


  ngOnInit(): void {
    // this.setData();
    setTimeout( () => {
      this.service.get_ruta_beetrack_hoy().subscribe((data) => {
        this.rutasBeetrackHoy  = data
        this.rutasBeetrackHoyFullData = this.rutasBeetrackHoy
        this.isLoadingBeetrack = false
  
        this.regiones = [...new Set(this.rutasBeetrackHoyFullData.map(ruta => ruta.Region))];
  
        // console.log(this.region)
  
        if(this.rutasBeetrackHoy.length == 0) {
          this.noData = true
        }
      })
    },600)

    this.service.get_pedidos().subscribe((data) => {
      this.pedidos = data
      this.pedidos[0]["Total_pedidos"] == null ? alert("Hubo un error al cargar los datos de beetrack, Por favor espere un tiempo") 
                                                : console.log(true)
    })


    setTimeout( () => {
      this.getPendientesBodegas();
    },100)

    this.getPedidosPendientes();

    // Subcripciones 
    this.subPedidos = this.service.get_pedidos_update().subscribe((update_data) => {
      this.pedidos = update_data
    })

    this.subBeetrackHoy = this.service.get_ruta_beetrack_hoy_update().subscribe((update_data) => {
      this.rutasBeetrackHoy = update_data
    })

    this.subPedidosPendientes();

  }

  getPendientesBodegas(){
    this.service.get_pendientes_bodega().subscribe((data) => {
      this.pendientesBodega = data
    })
  }

  filterByRegion(region : string) {
    this.rutasBeetrackHoy = this.rutasBeetrackHoyFullData
    this.rutasBeetrackHoy = this.rutasBeetrackHoy.filter(ruta => ruta.Region === region)
  }

  getAllRegion() {
    this.rutasBeetrackHoy = this.rutasBeetrackHoyFullData
  }

  getPedidosPendientes() {
    this.service.get_pedidos_pendientes_total().subscribe((data) => {
      this.pedidosPendientesTotal = data
    })

    this.service.get_pedidos_pendientes_entregados().subscribe((data) => {
      this.pedidosPendientesEntregados = data
    })

    this.service.get_pedidos_pendientes_no_entregados().subscribe((data) => {
      this.pedidosPendientesNoEntregados = data
    })

    this.service.get_pedidos_pendientes_en_ruta().subscribe((data) => {
      this.pedidosPendientesEnRuta = data
    })
    
  }

  subPedidosPendientes() {
    this.subPedidosPendientesTotal = this.service.get_pedidos_pendientes_total_update().subscribe((update_data) => {
      this.pedidosPendientesTotal = update_data
    })

    this.subPedidosPendientesEntregados = this.service.get_pedidos_pendientes_entregados_update().subscribe((update_data) => {
      this.pedidosPendientesEntregados = update_data
    })

    this.subPedidosPendientesNoEntregados = this.service.get_pedidos_pendientes_no_entregados_update().subscribe((update_data) => {
      this.pedidosPendientesNoEntregados = update_data
    })

    this.subPedidosPendientesEnRuta = this.service.get_pedidos_pendientes_en_ruta_update().subscribe((update_data => {
      this.pedidosPendientesEnRuta = update_data
    }))
  }


  hideTable() {
      return this.ocultarTabla = false;  
    }

  showTable() {
    return this.ocultarTabla = true;  
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.subPedidos.unsubscribe()
    this.subBeetrackHoy.unsubscribe()
    this.subPedidosPendientesTotal.unsubscribe()
    this.subPedidosPendientesEntregados.unsubscribe()
    this.subPedidosPendientesNoEntregados.unsubscribe()
    this.subPedidosPendientesEnRuta.unsubscribe()
  }
 
  setData() {
    for (let idx = 0; idx < 4; idx++) {
      this.data[idx] = {
        labels: idx < 3 ? this.labels.slice(0, 7) : this.labels,
        datasets: this.datasets[idx]
      };
      console.log(this.data[idx]["labels"])
    }
    this.setOptions();
  }
  // graficos diseño , limite min y
  setOptions() {
    for (let idx = 0; idx < 4; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault));
      switch (idx) {
        case 0: {
          this.options.push(options);
          break;
        }
        case 1: {
          options.scales.y.min = -9;
          options.scales.y.max = 39;
          this.options.push(options);
          break;
        }
        case 2: {
          options.scales.x = { display: false };
          options.scales.y = { display: false };
          options.elements.line.borderWidth = 2;
          options.elements.point.radius = 0;
          this.options.push(options);
          break;
        }
        case 3: {
          options.scales.x.grid = { display: false, drawTicks: false };
          options.scales.x.grid = { display: false, drawTicks: false, drawBorder: false };
          options.scales.y.min = undefined;
          options.scales.y.max = undefined;
          options.elements = {};
          this.options.push(options);
          break;
        }
      }
    }
  }
}

@Component({
  selector: 'app-chart-sample',
  template: '<c-chart type="line" [data]="data" [options]="options" width="300" #chart></c-chart>'
})
export class ChartSample implements AfterViewInit {

  constructor() {}

  @ViewChild('chart') chartComponent!: ChartjsComponent;

  colors = {
    label: 'My dataset',
    backgroundColor: 'rgba(77,189,116,.2)',
    borderColor: '#4dbd74',
    pointHoverBackgroundColor: '#fff'
  };

  labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  data = {
    labels: this.labels,
    datasets: [{
      data: [65, 59, 84, 84, 51, 55, 40],
      ...this.colors,
      fill: { value: 65 }
    }]
  };

  options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      const data = () => {
        return {
          ...this.data,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            ...this.data.datasets[0],
            data: [42, 88, 42, 66, 77],
            fill: { value: 55 }
          }, { ...this.data.datasets[0], borderColor: '#ffbd47', data: [88, 42, 66, 77, 42] }]
        };
      };
      const newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const newData = [42, 88, 42, 66, 77];
      let { datasets, labels } = { ...this.data };
      // @ts-ignore
      const before = this.chartComponent?.chart?.data.datasets.length;
      console.log('before', before);
      // console.log('datasets, labels', datasets, labels)
      // @ts-ignore
      // this.data = data()
      this.data = {
        ...this.data,
        datasets: [{ ...this.data.datasets[0], data: newData }, {
          ...this.data.datasets[0],
          borderColor: '#ffbd47',
          data: [88, 42, 66, 77, 42]
        }],
        labels: newLabels
      };
      // console.log('datasets, labels', { datasets, labels } = {...this.data})
      // @ts-ignore
      setTimeout(() => {
        const after = this.chartComponent?.chart?.data.datasets.length;
        console.log('after', after);
      });
    }, 5000);
  }
}
