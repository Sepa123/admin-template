import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'
import { RsvService } from 'src/app/service/rsv.service'
import { CatalogoRSV,ColoresRSV,CatalogoPorColor } from 'src/app/models/catalogoRSV.iterface';
import { CargaRSV } from 'src/app/models/cargaRSV.interface'
import { SucursalRSV } from 'src/app/models/sucursalRSV.interface';

@Component({
  selector: 'app-crear-carga',
  templateUrl: './crear-carga.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})

export class CrearCargaComponent {
  
  skillsForm: FormGroup;
  colores : ColoresRSV[] = []
  sucursalesRSV : SucursalRSV [] = []

  public rol = sessionStorage.getItem("rol_id") 

  codigosProductos : CatalogoPorColor [] = []
  codigosProductosFull : CatalogoPorColor[] = []
  arrayCodigosProductos : CatalogoPorColor[][] = []
  cargasForm : FormGroup;

  nombreCargaExiste : boolean = false

  isErrorView : boolean = false
  constructor(private fb:FormBuilder,private service: RsvService) {

    this.cargasForm = this.fb.group({
      Nombre_carga : this.fb.control("", [Validators.required] ),
      Fecha_ingreso : this.fb.control("", [Validators.required] ),
      Sucursal : this.fb.control("", [Validators.required] ),
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
        Sucursal : this.fb.control(""),
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
      "Producto": "",
      "Color" : 0
    }]

    
    const color : number = this.cargasForm.value.arrays[index].Color

    this.arrayCodigosProductos[index] = this.codigosProductosFull.filter(codigo => codigo.Color == color)
    // console.log(this.arrayCodigosProductos[index][0].Codigo)
    // this.service.filtrar_catalogo_por_color(color).subscribe((data)=> {
    //   this.codigosProductos = data
    //   // this.arrayCodigosProductos = data
    //   this.arrayCodigosProductos[index] = this.codigosProductos
    //   console.log(this.arrayCodigosProductos[index][0].Codigo)

    // })

  }


  seleccionCodigo(i : number){
    const codigo : string = this.cargasForm.value.arrays[i].Codigo

    const codigoRepetido = this.cargasForm.value.arrays.filter((dato : any) => dato.Codigo == codigo)
    console.log(codigoRepetido)
    if(codigoRepetido.length > 1) {
      this.arrays.at(i).patchValue({
        Codigo : ""
      })
      return alert("El producto "+codigo+" ya esta registrado en esta carga")
    }
    const producto = this.arrayCodigosProductos[i].find(cod => cod.Codigo == codigo)?.Producto
    this.arrays.at(i).patchValue({
            Descripcion : producto
          })
  }

  addCargas() {
    this.arrays.push(this.newCarga());

    this.arrayCodigosProductos.push([{
      "Codigo": "",
      "Producto": "",
      "Color" : 0
    }])

    this.arrayCodigosProductos[this.arrays.length-1] = [{
      "Codigo": "",
      "Producto": "",
      "Color" : 0
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
            data["Sucursal"] = this.cargasForm.value.Sucursal
          })

          this.service.agregar_nuevo_catalogo(this.cargasForm.value.arrays).subscribe((data : any) => {
            alert(data.message)

            this.cargasForm.reset() 

            this.cargasForm.patchValue({
              Sucursal : ""
            })

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

    this.service.get_sucursales().subscribe((data) => {
      this.sucursalesRSV = data
      if(this.rol !== '5'){
        this.sucursalesRSV = this.sucursalesRSV.filter(sucursal => sucursal.Id !== 2)
      }
    })

    this.service.catalogo_por_colo_sin_filtro().subscribe(data => {
      this.codigosProductosFull = data
    })
  }

}
