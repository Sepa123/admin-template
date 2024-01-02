import { Component, OnInit } from '@angular/core';
import { PedidoService } from  'src/app/service/pedido.service'
import { PedidoSinCompromiso } from 'src/app/models/pedidoSinCompromiso.interface';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { TIService } from 'src/app/service/ti.service';
import { NsVerificado } from 'src/app/models/nsVerificado.interface'
import { CalendarOptions ,DateSelectArg} from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin  from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

   mesesNumeros: any = {
    enero: '01',
    febrero: '02',
    marzo: '03',
    abril: '04',
    mayo: '05',
    junio: '06',
    julio: '07',
    agosto: '08',
    septiembre: '09',
    octubre: '10',
    noviembre: '11',
    diciembre: '12'
  };
  fechasEntregadas : string [] = []

  eventos : any [] = []
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: (info) => {
      const fechaSeleccionada = info.event.start;
      
    // Formatea la fecha en "yyyymmdd"
      if (fechaSeleccionada !== null){
        const fechaFormateada = fechaSeleccionada.getFullYear() +
        ('0' + (fechaSeleccionada.getMonth() + 1)).slice(-2) +
        ('0' + fechaSeleccionada.getDate()).slice(-2);
        this.rutaService.get_reporte_rutas_diaria(fechaFormateada).subscribe((data) => {
          console.log(data)
        })

      }
    },
    events: this.eventos,
    locale: esLocale,
    datesSet:  (dateInfo) => {

      const fechaSeleccionada = dateInfo.view.title;

      const fecha = fechaSeleccionada.split(' de ')
      const mes = fecha[0]
      const año = fecha[1]
      const fechaFormateada = año+this.mesesNumeros[mes]
      console.log(fechaFormateada)
      
      if (this.fechasEntregadas.includes(fechaFormateada) == false){
        this.rutaService.get_reporte_rutas_mensuales(fechaFormateada).subscribe((data : any) => {
          this.eventos = data
          this.calendarOptions.events = this.eventos
          
          console.log(this.eventos)
        })

      }
    },
    plugins: [interactionPlugin ]
    
  };

  ngOnInit(){

    const fechaActual = new Date();

    // Obtener los componentes de la fecha
    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
    // Nota: `padStart` se utiliza para asegurarse de que el mes siempre tenga dos dígitos

    // Formatear la fecha como 'yyyymm'

    const fechaFormateada = `${año}${mes}`;
    this.fechasEntregadas.push(fechaFormateada)
    this.rutaService.get_reporte_rutas_mensuales(fechaFormateada).subscribe((data : any) => {
      this.eventos = data
      this.calendarOptions.events = this.eventos
      console.log(this.eventos)
    })
  }

  handleDateSelect(info: any) {
    alert('Event: ' + info.event.title);
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('View: ' + info.view.type);
  }


  clickFecha(){
    alert('date click! ' )
  }

  public colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  isLoadingTable: boolean = true;

  constructor(private service:TIService, private rutaService : RutasService) { }

  subPedido! :Subscription

  body : any = {

  }

  nsVerificados : NsVerificado [] = []

  fechaNs : string = ""


  loadPedidos : boolean = true


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


 ngOnDestroy(): void {

  }

}