import { Component, ElementRef, ViewChild } from '@angular/core';
import { TocService } from 'src/app/service/toc.service'
import { BitacoraRango } from 'src/app/models/alertasVigentes.interface';
import { UsuarioTOC } from 'src/app/models/usuariosTOC.interface';
import { MainProductoIngresado, DatoPI } from 'src/app/models/TOC/productosIngresadosEasy.interface'
import { MainTelefonosTruncados, DatoTelefonos } from 'src/app/models/TOC/telefonosTruncados.interface';

@Component({
  selector: 'app-reporte-telefono',
  templateUrl: './reporte-telefono.component.html',
  styleUrls: ['./reporte-telefono.component.scss']
})
export class ReporteTelefonoComponent {

  datosDif : DatoTelefonos[] = []

  isLoadingTable : boolean = false
  isLoadingFull : boolean = true
  noHayRegistro : boolean = true
  bloqBuscar : boolean = false
  libreExcel : boolean = false

  regex = /\*/;

  portal = /\bportal-\b/;

  contador : number = 0

  fecha_inicio : string = ""
  fecha_fin : string = ""
  fusionFecha : string = ""

  observacionActual : string | null = ""
  rangoFechas : string [] [] = []


  constructor( private service : TocService, private elementRef: ElementRef){

  }

  formatearFecha(fecha : string){
    return fecha.replaceAll("-", "")
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

    // Array para almacenar los pares de fechas
    const paresDeFechas = [];

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




   arregloFechas(fecha_inicio : string, fecha_fin: string) {

    const fechas = [];
    const parFechas =[]
    let fechaActual = new Date(fecha_inicio);

    if(fecha_inicio == fecha_fin){
      fechas.push(this.formatearFecha(this.fecha_fin))
    }else {
      while (fechaActual <=  new Date(fecha_fin)) {
        const fechaFormateada = fechaActual.toISOString().slice(0, 10).replace(/-/g, ''); // Formatea como 'YYYYMMDD'
        fechas.push(fechaFormateada);
        fechaActual.setDate(fechaActual.getDate() + 10); // Avanza un día
        parFechas.push([fechaFormateada,fechaActual.toISOString().slice(0, 10).replace(/-/g, '')])
      }
      fechas.push(this.formatearFecha(this.fecha_fin))
    }

    console.log(parFechas)

    return fechas;

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


  diferenciaFechasEasy(fecha_inicio : string, fecha_fin : string,pos : string){
    this.service.get_telefonos_truncados(fecha_inicio,fecha_fin,0).subscribe((data) => {



      if(pos == 'final'){
        this.isLoadingTable = false
        this.isLoadingFull = false
        this.bloqBuscar = false
        this.libreExcel = true
      }else if(pos == 'inicio'){
        this.isLoadingTable = true
      }

      this.noHayRegistro = false
      this.datosDif =  this.datosDif.concat(data.datos)
      console.log(this.datosDif)
      // data.datos.map((dato) => {
      //   this.datosDif.push(dato)
      // })
      this.contador= this.contador + data.items
    })

  }

  buscar(){
    this.fusionFecha = ""
    this.libreExcel = false
    this.bloqBuscar = true
    this.noHayRegistro = true
    this.contador = 0
    this.datosDif = []
    this.isLoadingFull = true
    this.isLoadingTable = false
    // this.chartVisible = false
    // this.bitacorasRangos = []
    //  this.nombreUsuario = []
    //  this.cantidadBitacora = []
    if(this.fecha_fin == "" || this.fecha_inicio == ""){
      return alert("Por favor ingrese una fecha en ambos campos")
    }
    // console.log(this.fecha_fin, this.fecha_inicio)
    const fecha_inicio_f = this.formatearFecha(this.fecha_inicio)
    const fecha_fin_f = this.formatearFecha(this.fecha_fin)

    this.fusionFecha = fecha_inicio_f + fecha_fin_f
    const arrayFechas = this.generarParesDeFechas(this.fecha_inicio, this.fecha_fin)

    if (this.validarDiferenciaFechas(this.fecha_inicio,this.fecha_fin) == false) return alert("La diferencia entre las fechas debe ser de un día o más")
    
    let myset = [...new Set(arrayFechas)]

    this.rangoFechas = myset

    // this.service.get_diferencia_fechas_easy(fecha_inicio_f,fecha_fin_f,0).subscribe((data) => {
    //   this.datosDif = data.datos
    //   this.contador= data.items
    // })

    console.log(myset)

    myset.map((fecha , i) => {

      setTimeout(() => {

        if(i == 0 && myset.length !== 1){
          
          // setTimeout(() => {
            this.diferenciaFechasEasy(fecha_inicio_f,fecha[1],'inicio') 
            
          // }, 10500 * i)
        }else if (i +1 == myset.length && myset.length !== 1){
          // setTimeout(() => {
            
            this.diferenciaFechasEasy(fecha[0],fecha_fin_f,'final') 
            
          // }, 10500 * i)
        }else if (i == 0 && myset.length == 1){
          // setTimeout(() => {
            
            this.diferenciaFechasEasy(fecha_inicio_f,fecha_fin_f,'final') 
            
          // }, 10500 * i)
        }  
        else {
  
          // setTimeout(() => {
            this.diferenciaFechasEasy(fecha[0],fecha[1],'medio') 
          // }, 10500 * i)
        } 
        
      }, 7000 * i);
      
    })
  }


  descargarExcel(){ 

    this.service.download_reporte_telefonos_truncados(this.rangoFechas,this.fusionFecha)
  }
}

