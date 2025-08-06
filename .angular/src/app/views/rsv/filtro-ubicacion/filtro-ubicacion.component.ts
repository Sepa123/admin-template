import { Component } from '@angular/core';
import { RsvService } from 'src/app/service/rsv.service'
import { EtiquetaRSV } from 'src/app/models/etiquetaRSV.interface'
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';
import {MatchSucursalRSV} from 'src/app/models/matchSucursalRSV.interface'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filtro-ubicacion',
  templateUrl: './filtro-ubicacion.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class FiltroUbicacionComponent {

  ubicacion! : string 
  barCode!: string
  Verificado : boolean = false
  ubicaciones: any[] = [];
  cargas : EtiquetaRSV [] = []
  id!: number
  ubicacionAsignada: any[] = []
  codigoBarra! :string
  ubicacionCorregida!: string
  codigoCortado!: string
  partes: any[] = []
  ubicacionActual! : string
  sucursal: any[] = []
  datos : SucursalRSV [] = []
  numeroSucursal! : string
  sucursalFinal! : number
  nombreSucursal : any[] = []
  matchSucursal: any[] = []
  nombre ! : string

  constructor (private service: RsvService){}

  ngOnInit(){
    this.service.get_sucursal().subscribe((resultado) => {
      this.datos  = resultado
      console.log(this.datos)
    })
  }

  asignarUbicacion(ubicacion: string) {
    this.nombreSucursal = []

    this.cargas = []
    this.ubicaciones.push(ubicacion)
    //obtenemos la ultima ubicacion ingresada
    this.ubicacionActual = this.ubicaciones[this.ubicaciones.length - 1];
    //reemplazo de simbolos
    this.ubicacionCorregida = this.ubicacionActual.replace(/"/g, '@').replace(/'/g, '-').toUpperCase()
    this.partes = this.ubicacionCorregida.split('@');
    this.codigoCortado = this.partes[0]
    this.ubicacionActual = this.ubicacionCorregida
    this.ubicacion = ""

    console.log("UBICACION",this.ubicacionCorregida)
   console.log("ubicacion actual", this.ubicacionActual)
    this.numeroSucursal = this.partes[1]
    this.sucursalFinal = parseInt(this.numeroSucursal.split("-")[0]);
    console.log("sucursa final", this.sucursalFinal)
    this.service.get_sucursal_porId(this.sucursalFinal).subscribe((resultado)=>{
        resultado.forEach((item)=>{
            this.datos.push(item)
            this.nombreSucursal.push(this.datos[0].Nombre) 
        }) 
        this.asignarUbicacionPorId()
    })
    this.datos = []
  }

  asignarUbicacionPorId() {
    if(this.barCode){
    this.codigoBarra = this.barCode.replace(/"/g, '@').replace(/'/g, '-').toUpperCase()
    if (this.ubicacionActual && this.barCode) {
        this.Verificado = true
        const body={
            "bar_code" : this.codigoBarra,
            "Ubicacion" : this.ubicacionActual,
            "verificado" : this.Verificado
        }
        console.log("el body", body)
        this.service.validar_sucursal_barc_code(this.codigoBarra).subscribe((resultado)=>{
            resultado.forEach((item)=>{
                this.matchSucursal.push(item)
                })

                if(this.matchSucursal[0].sucursal == this.nombreSucursal[0] && this.matchSucursal[0].stock ==true){
                    console.log("hizo match")
                    console.log(this.matchSucursal[0].sucursal , "match")
                    console.log(this.nombreSucursal[0], "sucursal" )
                    this.service.update_ubicacion_bybId(body).subscribe((resultado :any)=>{
                        this.service.get_producto_porId(this.codigoBarra).subscribe((resultado) => {
                            resultado.forEach((item)=>{
                                this.cargas.push(item)
                            })
                            console.log("cargas", this.cargas)
                            this.barCode = ""
                            this.matchSucursal = []
                                });
                            })
                        }else{
                            console.log(" no hizo match")
                            console.log(this.matchSucursal[0].sucursal , "match")
                            console.log(this.nombreSucursal[0], "sucursal" )

                            Swal.fire({
                                title:'El producto no pertenece a la sucursal seleccionada o no está en Stock',
                                text:'Por favor validar.!',
                                icon:'error'
                              })   
                              this.barCode = ""
                              this.codigoBarra = ""
                              this.matchSucursal = []
                        }
                })

            } 
        }
    }  



}
