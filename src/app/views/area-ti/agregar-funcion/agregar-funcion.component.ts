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
      Esquema : this.fb.control("", [Validators.required] ),
      Nombre_funcion : this.fb.control("", [Validators.required] ),
      Tipo_funcion : this.fb.control("", [Validators.required]),
      Descripcion : this.fb.control("", [Validators.required]),
      Parametros : this.fb.array([]),
      Comentarios_parametros : this.fb.array([]),
      Palabras_clave : this.fb.array([]),
      Tablas_impactadas : this.fb.array([]),
    })
  }

  

  ngOnInit(){
    this.service.get_lista_tipo_funciones().subscribe(data => {

    })
  }

  get Parametros() : FormArray {
    return this.funForm.get("Parametros") as FormArray
  }
  get Comentarios_parametros() : FormArray {
    return this.funForm.get("Comentarios_parametros") as FormArray
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
    })
  }

  newPalabras_clave(): FormGroup {
    return this.fb.group ({
        Palabra_clave : this.fb.control(""),
    })
  }

  newComentario(): FormGroup {
    return this.fb.group ({
        Comentario : this.fb.control(""),
    })
  }

  newTablas_impactadas(): FormGroup {
    return this.fb.group ({
        Tabla : this.fb.control(""),
    })
  }

  // addArray() {

  //   if (this.ventasForm.value.Sucursal == "") return alert("Antes de agregar productos, debe seleccionar una sucursal")
  //   this.arrays.push(this.newProducto());

  //   this.arrayCodigosProductos.push([{
  //     "Codigo": "",
  //     "Producto": "",
  //     "Color" : 0
  //   }])

  //   this.arrayCodigosProductos[this.arrays.length-1] = [{
  //     "Codigo": "",
  //     "Producto": "",
  //     "Color" : 0
  //   }]

  //   console.log(this.arrayCodigosProductos)
  // }

}
