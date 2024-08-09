import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit,Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainCitacionS,Detalle } from "src/app/models/meli/citacionSupervisor.interface"
import {CitacionesService} from '../../../service/citaciones.service'
import { MeliService } from 'src/app/service/meli.service'
import { MainCitacionA,CamposPorOperacion } from "src/app/models/meli/citacionActiva.interface"

@Component({
  selector: 'app-citacion-supervisores',
  templateUrl: './citacion-supervisores.component.html',
  styleUrls: ['./citacion-supervisores.component.scss']
})
export class CitacionSupervisoresComponent {
  
  constructor(private service: MeliService) {

  }
  
  citacionSupervisores : MainCitacionS [] = []
  operacionCampo : CamposPorOperacion [] = []

  detalleCitacion : Detalle [] = []

  public visible = false;
  operacion : string = ''
  centroOperacion : string = ''

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

  cambiarEstado(id_estado : any){
    return this.estadosCitacion.filter((estado: any) => estado.id == id_estado)[0].estado
  }

  onDateChange(event: any) {
    const rawDate = event.target.value;
    if (rawDate) {
      const [year, month, day] = rawDate.split('-');

      const fecha = `${year}-${month}-${day}`;
      // this.getModalidades();

      this.service.getDatosCitacionSupervisor('158',fecha).subscribe((data) => {
        this.citacionSupervisores = data
        
      }, error => {
        this.citacionSupervisores = []
      })
    }

    
  }
  
  ngOnInit() {
    
    this.obtenerFechas()

    this.service.getEstadoList().subscribe((data) => {
      this.estadosCitacion = data
    })
    
    this.service.getDatosCitacionSupervisor('158','20240802').subscribe((data) => {
      this.citacionSupervisores = data
      
    })
  }

  verDetalle(detalle : Detalle [],op : string, cop : string, id_op:number,id_cop : number){
    this.operacion = op
    this.centroOperacion = cop
    this.detalleCitacion = detalle

    this.service.getDatosCitacionActiva(id_op,id_cop,'20240802').subscribe((data) => {
      this.datosCitacionActiva = data
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
          // Lógica adicional en caso de éxito.
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
          alert('Error al subir el archivo')
          this.termino = true
          // Lógica de manejo de errores.
        }
      );
      
    } else {
      console.warn('Ningún archivo seleccionado');
      // Lógica adicional en caso de que el usuario no seleccione ningún archivo.
    }
  }


///// tabla editada

inputText: string = '';
datosCitacionActiva: MainCitacionA [] = [];

idUsuario = sessionStorage.getItem('id')+""
idsUsuario = sessionStorage.getItem('server')+'-'+this.idUsuario

// procesarDatos() {
//   const filas = this.inputText.trim().split('\n');
//   const mapaRuta: { [key: string]: MainCitacionA } = {};

//   this.datos.forEach(ruta => {
//     mapaRuta[ruta.ppu] = ruta;
//   });

//   filas.forEach(fila => {
//     const valores = fila.split('\t');
//     const ruta: MainCitacionA = {
//       estado: valores[0],
//       IdRuta: valores[1],
//       FechaInicio: valores[2],
//       FechaFin: valores[3],
//       Patente: valores[4],
//       Conductor: valores[5],
//       Cantidad: valores[6],
//       PrecioUnitario: valores[7],
//     };

//     if (mapaRuta[ruta.ppu]) {
//       Object.assign(mapaRuta[ruta.ppu], ruta);
//     } else {
//       this.datos.push(ruta);
//     }
//   });

//   console.log(this.datos)

//   this.inputText = ''; // Limpiar el área de texto
// }

guardarDatos() {
  const jsonDatos = JSON.stringify(this.datosCitacionActiva);
  console.log(jsonDatos);
  alert('Datos guardados con éxito (simulado)');
}

updateCell(event: any, index: number, field: string) {
  const value = event.target.innerText;
  if(field )
  this.detalleCitacion[index][field] = value+'';

  console.log(this.citacionSupervisores)
}



}