import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { RsvService } from 'src/app/service/rsv.service'
import { CatalogoRSV,ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface';
import { CargaRSV } from 'src/app/models/cargaRSV.interface'
import { EtiquetaRSV } from 'src/app/models/etiquetaRSV.interface';

@Component({
  selector: 'app-listar-carga',
  templateUrl: './listar-carga.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class ListarCargaComponent {

  tablaCarga : CargaRSV [] =[]
  
  colores : ColoresRSV[] = []

  codigosProductos : CatalogoPorColor [] = []

  arrayCodigosProductos : CatalogoPorColor[][] = []
  cargasForm : FormGroup;

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

    this.cargasForm = this.fb.group({
        Nombre_carga : this.fb.control(""),
        Fecha_ingreso : this.fb.control(""),
        Codigo : this.fb.control("", [Validators.required] ),
        Color : this.fb.control("", [Validators.required] ),
        Paquetes : this.fb.control("", [Validators.required] ),
        Unidades: this.fb.control("", [Validators.required] ),
        Id_user : this.fb.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
        Ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
        Descripcion : this.fb.control("")
    })

  }

  ngOnInit(){
    this.service.get_colores_rsv().subscribe((data) => {
      this.colores = data
      
    })
    this.service.get_listar_cargas().subscribe((data)=> {
      this.tablaCarga = data
    })

    // this.service.getEtiquetaPorCarga("CONTENEDOR05-Inicial","KPS6208NO").subscribe((data) => {
    //   console.log(data[0].Bar_code)
    // })
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

  seleccionCodigo(){
    const codigo : string = this.cargasForm.value.Codigo
    const producto = this.codigosProductos.find(cod => cod.Codigo == codigo)?.Producto
    this.cargasForm.patchValue({
            Descripcion : producto
          })

    // alert(codigo)
  }


  cambio(){
    const color : number = this.cargasForm.value.Color
    this.service.filtrar_catalogo_por_color(color).subscribe((data)=> {
      this.codigosProductos = data
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










 
  cargaUnica(){
    const nombreCarga = this.cargasForm.value.Nombre_carga
    this.service.buscar_carga_por_nombre_carga(nombreCarga.trim()).subscribe((data : any)=> {
      if(data.repetido){
        alert(data.message)
        this.nombreCargaExiste = true
      }else{
        this.nombreCargaExiste = false
      }
      this.service.get_listar_cargas().subscribe((data)=> {
        this.tablaCarga = data
      })
    })
  }





  }

  



