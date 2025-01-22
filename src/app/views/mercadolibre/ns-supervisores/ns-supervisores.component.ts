import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit,Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainCitacionS,Detalle,InfoFotos } from "../../../models/meli/citacionSupervisor.interface"
import {CitacionesService} from '../../../service/citaciones.service'
import { MeliService } from '../../../service/meli.service'
import { MainCitacionA,CamposPorOperacion, ResumenSupervisores,MainResumenRutasSupervisores, Patente} from "../../../models/meli/citacionActiva.interface"
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import * as XLSX from 'xlsx';
import * as L from 'leaflet';
@Component({
  selector: 'app-ns-supervisores',
  templateUrl: './ns-supervisores.component.html',
  styleUrls: ['./ns-supervisores.component.scss']
})
export class NsSupervisoresComponent {
  
  constructor(private el: ElementRef,private service: MeliService) {

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

  imagen1 : string = ''
  imagen2 : string = ''
  imagen3 : string = ''
  imagen4 : string = ''

  Imagenes : string [] = []
  Titulo : string [] =['Patente', 'Imagen 1', 'Imagen 2', 'Imagen 3']

  infoPatentes(ppu : string){
    
    // this.el.nativeElement.querySelector('#map').remove()
    this.service.getInfoFotosPatente(ppu).subscribe((data) => {
      this.toggleLiveDemo()
      this.Imagenes = data.Imagenes
      const latitud = parseFloat(data.Latitud)
      const longitud  = parseFloat(data.Longitud)

      // this.el.nativeElement.querySelector('#map').remove()

      const map = L.map(this.el.nativeElement.querySelector('#map')).setView([latitud, longitud], 13);

      // Añadir la capa de tiles de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      // Añadir un marcador
      L.marker([latitud, longitud]).addTo(map).bindPopup('Ubicación de la patente').openPopup();

      // Añadir un popup al marcador

      if (map) {
        setTimeout(() => {
          map.invalidateSize();
        }, 500); // Espera un tiempo para que el modal se haya abierto completamente
      }
    }, error => {
       alert(error.error.detail)
    })
  }

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
    const diferenciaDiasMaxima = 10;

    // Convertir las fechas a objetos de tipo Date
    const fechaInicio = new Date(rangoInicio);
    const fechaFin = new Date(rangoFin);
    fechaInicio.setDate(fechaInicio.getDate() + 1)
    fechaFin.setDate(fechaFin.getDate() + 1)
    // Array para almacenar los pares de fechas
    const paresDeFechas : string [][] = [];
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

  buscadorResumenNS(fecha_i: string,fecha_f: string){


    this.service.getResumenRutaSupervisores(fecha_i,fecha_f,this.id_usuario).subscribe((data) => {
      console.log(data)
      this.resumenSupervisores = data

      

      this.service.getListasPatentesFotos().subscribe((data : any ) => {
        this.patentes = data

        this.resumenSupervisores.map( resumen => {
          if (this.patentes.includes(resumen.Ppu)){
            resumen.Mostrar_foto = true
          }
        })

        this.resumenSupervisoresFull = this.resumenSupervisores
      })

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


    this.buscadorResumenNS(this.fecha_inicio,this.fecha_fin)
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
      'Modalidad',
      'Operación',
      'Centro Operación',
      'Región',
      'Fecha',
      'Id Ruta',
      'Patente',
      'Driver',
      'Kilometros',
      '% Avance',
      'Avance',
      'Fallido',
      'Pendiente',
      'Spr',
      'Entregas',
      'Tiempo ruta',
      'Estado',
      'Total paradas',
      'Paqueteria colectada',
      'Estimados',
      'Preparado',
      '% Colectas',
      '% No colectadas',
      'Valor ruta',
      'Ruta cerrada'
    ])

    this.resumenSupervisores.forEach((pedido) => {
        const fila: any[] = [];
        fila.push(pedido.Modalidad, pedido.Operacion, pedido.Centro_operacion, pedido.Region, pedido.Fecha, pedido.Id_ruta, pedido.Ppu, pedido.Driver,
                  pedido.Kilometros,pedido.P_avance,pedido.Avance,
                  pedido.Campos_por_operacion[0].lm_fallido,pedido.Campos_por_operacion[0].lm_pendiente,pedido.Campos_por_operacion[0].lm_spr,pedido.Campos_por_operacion[0].lm_entregas,pedido.Campos_por_operacion[0].lm_tiempo_ruta,pedido.Campos_por_operacion[0].lm_estado,
                  pedido.Campos_por_operacion[0].fm_total_paradas,pedido.Campos_por_operacion[0].fm_paqueteria_colectada,pedido.Campos_por_operacion[0].fm_estimados,pedido.Campos_por_operacion[0].fm_preparados,pedido.Campos_por_operacion[0].fm_p_colectas_a_tiempo,pedido.Campos_por_operacion[0].fm_p_no_colectadas,
                  pedido.Valor_ruta,pedido.Ruta_cerrada); 
        datos.push(fila);
      });

    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];
    // Crea un libro de Excel a partir de los datos
    const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
    const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');

    // Descarga el archivo Excel `Quadminds_Manual_${fechaActual}.xlsx` 
    
    const nombreArchivo = `resumen-supervisores-${fechaActual}.xlsx`;
    // Nombre del archivo Excel a descargar 
    XLSX.writeFile(libroExcel, nombreArchivo);
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
    const maxResults = 100; // Ejemplo: limitar los resultados a los primeros 100

    for (let i = 0; i < this.resumenSupervisoresFull.length; i++) {
        const lista = this.resumenSupervisoresFull[i];
        if (
            lista.Operacion.toString().toLowerCase().startsWith(filtro) ||
            lista.Ppu.toString().toLowerCase().startsWith(filtro) ||
            lista.Centro_operacion.toString().toLowerCase().startsWith(filtro) ||
            lista.Driver.toString().toLowerCase().startsWith(filtro) ||
            lista.Id_ruta.toString().toLowerCase().startsWith(filtro) 
        ) {
            resultado.push(lista);
            if (resultado.length >= maxResults) {
                break; // Terminar el bucle si se alcanza el máximo de resultados
            }
        }
    }

    this.resumenSupervisores = resultado;
    // console.log(this.ListaPrefactura);
}

