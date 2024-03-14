import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { TIService } from 'src/app/service/ti.service';
import { NsVerificado } from 'src/app/models/nsVerificado.interface'
import { CalendarOptions ,DateSelectArg} from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin  from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import { DefontanaApiService } from 'src/app/service/defontana-api.service'

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

  datosMes : any = {}
  ArrDatosMes : any []= []
  
  eventos : any [] = []
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar : {
      // left: 'prev,next today',
      left : '',
      center: 'title',
      // right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    eventClick: (info) => {
      const fechaSeleccionada = info.event.start;
      
    // Formatea la fecha en "yyyymmdd"
      if (fechaSeleccionada !== null){
        const fechaFormateada = fechaSeleccionada.getFullYear() +
        ('0' + (fechaSeleccionada.getMonth() + 1)).slice(-2) +
        ('0' + fechaSeleccionada.getDate()).slice(-2);

        const fechaMuestra = fechaSeleccionada.getFullYear() + "-"+
        ('0' + (fechaSeleccionada.getMonth() + 1)).slice(-2) + "-"+
        ('0' + fechaSeleccionada.getDate()).slice(-2);

        if(info.event.title === "0") return alert(`En el dia ${fechaMuestra} no se encuentran rutas`)
        this.rutaService.download_reporte_rutas_diario_excel(fechaFormateada)

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
      
      
      if (this.fechasEntregadas.includes(fechaFormateada) == false){
        this.rutaService.get_reporte_rutas_mensuales(fechaFormateada).subscribe((data : any) => {
          // 
          this.fechasEntregadas.push(fechaFormateada)
          this.datosMes[fechaFormateada] = data
          this.eventos = data
          this.calendarOptions.events = this.eventos
        })

      } else {
        this.calendarOptions.events = this.datosMes[fechaFormateada]
      }
        
      // this.calendarOptions.events = this.eventos
    },
    plugins: [interactionPlugin ]
    
  };

  ngOnInit(){

    this.service.get_ventas().subscribe(data => {
      console.log(data.saleList)
    })
    // const fechaActual = new Date();

    // // Obtener los componentes de la fecha
    // const año = fechaActual.getFullYear();
    // const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
    // // Nota: `padStart` se utiliza para asegurarse de que el mes siempre tenga dos dígitos

    // // Formatear la fecha como 'yyyymm'

    // const fechaFormateada = `${año}${mes}`;
    // this.fechasEntregadas.push(fechaFormateada)
    // this.rutaService.get_reporte_rutas_mensuales(fechaFormateada).subscribe((data : any) => {
    //   this.eventos = data
    //   this.datosMes[fechaFormateada] = data
    //   this.calendarOptions.events = this.eventos
    //   console.log(this.eventos)
    // })
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

  constructor(private service:DefontanaApiService, private rutaService : RutasService) { }

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