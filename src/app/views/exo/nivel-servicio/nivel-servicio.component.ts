import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import { TIService } from 'src/app/service/ti.service';
import { NSBeetrackRango } from 'src/app/models/nsBeetrackRango.interface';
import {AgregarValorRutaComponent} from '../agregar-valor-ruta/agregar-valor-ruta.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nivel-servicio',
  templateUrl: './nivel-servicio.component.html',
  styleUrls: ['./nivel-servicio.component.scss']
})
export class NivelServicioComponent {
  nsBeetrack : NSBeetrackRango [] = []

  fecha_inicio : string = "" 
  fecha_fin : string = "" 

  isDescargar : boolean = false

  //DATOS PARA EL ID Y ASIGNAR VALOR
  selectedRouteId: number | null = null; 
  Valor_ruta : number | null = null;
  selectedRouteValue: number | null = null;
  routeValue: number | null = null;
  rutaValores: { id: number, valor: number }[] = [];
  tablaDesplegada: boolean = false;


  constructor(
    private service: PortalTransyanezService, private TIservice: TIService,
    private router: Router
    //private AgregarValorRutaComponent: AgregarValorRutaComponent
  ) {

   }

   //metodos para cerrar el modal
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
   

  // Método para capturar el ID de la ruta al hacer clic en un elemento de la lista
  captureRouteId(routeId: number|null)  {
    if(routeId!= null){
      this.selectedRouteId = routeId;
     // this.selectedRouteValue = this.Valor_ruta;   
       console.log(routeId, "ruta")
    }
    
  }
/*
  assignValue(routeId: number|null) {
    if (routeId !== null) {
      this.selectedRouteId = routeId;
      console.log(routeId, "ruta")
      const body = { Valor_ruta: this.routeValue, Id_ruta: this.selectedRouteId };  
      console.log(body, "valor no ingresado")
      this.TIservice.update_valor_ruta(body).subscribe(
        (response) => {
          this.routeValue = null
          this.ns_beetrack_rango_fecha(this.fecha_inicio,this.fecha_fin) 
          console.log('Valor de la ruta actualizado correctamente', response);
        },
        (error) => {
          console.error('Error al actualizar el valor de la ruta', error);
        }
      );
    }
  }*/

  guardarValores() {
    const valoresActualizados = this.nsBeetrack.map((beetrack) => {
      return { Valor_ruta: beetrack.Valor_ruta, Id_ruta: beetrack.Id_ruta };
    });
  
    this.TIservice.update_valor_ruta(valoresActualizados).subscribe(
      (response) => {
        console.log('Valores de rutas actualizados correctamente', response);
      },
      (error) => {
        console.error('Error al actualizar los valores de rutas', error);
      }
    ); 
  }
   
   formatearFecha(fecha : string){
    return fecha.replaceAll("-", "")
   }

   buscar() {
    if(this.fecha_fin == "" || this.fecha_inicio == ""){
      return alert("Por favor ingrese una fecha en ambos campos")
    }
    // console.log(this.fecha_fin, this.fecha_inicio)
    const fecha_inicio_f = this.formatearFecha(this.fecha_inicio)
    const fecha_fin_f = this.formatearFecha(this.fecha_fin)

    console.log(fecha_inicio_f,fecha_fin_f)

    if (this.validarDiferenciaFechas(this.fecha_inicio,this.fecha_fin) == false) return alert("La diferencia entre las fechas debe ser de un día o más")

    this.ns_beetrack_rango_fecha(fecha_inicio_f,fecha_fin_f) 

    this.isDescargar = true
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
  
    // Comprobar si la diferencia en días es mayor o igual a 1
    if (diferenciaDias >= 1) {
      return true;
    } else {
      console.error("La diferencia entre las fechas debe ser de un día o más.");
      return false;
    }
  }

   DescargarNS(){
    if(this.fecha_fin == "" || this.fecha_inicio == ""){
      return alert("Por favor ingrese una fecha en ambos campos")
    }

    if (this.validarDiferenciaFechas(this.fecha_inicio,this.fecha_fin) == false) return alert("La diferencia entre las fechas debe ser de un día o más")
    // console.log(this.fecha_fin, this.fecha_inicio)
    const fecha_inicio_f = this.formatearFecha(this.fecha_inicio)
    const fecha_fin_f = this.formatearFecha(this.fecha_fin)

    this.TIservice.downloadBeetrackNSRango(fecha_inicio_f,fecha_fin_f)
   }
   ngOnInit(){
    // this.ns_beetrack_rango_fecha('20230801','20230802') 
   }
   
  downloadVehiculos(){
    this.service.downloadResumenVehiculos()
  }

  downloadBeetrack(){
    this.TIservice.downloadBeetrackMensual()
  }

  ns_beetrack_rango_fecha(fecha_inicio : string, fecha_termino : string){
    
    this.TIservice.get_ns_beetrack_por_rango_fecha(fecha_inicio,fecha_termino).subscribe(data => {
      this.tablaDesplegada = true;
      this.nsBeetrack = data
    })
  }
  
  }
