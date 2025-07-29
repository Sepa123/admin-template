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
  public visibleModalidad = false;




  mostrarAlerta(mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info'): void {
  // Crear un div para la alerta
  const alerta: HTMLDivElement = document.createElement('div');
  alerta.classList.add('alerta', tipo); // Añadir clase para tipo (success, error, warning, info)

  // Elegir icono basado en el tipo
  const icono: HTMLElement = document.createElement('i');
  switch (tipo) {
    case 'success':
      icono.classList.add('fas', 'fa-check-circle'); // Icono de éxito
      alerta.style.backgroundColor = 'rgba(40, 167, 69, 0.9)'; // Verde
      break;
    case 'error':
      icono.classList.add('fas', 'fa-times-circle'); // Icono de error
      alerta.style.backgroundColor = '#dc3545'; // Rojo
      break;
    case 'warning':
      icono.classList.add('fas', 'fa-exclamation-triangle'); // Icono de advertencia
      alerta.style.backgroundColor = '#ffc107'; // Amarillo
      break;
    case 'info':
      icono.classList.add('fas', 'fa-info-circle'); // Icono de información
      alerta.style.backgroundColor = '#17a2b8'; // Azul
      break;
  }

  // Añadir el icono y el mensaje al div de la alerta
  alerta.appendChild(icono);
  alerta.appendChild(document.createTextNode(mensaje));

  // Añadir la alerta al contenedor de alertas
  const alertaContainer: HTMLElement | null = document.getElementById('alertaContainer');
  if (alertaContainer) {
    alertaContainer.appendChild(alerta);

    // Mostrar la alerta con una animación de opacidad
    setTimeout(() => {
      alerta.style.opacity = '1';
    }, 100);

    // Ocultar la alerta después de 5 segundos y eliminarla del DOM
    setTimeout(() => {
      alerta.style.opacity = '0';
      setTimeout(() => {
        alerta.remove();
      }, 500);
    }, 5000);
  }
}
  // Creamos una función para mostrar/ocultar el detalle
  ngOnInit(): void {
    this.cargarDatos();

    this.cargarDatosCO();
    //cargamos la informaciónm de los tipos de vehiculos.
    this.getTiposVehiculo();
    this.getDataTipoVehiculo()
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      description: ['', Validators.required],
    });




  }


  sortOrder : boolean = true

  sortTableNombre(orden : boolean){
    if(orden){
      this.tableData.sort((a,b) => a.nombre.localeCompare(b.nombre))
    }else{
      this.tableData.sort((a,b) => b.nombre.localeCompare(a.nombre))
    }
    this.sortOrder = !this.sortOrder
    
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

  toggleLiveDemoCV() {
    this.visibleModalidad = !this.visibleModalidad;
    this.DatatiposVehiculo = [];
    
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
  handleLiveDemoChangeCV(event: any) {
    this.visibleModalidad = event;
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

  seleccionarIdOpTV(id : number){
    this.idOpSave = id
    console.log(this.idOpSave)
  }

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


eliminarCO(id : number){
  const centroSeleccionado = this.centroOperacion.filter((co => co.Id == id))[0]
  console.log(centroSeleccionado.Id)
  console.log(centroSeleccionado.Id_op)
  let isSeguro = confirm(`¿Seguro que desea eliminar el centro ${centroSeleccionado.Centro} ?`);

  if (!isSeguro) return console.log("no esta seguro")

  this.service.EliminarCentroOperacion(id).subscribe((data) =>
  {
    this.service.getCentroOperacion(parseInt(this.idOpSave+'')).subscribe((data) => {
      this.centroOperacion = data
    })
  })
}



  sortTable(orden : boolean){
    if(orden){
      this.tableData.sort((a,b) => a.nombre.localeCompare(b.nombre))
    }else{
      this.tableData.sort((a,b) => b.nombre.localeCompare(a.nombre))
    }
    this.sortOrder = !this.sortOrder
    
  }


  sortTableDetalle(orden : boolean){
    if(orden){
      this.tableData.sort((a,b) => Number(a.estado) - Number(b.estado))
    }else{
      this.tableData.sort((a,b) => Number(b.estado) - Number(a.estado))
    }
    this.sortOrder = !this.sortOrder
    
  }

  sortTableCO(orden : boolean){
    if(orden){
      this.tableData.sort((a,b) => a.cant_co - b.cant_co)
    }else{
      this.tableData.sort((a,b) => b.cant_co - a.cant_co)
    }
    this.sortOrder = !this.sortOrder
    
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
    }, error => this.mostrarAlerta('Error al registrar centro de operación: ' + error.message, 'error'))
  }
}

