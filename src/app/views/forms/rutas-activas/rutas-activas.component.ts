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
import { Nominatim } from '../../../models/nominatim.interface'



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

  idRuta! : number
  rutaEnActivo! : RutaEnActivo []
  nombresRutas!: NombresRutasActivas []
  nombreRuta!: NombresRutasActivas []
  arraySKU: any[] = []
  arrayProducto: any[] = []
  arrayDirecciones : string [] = []

  fechaActual!: string
  patenteRuta! : string
  driverRuta! : string
  isDriver : boolean = false

  // arrayRutasEnActivo! : 

  constructor(private service: RutasService, private nombreRutaService : NombreRutaService,
              private router: Router, private http : HttpClient) { 

  }

  dataRecov! : Nominatim []

  async buscarlalonRutas(rutaActual: RutaEnActivo []){
    const idsVistos = new Set(); 
    const rutaFilter = rutaActual.filter(ruta => {
      if (!idsVistos.has(ruta.Direccion_cliente)) {
        idsVistos.add(ruta.Direccion_cliente)
        return true
      }
      return false;
    });
    
    const promesas = rutaFilter.map(async ruta => {
      await this.buscarLatLon(ruta.Comuna, ruta.Direccion_cliente, ruta.Region);
    });
  
    await Promise.all(promesas);
  }

  buscarLatLon(comuna : string, direccion : string, region : string){
    // const set =  Array.from(new SetarrayDirecciones)
    const dir_entregada = direccion+", "+comuna+ ", "+region+", Chile"

    const  body= {
      "Id_usuario" : sessionStorage.getItem('id'),
      "Direccion" : dir_entregada,
      "Comuna" : comuna,
      "Region" : region,
      "Lat" : "",
      "Lng" : "",
      "Ids_usuario" : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      "Display_name" : "",
      "Type" : ""
    }
    this.service.geolocalizar_direcciones(body).subscribe((data : any) => {
      console.log(data)
      // alert(JSON.stringify(data))
    })
  }

  buscarDatosDireccion(direccion : string){
    this.http.get<Nominatim []>(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${direccion}`).subscribe((data) => {
      this.dataRecov = data
      if (this.dataRecov.length === 0) return console.log("no se encontraron datos")
      console.log("Direccion: ", direccion)
      console.log("Latitud :",this.dataRecov[0].lat)
      console.log("Longitud :",this.dataRecov[0].lon)
      console.log("Direccion: ",this.dataRecov[0].display_name)
      console.log(" ")
    })
  }

 public rol = sessionStorage.getItem("rol_id") 
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
    this.arrayDirecciones = []
    this.service.get_rutas_en_activo(nombreRuta).subscribe((data) => {
      
      console.log(data)
      this.nombreRutaActual = nombreRuta
      this.rutaEnActivo = data
      this.cantBultos = this.rutaEnActivo.reduce((sum,bulto) =>  sum + bulto.Bultos, 0)
      this.rutaEnActivo.map(ruta => {

        this.arrayDirecciones.push(ruta.Direccion_cliente+ ","+ruta.Comuna + ", Chile")
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
        
        if(!data.OK){
          this.isDriver = false
        }else {
          this.patenteRuta = data.Patente
          this.driverRuta = data.Driver
          this.idRuta = data.Id_ruta
          this.isDriver = true
        } 
      })
    },
    ((error) => {

      this.isDriver = false
    }))


    
  }

  downloadExcel(nombre_ruta : string, patente: string, driver: string ) {
    this.service.download_ruta_activa(nombre_ruta, patente, driver, this.rutaEnActivo)
    console.log(patente)
    console.log(driver)
  }


  downloadExcelBeetrack(){
    this.service.descargar_datos_beetrack_by_id(this.idRuta, this.nombreRutaActual)
  }


}
