import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RutasService } from 'src/app/service/rutas.service';
import { NombreRutaService } from 'src/app/service/nombre-ruta.service';
import { HttpClient } from '@angular/common/http';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RutaEnActivo } from "src/app/models/rutaEnActivo.interface"
import { NombresRutasActivas } from "src/app/models/nombresRutasActivas.interface"
import { Nominatim } from '../../../models/nominatim.interface'

import { CantidadUnidadesRutaActiva } from 'src/app/models/cantidadUnidadesRutaActiva.interface';
import { ComunaRutas } from 'src/app/models/comunaRutas.interface';

@Component({
  selector: 'app-rutas-activas',
  templateUrl: './rutas-activas.component.html',
  styleUrls: ['./rutas-activas.component.scss']
})
export class RutasActivasComponent {

  listaUnidades : CantidadUnidadesRutaActiva [] =[]
  // model! : NgbDateStruct
  nombreRutaActual!:  string
  cantBultos! : number
  isClicked : boolean = false
  isActive: boolean = false
  isRuta: boolean = false

  comunaSeleccionada : string = ""

  idRuta! : number
  rutaEnActivo! : RutaEnActivo []
  nombresRutas!: NombresRutasActivas []
  nombreRuta: NombresRutasActivas [] = []
  arraySKU: any[] = []
  arrayProducto: any[] = []
  arrayDirecciones : string [] = []

  listaComunas : ComunaRutas [] = []
  listaComunasFull : ComunaRutas [] = []
  listaRegiones : any [] = []
  fechaActual!: string
  patenteRuta! : string
  driverRuta! : string
  isDriver : boolean = false

  loadingRuta : boolean = false

  isModalOpen: boolean = false
  public visible = false;

  regionSeleccionada : string = "Regiones"

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  
  openModal(){
    
    this.isModalOpen = true

    console.log(this.isModalOpen)
  }

  closeModal(){
    this.isModalOpen = false
  }

  constructor(private service: RutasService, private nombreRutaService : NombreRutaService,
              private router: Router, private http : HttpClient) { 

  }


  // dataRecov! : Nominatim []

  // async buscarlalonRutas(rutaActual: RutaEnActivo []){
  //   const idsVistos = new Set(); 
  //   const rutaFilter = rutaActual.filter(ruta => {
  //     if (!idsVistos.has(ruta.Direccion_cliente)) {
  //       idsVistos.add(ruta.Direccion_cliente)
  //       return true
  //     }
  //     return false;
  //   });
    
  //   const promesas = rutaFilter.map(async ruta => {
  //     await this.buscarLatLon(ruta.Comuna, ruta.Direccion_cliente, ruta.Region);
  //   });
  
  //   await Promise.all(promesas);
  // }

  // buscarLatLon(comuna : string, direccion : string, region : string){
  //   // const set =  Array.from(new SetarrayDirecciones)
  //   const dir_entregada = direccion+", "+comuna+ ", "+region+", Chile"

  //   const  body= {
  //     "Id_usuario" : sessionStorage.getItem('id'),
  //     "Direccion" : dir_entregada,
  //     "Comuna" : comuna,
  //     "Region" : region,
  //     "Lat" : "",
  //     "Lng" : "",
  //     "Ids_usuario" : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
  //     "Display_name" : "",
  //     "Type" : ""
  //   }
  //   this.service.geolocalizar_direcciones(body).subscribe((data : any) => {
  //     console.log(data)
  //     // alert(JSON.stringify(data))
  //   })
  // }

  // buscarDatosDireccion(direccion : string){
  //   this.http.get<Nominatim []>(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${direccion}`).subscribe((data) => {
  //     this.dataRecov = data
  //     if (this.dataRecov.length === 0) return console.log("no se encontraron datos")
  //     console.log("Direccion: ", direccion)
  //     console.log("Latitud :",this.dataRecov[0].lat)
  //     console.log("Longitud :",this.dataRecov[0].lon)
  //     console.log("Direccion: ",this.dataRecov[0].display_name)
  //     console.log(" ")
  //   })
  // }

 public rol = sessionStorage.getItem("rol_id") 
  asignarRuta() {
    const codigo = this.nombreRutaActual;
    this.nombreRutaService.setCodigo(codigo);
    this.nombreRutaService.setBultos(this.cantBultos)
    this.nombreRutaService.setDataDriver(this.driverRuta,this.patenteRuta)
    this.router.navigate(['/picking/asignar-ruta']);
  }
  editarRutaActiva() {
    const codigo = this.nombreRutaActual;
    this.nombreRutaService.setCodigo(codigo);
    this.router.navigate(['/picking/editar-ruta']);
  }

