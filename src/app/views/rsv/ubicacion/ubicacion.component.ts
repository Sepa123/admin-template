import { Component,ElementRef ,ViewChild, AfterViewInit} from '@angular/core';
import { RsvService } from 'src/app/service/rsv.service'
import { EstructuraRSV } from 'src/app/models/estructuraRSV.interface';
import { PesoPosicionSucursal } from "src/app/models/pesoPosicionSucursal.interface"
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { TipoEstructura } from 'src/app/models/tipoEstructuraRSV.interface'

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class UbicacionComponent {

  @ViewChild('myCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  // grafico pie
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      datalabels: {
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
        display: true // Mostrar etiquetas de datos
    }
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

  estructuraDato : EstructuraRSV [] = []

  listaEstructura : EstructuraRSV [] = []
  estructuraSeleccion : string = ""
  sucursalSeleccion : string = ""
  sucursalesRSV : SucursalRSV [] = []
  listaPesoSucursal : PesoPosicionSucursal [] = []
  public rol = sessionStorage.getItem("rol_id")

  posicion : string = ""

  chartVisible : boolean = false

  buttonAreasFull : any [] = [
    { x: 110, y: 283, width: 32, height: 32 ,texto: "", pos : '1' },
    { x: 112, y: 328, width: 32, height: 32 ,texto: "", pos : '2'},
    { x: 112, y: 368, width: 32, height: 32 ,texto: "", pos : '3' },
    { x: 112, y: 408, width: 32, height: 32 ,texto: "", pos : '4'},

    { x: 260, y: 283, width: 32, height: 32 ,texto: "", pos : '5'},
    { x: 260, y: 328, width: 32, height: 32 ,texto: "", pos : '6'},
    { x: 260, y: 368, width: 32, height: 32 ,texto: "", pos : '7'},
    { x: 260, y: 408, width: 32, height: 32 ,texto: "", pos : '8'},

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
    
    { x: 182, y: 194, width: 32, height: 32 ,texto: "", pos : '17'},
  ];

  buttonAreas19 : any [] = [
    { x: 110, y: 283, width: 32, height: 32 ,texto: "", pos : '1' },
    { x: 112, y: 328, width: 32, height: 32 ,texto: "", pos : '2'},
    { x: 112, y: 368, width: 32, height: 32 ,texto: "", pos : '3' },
    { x: 112, y: 408, width: 32, height: 32 ,texto: "", pos : '4'},

    { x: 260, y: 283, width: 32, height: 32 ,texto: "", pos : '5'},
    { x: 260, y: 328, width: 32, height: 32 ,texto: "", pos : '6'},
    { x: 260, y: 368, width: 32, height: 32 ,texto: "", pos : '7'},
    { x: 260, y: 408, width: 32, height: 32 ,texto: "", pos : '8'},

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
    
    { x: 182, y: 194, width: 32, height: 32 ,texto: "", pos : '17'},
  ];

  objButtonAreas : any  = {
     4 :  [{ x: 110, y: 283, width: 32, height: 32 ,texto: "", pos : '1' },
            { x: 112, y: 328, width: 32, height: 32 ,texto: "", pos : '2'},
            { x: 112, y: 368, width: 32, height: 32 ,texto: "", pos : '3' },
            { x: 112, y: 408, width: 32, height: 32 ,texto: "", pos : '4'}],

     19 :  [{ x: 110, y: 283, width: 32, height: 32 ,texto: "", pos : '1' },
            { x: 112, y: 328, width: 32, height: 32 ,texto: "", pos : '2'},
            { x: 112, y: 368, width: 32, height: 32 ,texto: "", pos : '3' },
            { x: 112, y: 408, width: 32, height: 32 ,texto: "", pos : '4'},

            { x: 260, y: 283, width: 32, height: 32 ,texto: "", pos : '5'},
            { x: 260, y: 328, width: 32, height: 32 ,texto: "", pos : '6'},
            { x: 260, y: 368, width: 32, height: 32 ,texto: "", pos : '7'},
            { x: 260, y: 408, width: 32, height: 32 ,texto: "", pos : '8'},

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
            
            { x: 182, y: 194, width: 32, height: 32 ,texto: "", pos : '17'}],

      21 : [{ x: 110, y: 283, width: 32, height: 32 ,texto: "", pos : '1' },
            { x: 112, y: 328, width: 32, height: 32 ,texto: "", pos : '2'},
            { x: 112, y: 368, width: 32, height: 32 ,texto: "", pos : '3' },
            { x: 112, y: 408, width: 32, height: 32 ,texto: "", pos : '4'},

            { x: 260, y: 283, width: 32, height: 32 ,texto: "", pos : '5'},
            { x: 260, y: 328, width: 32, height: 32 ,texto: "", pos : '6'},
            { x: 260, y: 368, width: 32, height: 32 ,texto: "", pos : '7'},
            { x: 260, y: 408, width: 32, height: 32 ,texto: "", pos : '8'},

            { x: 43, y: 180, width: 32, height: 32 ,texto: "", pos : '9'},
            { x: 43, y: 146, width: 32, height: 32 ,texto: "", pos : '10'},
            { x: 43, y: 114, width: 32, height: 32 ,texto: "", pos : '11'},
            { x: 43, y: 82, width: 32, height: 32 ,texto: "", pos : '12'},
            { x: 43, y: 50, width: 32, height: 32 ,texto: "", pos : '13'},
            { x: 43, y: 18, width: 32, height: 32 ,texto: "", pos : '14'},

            { x: 333, y: 180, width: 32, height: 32 ,texto: "", pos : '15'},
            { x: 333, y: 146, width: 32, height: 32 ,texto: "", pos : '16'},
            { x: 333, y: 114, width: 32, height: 32 ,texto: "", pos : '17'},
            { x: 333, y: 82,  width: 32, height: 32 ,texto: "", pos : '18'},
            { x: 333, y: 50,  width: 32, height: 32 ,texto: "", pos : '19'},
            { x: 333, y: 18,  width: 32, height: 32 ,texto: "", pos : '20'},
            
            // { x: 182, y: 194, width: 32, height: 32 ,texto: "", pos : '17'}],
            { x: 182, y: 194, width: 32, height: 32 ,texto: "", pos : '21'}],
  }


  
   buttonAreas  = this.buttonAreasFull

  tiposEstructuras : TipoEstructura [] =[]

  
  constructor(private service : RsvService, public builder: FormBuilder,) {}

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

    this.estructuraDato = this.listaEstructura.filter(lista => lista.Nombre === this.estructuraSeleccion)

    let body = {
      Derecha : this.estructuraDato[0].Arr_balancelo[0].split(" "),
      Izquierda : this.estructuraDato[0].Arr_balancelo[1].split(" "),
      Estructura : this.estructuraSeleccion,
      Sucursal : this.sucursalSeleccion
    }

    this.service.calcular_suma_peso_posicion_sucursal(body).subscribe((data : any) => {
      console.log(data.Suma_derecha)
      
      if(data.Suma_derecha == null || data.Suma_izquerda == null){
        this.chartVisible = false   
      }else{
        // this.agregar(["Derecha","Izquierda"], [ data.Suma_derecha, data.Suma_izquerda ] )
        this.agregar(["Izquierda","Derecha"], [ data.Suma_izquerda, data.Suma_derecha ] )
      }
    })
    

    img.onload = () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      // ctx?.drawImage(img2, 200, 200, 32, 32);
    };

    img2.onload = () => {
      // ctx?.fillRect(185, 100,33, 33);
      // ctx?.fillRect(132, 150,140, 33);

      let espacios = this.listaEstructura.filter(lista => lista.Nombre == this.estructuraSeleccion)[0].Cantidad_espacios

      
      console.log("espacios",espacios)
      for (let i = 0; i < espacios; i++) {
        this.objButtonAreas[espacios][i].texto = this.estructuraSeleccion
        ctx?.drawImage(img2,  this.objButtonAreas[espacios][i].x,  this.objButtonAreas[espacios][i].y,  this.objButtonAreas[espacios][i].width,  this.objButtonAreas[espacios][i].height);
        ctx?.fillText( this.objButtonAreas[espacios][i].texto+ this.objButtonAreas[espacios][i].pos,  this.objButtonAreas[espacios][i].x,  this.objButtonAreas[espacios][i].y);
      }
    }

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

      let espacios = this.listaEstructura.filter(lista => lista.Nombre == this.estructuraSeleccion)[0].Cantidad_espacios
      for (let i = 0; i < this.objButtonAreas[espacios].length; i++) {
        const area = this.objButtonAreas[espacios][i];
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

  isErrorView : boolean = false


  registrarEstructura(){
    
  }

  agregarEstructura(){
    this.toggleLiveDemo()
  }

  ngOnInit(){

    Chart.register(ChartDataLabels);
    
    this.service.get_lista_estructura().subscribe(data => {
      this.listaEstructura = data
      this.listaEstructura.map(lista=> {
        if(lista.Balanceo == null) return lista.Arr_balancelo = ['','']
        return lista.Arr_balancelo = lista.Balanceo?.split(' - ')
      })

    })

    this.service.get_tipo_estructura().subscribe((data) => {
      this.tiposEstructuras = data
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