tiposVehiculo: any[] = [];

getTiposVehiculo() {

      // https://hela.transyanez.cl
  this.http.get<any[]>('http://127.0.0.1:8000/api/tipo-vehiculo/')
    .subscribe(
      data => {
        
        // Aquí puedes guardar el resultado en una variable para usarlo en el select
         this.tiposVehiculo = data;
      },
      error => {
        this.mostrarAlerta('Error al obtener tipos de vehículo: ' + error.message, 'error');
      }
    );
}

getTipoVehiculoById(id: number): string {
  const tipoEncontrado = this.tiposVehiculo.find(tv => tv.id === id);
  return tipoEncontrado ? tipoEncontrado.tipo : 'Tipo no encontrado';
}

// Función simple para eliminar un tipo de vehículo por ID
// Utiliza fetch API

deleteTipoVehiculo(id: number): Promise<void> {
  return fetch(`http://127.0.0.1:8000/api/delete-tipo-vehiculo/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al eliminar el tipo de vehículo con ID ${id}`);
      }
      console.log(`Tipo de vehículo con ID ${id} eliminado correctamente.`);
      this.getDataTipoVehiculo(); // Refresca la lista de tipos de vehículo
      this.mostrarAlerta('Tipo de vehículo eliminado correctamente', 'success');
    })
    .catch(error => {
      this.mostrarAlerta('Error al eliminar tipo de vehículo: ' + error.message, 'error');
    });
}


DatatiposVehiculo: any[] = [];
getDataTipoVehiculo() {
    // https://hela.transyanez.cl
  this.http.get<any[]>('http://127.0.0.1:8000/api/op-tipo-vehiculo/')
    .subscribe(
      data => {
        console.log('Tipos de vehículo:', data);
        // Aquí puedes guardar el resultado en una variable para usarlo en el select
         this.DatatiposVehiculo = data;
      },
      error => {
        this.mostrarAlerta('Error al obtener tipos de vehículo: ' + error.message, 'error');
      }
    );
}


agregarTipoVehiculo() {
  // Ejemplo: obtén los valores de los inputs (ajusta según tu formulario)
  const id_user = Number(sessionStorage.getItem('id'));
  const id_operacion = Number(this.idOpSave); // o el id de operación actual
  const codigo = (document.getElementById('vehicleCode') as HTMLInputElement)?.value || '';
  const id_tipo = Number((document.getElementById('vehicleType') as HTMLSelectElement)?.value);
  const descripcion = (document.getElementById('vehicleDescription') as HTMLInputElement)?.value || '';

  // Validación básica
  if (!id_user || !id_operacion || !codigo || !id_tipo) {
    alert('Todos los campos son obligatorios');
    return;
  }

  const body = {
    id_user,
    id_operacion,
    codigo,
    id_tipo,
    descripcion
  };
  // https://hela.transyanez.cl
  this.http.post('http://127.0.0.1:8000/api/agregar-tipo-vehiculo/', body)
    .subscribe(
      (resp: any) => {
        this.mostrarAlerta('Tipo de vehículo agregado correctamente', 'success');
        // Opcional: refresca la lista de vehículos, limpia el formulario, etc.
        this.getDataTipoVehiculo(); // Refresca la lista de tipos de vehículo
      },
      error => {
        this.mostrarAlerta('Error al agregar tipo de vehículo: ' + error.message, 'error');
      }
    );
}
}

