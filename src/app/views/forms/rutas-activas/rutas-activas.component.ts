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

  verBotonesCorreo : string [] = ['jp@gmail.com','gojiris216@fitwl.com','hugo.lara.ext@transyanez.cl','fabian.lara@transyanez.cl']

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
  despachador! : string
  isDriver : boolean = false

  loadingRuta : boolean = false

  loadingArchivo : boolean = false

  isModalOpen: boolean = false
  public visible = false;

  public visibleDescarga = false;

  comunasPorRuta : any [] =[]

  regionSeleccionada : string = "Regiones"
  loadingComunaRuta : boolean = true

  visibleQuad : boolean = false

  toggleQuadminds() {
    this.visibleQuad = !this.visibleQuad;
  }

  handleQuadmindsChange(event: any) {
    this.visibleQuad = event;
  }

  


  toggleDescarga() {
    this.visibleDescarga = !this.visibleDescarga;
    this.verListaComunasRutas()
    this.loadingComunaRuta = true
  }

  handleDescarga(event: any) {
    this.visibleDescarga = event;
  }

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

  constructor(private service: RutasService, private nombreRutaService : NombreRutaService,
              private router: Router, private http : HttpClient) { 

  }

  verListaComunasRutas(){

    this.service.get_comuna_por_ruta(this.fechaActual).subscribe((data : any)=> {
      this.comunasPorRuta = data
      this.loadingComunaRuta = false
    })
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
 public mail = sessionStorage.getItem("mail")
 public rol = sessionStorage.getItem("rol_id") 
  asignarRuta() {
    const codigo = this.nombreRutaActual;
    this.nombreRutaService.setCodigo(codigo);
    this.nombreRutaService.setBultos(this.cantBultos)
    this.nombreRutaService.setDataDriver(this.driverRuta,this.patenteRuta,this.despachador)
    this.router.navigate(['/picking/asignar-ruta']);
  }
  editarRutaActiva() {
    const codigo = this.nombreRutaActual;
    this.nombreRutaService.setCodigo(codigo);
    this.router.navigate(['/picking/editar-ruta']);
  }

  updateEstadoRuta (nombre_ruta : string) {

    const body = {
      "id_usuario": parseInt(sessionStorage.getItem("id")+""),
      "cliente": 'Modificación Ruta',
      "n_guia": nombre_ruta,
      "sku": '',
      "cod_pedido": '',
      "cod_producto" : '',
      "ids_usuario" : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      "latitud" : null,
      "longitud" : null,
      "observacion" : "Se Cerro la ruta " + nombre_ruta
    }

    let isSeguro = confirm("¿Seguro que desea cerrar esta ruta?");
    if (!isSeguro) {
      return console.log("no esta seguro")
    } else {
    this.service.update_estado_ruta(nombre_ruta,body).subscribe( (data: any) => {
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

    const body = {
      "id_usuario": parseInt(sessionStorage.getItem("id")+""),
      "cliente": 'Modificación Ruta',
      "n_guia": nombre_ruta,
      "sku": '',
      "cod_pedido": '',
      "cod_producto" : '',
      "ids_usuario" : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      "latitud" : null,
      "longitud" : null,
      "observacion" : "Se Reabrio la ruta " + nombre_ruta
    }
    let isSeguro = confirm("¿Seguro que desea reabrir esta ruta?");
    if (!isSeguro) {
      return console.log("no esta seguro")
    } else {
    this.service.actualizar_estado_ruta_a_true(nombre_ruta, body).subscribe( (data: any) => {
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
    fecha.setHours(fecha.getHours() - 4);

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
    this.comunasPorRuta = []
  }


  eliminarRuta() {
    let isSeguro = confirm(`¿Seguro que desea eliminar la ruta ${this.nombreRutaActual} ?`);
    if (!isSeguro) return console.log("no esta seguro")

    this.service.delete_ruta(this.nombreRutaActual).subscribe( (data : any) => {
      alert(data.message)
    })
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

        //aca debe ir el gimmigk

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
        this.despachador = ""

        this.service.get_patente_driver_by_nombre_ruta(this.nombreRutaActual).subscribe((data : any) => {
          
          if(!data.OK){
            this.isDriver = false
          }else {
            this.patenteRuta = data.Patente
            this.driverRuta = data.Driver
            this.idRuta = data.Id_ruta
            this.despachador = data.Despachador
            this.isDriver = true
          } 
        })
      },
      ((error) => {

        this.isDriver = false
      }))
  
  }

  downloadExcel(nombre_ruta : string, patente: string, driver: string ) {
    this.loadingArchivo = true
    const caracter = this.generarCaracteresRandom(10)
    this.service.download_ruta_activa(nombre_ruta, patente, driver, this.rutaEnActivo,caracter,this.despachador).subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `${nombre_ruta}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.loadingArchivo = false
    })
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


  downloadExcelListaComuna(){
    this.service.download_lista_comunas_rutas(this.fechaActual)

  }


  downloadExcelBeetrack(){
    const caracter = this.generarCaracteresRandom(10)

    this.loadingArchivo = true

    this.service.descargar_datos_beetrack_by_id(this.idRuta, this.nombreRutaActual,caracter).subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download = `beetrack-${this.nombreRutaActual}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);

        this.loadingArchivo = false
    })

    
  }




  //// subir archivo quadminds


  private selectedFile: File | null = null;

  termino : boolean = true
  error! : number  
  codigosErroneos : string [] = []
  message : string = ""

  contador : number = 1
  // tablaQuadmind : CargaQuadmind[] = []
  // tablaQuadmindFull! : CargaQuadmind[];
  // tablaQuadmindPreview! : CargaQuadmind[];


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
          this.toggleQuadminds()
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


  public visibleEstadoCarga = false;

  toggleEstadoCarga() {
    this.visibleEstadoCarga = !this.visibleEstadoCarga;
  }

  handleLiveEstadoCarga(event: any) {
    this.visibleEstadoCarga = event;
  }


}
