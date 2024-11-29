import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RazonSocial } from 'src/app/models/modalidad-de-operaciones.interface';
import { CentroOperacion } from 'src/app/models/operacion/centroOperacion.interface';
import { ModalidadDeOperacionesService } from 'src/app/service/modalidad-de-operaciones.service';
import { RegistrarUsuarioService } from 'src/app/service/registrar-usuario.service'
import { MeliService } from 'src/app/service/meli.service'
import { Prefactura,ResumenPrefactura } from "src/app/models/meli/prefactura.interface"
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-prefactura',
  templateUrl: './prefactura.component.html',
  styleUrls: ['./prefactura.component.scss']
})
export class PrefacturaComponent {
  private selectedFile: File | null = null;
  ListaPrefacturaFull : Prefactura [] =[]
  ListaPrefactura : Prefactura [] =[]

  termino : boolean = true
  error! : number  
  codigosErroneos : string [] = []
  message : string = ""
  isLoadingTable : boolean = true
  isLoadingTableResumen : boolean = true
  resumenPrefactura : ResumenPrefactura [] = []

  contador : number = 1
  regionSeleccionada: string = 'Todas'
  comunas!: string [];
  comunasSeleccionadas: string[] = [];

  arrCodProducto : string [] = [] 

  arrDescripcion : string [] = []

  tiendas : string [] = ['/sportex','/electrolux','/retiro_tienda','/easy_opl','/easy_cd']

  tiendaActual : string  = ""
  loadingQuadmind: boolean = true 

  loadQuadmindFull: boolean = true 

  mesSeleccionado : string = '2024-06'
  public rol = sessionStorage.getItem("rol_id") 

  constructor(private service: MeliService) { }

  ngOnInit(){
    this

    const fechaActual = new Date();

    // Obtener mes y año
    const mes = fechaActual.getMonth() + 1;  // Los meses comienzan desde 0, así que sumamos 1
    const año = fechaActual.getFullYear();

    this.mesSeleccionado = año+'-'+mes
    // año+'',mes+''
    


    this.service.getDatosPrefacturaLimit(año+'',mes+'').subscribe((data) =>{ 
      // this.ListaPrefacturaFull = data

      this.ListaPrefactura = data
      this.isLoadingTable = false

      this.service.getDatosPrefactura(año+'',mes+'').subscribe((data) =>{ 
        this.ListaPrefacturaFull = data
      }, error => {
        this.isLoadingTable = false
      })

    }, error => {
      this.isLoadingTable = false
    })



    this.service.getResumenDatosPrefactura().subscribe((data) => {
      this.resumenPrefactura = [data]
      this.isLoadingTableResumen = false
    })
  }


  seleccionarMes(){
    console.log(this.mesSeleccionado.split('-')[0])
    this.isLoadingTable = true
    this.ListaPrefactura = []


    this.service.getDatosPrefacturaLimit(this.mesSeleccionado.split('-')[0],this.mesSeleccionado.split('-')[1]).subscribe((data) =>{ 
      this.ListaPrefactura = data


      this.service.getDatosPrefactura(this.mesSeleccionado.split('-')[0],this.mesSeleccionado.split('-')[1]).subscribe((data) =>{ 
        this.ListaPrefacturaFull = data
  
        // this.ListaPrefactura = data
        this.isLoadingTable = false
      }, error => {
        alert(error.error.detail)
        this.ListaPrefactura = []
        this.isLoadingTable = false
      }
    )
    }, error => {
      alert(error.error.detail)
      this.ListaPrefactura = []
      this.isLoadingTable = false
    })


    
  }

