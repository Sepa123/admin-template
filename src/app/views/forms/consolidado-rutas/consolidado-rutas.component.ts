import { Component, ElementRef, ViewChild } from '@angular/core';
import { RutasService } from '../../../service/rutas.service';
import { ClientesTy,RutasTy,RutasTyTemp, GuiasExternasTemp, GuiasExternas, RutasConsolidadas,ClienteInfo,Cliente, GruposOperacion} from '../../../models/rutas/rutas.interface';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-consolidado-rutas',
  templateUrl: './consolidado-rutas.component.html',
  styleUrls: ['./card.component.scss','./consolidado-rutas.component.scss','./consolidado-rutas2.component.scss']
})
export class ConsolidadoRutasComponent {
  @ViewChild('gaugeCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gaugeValue', { static: true }) valueRef!: ElementRef<HTMLDivElement>;

  private selectedFile: File | null = null;

  today = new Date();

  constructor(private service : RutasService) { }

  
  Clientes_ty: ClientesTy[] = [];
  Grupo_operacion: GruposOperacion[] = [];

  nombreClienteSeleccionado : string = ''
  clienteSeleccionado : number = 0


  OperacionBuscador : number = 0


  // ###### Variables para la tabla de rutas temporales

  cantRutas : number = 0
  procesables: number = 0
  noProcesables: number = 0

  listaGuiasExternasTemp: GuiasExternasTemp[] = [];

  visible: boolean = false;

  rutas_generadas: number = 0;



  // ### Porcentaje variaable
  porcentaje: number = 0;


  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  ngAfterViewInit(): void {
    this.drawSemiGauge(0); // Inicializa el gauge con 0%
  }
  

  ngOnInit(): void {


    
    // Aquí puedes realizar cualquier inicialización necesaria
    this.service.get_campos_modulo_clientes().subscribe(
      (data) => {
        this.Clientes_ty = data.Clientes_guias_ty;
        this.Grupo_operacion = data.Grupos_operacion;
        console.log(data);
        // Lógica adicional en caso de éxito.
      }
    )

  }

