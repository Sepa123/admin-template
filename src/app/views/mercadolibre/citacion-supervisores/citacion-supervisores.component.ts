import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit,Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainCitacionS,Detalle } from "../../../models/meli/citacionSupervisor.interface"
import {CitacionesService} from '../../../service/citaciones.service'
import { MeliService } from '../../../service/meli.service'
import { MainCitacionA,CamposPorOperacion, PanelSeguimientoDiario} from "../../../models/meli/citacionActiva.interface"
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TIService } from '../../../service/ti.service';
import { Pedidos } from '../../../models/pedido.interface';
import { LocalizacionService } from '../../../service/localizacion.service';

@Component({
  selector: 'app-citacion-supervisores',
  templateUrl: './citacion-supervisores.component.html',
  styleUrls: ['../styles/citacion1.component.scss','../styles/citacion2.component.scss','./citacion-supervisores.component.scss']
})
export class CitacionSupervisoresComponent {
  
  constructor(private service: MeliService, private TIservice: TIService, private localizacionService: LocalizacionService) {

  }
  
  citacionSupervisores : MainCitacionS [] = []
  citacionSupervisoresFull : MainCitacionS [] = []
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
  

  verObservacion(detalle : MainCitacionA,index : number){
    this.subidoOk = false
    this.toggleLiveObservacion()
    this.indexActualPatente = index
    this.observacionPatente = detalle.observacion 
    console.log(detalle)
  }


  guardarObservacion(){

    this.datosCitacionActiva[this.indexActualPatente].observacion = this.observacionPatente
    this.toggleLiveObservacion()
  }