  descargarExcel(){
    // this.service.download_prefactura_excel(this.mesSeleccionado.split('-')[0],this.mesSeleccionado.split('-')[1])
    
    const idRuta = this.textoIdRuta.toLowerCase();
    const patente = this.textoPatente.toLowerCase();
    const conductor = this.textoConductor.toLowerCase();

    const resultado: any[] = [];

    for (let i = 0; i < this.ListaPrefacturaFull.length; i++) {
        const lista = this.ListaPrefacturaFull[i];
        if (
            lista.Id_de_ruta.toString().toLowerCase().startsWith(idRuta) &&
            lista.Patente.toString().toLowerCase().startsWith(patente) &&
            lista.Conductor.toString().toLowerCase().startsWith(conductor)
        ) {
            resultado.push(lista);
        }
    }

    this.ListaPrefactura = resultado;
    
    
    
    
    const datos: any[][] = [[]];

    datos.push(["Id Prefactura","Periodo","Descripción","Id de Ruta","Fecha Inicio","Fecha Fin","Patente",
      "Id Patente","Conductor","Cantidad","Precio Unitario","Descuento","Total"])

    this.ListaPrefactura.forEach((pedido) => {
        const fila: any[] = [];
        fila.push(pedido.Id_prefactura, pedido.Periodo, pedido.Descripcion, pedido.Id_de_ruta, pedido.Fecha_inicio, pedido.Fecha_fin, pedido.Patente, pedido.Id_patente,
                  pedido.Conductor,pedido.Cantidad,pedido.Precio_unitario, pedido.Descuento,pedido.Total); 
        datos.push(fila);
      });

    let date = new Date();
    const fechaActual = date.toISOString().split('T')[0];
    // Crea un libro de Excel a partir de los datos
    const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
    const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');

    // Descarga el archivo Excel `Quadminds_Manual_${fechaActual}.xlsx` 
    
    const nombreArchivo = `Proforma-mensual-${fechaActual}.xlsx`;
    // Nombre del archivo Excel a descargar 
    XLSX.writeFile(libroExcel, nombreArchivo);
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

      this.service.subirExcelPrefactura(formData, id_usuario,ids_usuario).subscribe(
        (data : any) => {
          this.termino = data.termino
          this.error = data.error
          if ( this.error == 1){
            this.codigosErroneos = data.codigos.split(',')
          }
          this.message = data.message
          alert(data.message)
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

  textoPeriodo : any = ''
  textoIdRuta : any = ''
  textoPatente : any = ''
  textoConductor : any = ''
  //Filtro sin para todos(tristemente no me sirve)
  // filtrarTabla(campo : string){
  //   console.log(campo)
  //   this.ListaPrefactura = this.ListaPrefacturaFull.filter((lista : any) => lista[campo].toString().toLowerCase().startsWith(this.textoFiltro.toLowerCase())  )

  //   console.log(this.ListaPrefactura[0])

  //   console.log(this.ListaPrefactura )

  // }


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
      };
  }

  // filtrarTabla(campo : string){
  //     this.ListaPrefactura = this.ListaPrefacturaFull.filter((lista) => lista.Id_de_ruta.toString().toLowerCase().startsWith(this.textoIdRuta.toLowerCase())  
  //     && lista.Patente.toString().toLowerCase().startsWith(this.textoPatente.toLowerCase()) 
  //     && lista.Conductor.toString().toLowerCase().startsWith(this.textoConductor.toLowerCase()))


  //     console.log(this.ListaPrefactura)
  //     // this.ListaPrefactura = this.ListaPrefactura.filter((lista) => lista.Patente.toString().toLowerCase().startsWith(this.textoPatente.toLowerCase())  )
  //     // this.ListaPrefactura = this.ListaPrefactura.filter((lista) => lista.Conductor.toString().toLowerCase().startsWith(this.textoConductor.toLowerCase())  )
  // }

  filtrarTabla(campo: string) {
    const idRuta = this.textoIdRuta.toLowerCase();
    const patente = this.textoPatente.toLowerCase();
    const conductor = this.textoConductor.toLowerCase();

    const resultado: any[] = [];
    const maxResults = 100; // Ejemplo: limitar los resultados a los primeros 100

    for (let i = 0; i < this.ListaPrefacturaFull.length; i++) {
        const lista = this.ListaPrefacturaFull[i];
        if (
            lista.Id_de_ruta.toString().toLowerCase().startsWith(idRuta) &&
            lista.Patente.toString().toLowerCase().startsWith(patente) &&
            lista.Conductor.toString().toLowerCase().startsWith(conductor)
        ) {
            resultado.push(lista);
            if (resultado.length >= maxResults) {
                break; // Terminar el bucle si se alcanza el máximo de resultados
            }
        }
    }

    this.ListaPrefactura = resultado;
    // console.log(this.ListaPrefactura);
}

  // Aplica debouncing a la función filtrarTabla
  filtrarTablaDebounced = this.debounce(this.filtrarTabla, 200);

  onKeyUp() {
    this.filtrarTablaDebounced('campo');
}

  

}
