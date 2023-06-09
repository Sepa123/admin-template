import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RutasService } from 'src/app/service/rutas.service';
import { NombreRutaService } from 'src/app/service/nombre-ruta.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RutaEnActivo } from "src/app/models/rutaEnActivo.interface"
import { NombresRutasActivas } from "src/app/models/nombresRutasActivas.interface"
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rutas-activas',
  templateUrl: './rutas-activas.component.html',
  styleUrls: ['./rutas-activas.component.scss']
})
export class RutasActivasComponent {

  model! : NgbDateStruct
  nombreRutaActual!:  string
  cantBultos! : number
  isClicked : boolean = false
  isActive: boolean = false
  isRuta: boolean = false
  rutaEnActivo! : RutaEnActivo []
  nombresRutas!: NombresRutasActivas []
  nombreRuta!: NombresRutasActivas []
  arraySKU: any[] = []
  arrayProducto: any[] = []

  fechaActual!: string
  patenteRuta! : string
  driverRuta! : string
  isDriver : boolean = false

  // arrayRutasEnActivo! : 

  constructor(private service: RutasService, private nombreRutaService : NombreRutaService,
              private router: Router) { 

  }

  asignarRuta() {
    const codigo = this.nombreRutaActual;
    this.nombreRutaService.setCodigo(codigo);
    this.nombreRutaService.setBultos(this.cantBultos)
    this.nombreRutaService.setDataDriver(this.driverRuta,this.patenteRuta)
    console.log(this.driverRuta)
    console.log(this.patenteRuta)
    this.router.navigate(['/picking/asignar-ruta']);
  }
  editarRutaActiva() {
    const codigo = this.nombreRutaActual;
    this.nombreRutaService.setCodigo(codigo);
    this.router.navigate(['/picking/editar-ruta']);
  }

  updateEstadoRuta (nombre_ruta : string, dateObj : any) {
    let isSeguro = confirm("¿Seguro que desea cerrar esta ruta?");
    if (!isSeguro) {
      return console.log("no esta seguro")
    } else {
    this.service.update_estado_ruta(nombre_ruta).subscribe( (data: any) => {
      alert(data.message)
    },
    ((error) => {
      alert(error.error.detail)
    }))

    this.nombresRutas.map(ruta => {
      if(ruta.Nombre_ruta == nombre_ruta) ruta.Estado = false
    })
  }
  }

  getNombreByFecha(dateObj : any) {

    console.log(dateObj)
    this.isClicked = false
    this.isActive = false
    this.isDriver = false
    this.rutaEnActivo = []
    this.nombreRutaActual = ""
    if (dateObj === undefined) return alert("Por favor ingrese una fecha")
    const formattedDate = `${dateObj.year}-${dateObj.month.toString().padStart(2, '0')}-${dateObj.day.toString().padStart(2, '0')}`;
    this.service.get_nombres_ruta(formattedDate).subscribe((data) => {

      data.length == 0 ? this.isRuta = false : this.isRuta = true

      this.nombresRutas = data
    })

    console.log(this.nombresRutas)
  }

  ngOnInit() {

    const fecha = new Date();

    const ObjcurrentDate = {
      year: fecha.getFullYear(), 
      month: fecha.getMonth() + 1, 
      day:  fecha.getDate()
    }

    let fechaFormateada = fecha.toISOString().split('T')[0];

    this.fechaActual = fechaFormateada
    this.getNombreByFecha(ObjcurrentDate)
  }

  buscarRuta (nombreRuta : string,estado_ruta : boolean) {
    // console.log(this.nombreRuta)
    
    this.service.get_rutas_en_activo(nombreRuta).subscribe((data) => {
      console.log(data)
      this.nombreRutaActual = nombreRuta
      this.rutaEnActivo = data
      this.cantBultos = this.rutaEnActivo.reduce((sum,bulto) =>  sum + bulto.Bultos, 0)
      this.rutaEnActivo.map(ruta => {
        ruta.arraySKU = ruta.SKU.split('@')
        ruta.arrayProductos = ruta.Producto.split('@')
      })
      // console.log(estado_ruta)
      this.isClicked = true
      this.isActive = true
      estado_ruta == false ? this.isActive = false : this.isActive = true

      this.driverRuta = ""
      this.patenteRuta = ""

      this.service.get_patente_driver_by_nombre_ruta(this.nombreRutaActual).subscribe((data : any) => {
        console.log(data)
        this.patenteRuta = data.Patente
        this.driverRuta = data.Driver
        this.isDriver = true

        console.log(this.driverRuta)
        console.log(this.patenteRuta)
        
      })
    },
    ((error) => {

      this.isDriver = false
    }))
  }

  downloadExcel(nombre_ruta : string) {
    this.service.download_ruta_activa(nombre_ruta)
  }
  // downloadExcel(nombre_ruta: string): void {
  //   const datos: any[][] = [[]];
  
  //   datos.push([
  //     "Posición", "Pedido", "Comuna", "SKU", "Producto", "UND", "Bultos", "Nombre",
  //     "Direccion Cliente", "Teléfono", "Validado", "DE", "DP"
  //   ]);
  
  //   this.rutaEnActivo.forEach((ruta) => {
  //     const fila: any[] = [];
  
  //     if (ruta.arrayProductos.length === 1) {
  //       fila.push(
  //         ruta.Pos, ruta.Codigo_pedido, ruta.Comuna, ruta.SKU, ruta.Producto,
  //         ruta.Unidades, ruta.Bultos, ruta.Nombre_cliente, ruta.Direccion_cliente, ruta.Telefono
  //       );
  //       datos.push(fila);
  //     } else if (ruta.arrayProductos.length > 1) {
  //       ruta.arrayProductos.forEach((producto, i) => {
  //         if (i === 0) {
  //           fila.push(
  //             ruta.Pos, ruta.Codigo_pedido, ruta.Comuna, ruta.arraySKU[i], producto,
  //             ruta.Unidades, ruta.Bultos, ruta.Nombre_cliente, ruta.Direccion_cliente, ruta.Telefono
  //           );
  //           datos.push(fila);
  //         } else {
  //           const filaProducto: any[] = [
  //             "", "", "", ruta.arraySKU[i], producto,
  //             "", "", "", "", ""
  //           ];
  //           datos.push(filaProducto);
  //         }
  //       });
  //     }
  //   });
  
  //   const date = new Date();
  //   const fechaActual = date.toISOString().split('T')[0];
  
  //   const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
  //   const hoja: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
  //   XLSX.utils.book_append_sheet(libroExcel, hoja, 'Hoja1');
  
  //   const nombreArchivo = `${nombre_ruta}.xlsx`;
  //   XLSX.writeFile(libroExcel, nombreArchivo);
  // }
  

}
