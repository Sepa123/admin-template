import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'

import {TipoFuncion} from 'src/app/models/areati/tipoFuncion.interface'
import { AreatiService } from 'src/app/service/areati.service'
@Component({
  selector: 'app-agregar-funcion',
  templateUrl: './agregar-funcion.component.html',
  styleUrls: ['./agregar-funcion.component.scss']
})
export class AgregarFuncionComponent {

  public rol = sessionStorage.getItem("rol_id") 

  funForm : FormGroup;

  isErrorView : boolean = false

  tipoFuncion : TipoFuncion [] = []

  constructor (public fb: FormBuilder, private service : AreatiService){

    this.funForm = this.fb.group({
      Esquema : this.fb.control("" ),
      Nombre_funcion : this.fb.control(""),
      Tipo_funcion : this.fb.control(""),
      Descripcion : this.fb.control(""),
      Parametros : this.fb.array([]),
      Palabras_clave : this.fb.array([]),
      Tablas_impactadas : this.fb.array([]),
      arrParametros : this.fb.control([]),
      arrComentario : this.fb.control([]),
      arrPalabras_clave : this.fb.control([]),
      arrTablas_impactadas : this.fb.control([]),
    })
  }

  ngOnInit(){
    this.service.get_lista_tipo_funciones().subscribe(data => {
        this.tipoFuncion = data
    })
  }

  get Parametros() : FormArray {
    return this.funForm.get("Parametros") as FormArray
  }
  get Palabras_clave() : FormArray {
    return this.funForm.get("Palabras_clave") as FormArray
  }

  get Tablas_impactadas() : FormArray {
    return this.funForm.get("Tablas_impactadas") as FormArray
  }

  newParametro(): FormGroup {
    return this.fb.group ({
        Parametro : this.fb.control(""),
        Comentario : this.fb.control(""),
    })
  }

  newPalabras_clave(): FormGroup {
    return this.fb.group ({
        Palabra_clave : this.fb.control(""),
    })
  }

  newTablas_impactadas(): FormGroup {
    return this.fb.group ({
        Tabla : this.fb.control(""),
    })
  }

  addArray(array : string) {
   if( array == "Parametros"){
    this.Parametros.push(this.newParametro());
   }
   if (array == "Palabra_clave"){
    this.Palabras_clave.push(this.newPalabras_clave());
   }
   if (array == "Tablas_impactadas"){
    this.Tablas_impactadas.push(this.newTablas_impactadas());
   }
   
  }

  removeArray(i:number , array : string) {
    // this.arrayCodigosProductos.splice(i,1)
    if( array == "Parametros"){
      this.Parametros.removeAt(i);
     }
     if (array == "Palabra_clave"){
      this.Palabras_clave.removeAt(i);
     }
     if (array == "Tablas_impactadas"){
      this.Tablas_impactadas.removeAt(i);
     }
     
  }

  registrar(){
    
    const arrPar : any = []
    const arrComent : any  = []
    const arrClave : any  = []
    const arrTabla : any = []
    this.funForm.value.Parametros.map((par : any) => {
      arrPar.push(par.Parametro)
      arrComent.push(par.Comentario)
    })

    this.funForm.value.Palabras_clave.map((pal : any) => {
      arrClave.push(pal.Palabra_clave)
    })

    this.funForm.value.Tablas_impactadas.map((pal : any) => {
      arrTabla.push(pal.Tabla)
    })
    
    this.funForm.patchValue({
      arrParametros : arrPar,
      arrComentario : arrComent,
      arrPalabras_clave : arrClave,
      arrTablas_impactadas : arrTabla
    })

    this.service.enviar_datos_funciones(this.funForm.value).subscribe(data => {
      console.log(data)
    }, error => {
      alert("Error al ingresar los datos")
    })

    console.log(this.funForm.value)

  }

}
