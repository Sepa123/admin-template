import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { RsvService } from 'src/app/service/rsv.service'
import { CatalogoRSV,ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface';
import { CargaRSV } from 'src/app/models/cargaRSV.interface'
import { EtiquetaRSV } from 'src/app/models/etiquetaRSV.interface';
import { MES } from 'src/app/models/enum/meses.enum';

@Component({
  selector: 'app-listar-carga',
  templateUrl: './listar-carga.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class ListarCargaComponent {

  tablaCarga : CargaRSV [] =[]
  
  colores : ColoresRSV[] = []

  MesSeleccionado : string = ""
  AnoSeleccionado : string =""
  añoActual : string =""

  meses : any [] = []

  listaAnos : string [] = []

  codigosProductos : CatalogoPorColor [] = []

  arrayCodigosProductos : CatalogoPorColor[][] = []

  nombreCargaExiste : boolean = false

  listaEtiquetas : EtiquetaRSV [] = []

  arrlistaEtiquetas : EtiquetaRSV [][] = []

  isErrorView : boolean = false

  cargaSeleccionada : string = ""

// modales 
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

  constructor(private fb:FormBuilder,private service: RsvService) {
    
    this.meses = [
      { Nombre: 'Enero', Valor: '01' },
      { Nombre: 'Febrero', Valor: '02' },
      { Nombre: 'Marzo', Valor: '03' },
      { Nombre: 'Abril', Valor:'04' },
      { Nombre: 'Mayo', Valor: '05' },
      { Nombre: 'Junio', Valor:'06' },
      { Nombre: 'Julio', Valor: '07' },
      { Nombre: 'Agosto', Valor: '08' },
      { Nombre: 'Septiembre', Valor: '09' },
      { Nombre: 'Octubre', Valor: '10' },
      { Nombre: 'Noviembre', Valor: '11' },
      { Nombre: 'Diciembre', Valor: '12' }
    ]

  }
  
  ngOnInit(){

    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear().toString();
    const mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');

    const añoInicial = 2020;
    const años = [];

    for (let año = añoInicial; año <= parseInt(añoActual); año++) {
        años.push(año.toString());
    }

    this.listaAnos = años

    this.service.get_colores_rsv().subscribe((data) => {
      this.colores = data
      
    })
    this.service.get_listar_cargas_por_mes(añoActual+''+mesActual).subscribe((data)=> {
      this.tablaCarga = data
    })
  }

  verEtiquetas(nombre_carga : string) {
    this.cargaSeleccionada = nombre_carga
    this.arrlistaEtiquetas = []
    this.service.get_dato_producto_etiquetas(nombre_carga).subscribe((data) => {
      this.listaEtiquetas = data
      const colores  =  [...new Set(this.listaEtiquetas.map((lista) => lista.Color))]
      // arrlistaEtiquetas
      let array = []
      colores.map(color => {
        array = this.listaEtiquetas.filter(lista => lista.Color == color)
        this.arrlistaEtiquetas.push(array)
      })
    })
  }

  descargarEtiquetas(codigo : string){
    this.service.downloadEtiquetasExcel(this.cargaSeleccionada, codigo)
  }


  filtrarListaCargaPorMes(año : string){
    this.arrlistaEtiquetas = []
    this.service.get_listar_cargas_por_mes(año).subscribe((data)=> {
      this.tablaCarga = data
    })
  }

  verificarCarga(nombre_carga : string){
    this.service.generar_etiquetas_por_nombre_carga(nombre_carga).subscribe((data :any) =>{
      if(data.alerta == 0){
        alert(data.message)
      } else if (data.alerta == 1) {
        alert(data.message)
      }
    })
  }

}

  



