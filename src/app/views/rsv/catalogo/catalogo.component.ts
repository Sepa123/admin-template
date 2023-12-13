import { Component } from '@angular/core';
import { RsvService } from 'src/app/service/rsv.service'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { CatalogoRSV,ColoresRSV } from 'src/app/models/catalogoRSV.iterface';
import { ROLES_ENUM } from 'src/app/models/enum/roles.enum';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['../styles/rsv.component.scss']
})
export class CatalogoComponent {

  verEditar : string [] = [ROLES_ENUM.ADMIN,ROLES_ENUM.ADMINISTRATIVO_RSV,ROLES_ENUM.JEFE_OPERACIONES,ROLES_ENUM.SUPERVISOR_RSV]
  cambiarCheckbox : string [] = [ROLES_ENUM.ADMIN,ROLES_ENUM.ADMINISTRATIVO_RSV,ROLES_ENUM.SUPERVISOR_RSV]
  arrCatalogoRSVFull : CatalogoRSV [][] = []
  arrCatalogoRSV : CatalogoRSV [][] = []

  isLoading : boolean = true
  colores : ColoresRSV [] = []
  selectedColor : number = 2
  selectedCodColor : string = "#FFFFFF"
  codigoColor : string = ""
  codigoFinal: string = ""
  isErrorView : boolean = false
  unidadConEtiqueta : boolean = true

  botonEditar : boolean = false

  catalogoRSV: CatalogoRSV [] = []
  catalogoRSVFull : CatalogoRSV [] = []

  codigoBuscar : string = ""

  public rol = sessionStorage.getItem("rol_id") 

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

