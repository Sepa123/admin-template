import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Detalle } from '../../../models/detalle-por-patente.interface';
import { HttpClient } from '@angular/common/http';
import { ModalidadDeOperacionesService } from '../../../service/modalidad-de-operaciones.service';
import { RazonSocial } from '../../../models/modalidad-de-operaciones.interface';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estado } from '../../../models/estados.interface';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ComunasService } from 'src/app/service/comunas/comunas.service';
import { CentroOperacion } from '../../../models/operacion/centroOperacion.interface';

// import { format } from 'date-fns';
// import { Console, error } from 'console';
// import { id } from 'date-fns/locale';
// import { Observable } from 'rxjs';

interface EstadoUpdate {
  id: number;
  estado: boolean;
}
@Component({
  selector: 'app-modalidades-de-operaciones',
  templateUrl: './modalidades-de-operaciones.component.html',
  styleUrls: ['./modalidades-de-operaciones.component.scss'],
})
export class ModalidadesDeOperacionesComponent implements OnInit {
  constructor(

    private http: HttpClient,
    private RS: ModalidadDeOperacionesService,
    private fb: FormBuilder,
    private service: ModalidadDeOperacionesService,public builder: FormBuilder,private comunaService : ComunasService
  ) {
    this.getCurrentDateTime();
  }
  searchTerm: string = '';
  currentDateTime: string | undefined;
  isModalOpen: boolean = false;
  tableArray!: string[];
  arrayRazonSocial: RazonSocial[] = [];
  subReporte!: Subscription;
  tableData: RazonSocial[] = [];
  form: FormGroup | undefined;
  // Variable para almacenar el estado
  estado: boolean = false;
  // Variable para almacenar el ID del elemento a actualizar

  public visible = false;
  public visible2 = false;
  public visibleCO = false
  // Creamos una función para mostrar/ocultar el detalle
  ngOnInit(): void {
    this.cargarDatos();

    this.cargarDatosCO();

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      description: ['', Validators.required],
    });




  }

  


  getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    this.currentDateTime = formattedDate
  }


/////

  toggleLiveCO() {
    
    this.visibleCO = !this.visibleCO;
    
  }

  handleLiveCOChange(event: any) {
    this.visibleCO = event;
  }
  
  openModalCO(){
    this.isModalOpen = true
  }

  closeModalCO(){
    this.isModalOpen = false
  }

