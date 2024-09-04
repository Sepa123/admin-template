import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RutasService } from 'src/app/service/rutas.service';
import { NombreRutaService } from 'src/app/service/nombre-ruta.service';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PatenteDisponible, VehiculoDisponible } from 'src/app/models/rutas/vehiculosDisponibles.interface'
import {NgbRating} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-asignar-ruta',
  templateUrl: './asignar-ruta.component.html',
  styleUrls: ['./asignar-ruta.component.scss']
})
export class AsignarRutaComponent {
  id_ruta! : string
  nombreRuta! : string 
  id_usuario! : any 

  isClicked : boolean = false



  public visible = false


  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  // razon_social : string = ""

  // driver! : string
  // patent! : string
  bultos! : number
  // despachado : string = ""
  // regionInicial : string ="XIII - Metropolitana"

  constructor (private service: RutasService, private router: Router, 
                private nombreRutaService : NombreRutaService, public builder: FormBuilder){
  }

  asignarRutaForm = this.builder.group({
    asigned_by:  this.builder.control("",[Validators.required]),
    id_ruta: this.builder.control(""),
    nombre_ruta: this.builder.control("",[Validators.required]),
    patente: this.builder.control("",[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]),
    conductor: this.builder.control("",[Validators.required]),
    cantidad_producto: this.builder.control("",[Validators.required,Validators.min(1)]),
    region: this.builder.control("",[Validators.required]),
    despachador: this.builder.control("",[Validators.required]),
    razon_social: this.builder.control(""),
    

  })
  // , Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\']+')
  patentesVehiculos:VehiculoDisponible [] = []

  patentesDisponibles: PatenteDisponible [] = []

  ngOnInit() {


    this.service.get_lista_patentes_disponibles().subscribe((data) => {

      this.patentesDisponibles = data
    //  this.patentesVehiculos = data
    //  console.log(this.patentesVehiculos)

     const patentePasada = this.nombreRutaService.getDataDriver().patente

     if(patentePasada){
      console.log(this.nombreRutaService.getDataDriver().patente)
      this.asignarRutaForm.patchValue({
        asigned_by:  sessionStorage.getItem("id")?.toString(),
        patente: patentePasada,
        conductor: this.nombreRutaService.getDataDriver().driver,
        despachador: this.nombreRutaService.getDataDriver().despachador,
        cantidad_producto : this.nombreRutaService.getBultos()+'',
        region : 'XIII - Metropolitana'
      })

      this.seleccionarPatente()

     }else {
      this.asignarRutaForm.patchValue({
        asigned_by:  sessionStorage.getItem("id")?.toString(),
        patente: 'Seleccione una patente',
        conductor: this.nombreRutaService.getDataDriver().driver,
        despachador: this.nombreRutaService.getDataDriver().despachador,
        cantidad_producto : this.nombreRutaService.getBultos()+'',
        region : 'XIII - Metropolitana'
      })
     }

     
     
     
    })

    this.id_usuario = sessionStorage.getItem("id")?.toString()
    this.nombreRuta = this.nombreRutaService.getCodigo() 
    // this.bultos = this.nombreRutaService.getBultos()
    // this.driver = this.nombreRutaService.getDataDriver().driver
    // this.patent = this.nombreRutaService.getDataDriver().patente
    // this.despachado = this.nombreRutaService.getDataDriver().despachador
   
    // this.asignarRutaForm.patchValue({region: "ccdddd"})

    // this.service.get_lista_patentes_disponibles().subscribe((data) => {
    //   this.patentesDisponibles = data
    //  })
  }

  volverRutaActiva(){
    this.router.navigate(['/picking/rutas-activas']);
  }

  agregarPantenteNueva(patente : string){
    this.asignarRutaForm.patchValue({
      patente : patente
    })

    this.seleccionarPatente()
  }

  seleccionarPatente(){
    const patenteForm = this.asignarRutaForm.value.patente
    // const patenteSeleccionada = this.patentesVehiculos.filter(patente=> patente.Ppu ==  patenteForm)[0]
    console.log(this.patentesDisponibles)
    const patenteSeleccionada = this.patentesDisponibles.filter(patente=> patente.Patentes ==  patenteForm)[0]

    console.log(patenteSeleccionada)
    
    // this.razon_social = patenteSeleccionada.Razon_social
    this.asignarRutaForm.patchValue({
      despachador: this.nombreRutaService.getDataDriver().despachador,
      cantidad_producto : this.nombreRutaService.getBultos()+'',
      razon_social : patenteSeleccionada.Razon_social
    })
  }

  asignarRuta() {
    this.isClicked = true
    this.asignarRutaForm.patchValue({ asigned_by: this.id_usuario, nombre_ruta : this.nombreRuta });
    const isUpdate = this.nombreRutaService.getDataDriver().isUpdate
    if(this.asignarRutaForm.valid) {
      if(isUpdate){
        this.service.update_ruta_asignada(this.asignarRutaForm.value).subscribe((data : any) => {
          alert(data.message)
          this.router.navigate(['/picking/rutas-activas']);
        },
        ((error) => {
          alert(error.error.detail)
        }))
      }else{
        this.service.asignar_ruta_activa(this.asignarRutaForm.value).subscribe((data : any) => {
          alert(data.message)
          this.router.navigate(['/picking/rutas-activas']);
        },
        ((error) => {
          alert(error.error.detail)
        }))
    }
       
    }else {
      alert("Error, formulario invalido")
    }
  }


  asignarPatente(){
    
  }

}