  convertirAPesosChilenos(numero : number) {
    // Utilizamos toLocaleString con opciones específicas para moneda chilena
    return numero.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    });
}

  //marcar o desmarcar si el producto tiene unidades con etiquetas 
  actualizarUnidadConEtiqueta(event : any, codigo: string){
    console.log(codigo)
    const estadoUnidad = event.target.checked
    const body = {
      "unid_con_etiqueta": estadoUnidad,
      "codigo": codigo
    }
    console.log(estadoUnidad)
    this.service.update_unid_con_etiqueta(body).subscribe((data)=>{

    })
  }

  obtenerCatalogo(){
    this.service.get_catalogo_rsv().subscribe((data) => {
      this.catalogoRSVFull = data
      // this.catalogoRSV = data

      this.catalogoRSVFull.map((cata) => {
        cata.Precio_unitario_str = this.convertirAPesosChilenos(parseInt(cata.Precio_unitario+""))
      })
      this.isLoading = false

      const colores = [...new Set(data.map((inventario) => inventario.Color))]
      // arr inventarios
      let array = []
      colores.map(color => {
        array = data.filter( inventario => inventario.Color == color)
        this.arrCatalogoRSVFull.push(array)
      })

      this.arrCatalogoRSV = this.arrCatalogoRSVFull
    })
  }

  ngOnInit(){
    this.obtenerCatalogo()
    console.log(this.rol)
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
    Producto : this.builder.control(""),
    Unid_x_paquete : this.builder.control(0 , [Validators.required]),
    Peso : this.builder.control(0),
    Ancho : this.builder.control(0),
    Alto : this.builder.control(0),
    Largo : this.builder.control(0),
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    Color : this.builder.control(2, [Validators.required]),
    Habilitado : this.builder.control(true),
    Codigo_final : this.builder.control(""),
    Precio_unitario : this.builder.control(0),
    Ubicacion_p: this.builder.control(""),
    Ubicacion_u: this.builder.control(""),
  })

  cambiarColor(){
    const color  = this.form.value.Color
    if(color){
      this.selectedCodColor = this.colores.find(cod => cod.Id == color)?.Codigo_html+""
      const extension = this.colores.find(color => color.Id === parseInt(this.form.value.Color+""))?.Extension+""
      this.codigoFinal =  this.form.value.Codigo?.trim()+extension+""
      this.codigoFinal = this.codigoFinal.toUpperCase().replace(/\s/g, '')   
    }
    // this.service.buscar_producto_existente_rsv(this.codigoFinal).subscribe((data : any) => {
    //   if(data.repetido){
    //     alert(data.message)
    //   }
    // })
  }

  reemplazarIds(ids : number){
    if(ids == 0) return "Madera"
    return this.colores.filter(data => data.Id == ids)[0].Nombre_color
 }

 editarCatalogo(){
  // alert("Editar producto correctamente")
  console.log(this.codigoFinal)
  this.form.patchValue({
    Codigo_final : this.codigoFinal
  })

  this.service.editar_producto_rsv(this.form.value).subscribe((data : any) => {
     alert(data.message)
     this.form.reset()
     this.form.patchValue({
        Id_user : sessionStorage.getItem("id")?.toString()+"",
        Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
        Color : 2,
        Habilitado : true,
        Codigo_final : ""
      })
      this.selectedCodColor = "#FFFFFF"

      this.arrCatalogoRSVFull  = []
      this.arrCatalogoRSV  = []
      this.obtenerCatalogo()
      this.toggleLiveDemo()
      this.codigoFinal = ""
      
      this.isErrorView = false
  }
  ,(error) => {
    alert("Hubo un error al registrar los datos")
  })
 }
 agregarCatalogo(){
  this.form.reset()
  this.form.patchValue({
    Id_user : sessionStorage.getItem("id")?.toString()+"",
    Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
    Color : 2,
    Habilitado : true,
    Codigo_final : ""
  })
  this.codigoFinal = ""
  this.botonEditar = false
 }

 SelectedagregarCatalogo(){
  this.selectedCodColor = "#FFFFFF"
  this.toggleLiveDemo()
 }

 SelecteditarCatalogo(producto : CatalogoRSV) {
  this.botonEditar = true

  this.form.patchValue({
    // Codigo_final : producto.Codigo,
    Codigo : producto.Codigo_Original,
    Unid_x_paquete : producto.Unid_x_paquete,
    Producto : producto.Producto,
    Ancho : producto.Ancho,
    Peso : producto.Peso,
    Alto : producto.Alto,
    Largo : producto.Largo,
    Color : producto.Color,
    Precio_unitario : producto.Precio_unitario,
    Ubicacion_p : producto.Ubicacion_p,
    Ubicacion_u : producto.Ubicacion_u
  })  
  this.cambiarColor()
  this.toggleLiveDemo()
 }

 buscarByCodigo(){
  console.log(this.codigoBuscar)
    this.catalogoRSV =  this.catalogoRSVFull.filter(catalogo => catalogo.Codigo.trim() == this.codigoBuscar.trim() || catalogo.Codigo_Original == this.codigoBuscar.trim() )
    const colores = [...new Set(this.catalogoRSV.map((inventario) => inventario.Color))]
      // arr inventarios
      console.log(this.catalogoRSV)
    this.arrCatalogoRSV = [this.catalogoRSV]
    console.log(this.arrCatalogoRSV)
    
  if(this.catalogoRSV.length == 0){
    alert("No hay registros")
    // this.catalogoRSV =  this.catalogoRSVFull
    this.arrCatalogoRSV = this.arrCatalogoRSVFull
  }
 }
  
  textoCambiado() {
    this.colores.find(color => color.Id == 1)
    const extension = this.colores.find(color => color.Id === parseInt(this.form.value.Color+""))?.Extension+""
    this.codigoFinal =  this.form.value.Codigo?.trim()+extension+""
    this.codigoFinal = this.codigoFinal.toUpperCase()
    console.log('Texto cambiado a:',  this.codigoFinal);
  }

  filtrarColores(color : number){
    if (color === 0) {
      // this.catalogoRSV = this.catalogoRSVFull
      this.arrCatalogoRSV = this.arrCatalogoRSVFull
    } else {
      this.arrCatalogoRSV = this.arrCatalogoRSVFull.filter(catalogo => catalogo[0].Color === color)
      // this.catalogoRSV =  this.catalogoRSVFull.filter(producto => producto.Color === color)
    }
  }

  registrar(){
    if(this.form.valid){

      if(!this.botonEditar){
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
            this.selectedCodColor = "#FFFFFF"
          },(error) => {
            alert("Hubo un error al registrar los datos")
          })
        }
      }) 
    }  else {
      this.editarCatalogo()
    }
    }else{
      this.isErrorView = true
    }

  }
}