////
  toggleLiveDemo() {
    this.visible = !this.visible;
  }
  activarModal() {
    this.visible2 = !this.visible2;
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  handleLiveDemoChange2(event: any) {
    this.visible = event;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  idElemento: number = 1; // ID del elemento que deseas actualizar
  estadoActual: boolean = true; // Estado actual del elemento
  loading: boolean = false; // Indicador de carga para mostrar mientras se realiza la solicitud HTTP

  verDetalle(obs: string | null) {
    if (obs === null || obs === '') {
      /*this.observacionActual = "Sin observación"
        }else{
          /*this.observacionActual = obs*/
    }
    console.log('hola');
    this.toggleLiveDemo();
  }

  submitForm() {
    // Obtener Valores de sessionStorage
    const id_user = sessionStorage.getItem('id')?.toString() + '';
    const ids_user =
      sessionStorage.getItem('server') +
      '-' +
      sessionStorage.getItem('id') +
      '';
    //Obtener  valores de los campos formularios.
    const nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
    const description = (<HTMLInputElement>(
      document.getElementById('description')
    )).value;

    // Validar campos
    if (!nombre || !description) {
      // Mostrar alertas específicas para cada campo
      if (!nombre) {
        alert('El campo Nombre es requerido.');
      }
      if (!description) {
        alert('El campo Descripción es requerido.');
      }
      return; // Detener la ejecución si hay campos vacíos
    }

    // Crear un objeto FormData y agregar los datos del formulario
    const estado = true;
    const creation_date = this.currentDateTime;
    const update_date = this.currentDateTime;
    const formData = {
      id_user: id_user,
      ids_user: ids_user,
      nombre: nombre.trim(),
      description: description,
      creation_date: creation_date,
      estado: estado,
      update_date: update_date,
    };

    // Configuracion para la solicitud
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Convertimos el objeto a una cadena JSON
    };
    this.http
      .post('https://hela.transyanez.cl/api/operacion/agregar/razonSocial', formData)
      .subscribe((data) => {
        //mostrar aletar exito
        alert('El ingreso se ha realizado Correctamente');
        this.service.getRazonesSocial().subscribe((data) => {
          this.modalidadOperacion = data
          this.formCO.patchValue({
            Id_op : 'Seleccione una operación'
          })
        })
        this.cargarDatos();
        this.toggleLiveDemo()
      },
      (error) =>{
        //MAnejar errores
        console.error('Error al enviar la solicitud', error.error.detail);
        if ( error.error.detail.includes("duplicate key")) {
          alert("El nombre de la operación ya existe");
        } else {
          alert('Hubo un error al ingresar el dato');
        }
        
      }
    );
  }
  // BuscarDatosTabla(){
  //   this.RS.getRazonesSocial().subscribe(data => {this.arrayRazonSocial = data; console.log(this.arrayRazonSocial)})
  //   console.log(this.arrayRazonSocial)
  //

  cargarDatos() {
    this.subReporte = this.RS.getRazonesSocial().subscribe((data) => {
      console.log(this.subReporte);
      this.tableData = data;
      console.log(this.tableData);
    });
  }

  buscarDatos() {
    
      this.RS.buscarModalidadOperacion(this.searchTerm)
      .subscribe((data) => {
        this.tableData = data;
      }, error => alert('No se encontraron datos'));

  }

  eliminarRazonSocial(id: number) {
    // Llamar a la API para eliminar la razón social por su ID
    this.http
      .delete(`https://hela.transyanez.cl/api/operacion/modalidad/borrar?id=${id}`)
      .subscribe(
        () => {
          // Si la eliminación es exitosa
          console.log('Se eliminado el ID ${id} correctamente');
        },
        (error) => {
          console.error('Error al eliminar la razón social:', error);
        }
      );
  }


  toggleEstado(id: number): void {
    const item = this.tableData.find((x) => x.id === id);
    if (item) {
      this.RS.updateItemStatus(item.id, item.estado).subscribe(
        (response) => {
          console.log(
            `ID: ${item.id}, Estado: ${item.estado}, Respuesta:`,
            response
          );
        },
        (error) => {
          console.error('Error al actualizar el estado:', error);
        }
      );
    } else {
      console.error('Elemento no encontrado en el índice:', id);
      console.log(item);
    }
  }

///// AGREGAR EL Centro de operacion

  isErrorView : boolean = false
  listaRegiones : any [] = []
  listaComunas : any [] = []
  listaComunasFull : any [] = []
  idOpSave : any = 0

  modalidadOperacion : RazonSocial []= []


  formCO = this.builder.group({
    Id_user : this.builder.control(sessionStorage.getItem("id")?.toString()+"", [Validators.required]),
    Ids_user : this.builder.control(sessionStorage.getItem('server')+"-"+sessionStorage.getItem('id')+"", [Validators.required]),
    // Documentacion_comercial_banco : this.builder.control("" , [Validators.required]),
    Centro : this.builder.control("" ,[Validators.required] ),
    Region: this.builder.control("" ,[Validators.required] ),
    Descripcion : this.builder.control("", [Validators.required]),
    Id_op :this.builder.control("", )
  })

  centroOperacion : CentroOperacion [] =[]

  seleccionarOperacion(id : number){
    this.centroOperacion = []
    this.idOpSave = id
    this.formCO.patchValue({
      Id_op : id+''
    })

    this.formCO.get('Id_op')?.disable();

    this.service.getCentroOperacion(id).subscribe((data) => {
      this.centroOperacion = data
    })
    this.toggleLiveCO()
  }

cargarDatosCO(){
  this.comunaService.getListaRegiones().subscribe((data : any) => {
    this.listaRegiones = data
  })

  this.comunaService.getListaComunas().subscribe((data : any) => {
    this.listaComunas = data
    this.listaComunasFull = this.listaComunas
    this.formCO.patchValue({
      Region : '1'
    })
  })

  this.service.getRazonesSocial().subscribe((data) => {
    this.modalidadOperacion = data
    this.formCO.patchValue({
      Id_op : 'Seleccione una operación'
    })
  })
}

registrarCO(){
  console.log(this.formCO.value)
  if(this.formCO.valid){
    const body = {
      "Id_user" : this.formCO.value.Id_user,
      "Ids_user" : this.formCO.value.Ids_user,
      "Centro" : this.formCO.value.Centro,
      "Region": this.formCO.value.Region,
      "Descripcion" :this.formCO.value.Descripcion,
      "Id_op" : this.idOpSave
    }
    this.service.agregarCentroOperacion(body).subscribe((data : any) => {
      alert(data.message)
      this.formCO.patchValue({
          Centro : '',
          Region : '1',
          Descripcion : ''
      })

      this.service.getCentroOperacion(parseInt(this.idOpSave+'')).subscribe((data) => {
        this.centroOperacion = data
      })
    }, error => alert(error.error.detail))
  }
}
}