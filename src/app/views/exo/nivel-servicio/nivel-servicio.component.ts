import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { PortalTransyanezService } from "src/app/service/portal-transyanez.service";
import { TIService } from 'src/app/service/ti.service';
import { NSBeetrackRango } from 'src/app/models/nsBeetrackRango.interface';
import Swal from 'sweetalert2';




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

  isLoadingTable: boolean = false


  //DATOS PARA EL ID Y ASIGNAR VALOR
  selectedRouteId: number | null = null; 
  Valor_ruta : number | null = null;
  selectedRouteValue: number | null = null;
  routeValue: number | null = null;
  valoresActualizados : any [] = []
  tablaDesplegada: boolean = false;
  server : string = "";
  id_usuario : number  | null = null;
  idMs : String = "" ;


  constructor(
    private service: PortalTransyanezService,
    private TIservice: TIService,

    
  ) {
  
   }
   


  // Método para capturar el ID de la ruta al hacer clic en un elemento de la lista
  captureRouteId(routeId: number, routeValue: number|null)  {
  
    if(routeId!= null){
      //se selecciona el ID de la ruta
      this.selectedRouteId = routeId;
      //se asigna el valor de la ruta a traves de del input
      this.selectedRouteValue = routeValue;
      //se obtiene de la sesion del usuario los datos del id 
      this.id_usuario = parseInt(sessionStorage['id'])
      this.server = sessionStorage['server']
      this.idMs= this.server+ "-"+this.id_usuario
      //se crea el objeto con los datos
      const rutaValores = {id_ruta : this.selectedRouteId, valor_ruta : this.selectedRouteValue, id_user : this.id_usuario, ids_user: this.idMs}
      if(this.selectedRouteValue != null && this.selectedRouteId != null){
        // if( this.valoresActualizados.includes((valor : any)=> valor.id_ruta === this.selectedRouteId )){
        // }

        const objetoAActualizar = this.valoresActualizados.find(objeto => objeto.id_ruta === routeId);

        // Verifica si se encontró el objeto
        if (objetoAActualizar) {
          // Actualiza la propiedad en el objeto
          objetoAActualizar.valor_ruta = this.selectedRouteValue;
        } else {
          console.log('No se encontró el objeto con el ID especificado.');
          this.valoresActualizados.push(rutaValores)
        }
        console.log( this.valoresActualizados, "objeto")
    
      }
    }   
  }
  
  
  guardarValores() {
 
    //al guardar los datos se almacena solo los values del objeto
    const valores = this.valoresActualizados.map(valoresArray => ({
      id_ruta: valoresArray.id_ruta,
      valor_ruta: valoresArray.valor_ruta,
      id_user: valoresArray.id_user,
      ids_user: valoresArray.ids_user
      
    }));
    // se cuentan cada uno de los regristrados guardados en el array
    let registrosRealizados = 0
    valores.forEach(()=>{
      registrosRealizados ++;
    })
    
    let conteo = `${registrosRealizados}`
    this.TIservice.update_valor_ruta(valores).subscribe(
      (response) => {
        console.log(valores);
        Swal.fire({
          title:'Ingreso Realizado Correctamente!',
          text:'Registros insertados :' + conteo,
          icon:'success'
        }
          ).then(()=>{
            this.isLoadingTable = true;
            setTimeout(() => {
              this.ns_beetrack_rango_fecha(this.fecha_inicio, this.fecha_fin)
            }, 3000);
          })
        this.valoresActualizados = []
        console.log('Valores de rutas actualizados correctamente', response, valores);
      },
      (error) => {

        Swal.fire({
          title:'Carga Finalizada con errores',
          text:'Se registran : 0 cambios, favor validar.!',
          icon:'error'
        }
          ).then(()=>{
           this.isLoadingTable = true;
            setTimeout(() => {
              this.ns_beetrack_rango_fecha(this.fecha_inicio, this.fecha_fin)
            }, 3000);
          })
        this.valoresActualizados = []
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
      this.isLoadingTable = false
     
      console.log("htpp actualizado con los rango de fechas")
    })
    }

  
  
  }
