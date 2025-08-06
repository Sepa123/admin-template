import { Component } from '@angular/core';
import { CargaQuadmind } from 'src/app/models/cargas/cargaQuadmind.interface';
// import { TIService } from 'src/app/service/ti.service';
import { CargaService } from '../../../service/carga.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-quadminds',
  templateUrl: './quadminds.component.html',
  styleUrls: ['./quadminds.component.scss']
})
export class QuadmindsComponent {
  private selectedFile: File | null = null;

  termino : boolean = true
  error! : number  
  codigosErroneos : string [] = []
  message : string = ""

  contador : number = 1
  tablaQuadmind : CargaQuadmind[] = []
  tablaQuadmindFull! : CargaQuadmind[];
  tablaQuadmindPreview! : CargaQuadmind[];
  regionSeleccionada: string = 'Todas'
  comunas!: string [];
  comunasSeleccionadas: string[] = [];

  arrCodProducto : string [] = [] 

  arrDescripcion : string [] = []

  tiendas : string [] = ['/sportex','/electrolux','/retiro_tienda','/easy_opl','/easy_cd']

  tiendaActual : string  = ""
  loadingQuadmind: boolean = true 

  loadQuadmindFull: boolean = true 

  public visibleEstadoCarga = false;

  toggleEstadoCarga() {
    this.visibleEstadoCarga = !this.visibleEstadoCarga;
  }

  handleLiveEstadoCarga(event: any) {
    this.visibleEstadoCarga = event;
  }

