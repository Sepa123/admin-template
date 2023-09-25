import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { RsvService } from 'src/app/service/rsv.service'
import { CatalogoRSV,ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface';
import { CargaRSV } from 'src/app/models/cargaRSV.interface'

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class VentasComponent {
  
  skillsForm: FormGroup;
  colores : ColoresRSV[] = []

  codigosProductos : CatalogoPorColor [] = []

  arrayCodigosProductos : CatalogoPorColor[][] = []
  cargasForm : FormGroup;

  nombreCargaExiste : boolean = false

  isErrorView : boolean = false
  constructor(private fb:FormBuilder,private service: RsvService) {

    this.cargasForm = this.fb.group({
      Nombre_carga : this.fb.control("", [Validators.required] ),
      Fecha_ingreso : this.fb.control("", [Validators.required] ),
      arrays : this.fb.array([])
    })
 
    this.skillsForm = this.fb.group({
      name: '',
      skills: this.fb.array([]) ,
    });
  
  }
 
  get skills() : FormArray {
    return this.skillsForm.get("skills") as FormArray
  }

  get arrays() : FormArray {
    return this.cargasForm.get("arrays") as FormArray
  }
 
  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: '',
    })
  }

  newCarga(): FormGroup {
    return this.fb.group ({
        Nombre_carga : this.fb.control(""),
        Fecha_ingreso : this.fb.control(""),
        Codigo : this.fb.control("", [Validators.required] ),
        Color : this.fb.control("", [Validators.required] ),
        Paquetes : this.fb.control("", [Validators.required] ),
        Unidades: this.fb.control("", [Validators.required] ),
        Id_user : this.fb.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
        Ids_user : this.fb.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
        Descripcion : this.fb.control("")
    })
  }

  cargaUnica(){
    const nombreCarga = this.cargasForm.value.Nombre_carga
    this.service.buscar_carga_por_nombre_carga(nombreCarga.trim()).subscribe((data : any)=> {
      if(data.repetido){
        alert(data.message)
        this.nombreCargaExiste = true
      }else{
        this.nombreCargaExiste = false
      }
    })
  }

  cambio(index : number){
    this.arrayCodigosProductos[index] = [{
      "Codigo": "",
      "Producto": ""
    }]
    const color : number = this.cargasForm.value.arrays[index].Color

    this.service.filtrar_catalogo_por_color(color).subscribe((data)=> {
      this.codigosProductos = data
      // this.arrayCodigosProductos = data
      this.arrayCodigosProductos[index] = this.codigosProductos
      console.log(this.arrayCodigosProductos[index][0].Codigo)

    })

  }


  seleccionCodigo(i : number){
    const codigo : string = this.cargasForm.value.arrays[i].Codigo
    const producto = this.arrayCodigosProductos[i].find(cod => cod.Codigo == codigo)?.Producto
    this.arrays.at(i).patchValue({
            Descripcion : producto
          })

    // alert(codigo)
  }

  addCargas() {
    this.arrays.push(this.newCarga());

    this.arrayCodigosProductos.push([{
      "Codigo": "",
      "Producto": ""
    }])

    this.arrayCodigosProductos[this.arrays.length-1] = [{
      "Codigo": "",
      "Producto": ""
    }]

    console.log(this.arrayCodigosProductos)
  }

  removeCarga(i:number) {
    this.arrayCodigosProductos.splice(i,1)
    this.arrays.removeAt(i);
  }
 
  onSubmit() {
    // console.log(this.skillsForm.value);
    this.isErrorView = true
    const indexArray = this.cargasForm.value.arrays.length

    if(this.cargasForm.valid){
      const nombreCarga = this.cargasForm.value.Nombre_carga
      this.service.buscar_carga_por_nombre_carga(nombreCarga.trim()).subscribe((data : any)=> {
        if(data.repetido){
          alert(data.message)
          this.nombreCargaExiste = true
        }else{
          this.nombreCargaExiste = false
          this.cargasForm.value.arrays.map((data : any) => {
            data["Nombre_carga"] = this.cargasForm.value.Nombre_carga
            data["Fecha_ingreso"] = this.cargasForm.value.Fecha_ingreso
          })

          this.service.agregar_nuevo_catalogo(this.cargasForm.value.arrays).subscribe((data : any) => {
            alert(data.message)

            this.cargasForm.reset() 

            for (let index = indexArray; index >= 0; index--) {
              console.log(index)
              this.arrays.removeAt(index)
              
            }
     
            this.arrayCodigosProductos = []
      
            this.isErrorView = false
          },(error) => {
            alert(error.error.detail)
          })

        }
      })
    }
  }

  ngOnInit(){
    this.service.get_colores_rsv().subscribe((data) => {
      this.colores = data
      
    })
  }

}