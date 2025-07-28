import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RutasService } from 'src/app/service/rutas.service';
import { CalendarOptions ,DateSelectArg } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin  from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-resumen-rutas',
  templateUrl: './resumen-rutas.component.html',
  styleUrls: ['./resumen-rutas.component.scss']
})
export class ResumenRutasComponent {

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
   eventContent: function (arg) {

    var event = arg.event;
    
    var customHtml = '';
  
    customHtml += "<p> </p>" + " <svg class='dExcel' xmlns='http://www.w3.org/2000/svg' height='2em' viewBox='0 0 384 512'><path d='M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM155.7 250.2L192 302.1l36.3-51.9c7.6-10.9 22.6-13.5 33.4-5.9s13.5 22.6 5.9 33.4L221.3 344l46.4 66.2c7.6 10.9 5 25.8-5.9 33.4s-25.8 5-33.4-5.9L192 385.8l-36.3 51.9c-7.6 10.9-22.6 13.5-33.4 5.9s-13.5-22.6-5.9-33.4L162.7 344l-46.4-66.2c-7.6-10.9-5-25.8 5.9-33.4s25.8-5 33.4 5.9z'/></svg>  "  + event.title + " <p> </p>"
    
    return { html: customHtml }
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
   businessHours: {
    daysOfWeek: [1,2,3,4,5,6 ],
    startTime: '08:00', // 8am
    endTime: '22:00' // 6pm
  },
  dayHeaderFormat : { weekday: 'long' },
   dayHeaderContent(renderProps, createElement) {
     var customHtml = "<p style= 'text-decoration: none; color: black;' >"+ renderProps.text + "</p>";
     return { html : customHtml }
   },
   dayCellContent(renderProps, createElement) {
    var customHtml = "<h5 style= 'text-decoration: none; color: black;'>"+ renderProps.dayNumberText + "</h5>";
    return { html : customHtml }
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
     this.datosMes[fechaFormateada] = data
     this.calendarOptions.events = this.eventos
     console.log(this.eventos)
   })
 }

 handleDateSelect(info: any) {
   alert('Event: ' + info.event.title);
   alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
   alert('View: ' + info.view.type);
 }


 isLoadingTable: boolean = true;

 constructor(private rutaService : RutasService) { }

 subPedido! :Subscription

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