  constructor(private service: CargaService) { 
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {

      this.termino = false
      let id_usuario = sessionStorage.getItem('id')+""
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.service.upload_quadmind_manual(formData, id_usuario).subscribe(
        (data : any) => {
          this.termino = data.termino
          this.error = data.error
          if ( this.error == 1){
            this.codigosErroneos = data.codigos.split(',')
          }
          this.message = data.message
          console.log('Archivo subido exitosamente');

          this.toggleEstadoCarga()
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

  cargarId(){
    let id_usuario = sessionStorage.getItem('id')+""
    console.log(id_usuario)
    this.service.asignar_ruta_quadmind(Number(id_usuario)).subscribe(data => {
      console.log(data)
    })
  }

  public svgContent!: SafeHtml;
  timeoutId : any

  ngOnInit (): void {
    const sum = 200
    for (let i = 0; i < this.tiendas.length ; i++) {

      // console.log(sum * (i+1));
      this.timeoutId = setTimeout(() => {
        this.service.get_quadmind_separado(this.tiendas[i]).subscribe(data => {
          this.tiendaActual = this.tiendas[i]
          this.tablaQuadmindPreview = data
          this.tablaQuadmindPreview.map((quadmind) => {
            quadmind.Provincia = quadmind.Provincia == null ? 'Otro' : quadmind.Provincia
            quadmind.arrayCodigo = quadmind.Codigo_producto.split(' @ ')
            quadmind.arrayDescripcion = quadmind.Descripcion_producto.split(' @ ')
          })
          
          // this.tablaQuadmind = this.tablaQuadmindFull
          this.tablaQuadmind.push(...this.tablaQuadmindPreview)
          this.comunas = [...new Set(this.tablaQuadmind.map(quadmind => quadmind.Provincia == null ? 'Otro' : quadmind.Provincia ) )].sort((a,b) => a?.localeCompare(b))
          this.loadingQuadmind = false;
          console.log(this.comunas)
          console.log(this.tablaQuadmind.length)
          this.tablaQuadmindFull = this.tablaQuadmind
          this.contador = this.tablaQuadmind.length
          if (this.tiendaActual === '/easy_cd') {this.loadQuadmindFull = false}
          
        },
        ((error) => {
          console.log(error.error.detail)
          alert("Hubo un error al cargar los datos, por favor intentelo mas tarde")
        }))
      }, 9000 * i)
      
     
    }

    // this.service.get_quadmind().subscribe(data => {
    //   this.tablaQuadmindFull = data
    //   this.tablaQuadmindFull.map((quadmind) => {
    //     quadmind.Provincia = quadmind.Provincia == null ? 'Otro' : quadmind.Provincia
    //     quadmind.arrayCodigo = quadmind.Codigo_producto.split(' @ ')
    //     quadmind.arrayDescripcion = quadmind.Descripcion_producto.split(' @ ')
    //   })
    //   this.tablaQuadmind = this.tablaQuadmindFull
    //   this.comunas = [...new Set(this.tablaQuadmindFull.map(quadmind => quadmind.Provincia == null ? 'Otro' : quadmind.Provincia ) )].sort((a,b) => a?.localeCompare(b))
    //   this.loadingQuadmind = false;
    //   console.log(this.comunas)
    // },
    // ((error) => {
    //   console.log(error.error.detail)
    //   alert("Hubo un error al cargar los datos, por favor intentelo mas tarde")
    // }))
  }

  detenerTemporizador() {
    if (this.contador == 0){
      clearTimeout(this.timeoutId);
      console.log("Hata awui llegue")
    }
  }

  filterByRegion( provincia : string){
    this.tablaQuadmind = this.tablaQuadmindFull.filter(quadmind => quadmind.Provincia == provincia)
    this.regionSeleccionada = provincia
    this.tablaQuadmind.map((quadmind) => {
      quadmind.arrayCodigo = quadmind.Codigo_producto.split(' @ ')
      quadmind.arrayDescripcion = quadmind.Descripcion_producto.split(' @ ')
    })
  }

  fullQuadmind(){
    this.tablaQuadmind = this.tablaQuadmindFull
    this.tablaQuadmind.map((quadmind) => {
      quadmind.arrayCodigo = quadmind.Codigo_producto.split(' @ ')
      quadmind.arrayDescripcion = quadmind.Descripcion_producto.split( ' @ ')
    })
  }

  // downloadExcel() : void {
  //   console.log(this.tablaQuadmind)
  //   this.service.send_quadmind_download(this.tablaQuadmind).subscribe(data => {
  //     console.log(data)
  //   })
  // }

  addDaysToDate(date : Date, days : number){
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
 }
  
  downloadExcel() : void{
    // Agrega una fila vacía al principio de los datos
    const datos: any[][] = [[]];
    
    datos.push(["Código del Cliente","Nombre","Calle y Número","Ciudad","Provincia/Estado","Latitud","Longitud","Teléfono con código de país",
                "Email","Código de Pedido","Fecha de Pedido","Operación E/R","Código de Producto","Descripción del Producto","Cantidad de Producto","Peso", 
                "Volumen","Dinero","Duración min","Ventana horaria 1","Ventana horaria 2","Notas","Agrupador",
                "Email de Remitentes","Eliminar Pedido Si - No - Vacío","Vehículo","Habilidades"])
    this.tablaQuadmind.forEach((producto) => {
      const fila: any[] = [];
      let fechaPedido = new Date(`${producto.Fecha_pedido}T00:00:00`)
      console.log(this.addDaysToDate(fechaPedido,1))
      // let dateObject = this.stringToDate(producto.Fecha_pedido);
      // const formattedDate = this.formatDate(dateObject);
      
      fila.push(producto.Codigo_cliente, producto.Nombre, producto.Calle,producto.Ciudad, producto.Provincia,
                producto.Latitud, producto.Longitud, producto.Telefono,producto.Email, producto.Codigo_pedido,
                this.addDaysToDate(fechaPedido,1), producto.Operacion, producto.Codigo_producto,producto.Descripcion_producto, producto.Cantidad_producto,
                producto.Peso, producto.Volumen, producto.Dinero, producto.Duracion_min, producto.Ventana_horaria_1,
                producto.Ventana_horaria_2, producto.Notas, producto.Agrupador,producto.Email_remitentes, producto.Eliminar_pedido,
                producto.Vehiculo, producto.Habilidades); 
    
      datos.push(fila);
    });


    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];
    // Crea un libro de Excel a partir de los datos
    const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
    const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos,  { cellDates: true });

    
    XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');

    // Descarga el archivo Excel `Quadminds_Manual_${fechaActual}.xlsx` 
    const nombreArchivo = `Quadminds_${fechaActual}.xlsx`;
    // Nombre del archivo Excel a descargar 
    XLSX.writeFile(libroExcel, nombreArchivo);
  }
}
