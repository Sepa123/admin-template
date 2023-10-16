import { Component,ElementRef ,ViewChild, AfterViewInit} from '@angular/core';
import { RsvService } from 'src/app/service/rsv.service'
import { EstructuraRSV } from 'src/app/models/estructuraRSV.interface';
import { PesoPosicionSucursal } from "src/app/models/pesoPosicionSucursal.interface"
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType, ChartOptions,ChartDataset} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class UbicacionComponent {

  @ViewChild('myCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  // grafico pie
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      datalabels: { // Configuración específica para chartjs-plugin-datalabels
        display: true,
        anchor: "center",
        color: 'black', // Color del texto de los datos
        formatter: (value, context) => {
          return "value"; // Puedes personalizar el formato de los datos aquí
        }
      }
    }
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
  estructuraDato : EstructuraRSV [] = []

  listaEstructura : EstructuraRSV [] = []
  estructuraSeleccion : string = ""
  sucursalSeleccion : string = ""
  sucursalesRSV : SucursalRSV [] = []
  listaPesoSucursal : PesoPosicionSucursal [] = []
  public rol = sessionStorage.getItem("rol_id")

  posicion : string = ""

  chartVisible : boolean = false

  buttonAreas : any [] = [
    { x: 110, y: 233, width: 32, height: 32 ,texto: "", pos : '1' },
    { x: 112, y: 278, width: 32, height: 32 ,texto: "", pos : '2'},
    { x: 112, y: 318, width: 32, height: 32 ,texto: "", pos : '3' },
    { x: 112, y: 358, width: 32, height: 32 ,texto: "", pos : '4'},

    { x: 260, y: 233, width: 32, height: 32 ,texto: "", pos : '5'},
    { x: 260, y: 278, width: 32, height: 32 ,texto: "", pos : '6'},
    { x: 260, y: 318, width: 32, height: 32 ,texto: "", pos : '7'},
    { x: 260, y: 358, width: 32, height: 32 ,texto: "", pos : '8'},

    { x: 43, y: 146, width: 32, height: 32 ,texto: "", pos : '9'},
    { x: 43, y: 114, width: 32, height: 32 ,texto: "", pos : '10'},
    { x: 43, y: 82, width: 32, height: 32 ,texto: "", pos : '11'},
    { x: 43, y: 50, width: 32, height: 32 ,texto: "", pos : '12'},
    { x: 43, y: 18, width: 32, height: 32 ,texto: "", pos : '19'},

    { x: 333, y: 146, width: 32, height: 32 ,texto: "", pos : '13'},
    { x: 333, y: 114, width: 32, height: 32 ,texto: "", pos : '14'},
    { x: 333, y: 82,  width: 32, height: 32 ,texto: "", pos : '15'},
    { x: 333, y: 50,  width: 32, height: 32 ,texto: "", pos : '16'},
    { x: 333, y: 18,  width: 32, height: 32 ,texto: "", pos : '18'},
    
    { x: 182, y: 170, width: 32, height: 32 ,texto: "", pos : '17'},
    
    // Área del primer botón (x, y, ancho, alto
    // Agrega más áreas de botón si es necesario
  ];

  
  constructor(private service : RsvService) {}

  // modales
  isModalOpen: boolean = false
  public visible = false;

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


  agregar(label : string [], data : number []){

    this.pieChartData.labels = label
    this.pieChartData.datasets[0].data = data

    this.chartVisible = true
   }

  

  buscarEstructura(){

    if(this.estructuraSeleccion == "" ) {
      return alert ("Seleccione una estructura")
    } else if (this.sucursalSeleccion == ""){
      return alert ("Seleccione una sucursal")
    }

    this.chartVisible = false


    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');

    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = '../../../../assets/images/rsvModel.png'; // Reemplaza esto con la ruta de tu imagen en la carpeta de assets

    // Cargar el contenido SVG como un Blob
    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 8.286C8.454 8.286 2.5 16 2.5 16s5.954 7.715 13.5 7.715c5.77 0 13.5-7.715 13.5-7.715S21.77 8.286 16 8.286zm0 12.52c-2.65 0-4.807-2.156-4.807-4.806S13.35 11.193 16 11.193S20.807 13.35 20.807 16S18.65 20.807 16 20.807zm0-7.612a2.806 2.806 0 1 0 0 5.611a2.806 2.806 0 0 0 0-5.611z"/></svg>';
    var blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(blob);

    const img2 = new Image();
    img2.src = url;

    this.service.calcular_suma_peso_posicion_sucursal(this.estructuraSeleccion,this.sucursalSeleccion).subscribe((data : any) => {
      console.log(data.Suma_derecha)
      
      this.estructuraDato = this.listaEstructura.filter(est => est.Nombre === this.estructuraSeleccion)
      this.agregar(["Derecha","Izquierda"], [ data.Suma_derecha, data.Suma_izquerda ] )
      if(data.Suma_derecha == null || data.Suma_izquerda == null) {
        this.chartVisible = false
      }
    })
    
    // const arrBalanceo = this.listaEstructura.find(lista => lista.Nombre == this.estructuraSeleccion)?.Balanceo?.split(' - ')
    
    // if (arrBalanceo !== undefined) {
    //   arrBalanceo.map( bal => {
    //     console.log(bal.split(' '))
    //   })
    // }

    img.onload = () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      // ctx?.drawImage(img2, 200, 200, 32, 32);
    };

    img2.onload = () => {
      // ctx?.fillRect(185, 100,33, 33);
      // ctx?.fillRect(132, 150,140, 33);
      const espacio = this.listaEstructura.filter(lista => lista.Nombre === this.estructuraSeleccion)[0].Cantidad_espacios

      for (let i = 0; i < espacio; i++) {
        this.buttonAreas[i].texto = this.estructuraSeleccion
        ctx?.drawImage(img2,  this.buttonAreas[i].x,  this.buttonAreas[i].y,  this.buttonAreas[i].width,  this.buttonAreas[i].height);
        ctx?.fillText( this.buttonAreas[i].texto+ this.buttonAreas[i].pos,  this.buttonAreas[i].x,  this.buttonAreas[i].y);
      }

      // this.buttonAreas.map((button => {
      //   button.texto = this.estructuraSeleccion
      //   // ctx?.fillRect(button.x, button.y,button.width, button.height);

      //   ctx?.drawImage(img2, button.x, button.y, button.width, button.height);
      //   ctx?.fillText(button.texto+button.pos, button.x, button.y);
      // }))
    }


    // this.agregar(["Derecha","Izquierda"], [ 2,5] )
    

  }

  ngAfterViewInit(){
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = '../../../../assets/images/rsvModel.png'; // Reemplaza esto con la ruta de tu imagen en la carpeta de assets

    // Cargar el contenido SVG como un Blob
    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 8.286C8.454 8.286 2.5 16 2.5 16s5.954 7.715 13.5 7.715c5.77 0 13.5-7.715 13.5-7.715S21.77 8.286 16 8.286zm0 12.52c-2.65 0-4.807-2.156-4.807-4.806S13.35 11.193 16 11.193S20.807 13.35 20.807 16S18.65 20.807 16 20.807zm0-7.612a2.806 2.806 0 1 0 0 5.611a2.806 2.806 0 0 0 0-5.611z"/></svg>';
    var blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(blob);

    const img2 = new Image();
    img2.src = url;


    img.onload = () => {
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      // buttonAreas.map((button => {
      //   button.texto = this.estructuraSeleccion+this.sucursalSeleccion
      //   ctx?.drawImage(img2, button.x, button.y, button.width, button.height);
      //   ctx?.fillText(button.texto, button.x, button.y);
      // }))

      // ctx?.drawImage(img2, 200, 200, 32, 32);
    };



    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      for (let i = 0; i < this.buttonAreas.length; i++) {
        const area = this.buttonAreas[i];
        if (mouseX >= area.x && mouseX <= area.x + area.width && mouseY >= area.y && mouseY <= area.y + area.height) {
          // El clic está dentro de esta área de botón
          // alert(`Haz presionado el botón ${i + 1}`);
          this.posicion =  this.estructuraSeleccion + area.pos
          // const posicion = this.estructuraSeleccion + area.pos
          this.verProductoPesoEstructura(this.posicion, parseInt(this.sucursalSeleccion))

          // Realiza las acciones que desees cuando se presione el botón aquí
          break;
        } else {
          console.log("nell")
        }
      }
    })
  }

  ngOnInit(){
    this.service.get_lista_estructura().subscribe(data => {
      this.listaEstructura = data
      this.listaEstructura.map((lista) => {
        if(lista.Balanceo === null) return lista.Arr_balancelo = ['','']
        return lista.Arr_balancelo = lista.Balanceo?.split(' - ')
      })

    })

    setTimeout(() => {
      this.service.get_sucursales().subscribe((data) => {
        this.sucursalesRSV = data
        if(this.rol !== '5'){
          this.sucursalesRSV = this.sucursalesRSV.filter(sucursal => sucursal.Id !== 2)
        }
      })
    },500)

  }

  selecccionarEstructura(){
    alert(this.estructuraSeleccion)
  }

  verProductoPesoEstructura(posicion : string , suc : number){
    this.service.get_peso_posicion_sucursal(posicion, suc).subscribe((data) => {
      console.log(data)
      this.listaPesoSucursal = data
      this.toggleLiveDemo()
    })
  }
}
