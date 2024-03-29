import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { RsvService } from 'src/app/service/rsv.service'
import { CatalogoRSV,ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface';
import { CargaRSV } from 'src/app/models/cargaRSV.interface'
import { EtiquetaRSV } from 'src/app/models/etiquetaRSV.interface';
import { InventarioSucursal } from 'src/app/models/inventarioSucursal.interface';
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import { UbicacionCantidadRSV } from 'src/app/models/ubicacionCantidadRsv.interface' 

@Component({
  selector: 'app-inventario-sucursales',
  templateUrl: './inventario-sucursales.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class InventarioSucursalesComponent {

  constructor(private service: RsvService) {

  } 

  // modales 
  isModalOpen: boolean = false
  public visible = false;

  inventarioSeleccionado : InventarioSucursal []= []

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
  colores : string [] = []

  isClick : boolean = false
  public rol = sessionStorage.getItem("rol_id") 
  sucursalSeleccionada : string = ""

  codigoSeleccionado : string = ""
  sucursales : SucursalRSV [] = []

  arrInventarioSucursal : InventarioSucursal [][] = []
  arrInventarioSucursalFull : InventarioSucursal [][] = []

  UbicacionCantidad : UbicacionCantidadRSV [] = []


  ngOnInit(){
    this.service.get_sucursales().subscribe((data) => {
      this.sucursales = data
      console.log()
      if(this.rol !== '5'){
        this.sucursales = this.sucursales.filter(sucursal => sucursal.Id !== 2)
      }
    })
  }

  filtrarColores(color : string){
    if (color === "") {
      // this.catalogoRSV = this.catalogoRSVFull
      this.arrInventarioSucursal = this.arrInventarioSucursalFull
    } else {
      this.arrInventarioSucursal = this.arrInventarioSucursalFull.filter(catalogo => catalogo[0].Color === color)
      // this.catalogoRSV =  this.catalogoRSVFull.filter(producto => producto.Color === color)
    }
  }

  


  buscarInventarioPorSucursal(){
    this.arrInventarioSucursal = []
    this.arrInventarioSucursalFull = []
    if (this.sucursalSeleccionada == "") return alert ("Seleccione una sucursal")
    this.service.get_inventario_por_sucursales(parseInt(this.sucursalSeleccionada)).subscribe((data) =>{
      this.colores = [...new Set(data.map((inventario) => inventario.Color))]
      // arr inventarios
      let array = []
      this.isClick = true
      this.colores.map(color => {
        array = data.filter( inventario => inventario.Color == color)
        this.arrInventarioSucursalFull.push(array)

      })
      this.arrInventarioSucursal = this.arrInventarioSucursalFull
    })
  }

  descargarInventario() {
    if (this.sucursalSeleccionada == "") return alert ("Seleccione una sucursal")
    
    let nombre = this.sucursales.filter(sucursal => sucursal.Id == parseInt(this.sucursalSeleccionada))[0].Nombre
    this.service.downloadInventarioSucursalExcel(parseInt(this.sucursalSeleccionada), nombre)
  }

  verUbicacion( inventario : InventarioSucursal){
    console.log(inventario)
    this.inventarioSeleccionado = [inventario]
    this.toggleLiveDemo()
  }

  ObtenerUbicacionCantidad(codigo : string){
    const body = {
      Sucursal : this.sucursalSeleccionada,
      Codigo : codigo
    }

    this.codigoSeleccionado = codigo

    this.service.obtener_ubicacion_y_cantidad(body).subscribe((data) => {
      this.UbicacionCantidad = data
      console.log(this.UbicacionCantidad)
      this.toggleLiveDemo()
      
    })
  }



}