  cambiarEstado(id_estado : any){
    return this.estadosCitacion.filter((estado: any) => estado.id == id_estado)[0].estado
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
        this.pedidos = {"Total_vehiculo":0,"Total_entrega":0,"Pendientes":0,"Fallidos":0}
        this.citacionSupervisores.map((citacion, i) => {
          this.pedidos.Total_entrega = this.pedidos.Total_entrega + citacion.Detalles.reduce(( acum,cur) => acum + cur.total_entregas, 0 )
          this.pedidos.Pendientes = this.pedidos.Pendientes + citacion.Detalles.reduce(( acum,cur) => acum + cur.pendientes, 0 )
          this.pedidos.Fallidos = this.pedidos.Fallidos + citacion.Detalles.reduce(( acum,cur) => acum + cur.fallidos, 0 )
          this.pedidos.Total_vehiculo = this.pedidos.Total_vehiculo + citacion.Detalles.length
        })

        this.citacionSupervisoresFull = data
        
        console.log(this.citacionSupervisores[0].Id_operacion)
        this.chartVisible = true
        this.graficoVisible = true
        
      }, error => {
        this.citacionSupervisores = []
        this.pedidos = {"Total_vehiculo":0,"Total_entrega":0,"Pendientes":0,"Fallidos":0}
      })
    }

    
  }

  pedidos:PanelSeguimientoDiario = {"Total_vehiculo":0,"Total_entrega":0,"Pendientes":0,"Fallidos":0}
  
  ngOnInit() {
    this.getLocation()
    
    this.obtenerFechas()


    // let hoy = new Date();

    // let año = hoy.getFullYear();
    // let mes = ("0" + (hoy.getMonth() + 1)).slice(-2); // Los meses comienzan en 0
    // let día = ("0" + hoy.getDate()).slice(-2);

    // this.currentDate = `${año}-${mes}-${día}`;
    
    // this.service.getEstadoList().subscribe((data) => {
    //   this.estadosCitacion = data
    // })
    
    this.service.getDatosCitacionSupervisor(this.id_usuario,this.currentDate).subscribe((data) => {
      this.citacionSupervisores = data
      this.citacionSupervisoresFull = data

      this.citacionSupervisores.map((citacion, i) => {
        this.pedidos.Total_entrega = this.pedidos.Total_entrega + citacion.Detalles.reduce(( acum,cur) => acum + cur.total_entregas, 0 )
        this.pedidos.Pendientes = this.pedidos.Pendientes + citacion.Detalles.reduce(( acum,cur) => acum + cur.pendientes, 0 )
        this.pedidos.Fallidos = this.pedidos.Fallidos + citacion.Detalles.reduce(( acum,cur) => acum + cur.fallidos, 0 )
        this.pedidos.Total_vehiculo = this.pedidos.Total_vehiculo + citacion.Detalles.length
      })

      // this.pedidos.Total_vehiculo = this.citacionSupervisores.length
      this.chartVisible = true
      this.graficoVisible = true
      
    })
    // this.TIservice.get_pedidos().subscribe((data) => {
    //   this.pedidos = data
    //   // this.pedidos[0]["Total_pedidos"] == null ? alert("Hubo un error al cargar los datos de beetrack, Por favor espere un tiempo") 
    //   //                                           : console.log(true)
    // })
  }

  idOperacion : number = 0
  idCentroOperacion : number = 0
  verDetalle(detalle : Detalle [],op : string, cop : string, id_op:number,id_cop : number){

    this.tipoOperacion = ''
    this.datosCitacionActiva = []
    this.operacion = op
    this.centroOperacion = cop
    this.detalleCitacion = detalle

    this.idCentroOperacion = id_cop
    this.idOperacion = id_op
    console.log(this.currentDate)

    this.service.getDatosCitacionActiva(id_op,id_cop,this.currentDate.split('-').join('')).subscribe((data) => {

      
      this.datosCitacionActiva = data

      const operacion = this.datosCitacionActiva[0].operacion

      this.tipoOperacion = operacion

    },
    error =>{
      
    })
    this.toggleLiveDemo()
  }


  //// detalle alv

  private selectedFile: File | null = null;

  termino : boolean = true
  error! : number  
  codigosErroneos : string [] = []
  message : string = ""

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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {

    console.log(this.latStr,this.longStr)

    if(this.latStr,this.longStr == null){
      this.visibleLocalizacion = true
    } else {

    
    if (this.selectedFile) {

      this.termino = false
      let id_usuario = sessionStorage.getItem('id')+""
      let ids_usuario = sessionStorage.getItem('server')+'-'+id_usuario
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.service.subirExcelPrefacturaDiaria(formData, id_usuario,ids_usuario,this.latStr,this.longStr).subscribe(
        (data : any) => {
          this.termino = data.termino
          this.error = data.error
          if ( this.error == 1){
            this.codigosErroneos = data.codigos.split(',')
          }
          this.message = data.message
          console.log('Archivo subido exitosamente');

          this.subidoOk = true

          this.service.getDatosCitacionActiva(this.idOperacion,this.idCentroOperacion,this.currentDate.split('-').join()).subscribe((data) => {
            this.datosCitacionActiva = data
            const operacion = this.datosCitacionActiva[0].operacion
            this.tipoOperacion = operacion
          },
          error =>{
            
          })
          // Lógica adicional en caso de éxito.
        },
        (error) => {
          console.error('Error al subir el archivo:', error.error.detail);
          this.subidoOk = false
          alert('Error al subir el archivo')
          this.termino = true
          // Lógica de manejo de errores.
        }
      );
      
    } else {
      console.warn('Ningún archivo seleccionado');

      alert('No se ha seleccionado ningún archivo seleccionado')
      // Lógica adicional en caso de que el usuario no seleccione ningún archivo.
    }
  }
  }




//////////////////// grafico 

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
datosCitacionActiva: MainCitacionA [] = [];

idUsuario = sessionStorage.getItem('id')+""
idsUsuario = sessionStorage.getItem('server')+'-'+this.idUsuario

