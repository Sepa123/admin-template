import { Component } from '@angular/core';
import { RsvService } from 'src/app/service/rsv.service'
import { EtiquetaRSV } from 'src/app/models/etiquetaRSV.interface'
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import {PaquetesAbiertosRSV} from 'src/app/models/inventarioPaquetesAbiertos.interface'
import { DatosCargaRSV } from 'src/app/models/datosCargaRSV.interface';
import { ReimpresionEtiqueta } from 'src/app/models/reimpresionEtiqueta.interface';
import Swal from 'sweetalert2';
import { InventarioSucursal } from 'src/app/models/inventarioSucursal.interface';


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
    produto!:string

    listaEtiquetas :EtiquetaRSV[]= []
    id_usuario! : number  
    idMs! : String 
    server! : string 

    fechaHoy = this.obtenerFechaActual()
    fechaAnterior = this.obtenerFechaAnterior()
    
    etiquetasReimpresas : any [] = []

    
    //datos geo
    latitude!: number
    longitud! :number
    latStr!: string
    longStr!: string

    
  isModalOpen: boolean = false
  public visible1 = false;
  public visible2 = false;

  toggleLiveDemo() {
    this.visible1 = !this.visible1;
  }

  handleLiveDemoChange(event: any) {
    this.visible1 = event;
  }

  toggleLive() {
    this.visible2 = !this.visible2;
  }

  handleLiveDemo(event: any) {
    this.visible2 = event;
  }
  
  openModal(){
    
    this.isModalOpen = true

   
  }

  closeModal(){
    this.isModalOpen = false
  }


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
      
      paquetesAbiertosPorSucursal() {
        this.paquetesOpenSucursal = [];
        this.restoPaquetesOpenSucursal = [];
        const grupos: { [clave: string]: any[] } = {}; 
        if (this.sucursalSeleccionada == ""){
            Swal.fire({
                icon: 'error',
                title: 'Seleccione una sucursal',
                });
                this.bar_code = ""
        }
        this.service.get_lista_paquetes_abiertos(parseInt(this.sucursalSeleccionada)).subscribe((data) => {
            for (const paquete of data) {
                this.cargaSeleccionada = paquete.carga;
                const color = paquete.color;
                const fechaPaquete = paquete.fecha;
                const claveCargaColor = `${this.cargaSeleccionada}-${color}`;
                const claveFecha = fechaPaquete === this.fechaHoy ? 'Hoy' : 'Anteriores';
                // Construye una clave única para cada grupo
                const claveGrupo = `${claveCargaColor}-${claveFecha}`;
                // Si el grupo no existe, créalo
                if (!grupos[claveGrupo]) {
                    grupos[claveGrupo] = [];
                }
                // Agrega el paquete al grupo correspondiente
                grupos[claveGrupo].push(paquete);      
            }
            // Extrae los grupos en un arreglo plano
            const gruposArray = Object.values(grupos);
            gruposArray.forEach((grupo) => {
                if (grupo.some((paquete) => paquete.fecha === this.fechaHoy)) {
                    this.paquetesOpenSucursal.push(grupo);
                } else {
                    this.restoPaquetesOpenSucursal.push(grupo);
                }
            });
        });
    }
    
    abrirPaquete(bar_code: string){
        this.codigo_barra = this.bar_code.replace(/"/g, '@').replace(/'/g, '-')
        this.service.validar_sucursal_barc_code(this.codigo_barra).subscribe((resultado: any)=>{
            if (resultado && resultado.length > 0 && resultado[0].Id) {
                //validamos de que exista un ID 
                this.data = resultado[0]
                this.idEtiqueta = this.data.Id
                this.sucursalEtiqueta = this.data.id_sucursal
                this.carga = this.data.carga
                this.extraCodigo = this.codigo_barra.split('@')[1] 
                this.finalCodigo = this.extraCodigo.split('-')[1]
                this.tipo = this.finalCodigo[0]; 
 

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
                        this.service.downloadReimpresionEtiquetasExcel(this.carga, this.idEtiqueta, this.tipo)
                      //desplegar la lista actual de paquetes abiertos
                      const grupos: { [clave: string]: any[] } = {}; 
                      this.service.get_lista_paquetes_abiertos(parseInt(this.sucursalSeleccionada)).subscribe((data) => {
                        for (const paquete of data) {
                            const carga = paquete.carga;
                            const color = paquete.color;
                            const fechaPaquete = paquete.fecha;
                            const claveCargaColor = `${carga}-${color}`;
                            const claveFecha = fechaPaquete === this.fechaHoy ? 'Hoy' : 'Anteriores';
                            const claveGrupo = `${claveCargaColor}-${claveFecha}`;
                            if (!grupos[claveGrupo]) {
                                grupos[claveGrupo] = [];
                            }
                            grupos[claveGrupo].push(paquete);      
                        }
                        const gruposArray = Object.values(grupos);
                        gruposArray.forEach((grupo) => {
                            if (grupo.some((paquete) => paquete.fecha === this.fechaHoy)) {
                                this.paquetesOpenSucursal.push(grupo);
                            } else {
                                this.restoPaquetesOpenSucursal.push(grupo);
                            }
                        });
                    });
                        this.bar_code = ""
                    }
                    })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'El código ingresado es incorrecto',
                    text: 'por favor validar',
                    });
            }
        })
    }

  
    reimprimirEtiqueta(carga: string, codigo: number, tipo: string){
        this.service.downloadReimpresionEtiquetasExcel(carga, codigo, tipo)
    }

    reimprimirEtiquetaUnica( bar_code: string){
        this.barCode = bar_code
        
        this.codigoUnidad = this.barCode.replace(/'(\d+)"/g, '-$1@').replace(/'U(\d+)/g, '$1-');
        if ( this.codigoUnidad.includes("@") && this.codigoUnidad.includes("-")) {
            this.codigoProducto = this.codigoUnidad.split('@')[0]
            this.codigoNeto = this.codigoProducto.split('-')[0]
            this.extraCodigo = this.codigoUnidad.split('@')[1] 
            this.finalCodigo = this.extraCodigo.split('-')[1]
            this.tipo = this.finalCodigo[0]; 
            this.restoPaquetesOpenSucursal = []
            this.paquetesOpenSucursal = []
            if (this.tipo.includes('U')){   
           
                this.service.validar_sucursal_barc_code(this.codigoUnidad).subscribe((resultado: any)=>{
                    if (resultado && resultado.length > 0 && resultado[0].Id) {
                        //validamos de que exista un ID 
                        this.data = resultado[0]
                        this.idEtiqueta = this.data.Id
                        this.sucursalEtiqueta = this.data.id_sucursal
                        this.carga = this.data.carga
                        this.barCode = ""
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
                        "momento": 2 ,
                        "lat":this.latStr ,
                        "lng":this.longStr ,
                        }
                        const datosEtiqueta = {
                        "carga": this.carga,
                        "codigo": this.codigoNeto,
                        "bar_code": this.codigoUnidad,
                        "tipo": this.tipo,
                        "id": this.idEtiqueta
                        }
                        this.etiquetasReimpresas.push(datosEtiqueta)
                        console.log(body)
                        this.service.bitacora_rsv(body).subscribe((resultado) =>{
                            //ingreso en bitacora
                            console.log("ingreso con exito")
                            })
                      
                        this.service.downloadReimpresionEtiquetasUnicasExcel(this.carga,this.codigoNeto ,this.tipo, this.codigoUnidad)
                        Swal.fire({
                        icon: 'success',
                        title: 'Descarga realizada',
                        });
                      
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
                        this.barCode = ""
    
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
                        "momento": 2 ,
                        "lat":this.latStr ,
                        "lng":this.longStr ,
                        }
                        const datosEtiqueta = {
                        "carga": this.carga,
                        "codigo": this.codigoNeto,
                        "bar_code": this.codigoUnidad,
                        "tipo": this.tipo,
                        "id": this.idEtiqueta
                        }
                        this.etiquetasReimpresas.push(datosEtiqueta)
                        console.log(body)
            
                        this.service.bitacora_rsv(body).subscribe((resultado) =>{
                        //ingreso en bitacora
                        console.log("ingreso con exito")
                        })
                      
                        this.service.downloadReimpresionEtiquetasUnicasExcel(this.carga,this.codigoNeto ,this.tipo, this.codigoUnidad)
                        console.log("descarga", this.carga,this.codigoNeto ,this.tipo, this.codigoUnidad)
                        Swal.fire({
                        icon: 'success',
                        title: 'Descarga realizada',
                        });
                
                    }   
                })

            }
    
        }else{
            this.barCode = ""
            Swal.fire({
                icon: 'error',
                title: 'El código ingresado es incorrecto',
                text: 'por favor validar',
                });

        }
       
    }
}
    