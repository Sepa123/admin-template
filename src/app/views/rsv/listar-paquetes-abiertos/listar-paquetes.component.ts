import { Component } from '@angular/core';
import { RsvService } from 'src/app/service/rsv.service'
import { EtiquetaRSV } from 'src/app/models/etiquetaRSV.interface'
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import {PaquetesAbiertosRSV} from 'src/app/models/inventarioPaquetesAbiertos.interface'
import { DatosCargaRSV } from 'src/app/models/datosCargaRSV.interface';
import { ReimpresionEtiqueta } from 'src/app/models/reimpresionEtiqueta.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-paquetes',
  templateUrl: './listar-paquetes.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})

export class ListarPaquetesAbiertosComponent {

    constructor(private service: RsvService) {

    } 
    data!: any
    bar_code! : string
    codigo_barra! : string
    id!:number
    sucursalSeleccionada : string = ""
    sucursales : SucursalRSV [] = []
    idEtiqueta! :number
    sucursalEtiqueta! : string
    paquetesOpenSucursal : PaquetesAbiertosRSV [][] = []
    restoPaquetesOpenSucursal : PaquetesAbiertosRSV [][] = []
    cargaSeleccionada : string = ""
    codigo! : number
    codigoUnidad!: string
    barCode!: string
    carga!:string
    codigoProducto!:string
    tipo!:string
    codigoNeto!:string
    extraCodigo!: string
    finalCodigo!: string

    listaEtiquetas :ReimpresionEtiqueta [][] = []
    id_usuario! : number  
    idMs! : String 
    server! : string 

    fechaHoy = this.obtenerFechaActual()
    fechaAnterior = this.obtenerFechaAnterior()

    
    //datos geo
    latitude!: number
    longitud! :number
    latStr!: string
    longStr!: string


    ngOnInit(){
        this.service.get_sucursales().subscribe((data) => {
          this.sucursales = data
        })
      }

    
    obtenerFechaActual(): string {
        const fecha = new Date();
        fecha.setDate(fecha.getDate())
        const year = fecha.getFullYear().toString();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const day = fecha.getDate().toString().padStart(2, '0');
  
        return year +"-"+ month+"-"+ day;
    }

    obtenerFechaAnterior(): string {
        const fecha = new Date();
        fecha.setDate(fecha.getDate()-1)
        const year = fecha.getFullYear().toString();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const day = fecha.getDate().toString().padStart(2, '0');
  
        return year +"-"+ month+"-"+ day;
    }


