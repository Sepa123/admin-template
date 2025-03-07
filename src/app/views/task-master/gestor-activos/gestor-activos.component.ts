import { Component, ElementRef } from '@angular/core';
import { TaskMasterService } from '../../../service/task-master.service';
import { MainGestorActivos,Categoria,TaskStatus,Region,Comuna , Area, Estado  } from '../../../models/taskmaster/taskmaster.interface';
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
      Id_responsable: this.builder.control("" ),
      Observaciones: this.builder.control("" ),
      Activo: this.builder.control("" ),
      Fecha_baja: this.builder.control("" )
    
    })
  }

  listaCategoria : Categoria[] = []
  listaTaskStatus : TaskStatus[] = []
  listaRegion : Region[] = []
  listaComuna : Comuna[] = []
  listaArea : Area[] = []
  listaEstado : Estado[] = []

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
      this.listaRegion = data.Region
      this.listaArea = data.Areas
      this.listaEstado = data.Estados


    }
    )

  }

  seleccionarCategoria(event : any){

    console.log("seleccionarCategoria")
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


  GuardarDatos(){

    this.form.patchValue({
      Id_user : sessionStorage.getItem("id")?.toString()+"",
      Ids_user : sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"",
      Latitud : this.latStr,
      Longitud : this.longStr
    })


    console.log(this.form.value)


    if(this.form.valid){
      console.log('Formulario Valido')

      this.taskMasterService.registrar_activos(this.form.value).subscribe((data) => {
        data


        alert('Activo Registrado con Exito')
        this.form.reset()
        this.visible = false
        this.cargarMapa = false
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
  
        reader.readAsDataURL(file); // Leemos el archivo como una URL de datos
      }

    } if(n_imagen == 2){
      if (file) {
        const reader = new FileReader();
  
        reader.onload = () => {
          this.imageUrl2 = reader.result; // Almacenamos la URL de la imagen
        };
  
        reader.readAsDataURL(file); // Leemos el archivo como una URL de datos
      }
    }if(n_imagen == 3){
      if (file) {
        const reader = new FileReader();
  
        reader.onload = () => {
          this.imageUrl3 = reader.result; // Almacenamos la URL de la imagen
        };
  
        reader.readAsDataURL(file); // Leemos el archivo como una URL de datos
        }
      }
    
  }



}
