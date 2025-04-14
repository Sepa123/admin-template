import { Component, ElementRef } from '@angular/core';
import { TaskMasterService } from '../../../service/task-master.service';
import { MainGestorActivos,Categoria,TaskStatus,Region,Comuna , Area, Estado,Responsable ,ListaActivos } from '../../../models/taskmaster/taskmaster.interface';
import * as L from 'leaflet';

import { FormControl, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms'

@Component({
  selector: 'app-gestor-activos',
  templateUrl: './gestor-activos.component.html',
  styleUrls: ['./gestor-activos.component.scss']
})
export class GestorActivosComponent {

  form: FormGroup;
  cargarMapa : boolean = false

  constructor(private el: ElementRef,private taskMasterService: TaskMasterService,public builder: FormBuilder) { 
    this.form = this.builder.group({
      Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
      Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
      Id_area : this.builder.control("1" , [Validators.required]),
      Categoria : this.builder.control("1", [Validators.required] ),
      Region : this.builder.control("1" ),
      Modelo : this.builder.control("" , [Validators.required]),
      Nombre_equipo : this.builder.control("", [Validators.required]),
      Comuna : this.builder.control("1" ),
      Marca : this.builder.control("" ),
      Descripcion : this.builder.control(""),
      Direccion :this.builder.control("" ),
      Responsable :this.builder.control("" ),
      Latitud: this.builder.control("" ),
      Longitud: this.builder.control("" ),
      Fecha_adquisicion: this.builder.control("" ),
      Id_estado: this.builder.control("1" ),
      Garantia: this.builder.control("" ),
      Proveedor: this.builder.control("" ),
      Valor_adquisicion: this.builder.control("" ),
      Vida_util: this.builder.control("" ),
      Id_responsable: this.builder.control(null ),
      Observaciones: this.builder.control("" ),
      Activo: this.builder.control(true),
      Fecha_baja: this.builder.control("" )
    
    })
  }

  listaCategoria : Categoria[] = []
  listaTaskStatus : TaskStatus[] = []
  listaRegion : Region[] = []
  listaComuna : Comuna[] = []
  listaComunasFull : Comuna[] = []
  listaArea : Area[] = []
  listaEstado : Estado[] = []
  listaResponsable : Responsable[] = []

  listaActivos : ListaActivos[] = []
  listaActivosFull : ListaActivos[] = []

  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string

  


  getLocation(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position)

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

    console.log("Longitud : " , this.longStr, "latitud :", this.latStr)
  }

  ngOnInit() {

    this.getLocation()

    setTimeout(() => {

      const map = L.map(this.el.nativeElement.querySelector('#map')).setView([this.latitude, this.longitud], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19
      }).addTo(map);

      // Añadir un marcador
      L.marker([this.latitude, this.longitud]).addTo(map).openPopup();

      // Añadir un popup al marcador

      if (map) {
        setTimeout(() => {
          map.invalidateSize();
          
        }, 500); // Espera un tiempo para que el modal se haya abierto completamente
      }
      
    }, 1000);


    this.taskMasterService.datos_seleccionables_gestor_activos().subscribe((data) => {
      
      this.listaCategoria = data.Categorias
      this.listaTaskStatus = data.Task_status
      this.listaComuna = data.Comuna
      this.listaComunasFull = this.listaComuna
      this.listaRegion = data.Region
      this.listaArea = data.Areas
      this.listaEstado = data.Estados
      this.listaResponsable = data.Responsables


    }
    )


    this.taskMasterService.obtener_lista_activos().subscribe((data : any) => {
      // console.log(data)
      this.listaActivos = data
      this.listaActivosFull = data
    })

  }

  seleccionarCategoria(event : any){

    console.log("seleccionarCategoria")

    if (event.target.value !== "todas") {
     this.listaActivos = this.listaActivosFull.filter((activo) => activo.Categoria == event.target.value)
    }
    else { 
      this.listaActivos = this.listaActivosFull
    }
    
    // console.log(event)
    console.log(event.target.value) // id de la categoria seleccionada
  }



  //// Modal nuevo Activo

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
    this.cargarMapa = !this.cargarMapa

    console.log(this.cargarMapa)
    
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
    this.cargarMapa = !this.cargarMapa
  }


  //Registrar Datos

  isErrorView : boolean = false

  imagenes: { [key: string]: File } = {};


  ///
  // idActivo: number = 0;


  GuardarDatos(){

    this.form.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Latitud : this.latStr,
      Longitud : this.longStr
    })


    if (this.form.value.Id_responsable == "null") {
      this.form.patchValue({
        Id_responsable : null
      })
    }

    console.log(this.form.value)


    if(this.form.valid){
      console.log('Formulario Valido')

      this.taskMasterService.registrar_activos(this.form.value).subscribe((data : any) => {
        

        

        const formData = new FormData();

        const bodi = {
          id_activo : data['id_activo'],
          imagen1_png : this.imagenes['imagen1'],
          imagen2_png : this.imagenes['imagen2'],
          imagen3_png : this.imagenes['imagen3']
        }

        if(this.imagenes['imagen1'] !== undefined ) formData.append('imagen1_png', this.imagenes['imagen1']);
        if(this.imagenes['imagen2'] !== undefined )formData.append('imagen2_png', this.imagenes['imagen2']);
        if(this.imagenes['imagen3'] !== undefined )formData.append('imagen3_png', this.imagenes['imagen3']);
        formData.append('id_activo', data['id_activo']); 

        this.uploadFilePdf(data['id_activo'])

        this.taskMasterService.subir_imagen_activos(formData).subscribe((data : any) => {

          

          // this.form.reset()
          this.visible = false
          this.cargarMapa = false

          alert('Activo Registrado con Exito')
        })


        
      }, error => {

        if(error.status == 422){


          error.error.detail.map((err : any) => {
            alert( 'Error con el campo '+err.loc[1] + ': '+ err.msg)

          })

          // console.log(error.error.detail.length)
          // alert( 'Error con el campo '+error.error.detail[0].loc[1] + ': '+ error.error.detail[0].msg)
        } else {
          alert(error.error.detail)
        }
        
       
      })
    }

  }


  //// subir achivos 

  private selectedFile: File | null = null;

  onFilePdfSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  buscarComunas(event: any){
    const selectedRegionId = event.target.value;
    this.listaComuna = this.listaComunasFull.filter( comuna => comuna.Id_region == selectedRegionId )
    this.form.patchValue({
      Comuna : this.listaComuna[0].Id_comuna
    })
  }


  uploadFilePdf(id_desc : any) {
    if (this.selectedFile) {

      // this.termino = false
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.taskMasterService.subirArchivoAdjunto(formData, id_desc).subscribe(
        (data : any) => {

          // Lógica adicional en caso de éxito.
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
          alert('Error al subir el archivo')
      
          // Lógica de manejo de errores.
        }
      );
      
    } else {
      console.warn('Ningún archivo seleccionado');
      // Lógica adicional en caso de que el usuario no seleccione ningún archivo.
    }
  }

  //Subir imagenes

  imageUrl1: string | ArrayBuffer | null = null;
  imageUrl2: string | ArrayBuffer | null = null;
  imageUrl3: string | ArrayBuffer | null = null;

  onFileSelected(event: any, n_imagen : number): void {
    const file = event.target.files[0];

    if(n_imagen == 1){
      if (file) {
        const reader = new FileReader();
  
        reader.onload = () => {
          this.imageUrl1 = reader.result; // Almacenamos la URL de la imagen
        };

        this.imagenes['imagen1'] = event.target.files[0];
  
        reader.readAsDataURL(file); // Leemos el archivo como una URL de datos
      }

    } if(n_imagen == 2){
      if (file) {
        const reader = new FileReader();
  
        reader.onload = () => {
          this.imageUrl2 = reader.result; // Almacenamos la URL de la imagen
        };

        this.imagenes['imagen2'] = event.target.files[0];
  
        reader.readAsDataURL(file); // Leemos el archivo como una URL de datos
      }
    }if(n_imagen == 3){
      if (file) {
        const reader = new FileReader();
  
        reader.onload = () => {
          this.imageUrl3 = reader.result; // Almacenamos la URL de la imagen
        };

        this.imagenes['imagen3'] = event.target.files[0];
  
        reader.readAsDataURL(file); // Leemos el archivo como una URL de datos
        }
      }
    
  }


  /// Acciones


  cambiarEstadoActivo(id_activo : number){

    let body = {
      id: id_activo,
    }

    this.taskMasterService.cambiar_estado_activo(body).subscribe((data) => {
      console.log(data)

      this.listaActivos.map((activo) => { 
        if(activo.Id == id_activo){
          activo.Activo = !activo.Activo
        }
      })
    })

  }


}
