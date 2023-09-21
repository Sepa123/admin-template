import { Component } from '@angular/core';
import { RsvService } from 'src/app/service/rsv.service'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { CatalogoRSV,ColoresRSV } from 'src/app/models/catalogoRSV.iterface';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent {

  colores : ColoresRSV [] = []
  selectedColor : number = 2
  selectedCodColor : string = "#FFFFFF"
  codigoColor : string = ""
  codigoFinal: string = ""
  isErrorView : boolean = false

  catalogoRSV: CatalogoRSV [] = []

  constructor (public builder: FormBuilder, private service: RsvService){}

  isModalOpen: boolean = false
  public visible = false;

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

  obtenerCatalogo(){
    this.service.get_catalogo_rsv().subscribe((data) => {
      this.catalogoRSV = data
      console.log( this.catalogoRSV)
    })
  }

  ngOnInit(){
    this.obtenerCatalogo()

    this.service.get_colores_rsv().subscribe((data) => {
      this.colores = data
    })
  }

  codigoExistente() {
    this.service.buscar_producto_existente_rsv(this.form.value.Codigo+"").subscribe((data : any) => {
      if(data.repetido){
        alert(data.message)
      }
      
      const extension = this.colores.find(color => color.Id === parseInt(this.form.value.Color+""))?.Extension+""
      this.codigoFinal =  this.form.value.Codigo?.trim()+extension+""
      this.codigoFinal = this.codigoFinal.toUpperCase().replace(/\s/g, '')

    })
  }

  form = this.builder.group({
    Codigo : this.builder.control("" , [Validators.required]),
    Producto : this.builder.control("" ),
    Unid_x_paquete : this.builder.control("" , [Validators.required]),
    Peso : this.builder.control(""),
    Ancho : this.builder.control(""),
    Alto : this.builder.control(""),
    Largo : this.builder.control(""),
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    Color : this.builder.control(2, [Validators.required]),
    Habilitado : this.builder.control(true),
    Codigo_final : this.builder.control("")
  })

  cambiarColor(){
    const color  = this.form.value.Color
    if(color){
      this.selectedCodColor = this.colores.find(cod => cod.Id == color)?.Codigo_html+""
      const extension = this.colores.find(color => color.Id === parseInt(this.form.value.Color+""))?.Extension+""
      this.codigoFinal =  this.form.value.Codigo?.trim()+extension+""
      this.codigoFinal = this.codigoFinal.toUpperCase().replace(/\s/g, '')   
    }
    this.service.buscar_producto_existente_rsv(this.codigoFinal).subscribe((data : any) => {
      if(data.repetido){
        alert(data.message)
      }
    })
  }
  
  textoCambiado() {
    const extension = this.colores.find(color => color.Id === parseInt(this.form.value.Color+""))?.Extension+""
    this.codigoFinal =  this.form.value.Codigo?.trim()+extension+""
    this.codigoFinal = this.codigoFinal.toUpperCase()
    console.log('Texto cambiado a:',  this.codigoFinal);
  }

  registrar(){
    if(this.form.valid){
      this.service.buscar_producto_existente_rsv(this.codigoFinal).subscribe((data : any) => {
        if(data.repetido){
          alert(data.message)
        }else {
          this.form.patchValue({
            Codigo_final : this.codigoFinal
          })

          this.service.agregar_nuevo_producto_rsv(this.form.value).subscribe((data : any)=> {
            this.form.reset()
            this.form.patchValue({
              Id_user : sessionStorage.getItem("id")?.toString()+"",
              Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
              Color : 2,
              Habilitado : true,
              Codigo_final : ""
            })

            alert(data.message)
            this.toggleLiveDemo()
            this.codigoFinal = ""
            this.obtenerCatalogo()
            this.isErrorView = false
          },(error) => {
            alert("Hubo un error al registrar los datos")
          })
        }
      })   
    }else{
      this.isErrorView = true
    }

  }
}
