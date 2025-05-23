import { Component } from '@angular/core';
import { RutasService } from '../../../service/rutas.service';
import { ClientesTy,RutasTy,RutasTyTemp } from '../../../models/rutas/rutas.interface';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-carga-rutas-manuales',
  templateUrl: './carga-rutas-manuales.component.html',
  styleUrls: ['./carga-rutas-manuales.component.scss']
})
export class CargaRutasManualesComponent {

  private selectedFile: File | null = null;

  today = new Date();

  constructor(private service : RutasService) { }

  
  Clientes_ty: ClientesTy[] = [];

  clienteSeleccionado : number = 0


  // ###### Variables para la tabla de rutas temporales

  cantRutas : number = 0
  procesables: number = 0
  noProcesables: number = 0

  listaRutasTyTemp: RutasTyTemp[] = [];

  visible: boolean = false;


  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  

  ngOnInit(): void {
    // Aquí puedes realizar cualquier inicialización necesaria
    this.service.get_campos_modulo_clientes().subscribe(
      (data) => {
        this.Clientes_ty = data.Clientes_ty;
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

    this.service.get_limpiar_rutas_manuales_temporales(id_usuario).subscribe( (data : any) => {
      alert(data.message)
      this.toggleLiveDemo()
    })
    // this.toggleLiveDemo()
  }


  procesarTablaTemporal(){
    let id_usuario = sessionStorage.getItem('id')+""
    this.selectedFile = null
    this.nombreArchivo = "Ningún archivo seleccionado"

    this.service.get_procesar_rutas_manuales_temporales(id_usuario).subscribe( (data : any) => {
      alert(data.message)
      this.toggleLiveDemo()
    })
    // this.toggleLiveDemo()
  }

  subirExcelruta() {

    console.log(this.clienteSeleccionado);

    if(this.clienteSeleccionado == 0){
      
      return alert("Seleccione un cliente")
    }
    const cliente = this.Clientes_ty.filter(cliente => cliente.Id_cliente == this.clienteSeleccionado)[0].Cliente

    if (this.selectedFile) {
      let id_usuario = sessionStorage.getItem('id')+""
      let ids_usuario = sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+""
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

    
    // this.service.get_lista_rutas_manuales_temp(id_usuario).subscribe( data => {
    //   this.listaRutasTyTemp = data

    //   console.log(this.listaRutasTyTemp)

      
    //   this.cantRutas = this.listaRutasTyTemp.length

    //   this.procesables = this.listaRutasTyTemp.filter(ruta => ruta.Proceder == true).length
    //   this.noProcesables = this.listaRutasTyTemp.filter(ruta => ruta.Proceder == false).length

    //   this.toggleLiveDemo()
    // })

    // ### version final 
    
    this.service.upload_clientes_rutas_manuales(formData,id_usuario,ids_usuario,cliente,this.clienteSeleccionado).subscribe(
      (data : any) => {
        alert(data.message)
        console.log('Archivo subido exitosamente');

        this.service.get_lista_rutas_manuales_temp(id_usuario).subscribe( data => {
          this.listaRutasTyTemp = data
    
          console.log(this.listaRutasTyTemp)
    
          
          this.cantRutas = this.listaRutasTyTemp.length
    
          this.procesables = this.listaRutasTyTemp.filter(ruta => ruta.Proceder == true).length
          this.noProcesables = this.listaRutasTyTemp.filter(ruta => ruta.Proceder == false).length
    
          this.toggleLiveDemo()
        })
        
        // Lógica adicional en caso de éxito.
      }, error => {
        console.error('Error al subir el archivo:', error);
        alert(error.error.detail);
        // Lógica adicional en caso de error.
      }
    )
  }else{
    console.warn('Ningún archivo seleccionado');
    alert('Ningún archivo seleccionado');
    // Lógica adicional en caso de que el usuario no seleccione ningún archivo.
  }
}



  // ##### buscar la lista de rutas 

  fecha_inicio : string = ""
  fecha_fin : string = ""

  listaRutas : RutasTy[] = []
  listaRutasFull : RutasTy[] = []


  buscarListaRutas(bloque: string){

    if(this.textoBuscar == ""){
      this.service.get_lista_rutas_manuales(this.fecha_inicio,this.fecha_fin,bloque).subscribe( data => {
        this.listaRutas = data
        this.listaRutasFull = data
  
        console.log(data)
      })
    }else{
      this.onKeyUp()
    }


    
    

  }


  // ##### descargar ejemplo de excel
  descargarEjemploExcel() {
    this.service.download_excel_ejemplo_rutas_manuales()
  }


  // #### modal de carga rutas temporales

  descargar_excel_rutas_temp() : void{
      // Agrega una fila vacía al principio de los datos
  
      if (this.listaRutasTyTemp.length === 0){
        return alert("No se han ingresado rutas")
      }
      const datos: any[][] = [[]];
  
      datos.push(["ID","Ruta","PPU","Guía","Estado Patente","Estado Ruta"])
  
      this.listaRutasTyTemp.forEach((ruta) => {
        // arrays.forEach(producto => {
          const fila: any[] = [];
          fila.push(ruta.Id, ruta.Ruta, ruta.Ppu,ruta.Guia, ruta.Mensaje_ppu, ruta.Mensaje_ruta); 
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

    const resultado: any[] = [];
    const maxResults = 200; // Ejemplo: limitar los resultados a los primeros 100

    for (let i = 0; i < this.listaRutasFull.length; i++) {
        const lista = this.listaRutasFull[i];
        if (
            lista.ppu.toString().toLowerCase().startsWith(filtro) ||
            lista.ruta.toString().toLowerCase().startsWith(filtro) ||
            lista.cliente.toString().toLowerCase().startsWith(filtro)  
        ) {
            resultado.push(lista);
            if (resultado.length >= maxResults) {
                break; // Terminar el bucle si se alcanza el máximo de resultados
            }
        }
    }

    this.listaRutas = resultado;

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
  


    // ### descargar excel de rutas manuales 

    descargar_excel_rutas_manuales() : void{
      // Agrega una fila vacía al principio de los datos
  
      if (this.listaRutas.length === 0){
        return alert("No se han ingresado rutas")
      }
      const datos: any[][] = [[]];
  
      datos.push(["Fecha","Ruta","PPU","Cliente","Estado","Comuna","Bultos","Observación","Valor Ruta"])
  
      this.listaRutas.forEach((ruta) => {
        // arrays.forEach(producto => {
          const fila: any[] = [];
          fila.push(ruta.fecha, ruta.ruta, ruta.ppu,ruta.cliente, ruta.estado, ruta.comuna, ruta.bultos, ruta.observacion, ruta.valor_ruta); 
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
      
      const nombreArchivo = `Carga-rutas-manuales-${fechaActual}.xlsx`;
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
    this.valorRuta = this.listaRutas.filter(ruta => ruta.ruta == parseInt(this.rutaSeleccionada) && ruta.guia == guia)[0].valor_ruta

    this.toggleEdicion()
  }


  toggleEdicion() {
    this.visibleEdicion = !this.visibleEdicion;
  }

  handleEdicionChange(event: any) {
    this.visibleEdicion = event;
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
    this.service.update_valor_ruta_manual(body).subscribe( (data : any) => {

      this.listaRutas.map(ruta => {
        if (ruta.ruta == parseInt(this.rutaSeleccionada) && ruta.guia == this.guiaSeleccionada){
          console.log(this.valorRuta)
          ruta.valor_ruta = this.valorRuta
        }  
      })
    })

    
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

      alert(data.message)
      
    })
  }

  // rutaSeleccionada : string = ""
  // guiaSeleccionada : string = ""
}