  // Aplica debouncing a la función filtrarTabla
  filtrarTablaDebounced = this.debounce(this.filtrarTabla, 200);

  onKeyUp() {
    this.filtrarTablaDebounced('campo');
}


sortOrderPpu : boolean = true

  sortTablePpu(orden : boolean){
    if(orden){
      this.resumenSupervisores.sort((a,b) => a.Ppu.localeCompare(b.Ppu))
    }else{
      this.resumenSupervisores.sort((a,b) => b.Ppu.localeCompare(a.Ppu))
    }
    this.sortOrderPpu = !this.sortOrderPpu
    
  }

  sortOrderDriver : boolean = true

  sortTableDriver(orden : boolean){
    if(orden){
      this.resumenSupervisores.sort((a,b) => a.Driver.localeCompare(b.Driver))
    }else{
      this.resumenSupervisores.sort((a,b) => b.Driver.localeCompare(a.Driver))
    }
    this.sortOrderDriver = !this.sortOrderDriver
    
  }

  sortOrderRegion : boolean = true
  sortTableRegion(orden : boolean){
    if(orden){
      this.resumenSupervisores.sort((a,b) => a.Region.localeCompare(b.Region))
    }else{
      this.resumenSupervisores.sort((a,b) => b.Region.localeCompare(a.Region))
    }
    this.sortOrderRegion = !this.sortOrderRegion
    
  }


  mostrarAlerta(mensaje: string, tipo: 'success' | 'error' | 'warning'): void {
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
resumenSupervisores: ResumenSupervisores [] = [];
resumenSupervisoresFull: ResumenSupervisores [] = []
patentes : string [] = []

idUsuario = sessionStorage.getItem('id')+""
idsUsuario = sessionStorage.getItem('server')+'-'+this.idUsuario





}