guardarDatos() {

  if(this.latStr,this.longStr == null){
    this.visibleLocalizacion = true
  } else {

  this.datosCitacionActiva.map((data)=>{


    if(data.campos_por_operacion){
      data['fm_total_paradas'] = data.campos_por_operacion[0].fm_total_paradas    
      data['fm_estimados'] = data.campos_por_operacion[0].fm_estimados 
      data['fm_preparados'] = data.campos_por_operacion[0].fm_preparados 
      data['fm_p_colectas_a_tiempo'] = data.campos_por_operacion[0].fm_p_colectas_a_tiempo 
      data['fm_p_no_colectadas'] = data.campos_por_operacion[0].fm_p_no_colectadas 
      data['fm_paqueteria_colectada'] = data.campos_por_operacion[0].fm_paqueteria_colectada 
      data['lm_fallido'] = data.campos_por_operacion[0].lm_fallido 
      data['lm_pendiente'] = data.campos_por_operacion[0].lm_pendiente 
      data['lm_spr'] = data.campos_por_operacion[0].lm_spr 
      data['lm_entregas'] = data.campos_por_operacion[0].lm_entregas 
      data['lm_tiempo_ruta'] = data.campos_por_operacion[0].lm_tiempo_ruta 
      data['lm_estado'] = data.campos_por_operacion[0].lm_estado 
      data['fecha'] = this.currentDate
    }
  }
  )

  const body = {
    id_usuario : sessionStorage.getItem('id')+"",
    ids_usuario : sessionStorage.getItem('server')+'-'+this.idUsuario,
    latitud: this.latStr ,
    longitud:  this.longStr,
    operacion: this.operacion,
    id_operacion: this.idOperacion,
    id_centro_operacion : this.idCentroOperacion ,
    datos :  this.datosCitacionActiva
  }
  const jsonDatos = JSON.stringify(this.datosCitacionActiva);

  this.service.guardarDatosCitacionSupervisores(body).subscribe(((data : any) => {
    console.log(data)
    // console.log(body);
  alert(data.message);

  this.service.getDatosCitacionSupervisor(this.id_usuario,this.currentDate).subscribe((data) => {
    this.citacionSupervisores = data
    this.citacionSupervisoresFull = data
    this.pedidos = {"Total_vehiculo":0,"Total_entrega":0,"Pendientes":0,"Fallidos":0}

    this.citacionSupervisores.map((citacion, i) => {
      this.pedidos.Total_entrega = this.pedidos.Total_entrega + citacion.Detalles.reduce(( acum,cur) => acum + cur.total_entregas, 0 )

      this.pedidos.Pendientes = this.pedidos.Pendientes + citacion.Detalles.reduce(( acum,cur) => acum + cur.pendientes, 0 )
      this.pedidos.Fallidos = this.pedidos.Fallidos + citacion.Detalles.reduce(( acum,cur) => acum + cur.fallidos, 0 )
      this.pedidos.Total_vehiculo = this.pedidos.Total_vehiculo + citacion.Detalles.length
    })
    console.log(this.citacionSupervisores[0].chart_data)
    this.chartVisible = true
    this.graficoVisible = true
    
  })
  }), (error) => {
    const listaCampos = error.error.detail.map((data : any) => {
      return data.loc[3]
    })

    let lista = [...new Set(listaCampos)];

    const message: string = `Estos campos contienen información incorrecta: ${lista.join(', ')}`;

    alert(message)
    
  }
)

  }
  
}

updateCell(event: any, index: number, field: string) {
  const value = event.target.innerText;
  if(field && this.datosCitacionActiva[index].campos_por_operacion )
  this.datosCitacionActiva[index].campos_por_operacion[0][field] = value+'';
  this.datosCitacionActiva[index][field] = value+'';
}


copiarPortapapeles(texto: string): void {
  const textarea = document.createElement('textarea');
  textarea.value = texto;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  if (texto == null){
    this.mostrarAlerta('Error', 'error');
  } else{
    this.mostrarAlerta('Texto copiado: '+texto, 'gray');
  }

  
  // alert('Texto copiado: '+texto)

}


