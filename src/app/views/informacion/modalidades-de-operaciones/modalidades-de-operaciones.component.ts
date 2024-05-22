import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Detalle } from '../../../models/detalle-por-patente.interface';
import { HttpClient } from '@angular/common/http';
import { ModalidadDeOperacionesService } from '../../../service/modalidad-de-operaciones.service';
import { RazonSocial } from '../../../models/modalidad-de-operaciones.interface';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estado } from '../../../models/estados.interface';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
export class ModalidadesDeOperacionesComponent implements OnInit, OnDestroy {
  constructor(

    private http: HttpClient,
    private RS: ModalidadDeOperacionesService,
    private fb: FormBuilder
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
  // Creamos una función para mostrar/ocultar el detalle
  ngOnInit(): void {
    this.cargarDatos();

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  getCurrentDateTime() {
    // this.currentDateTime = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
    this.currentDateTime = ''
  }
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
      nombre: nombre,
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
      .post('https://hela.transyanez.cl/api/operacion/agregar/RazonSocial', formData)
      .subscribe((data) => {
        //mostrar aletar exito
        alert('El ingreso se ha realizado Correctamente');
      },
      (error) =>{
        //MAnejar errores
        console.error('Error al enviar la solicitud', error);
        alert('Hubo un error al ingresar el dato');
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
    const url = `https://hela.transyanez.cl/api/operacion/modalidad/buscar?nombre=${this.searchTerm}`;
    this.subReporte = this.http.get<any[]>(url)
      .subscribe((data) => {
        this.tableData = data;
      });
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

  // Función para actualizar el estado del elemento en la base de dato

  // alternarEstado(index: number) {
  //   // const id_update= document.getElementById("id").innerText;
  //   const id_update: HTMLTableDataCellElement | null =
  //     document.querySelector('td.id');
  //   if (id_update) {
  //     const contenidoNumerico: number = Number(id_update.innerText);
  //     console.log(contenidoNumerico);
  //     this.estadoActual = !this.estadoActual;
  //     const estado_update = this.estadoActual;

  //     const dataUpdate = {
  //       id: contenidoNumerico,
  //       estado: estado_update,
  //     };
  //     console.log(dataUpdate);
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(dataUpdate),
  //     };
  //     this.http
  //       .post(`http://localhost:8000/actualizar_estado`, dataUpdate)
  //       .subscribe((data) => {});
  //     console.log(dataUpdate);
  //   } else {
  //     console.log('No se encontró ninguna celda TD en el DOM');  }
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
  // console.log(formdata)

  // Alternar el estado actual entre true y false

  // Realizar la solicitud HTTP para actualizar el estado del elemento
}