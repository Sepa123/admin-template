import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, skipUntil, startWith, switchMap } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CitacionesService} from '../../../service/citaciones.service'




@Component({
  selector: 'app-citaciones',
  templateUrl: './citaciones.component.html',
  styleUrls: ['./citaciones.component.scss']
})
export class CitacionesComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private Ct : CitacionesService
  ) {}
  public visible = false;
  public visible2 = false;
  public visible3 = false;
  isModalOpen: boolean = false;
  form: FormGroup | any;
  myControl = new FormControl();
  modalidades: any[] = [];
  conductores: any[] = [];
  estados : any[] = [];
  peonetas: any[] = [];
  patentesList : any[] = [];
  selectedItem: any = null;
  rutaMeliValues: { [key: number]: string } = {};
  mensaje: string | null = null;
  mensajeClass: string | null = null;
  
  // Mapea los estados seleccionados para cada patente
  selectedEstados: { [key: number]: number } = {};
  resetForm() {
    this.form.reset();
  }
  toggleLiveDemo() {
    this.visible = !this.visible;
    if (!this.visible) {
      this.resetForm();
    }
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;
    if (!this.visible) {
      this.resetForm();
    }
  }
  resetForm2() {
    this.form.reset();
  }
  toggleLiveTP() {
    this.visible2 = !this.visible2;
    if (!this.visible2) {
      this.resetForm();
    }
  }
  toggleLive3() {
    this.visible3 = !this.visible3;
    if (!this.visible3) {
      this.resetForm();
    }
  }
  handleLiveDemoChange2(event: any) {
    this.visible2 = event;
    if (!this.visible2) {
      this.resetForm();
    }
  }

  handleLiveDemoChange3(event: any) {
    this.visible3 = event;
    if (!this.visible3) {
      this.resetForm();
    }
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.getModalidades();
    this.getConductores();
    this.getPeonetas();
    this.getEstados();
    this.getPpu();
    
  }

  getModalidades() {
    this.Ct.getOperaciones().subscribe(
      (data) => {
        this.modalidades = data;
        console.log(this.modalidades);
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }
  getEstados() {
    this.Ct.getEstadoList().subscribe(
      (data) => {
        this.estados = data;
        console.log(this.estados);
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }
  getConductores() {
    this.Ct.getConductoresList().subscribe(
      (data) => {
        this.conductores = data;
        console.log(this.conductores);
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }

  getPeonetas() {
    this.Ct.getPeonetaList().subscribe(
      (data) => {
        this.peonetas = data;
        console.log(this.peonetas);
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }

  eliminarPpu(ppu: any) {
    console.log(ppu)
    // Llamar a la API para eliminar la razón social por su ID
    this.http
      .delete(`http://localhost:8000/api/borrar?id_ppu=${ppu}`)
      .subscribe(
        () => {
          // Si la eliminación es exitosa
          console.log('Se eliminado el ID ${ppu} correctamente');
        },
        (error) => {
          console.error('Error al eliminar la razón social:', error);
        }
      );
  }
  valorIdppu(id :number){
    const valor = id
    console.log(valor)
    return valor;
       
  }

  updateEstado(id: any){

    const estado = this.selectedEstados[id]

    this.Ct.actualizarEstadoPpu(estado, id).subscribe(
      response => {
        console.log('Estado actualizado:', response);
        alert('Estado actualizado correctamente.');
      },
      error => {
        console.error('Error al actualizar el estado:', error);
        alert('Error al actualizar el estado.');
      }
    );
  }

  updateRutaMeli(id : any){
    const rutaMeli =  (<HTMLInputElement>document.getElementById('rutaMeli')).value;
    const estado = this.selectedEstados[id]

    this.Ct.actualizarRutaMeli(rutaMeli, id).subscribe(
      Response =>{
        console.log('estado actualizado', Response);
      },
      error =>{
        console.error('error al actualizar el estado', error)
      }
    )
  }

  getPpu() {
    this.Ct.getPpu().subscribe(
      (data) => {
        this.patentesList = data;
        this.initializeSelectedEstados();
        console.log(this.patentesList);
        this.initializeRutaMeliValues()
        this.patentesList[data.ruta_meli] 
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }

  initializeSelectedEstados() {
    this.patentesList.forEach(pu => {
      this.selectedEstados[pu.id_ppu] = pu.estado;
    });
  }
  initializeRutaMeliValues() {
    this.patentesList.forEach(pu => {
      this.rutaMeliValues[pu.id_ppu] = pu.ruta_meli;
      console.log(this.rutaMeliValues)
    });
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
    const fecha = (<HTMLInputElement>document.getElementById('nombre')).value;
    const ruta_meli = (<HTMLInputElement>(document.getElementById('description'))).value;
    const id_ppu = (<HTMLSelectElement>(document.getElementById('id_ppu'))).value
    const id_operacion = (<HTMLSelectElement>(document.getElementById('id_ppu'))).value
    const id_centro_op = (<HTMLSelectElement>(document.getElementById('id_ppu'))).value
    const estado =  (<HTMLSelectElement>(document.getElementById('estado'))).value
    // Validar campos
    

    // Crear un objeto FormData y agregar los datos del formulario
    const formData = {
      id_user: id_user,
      ids_user: ids_user,
      fecha: fecha,
      ruta_meli: ruta_meli,
      id_ppu: id_ppu,
      id_operacion: id_operacion,
      id_centro_op: id_centro_op,
      estado: estado
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

  getColor(Color:Number): any { 
    if (Color == 1) {
      return 'green'; // 
    } else if (Color == 2) {
      return '#04BD41'; // 
    } else if (Color == 3) {
      return '#F52822'; // 
    } else if(Color == 4){
      return  '#ecab0f';
    } else if(Color == 5){
      return 'gris'
    }
  }

  getColorLetra(Color:Number): string { 
    if (Color == 0) {
      return 'black'; // 
    } else if (Color == 1) {
      return 'white'; // 
    } else if (Color == 2) {
      return 'white'; // 
    } else if(Color == 3){
      return  'black';
    } else {
      return 'No se encuentra el color'
    }
  }

}