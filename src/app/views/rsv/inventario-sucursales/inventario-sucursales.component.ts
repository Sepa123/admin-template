import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { RsvService } from 'src/app/service/rsv.service'
import { CatalogoRSV,ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface';
import { CargaRSV } from 'src/app/models/cargaRSV.interface'
import { EtiquetaRSV } from 'src/app/models/etiquetaRSV.interface';
import { InventarioSucursal } from 'src/app/models/inventarioSucursal.interface';
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';

@Component({
  selector: 'app-inventario-sucursales',
  templateUrl: './inventario-sucursales.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class InventarioSucursalesComponent {

  constructor(private service: RsvService) {

  } 
  public rol = sessionStorage.getItem("rol_id") 
  sucursalSeleccionada : string = ""
  sucursales : SucursalRSV [] = []

  arrInventarioSucursal : InventarioSucursal [][] = []

  ngOnInit(){
    this.service.get_sucursales().subscribe((data) => {
      this.sucursales = data
      console.log()
      if(this.rol !== '5'){
        this.sucursales = this.sucursales.filter(sucursal => sucursal.Id !== 2)
      }
    })
  }

  buscarInventarioPorSucursal(){
    this.arrInventarioSucursal = []
    if (this.sucursalSeleccionada == "") return alert ("Seleccione una sucursal")
    this.service.get_inventario_por_sucursales(parseInt(this.sucursalSeleccionada)).subscribe((data) =>{
      const colores = [...new Set(data.map((inventario) => inventario.Color))]
      // arr inventarios
      let array = []
      colores.map(color => {
        array = data.filter( inventario => inventario.Color == color)
        this.arrInventarioSucursal.push(array)
      })
    })
  }



}