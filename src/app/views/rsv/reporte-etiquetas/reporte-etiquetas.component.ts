import { Component } from '@angular/core';
import { ReporteEtiquetas } from 'src/app/models/reporteEtiquetas.interface';
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import { RsvService } from 'src/app/service/rsv.service';

@Component({
  selector: 'app-reporte-etiquetas',
  templateUrl: './reporte-etiquetas.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class ReporteEtiquetasComponent {

  constructor(private service :RsvService){

  }

  arrInventarioEtiquetas : ReporteEtiquetas [] [] = []

  InventarioEtiquetas : ReporteEtiquetas [] = []

  public rol = sessionStorage.getItem("rol_id") 
  sucursalSeleccionada : string = ""
  isClick : boolean = false
  sucursales : SucursalRSV [] = []

  ngOnInit(){
    this.service.get_sucursales().subscribe((data) => {
      this.sucursales = data
      console.log()
      if(this.rol !== '5'){
        this.sucursales = this.sucursales.filter(sucursal => sucursal.Id !== 2)
      }
    })
  }

  // sucursalId : string = ""

  downloadExcelReporteEtiquetas(){
    const caracter = this.generarCaracteresRandom(10)

    this.service.downloadReporteEtiquetasExcel(this.sucursalSeleccionada, caracter)
  }

  generarCaracteresRandom(longitud : number) {
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
  
    for (let i = 0; i < longitud; i++) {
      let indice = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indice);
    }
    return resultado;
  }

  buscarEtiquetasPorSucursal(){
    this.isClick = false
      this.arrInventarioEtiquetas = []
      if (this.sucursalSeleccionada == "") return alert ("Seleccione una sucursal")
      this.service.get_reporte_etiquetas(this.sucursalSeleccionada).subscribe((data) =>{
        // const colores = [...new Set(data.map((inventario) => inventario.Color))]
        // // arr inventarios
        // let array = []
        this.isClick = true
        // colores.map(color => {
        //   array = data.filter( inventario => inventario.Color == color)
        //   this.arrInventarioEtiquetas.push(array)
        // })

        this.InventarioEtiquetas = data
      })
  }


}