  nombreArchivo : string = "Ningún archivo seleccionado"


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(event.target.files[0].name)
    this.nombreArchivo = event.target.files[0].name
  }

  cancelarTablaTemporal(){
    let id_usuario = sessionStorage.getItem('id')+""
    this.selectedFile = null
    this.nombreArchivo = "Ningún archivo seleccionado"

    this.service.get_limpiar_guias_externas_temporales(id_usuario).subscribe( (data : any) => {
      alert(data.message)
      this.toggleLiveDemo()
    })
    // this.toggleLiveDemo()
  }



  // ##### buscar la lista de rutas 

  fecha_inicio : string = ""
  fecha_fin : string = ""

  listaRutas : RutasConsolidadas[] = []
  listaRutasFull : RutasConsolidadas[] = []

  rutasGeneradas : number = 0
  productosEntregados : number = 0
  patentesDistintas : number = 0
  noEntregados : number = 0



  buscarListaRutas(bloque: string){

    if(this.textoBuscar == ""){
      this.service.get_lista_consolidado_ruta(this.fecha_inicio,this.fecha_fin,bloque).subscribe( data => {
        this.listaRutas = data.map(ruta => {
          ruta.porcentaje_entregados = Math.floor((ruta.entregados / ruta.pedido_total) * 100);
          return ruta
          
        })
        this.listaRutasFull = this.listaRutas

        this.rutasGeneradas = this.listaRutas.length
        this.productosEntregados = this.listaRutas.reduce((acc, ruta) => acc + ruta.entregados, 0);
        this.patentesDistintas = new Set(this.listaRutas.map(ruta => ruta.patente_vehiculo)).size;
        this.noEntregados = this.listaRutas.reduce((acc, ruta) => acc + ruta.no_entregados, 0);

        this.porcentaje = Math.floor((this.productosEntregados / (this.productosEntregados + this.noEntregados)) * 100);
        this.drawSemiGauge(this.porcentaje); // Actualiza el gauge con el nuevo porcentaje

        if(this.OperacionBuscador == 0){
            this.listaRutas = data.map(ruta => {
            ruta.porcentaje_entregados = Math.floor((ruta.entregados / ruta.pedido_total) * 100);
            return ruta
          
        })
        }else {
          this.listaRutas = data.filter(ruta => ruta.id_operacion == this.OperacionBuscador)
        }
  
        console.log(data)
      })
    }else{
      this.onKeyUp()
    }


    
    

  }


  // ##### descargar ejemplo de excel
  descargarEjemploExcel() {
    this.service.download_excel_ejemplo_guias_ext()
  }


  // #### modal de carga rutas temporales

  descargar_excel_rutas_temp() : void{
      // Agrega una fila vacía al principio de los datos
  
      if (this.listaGuiasExternasTemp.length === 0){
        return alert("No se han ingresado rutas")
      }
      const datos: any[][] = [[]];
  
      datos.push(["ID","Ruta","PPU","Guía","Estado Operación","Mensaje Guia","Mensaje PPU"])
  
      this.listaGuiasExternasTemp.forEach((ruta) => {
        // arrays.forEach(producto => {
          const fila: any[] = [];
          fila.push(ruta.Id, ruta.Ruta, ruta.Ppu,ruta.Guia, ruta.Mensaje_op, ruta.Mensaje_guia, ruta.Mensaje_ppu); 
          datos.push(fila);
        // });
        
      });
  
      let date = new Date();
      const fechaActual = date.toISOString().split('T')[0];
      // Crea un libro de Excel a partir de los datos
      const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
      const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
      XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');
  
      // Descarga el archivo Excel `Quadminds_Manual_${fechaActual}.xlsx` 
      
      const nombreArchivo = `Carga-rutas-temporal-${fechaActual}.xlsx`;
      // Nombre del archivo Excel a descargar 
      XLSX.writeFile(libroExcel, nombreArchivo);

    }


    // ### buscador de rutas por filtro


    textoBuscar: string = ""

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

    const filtro = this.textoBuscar.toLowerCase();

    console.log("Filtro aplicado:", this.OperacionBuscador);

    const resultado: any[] = [];
    const maxResults = 200; // Ejemplo: limitar los resultados a los primeros 100

    if (this.OperacionBuscador == 0){
      for (let i = 0; i < this.listaRutasFull.length; i++) {
        const lista = this.listaRutasFull[i];
        if (
            lista.patente_vehiculo.toString().toLowerCase().startsWith(filtro) ||
            lista.nombre_ruta.toString().toLowerCase().startsWith(filtro) 
            // lista.cliente.toString().toLowerCase().startsWith(filtro)  
        ) {
            resultado.push(lista);
            if (resultado.length >= maxResults) {
                break; // Terminar el bucle si se alcanza el máximo de resultados
            }
        }
    }
  } else {
      for (let i = 0; i < this.listaRutasFull.length; i++) {
        const lista = this.listaRutasFull[i];
        if ( (lista.patente_vehiculo.toString().toLowerCase().startsWith(filtro) ||
            lista.nombre_ruta.toString().toLowerCase().startsWith(filtro) ) && lista.id_operacion == this.OperacionBuscador
        ) {
            resultado.push(lista);
            if (resultado.length >= maxResults) {
                break; // Terminar el bucle si se alcanza el máximo de resultados
            }
        }
    }

  }

    

    this.listaRutas = resultado;



    this.rutasGeneradas = this.listaRutas.length
    this.productosEntregados = this.listaRutas.reduce((acc, ruta) => acc + ruta.entregados, 0);
    this.patentesDistintas = new Set(this.listaRutas.map(ruta => ruta.patente_vehiculo)).size;
    this.noEntregados = this.listaRutas.reduce((acc, ruta) => acc + ruta.no_entregados, 0);

    this.porcentaje = Math.floor((this.productosEntregados / (this.productosEntregados + this.noEntregados)) * 100);
    console.log("Porcentaje calculado:", this.porcentaje);
    if(this.porcentaje == undefined || this.porcentaje == null || isNaN(this.porcentaje)){
      this.drawSemiGauge(0); // Si el porcentaje es undefined, dibuja el gauge con 0%
    } else {
      this.drawSemiGauge(this.porcentaje); // Actualiza el gauge con el nuevo porcentaje
    }
    

}

  // Aplica debouncing a la función filtrarTabla
  filtrarTablaDebounced = this.debounce(this.filtrarTabla, 200);

  onKeyUp() {
    this.filtrarTablaDebounced('campo');
}

    buscarRutasPorFiltro(){

      this.onKeyUp()
      // this.listaRutas = this.listaRutasFull.filter(ruta => {})
    }
  


    // ### descargar excel de guias

    descargar_excel_rutas_manuales() : void{
      // Agrega una fila vacía al principio de los datos
  
      if (this.listaRutas.length === 0){
        return alert("No se han ingresado rutas")
      }
      const datos: any[][] = [[]];
  
      datos.push(["Nombre Ruta","Fecha","Operación","Centro Operación","Ppu","Pedidos","Entregados","No Entregados","Valor Ruta",
                  "Efectividad"])
  
      this.listaRutas.forEach((ruta) => {
        // arrays.forEach(producto => {
          const fila: any[] = [];
          fila.push(
            ruta.nombre_ruta, ruta.fecha,ruta.nombre_op,ruta.nombre_centro_op,ruta.patente_vehiculo,ruta.pedido_total,
            ruta.entregados,ruta.no_entregados,ruta.valor_ruta, ruta.porcentaje_entregados + "%"
                  );
          datos.push(fila);
        // });
        
      });
  
      let date = new Date();
      const fechaActual = date.toISOString().split('T')[0];
      // Crea un libro de Excel a partir de los datos
      const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
      const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
      XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');
  
      // Descarga el archivo Excel `Quadminds_Manual_${fechaActual}.xlsx` 
      
      const nombreArchivo = `Consolidado-Rutas-${fechaActual}.xlsx`;
      // Nombre del archivo Excel a descargar 
      XLSX.writeFile(libroExcel, nombreArchivo);

    }



    // #### Modal de ediitar rutas manuales

    visibleEdicion: boolean = false;

    rutaSeleccionada : string = ""
    guiaSeleccionada : string = ""


  editarRuta(ruta: string, guia : string) {
    this.rutaSeleccionada = ruta
    this.guiaSeleccionada = guia
    // this.valorRuta = this.listaRutas.filter(ruta => ruta.ruta == parseInt(this.rutaSeleccionada) && ruta.guia == guia)[0].valor_ruta

    this.toggleEdicion()
  }


  toggleEdicion() {
    this.visibleEdicion = !this.visibleEdicion;
  }

  handleEdicionChange(event: any) {
    this.visibleEdicion = event;
  }



  /// modal de resumen de clientes 

  visibleResumen: boolean = false;

  // clienteSeleccionadoInfo : ClienteInfo []
  datosCliente : Cliente [] = []
  datosComuna : Cliente [] = []


  verResumenCliente(cliente_info: ClienteInfo) {

    this.datosCliente = cliente_info.clientes
    this.datosComuna = cliente_info.comunas

    // console.log(cliente_info)
    // this.clienteSeleccionadoInfo = cliente_info
    this.toggleResumen()

  }


  toggleResumen() {
    this.visibleResumen = !this.visibleResumen;
  }

  handleResumenChange(event: any) {
    this.visibleResumen = event;
  }


  valorRuta : number = 0

  editarRutaManual(){
    
    if(!this.valorRuta){
      return alert("Ingrese un valor para la ruta")
    }

    const body = {
      "ruta": this.rutaSeleccionada,
      "guia": this.guiaSeleccionada,
      "valor_ruta": this.valorRuta
    }
    // ### actualizar valor ruta manual por api 
    // this.service.update_valor_ruta_manual(body).subscribe( (data : any) => {

    //   this.listaRutas.map(ruta => {
    //     if (ruta.ruta == parseInt(this.rutaSeleccionada) && ruta.guia == this.guiaSeleccionada){
    //       console.log(this.valorRuta)
    //       ruta.valor_ruta = this.valorRuta
    //     }  
    //   })
    // })

    
  }



  // #### Modal de observación rutas manuales

  visibleObservacion: boolean = false;


  toggleObservacion() {
    this.visibleObservacion = !this.visibleObservacion;
  }

  handleObservacionChange(event: any) {
    this.visibleObservacion = event;
  }


  rutaObservacion : RutasTy [] = []

  verObservacionRuta(ruta: RutasTy, id_ruta : string) {
    this.rutaSeleccionada = id_ruta
    this.rutaObservacion = [ruta]
    // this.valorRuta = this.listaRutas.filter(ruta => ruta.ruta == parseInt(this.rutaSeleccionada) && ruta.guia == guia)[0].valor_ruta
    this.toggleObservacion()
  }


  // #### eliminar ruta manual
  eliminarRutaManual(ruta: string, guia : string){
    this.service.delete_ruta_manual(ruta,guia).subscribe( (data : any) => {

      // alert(data.message)
      
    })
  }



  // ####  actualizar valor ruta consolidada

  updateCell(event: any, index: number, id: number) {
  const value = event.target.value;

    this.listaRutas[index].valor_ruta = value;
    const indexSelec = this.listaRutasFull.findIndex(p => p.id === id);

    if (index !== -1) {
      this.listaRutasFull[indexSelec].valor_ruta = value;
    }
    console.log(`Valor actualizado en la fila ${index}: ${value}`);
  }

  actualizarValorRutaConsolidada(ruta: string, guia : number, valor : number | null){

    const body = {
      "ruta": ruta,
      "guia": guia,
      "valor_ruta": valor
    }

    if (!valor){
      return alert("Ingrese un valor para la ruta")
    }

    console.log(body)
    this.service.update_valor_ruta_consolidada(body).subscribe( (data : any) => {

       alert(data.message)
      
    }, error => {

      if(error.status == 422){
        return alert(error.error.detail[0].msg)
      }
      // console.error('Error al actualizar el valor de la ruta consolidada:', error.status, error.error.detail.msg);
      alert(error.error.detail)
    })
  }


  private drawSemiGauge(percent: number): void {

    this.porcentaje = percent; // Actualiza el porcentaje
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height;
    const radius = 70;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo gris
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 12;
    ctx.stroke();

    // Arco verde
    const endAngle = Math.PI + (percent / 100) * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, endAngle);
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 12;
    ctx.stroke();

    // Aguja
    const angle = Math.PI + (percent / 100) * Math.PI;
    const needleLength = radius - 12;
    const needleX = centerX + needleLength * Math.cos(angle);
    const needleY = centerY + needleLength * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleX, needleY);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Punto central
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#111';
    ctx.fill();
  }


  // rutaSeleccionada : string = ""
  // guiaSeleccionada : string = ""
}