mostrarAlerta(mensaje: string, tipo: 'success' | 'error' | 'warning' | 'gray'): void {
  // Crear un div para la alerta
  const alerta: HTMLDivElement = document.createElement('div');
  alerta.classList.add('alerta', tipo); // Añadir clase para tipo (success, error, warning)

  // Elegir icono basado en el tipo
  const icono: HTMLElement = document.createElement('i');
  switch (tipo) {
    case 'success':
      icono.classList.add('fas', 'fa-check-circle'); // Icono de éxito
      alerta.style.backgroundColor = 'rgba(40, 167, 69, 0.9)'; // Verde
      alerta.style.borderRadius = '10px';
      alerta.style.padding = '7px'; // Aumentar el padding
      break;
    case 'error':
      icono.classList.add('fas', 'fa-times-circle'); // Icono de error
      alerta.style.backgroundColor = '#dc3545'; // Rojo
      alerta.style.borderRadius = '10px';
      alerta.style.padding = '7px'; // Aumentar el padding
      break;
    case 'warning':
      icono.classList.add('fas', 'fa-exclamation-triangle'); // Icono de advertencia
      alerta.style.backgroundColor = '#ffc107'; // Amarillo
      alerta.style.borderRadius = '10px';
      alerta.style.padding = '7px'; // Aumentar el padding
      break;
    case 'gray':
      icono.classList.add('fas', 'fa-copy'); // Icono de advertencia
      // alerta.style.backgroundColor = '#ffc107'; // Amarillo
      // alerta.style.borderRadius = '10px';
      // alerta.style.padding = '7px'; // Aumentar el padding
      break;
  }

  // Añadir el icono y el mensaje al div de la alerta
  alerta.appendChild(icono);
  alerta.appendChild(document.createTextNode(mensaje));

  // Añadir la alerta al contenedor de alertas
  const alertaContainer: HTMLElement | null = document.getElementById('alertaContainer');
  if (alertaContainer) {
    alertaContainer.appendChild(alerta);

    // Mostrar la alerta con una animación de opacidad
    setTimeout(() => {
      alerta.style.opacity = '1';
    }, 100);

    // Ocultar la alerta después de 5 segundos y eliminarla del DOM
    setTimeout(() => {
      alerta.style.opacity = '0';
      setTimeout(() => {
        alerta.remove();
      }, 500);
    }, 5000);
  }
} 

CerrarRuta( index: number) {

  let respuesta = confirm("¿Estás seguro de que deseas cerrar la ruta?");

  // Verificar la respuesta
  if (respuesta) {
    if(this.datosCitacionActiva[index]['ruta_cerrada'] == null){
      this.datosCitacionActiva[index]['ruta_cerrada'] = true ;
    } else {
      this.datosCitacionActiva[index]['ruta_cerrada'] = !this.datosCitacionActiva[index]['ruta_cerrada'] ;
    }
  
  } else {
      
  }

  
  // this.datosCitacionActiva[index]['ruta_cerrada'] = true ;

}


textoFiltro : any = ''

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

filtrarTabla() {
  this.pedidos = {"Total_vehiculo":0,"Total_entrega":0,"Pendientes":0,"Fallidos":0}

  const filtro = this.textoFiltro.toLowerCase();

  const resultado: any[] = [];
  
  const maxResults = 100; // Ejemplo: limitar los resultados a los primeros 100
  for (let i = 0; i < this.citacionSupervisoresFull.length; i++) {
      const lista = this.citacionSupervisoresFull[i];
      if (
          lista.Nombre.toString().toLowerCase().startsWith(filtro) ||
          lista.Centro.toString().toLowerCase().startsWith(filtro) ||
          lista.Nombre.toString().toLowerCase().replace('-',' ').includes(filtro)
      ) {
          resultado.push(lista);
          if (resultado.length >= maxResults) {
              break; // Terminar el bucle si se alcanza el máximo de resultados
          }
      }
  }

  this.citacionSupervisores = resultado;

  this.citacionSupervisores.map((citacion, i) => {
    this.pedidos.Total_entrega = this.pedidos.Total_entrega + citacion.Detalles.reduce(( acum,cur) => acum + cur.total_entregas, 0 )

    this.pedidos.Pendientes = this.pedidos.Pendientes + citacion.Detalles.reduce(( acum,cur) => acum + cur.pendientes, 0 )
    this.pedidos.Fallidos = this.pedidos.Fallidos + citacion.Detalles.reduce(( acum,cur) => acum + cur.fallidos, 0 )
    this.pedidos.Total_vehiculo = this.pedidos.Total_vehiculo + citacion.Detalles.length

  })

}

// Aplica debouncing a la función filtrarTabla
filtrarTablaDebounced = this.debounce(this.filtrarTabla, 200);

onKeyUp() {
  this.filtrarTablaDebounced('campo');
}



//// modal activa localización 


visibleLocalizacion : boolean = false

toggleLiveLocalizacion() {
  this.visibleLocalizacion = !this.visibleLocalizacion;
  if(this.latStr,this.longStr == null || this.latStr,this.longStr == undefined){
    this.latStr = this.localizacionService.getLocalizacion().latitud
    this.longStr = this.localizacionService.getLocalizacion().patente
  }
}

handleLiveLocalizacion(event: any) {
  this.visibleLocalizacion = event;
}



}