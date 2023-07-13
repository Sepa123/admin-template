import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RutasService } from 'src/app/service/rutas.service';
import { NombreRutaService } from 'src/app/service/nombre-ruta.service';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-asignar-ruta',
  templateUrl: './asignar-ruta.component.html',
  styleUrls: ['./asignar-ruta.component.scss']
})
export class AsignarRutaComponent {
  id_ruta! : string
  nombreRuta! : string 
  id_usuario! : any 


  driver! : string
  patent! : string
  bultos! : number
  regionInicial! : string

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
    region: this.builder.control("",[Validators.required])
  })
  // , Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\']+')
  ngOnInit() {
    this.id_usuario = sessionStorage.getItem("id")?.toString()
    this.nombreRuta = this.nombreRutaService.getCodigo() 
    this.bultos = this.nombreRutaService.getBultos()
    this.driver = this.nombreRutaService.getDataDriver().driver
    this.patent = this.nombreRutaService.getDataDriver().patente
   
    // this.asignarRutaForm.patchValue({region: "ccdddd"})
  }

  asignarRuta() {
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
      alert("error")
    }
  }

}