    getLocation(): any {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.showPosition(position);
          });
        } else {
          console.log("Localización no disponible");
        }
      }
    
    showPosition(position: any): any{
            this.latitude = position.coords.latitude
            this.longitud= position.coords.longitude   
            this.latStr = this.latitude.toString()
            this.longStr = this.longitud.toString()
      }
      
    paquetesAbiertosPorSucursal(){
        this.paquetesOpenSucursal = []
        this.restoPaquetesOpenSucursal = []
        this.service.get_lista_paquetes_abiertos(parseInt(this.sucursalSeleccionada)).subscribe((data) =>{
        const cargas = [...new Set(data.map((lista) => lista.carga))]
        let array = []
        let otroArray = []
        cargas.map(cargaContenedor => {
            array = data.filter( lista=> lista.carga == cargaContenedor && lista.fecha == this.fechaHoy)
            if(array.length !== 0) {
                this.paquetesOpenSucursal.push(array)
            }
            console.log(this.paquetesOpenSucursal)
            otroArray = data.filter(lista => lista.carga == cargaContenedor && lista.fecha != this.fechaHoy)
            this.restoPaquetesOpenSucursal.push(otroArray)
            })
           
         })
    
     }

    abrirPaquete(bar_code: string){
        this.codigo_barra = this.bar_code.replace(/"/g, '@').replace(/'/g, '-')
        this.service.validar_sucursal_barc_code(this.codigo_barra).subscribe((resultado: any)=>{
            if (resultado && resultado.length > 0 && resultado[0].Id) {
                //validamos de que exista un ID 
                this.data = resultado[0]
                this.idEtiqueta = this.data.Id
                this.sucursalEtiqueta = this.data.id_sucursal
               

                //DATOS DEL USUARIO
                this.id_usuario = parseInt(sessionStorage['id'])
                this.server = sessionStorage['server']
                this.idMs= this.server+ "-"+this.id_usuario
                const body = {
                "id_usuario": this.id_usuario ,
                "ids_usuario": this.idMs ,
                "sucursal": this.sucursalEtiqueta,
                "id_etiqueta": this.idEtiqueta ,
                "bar_code": this.codigo_barra ,
                "momento": 1 ,
                "lat":this.latStr ,
                "lng":this.longStr ,
                }

                this.service.get_abrir_paquete_nuevo_rsv(this.codigo_barra).subscribe((resultado : any)=>{
                    if(resultado.message === 1) {
                        Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: resultado.alerta,
                        });
                        this.bar_code = ""
                    } else {
                        Swal.fire({
                        icon: 'success',
                        title: 'Realizando descarga',
                        text: 'Etiquetas generadas',
                      });
                        this.service.bitacora_rsv(body).subscribe((resultado) =>{
                        //ingreso en bitacora
                        console.log("ingreso con exito")
                        })
                        this.service.downloadReimpresionEtiquetasExcel(this.idEtiqueta)
                      //desplegar la lista actual de paquetes abiertos
                        this.service.get_lista_paquetes_abiertos(parseInt(this.sucursalEtiqueta)).subscribe((data) =>{
                        const cargas = [...new Set(data.map((lista) => lista.carga))]
                        let array = []
                        cargas.map(cargaContenedor => {
                        array = data.filter( lista=> lista.carga == cargaContenedor)
                        this.paquetesOpenSucursal.push(array)
                        })
                        })
                    }
                        this.bar_code = ""
                    })
            }else{
                Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El código ingresado es incorrecto',
                });
            }
        })
    }

  
    reimprimirEtiqueta(codigo: number){
        this.service.downloadReimpresionEtiquetasExcel(codigo)
    }

    reimprimirEtiquetaUnica( bar_code: string){
        this.barCode = bar_code
        this.codigoUnidad = this.barCode.replace(/'(\d+)"/g, '-$1@').replace(/'U(\d+)/g, '$1-');
        this.codigoProducto = this.codigoUnidad.split('@')[0]
        this.codigoNeto = this.codigoProducto.split('-')[0]
        this.extraCodigo = this.codigoUnidad.split('@')[1] 
        this.finalCodigo = this.extraCodigo.split('-')[1]
        console.log(this.extraCodigo)
        console.log(this.finalCodigo)
        this.tipo = this.finalCodigo[0]; 
        console.log(this.tipo)
        if (this.tipo.includes('U')){   
           
            this.service.validar_sucursal_barc_code(this.codigoUnidad).subscribe((resultado: any)=>{
                if (resultado && resultado.length > 0 && resultado[0].Id) {
                    //validamos de que exista un ID 
                    this.data = resultado[0]
                    this.idEtiqueta = this.data.Id
                    this.sucursalEtiqueta = this.data.id_sucursal
                    this.carga = this.data.carga
                
                    console.log(this.carga)
    
                    //DATOS DEL USUARIO
                    this.id_usuario = parseInt(sessionStorage['id'])
                    this.server = sessionStorage['server']
                    this.idMs= this.server+ "-"+this.id_usuario
                    const body = {
                    "id_usuario": this.id_usuario ,
                    "ids_usuario": this.idMs ,
                    "sucursal": this.sucursalEtiqueta,
                    "id_etiqueta": this.idEtiqueta ,
                    "bar_code": this.codigoUnidad ,
                    "momento": 1 ,
                    "lat":this.latStr ,
                    "lng":this.longStr ,
                    }
                    console.log(body)
                    this.service.bitacora_rsv(body).subscribe((resultado) =>{
                        //ingreso en bitacora
                        console.log("ingreso con exito")
                        })
                      
                    this.service.downloadReimpresionEtiquetasUnicasExcel(this.carga,this.codigoNeto ,this.tipo, this.codigoUnidad)
                }
            })

        }else if (this.tipo.includes('P')){
        
            this.service.validar_sucursal_barc_code(this.codigoUnidad).subscribe((resultado: any)=>{
                if (resultado && resultado.length > 0 && resultado[0].Id) {
                    //validamos de que exista un ID 
                    this.data = resultado[0]
                    this.idEtiqueta = this.data.Id
                    this.sucursalEtiqueta = this.data.id_sucursal
                    this.carga = this.data.carga
               
    
                    //DATOS DEL USUARIO
                    this.id_usuario = parseInt(sessionStorage['id'])
                    this.server = sessionStorage['server']
                    this.idMs= this.server+ "-"+this.id_usuario
                    const body = {
                    "id_usuario": this.id_usuario ,
                    "ids_usuario": this.idMs ,
                    "sucursal": this.sucursalEtiqueta,
                    "id_etiqueta": this.idEtiqueta ,
                    "bar_code": this.codigoUnidad ,
                    "momento": 1 ,
                    "lat":this.latStr ,
                    "lng":this.longStr ,
                    }
                    console.log(body)
                    this.service.bitacora_rsv(body).subscribe((resultado) =>{
                        //ingreso en bitacora
                        console.log("ingreso con exito")
                        })
                      
                    this.service.downloadReimpresionEtiquetasUnicasExcel(this.carga,this.codigoNeto ,this.tipo, this.codigoUnidad)
                }
            })

        }
       
    }
}
    