  updateEstadoRuta (nombre_ruta : string) {
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

  updateEstadoRutaAtrue(nombre_ruta : string) {
    let isSeguro = confirm("¿Seguro que desea reabrir esta ruta?");
    if (!isSeguro) {
      return console.log("no esta seguro")
    } else {
    this.service.actualizar_estado_ruta_a_true(nombre_ruta).subscribe( (data: any) => {
      alert(data.message)
    },
    ((error) => {
      alert(error.error.detail)
    }))

    this.nombresRutas.map(ruta => {
      if(ruta.Nombre_ruta == nombre_ruta) ruta.Estado = true
    })
  }
  }

  getNombreByFecha(dateObj : any) {
    this.isClicked = false
    this.isActive = false
    this.isDriver = false
    this.rutaEnActivo = []
    this.nombreRutaActual = ""
    if (dateObj === undefined) return alert("Por favor ingrese una fecha")
    // const formattedDate = `${dateObj.year}-${dateObj.month.toString().padStart(2, '0')}-${dateObj.day.toString().padStart(2, '0')}`;
    if ( (this.comunaSeleccionada == '' || this.comunaSeleccionada == 'Todas' || this.comunaSeleccionada == 'Comunas' ) 
    && (this.regionSeleccionada == 'Todas' || this.regionSeleccionada == 'Regiones')){
      this.service.get_nombres_ruta(dateObj).subscribe((data) => {
        data.length == 0 ? this.isRuta = false : this.isRuta = true
        this.nombresRutas = data
        this.nombresRutas.map((ruta) => {
          if (ruta.Estado === false ){
            ruta.Verificado = true
            ruta.Alerta = false
          }
        })
      })
    } else {
      this.service.filtrar_nombre_rutas_activa_by_comuna(dateObj, this.comunaSeleccionada,this.regionSeleccionada).subscribe((data) => {
        data.length == 0 ? this.isRuta = false : this.isRuta = true
        this.nombresRutas = data
        this.nombresRutas.map((ruta) => {
          if (ruta.Estado === false ){
            ruta.Verificado = true
            ruta.Alerta = false
          }
        })
        
      })
    }
    
  }

  ngOnInit() {

    const fecha = new Date();

    const ObjcurrentDate = {
      year: fecha.getFullYear(), 
      month: fecha.getMonth() + 1, 
      day:  fecha.getDate()
    }
    let fechaFormateada = fecha.toISOString().split('T')[0];

    this.service.comunas_rutas_activas(fechaFormateada).subscribe((data) => {
      this.listaComunasFull = data
      this.listaComunas = data

      this.listaRegiones = [... new Set(data.map( lista => lista.Region))]

      console.log(this.listaRegiones)


    })

    this.fechaActual = fechaFormateada
    // this.getNombreByFecha(ObjcurrentDate)
    this.getNombreByFecha(this.fechaActual)
  }
  

  seleccionarRegion(){
    // console.log(this.regionSeleccionada)
    if(this.regionSeleccionada == 'Regiones' || this.regionSeleccionada == 'Todas'){
      this.listaComunas = this.listaComunasFull
      this.comunaSeleccionada = "Comunas"
    } else {
      this.listaComunas = this.listaComunasFull.filter(lista => lista.Region == this.regionSeleccionada) 
      this.comunaSeleccionada = "Comunas"
    }
  }

  buscarRuta (nombreRuta : string,estado_ruta : boolean) {
    let bultos
    let prevArrayUnidades = []
    let currentArrayUnidades: string[] = []
    this.nombreRutaActual = nombreRuta
    this.arrayDirecciones = []
    const regex = /\(EASY\)/;
    this.loadingRuta = true
    const NombreRuta = this.nombresRutas.find(nombre => nombre.Nombre_ruta == nombreRuta)
      this.service.get_rutas_en_activo(nombreRuta).subscribe((data) => {
        // this.nombreRutaActual = nombreRuta
        this.rutaEnActivo = data
        // this.cantBultos = this.rutaEnActivo.reduce((sum,bulto) =>  sum + bulto.Bultos, 0)

        this.cantBultos = this.rutaEnActivo.reduce((sum,bulto) =>  {
          bulto.arrayBultos = bulto.Bultos.split('@')

          let sumaBultos = bulto.Bultos.split('@').map( str => parseInt(str,10)).reduce((total, num) => total + num, 0)
          return sum + sumaBultos
        },0)
        
        this.rutaEnActivo.map(ruta => {
          if(ruta.Verificado === false && NombreRuta) NombreRuta.Verificado = false
          //this.arrayDirecciones.push(ruta.Direccion_cliente+ ","+ruta.Comuna + ", Chile")
          ruta.arraySKU = ruta.SKU.split('@')
          ruta.arrayProductos = ruta.Producto.split('@')
          ruta.arrayBultos = ruta.Bultos.split('@')
          ruta.arrayUnidades = ruta.Unidades.split('@')
          // prevArrayUnidades = ruta.Unidades.split('@')
          // // ruta.arrayBultos = ruta.Bultos.split('@')
          // let bultos = prevArrayUnidades.reduce((sum,und) => sum + parseInt(und), 0)


          // for (let i = 0; i < ruta.arraySKU.length; i++) {  
          //   currentArrayUnidades.push(prevArrayUnidades[i])
          // }
          
          // ruta.arrayUnidades = currentArrayUnidades
          // ruta.arrayBultos = currentArrayUnidades

          // if(regex.test(ruta.Producto)){
          //   ruta.arrayBultos = []
          //   console.log("bultos cd",bultos)
          //   ruta.arrayBultos.push(ruta.Bultos.toString())
          // }
          // console.log(ruta.Bultos)
          // console.log("<<sku",ruta.arraySKU.length)
        
          // console.log("<<unidades",ruta.arrayUnidades.length)
          // currentArrayUnidades = []
          
        })

        
        

        this.isClicked = true
        this.isActive = true
        this.loadingRuta = false
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
    const caracter = this.generarCaracteresRandom(10)
    this.service.download_ruta_activa(nombre_ruta, patente, driver, this.rutaEnActivo,caracter)
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


  downloadExcelBeetrack(){
    const caracter = this.generarCaracteresRandom(10)

    this.service.descargar_datos_beetrack_by_id(this.idRuta, this.nombreRutaActual,caracter)
  }


}
