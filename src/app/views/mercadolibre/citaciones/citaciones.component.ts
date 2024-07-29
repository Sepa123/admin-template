import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit,Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, skipUntil, startWith, switchMap } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CitacionesService} from '../../../service/citaciones.service'
import { NgForm } from '@angular/forms'





@Component({
  selector: 'app-citaciones',
  templateUrl: './citaciones.component.html',
  styleUrls: ['./citaciones.component.scss','./citaciones2.component.scss'],
})
export class CitacionesComponent implements OnInit {
  
  @ViewChild('ambulanceForm') ambulanceForm: NgForm | undefined;

  operacionValue: number = 0;
  centroOperacionValue: number = 0;
  dateForm: FormGroup;
  conteoingresados: any;
  conteoConfirmadas: any;
  id_count: any;
  estado_count: any;
  conductores2: any = '';
  peonetas2: any = '';
  patentesEncontradas: any = '';
  input1: any;
  input2: any;
  input3: any;
  IdPpuRecuperada?: number;
  selectedPatente: string;
  conteoIngresadosHtml: any;
  dataTipoRutaColor: any;
  TipoRutaImagen: any;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private Ct: CitacionesService,
    private renderer: Renderer2
  ) {
    this.dateForm = this.fb.group({
      date: [''],
    });
    this.selectedPatente = '';
  }

  public visible = false;
  public visible2 = false;
  public visible3 = false;
  public visibleAmbulance = false;

  isModalOpen: boolean = false;
  form: FormGroup | any;
  myControl = new FormControl();
  modalidades: any[] = [];
  conductores: any[] = [];
  estados: any[] = [];
  peonetas: any[] = [];
  dataTipoRuta: any[] = [];
  patentesList: any[] = [];
  patentesList2: any[] = [];
  patentesListFiltrada: any[] = [];
  CopFiltrado: any[] = [];
  selectedItem: any = null;
  rutaMeliValues: { [key: number]: string } = {};
  mensaje: string | null = null;
  mensajeClass: string | null = null;
  formattedDate: string = '';
  getOperacion: any = '';
  getCentroOperacion: any = '';
  ambulanciaCode: string = '';
  operacionSeleccionada: string = '';
  centroOperacionSeleccionado: string = '';
  // Mapea los estados seleccionados para cada patente
  selectedEstados: { [key: number]: number } = {};
  isLoadingFull: boolean = true;
  Cargado: boolean = false;
  selectedTipoRuta: { [key: string]: string } = {};
  inputRutaAmbulance: { [key: string]: string } = {};
  resetForm() {
    if (this.ambulanceForm) {
      this.ambulanceForm.reset();
    }
  }
  toggleLiveDemo() {
    this.visible = !this.visible;
      
  }

  toggleAmbulance() {
    this.visibleAmbulance = !this.visibleAmbulance;
    
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;
    
  }
  resetForm2() {
    this.form.reset();
  }
  toggleLiveTP() {
    this.visible2 = !this.visible2;
    
  }
  toggleLive3() {
    this.visible3 = !this.visible3;
    
  }
  handleLiveDemoChange2(event: any) {
    this.visible2 = event;
    
  }

  handleLiveDemoChange3(event: any) {
    this.visible3 = event;
    
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.obtenerFechaFormateada();
    this.getModalidades();
    this.getConductores();
    this.getPeonetas();
    this.getEstados();
    this.getTipoRuta();
    this.ingresoDriversPeonetas();
    this.ambulancia();
  }
  obtenerFechaFormateada() {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
    const day = ('0' + fechaActual.getDate()).slice(-2);
    const formattedToday = `${year}-${month}-${day}`;

    this.dateForm.get('date')?.setValue(formattedToday);
    this.formattedDate = `${year}-${month}-${day}`;

    // Set the value of the date input directly using Renderer2
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
      this.renderer.setProperty(dateInput, 'value', formattedToday);
    }
  }

  onDateChange(event: any) {
    const rawDate = event.target.value;
    if (rawDate) {
      const [year, month, day] = rawDate.split('-');

      this.formattedDate = `${year}-${month}-${day}`;
      this.getModalidades();
    }

    
  }

  getModalidades() {
    
    const id_user = sessionStorage.getItem('id')?.toString() + '';
    // const id_user = '130'
    // sessionStorage.getItem('id')?.toString() + '';;
    const fecha = this.formattedDate;
    
    this.Ct.getOperaciones( fecha, id_user).subscribe(
      (data) => {
        this.modalidades = data;
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
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }
  getConductores() {
    const fecha = this.formattedDate
    this.Ct.getConductoresList(fecha).subscribe(
      (data) => {
        this.conductores = data;
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }

  getPeonetas() {
    const fecha = this.formattedDate
    this.Ct.getPeonetaList(fecha).subscribe(
      (data) => {
        this.peonetas = data;
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }

  eliminarPpu(ppu: any) {
    // Llamar a la API para eliminar la razón social por su ID
    this.http
      .delete(`https://hela.transyanez.cl/api/meli/borrar?id_ppu=${ppu}`)
      .subscribe(
        () => {
          // Si la eliminación es exitosa
          this.getModalidades();
          
        },
        (error) => {
          console.error('Error al eliminar la razón social:', error);
        }
      );
  }
  valorIdppu(id: number) {
    const valor = id;
    return valor;
  }

  updateEstado(id: any) {
    const estado = this.selectedEstados[id];
    const fecha = this.formattedDate;

    this.Ct.actualizarEstadoPpu(estado, id, fecha).subscribe(
      (response) => {
        this.getModalidades();
        console.log('Estado actualizado:', response);
        alert('Estado actualizado correctamente.');
      },
      (error) => {
        console.error('Error al actualizar el estado:', error);
        alert('Error al actualizar el estado.');
      }
    );
  }

  updateRutaMeli(id: any) {
    const rutaMeli = (<HTMLInputElement>document.getElementById('rutaMeli'))
      .value;
    const estado = this.selectedEstados[id];
    const fecha = this.formattedDate;

    this.Ct.actualizarRutaMeli(rutaMeli, id, fecha).subscribe(
      (Response) => {
        console.log('estado actualizado', Response);
      },
      (error) => {
        console.error('error al actualizar el estado', error);
      }
    );
  }

  //funcion para ingresar un valor y actualizar mediante la solicitud su estado cada vez que sea
  updateTipoRuta(id: any) {
    const idTipoRuta = this.selectedTipoRuta[id];
    const tipoRuta = (<HTMLInputElement>document.getElementById('tipoRuta'))
      .value;
    const fecha = this.formattedDate;

    this.Ct.actualizarTipoRuta(tipoRuta, id, fecha).subscribe(
      (Response) => {
        console.log('estado actualizado');
      },
      (error) => {
        console.error('error al actualizar el estado', error);
      }
    );
  }

  getPpu(op: any, cop: any) {
    
    const fecha = this.formattedDate;
    this.Ct.getPpu(fecha, op, cop).subscribe(
      (data) => {
        this.patentesList = data;
        this.initializeSelectedEstados();
        this.initializeRutaMeliValues();
        this.initializeTipoRutaValues();
        this.patentesList[data.ruta_meli];
        
      },
      (error) => {
        this.patentesList = []
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }

  initializeSelectedEstados() {
    this.patentesList.forEach((pu) => {
      this.selectedEstados[pu.id_ppu] = pu.estado;
    });
  }
  initializeRutaMeliValues() {
    this.patentesList.forEach((pu) => {
      this.rutaMeliValues[pu.id_ppu] = pu.ruta_meli;
    });
  }
  initializeTipoRutaValues() {
    this.patentesList.forEach((pu) => {
      this.selectedTipoRuta[pu.id_ppu] = pu.tipo_ruta;
      console.log(this.patentesListFiltrada)
      console.log(this.selectedTipoRuta)
    });
  }

  //funcion que trae las patentes para recuperar la id para almacenarlas y usarlas.
  recuperarId(id_op: any, id_cop: any) {
    const id_operacion = id_op;
    const id_centro = id_cop;

    this.getOperacion = id_operacion;
    this.getCentroOperacion = id_centro;
  }

  submitForm(id_ppu: any) {
    // Obtener Valores de sessionStorage
    const id_user = sessionStorage.getItem('id')?.toString() + '';
    const ids_user =
      sessionStorage.getItem('server') +
      '-' +
      sessionStorage.getItem('id') +
      '';
    //Obtener  valores de los campos formularios.
    const id_operacion = this.getOperacion;
    const id_centro_op = this.getCentroOperacion;
    const fecha = this.formattedDate;
    const estado = 0;
    const tipo_ruta = 1
    // Validar campos

    // Crear un objeto FormData y agregar los datos del formulario
    const formData = {
      id_user: id_user,
      ids_user: ids_user,
      fecha: fecha,
      id_ppu: id_ppu,
      id_operacion: id_operacion,
      id_centro_op: id_centro_op,
      tipo_ruta: tipo_ruta,
      estado: estado,
    };

    // Configuracion para la solicitud
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Convertimos el objeto a una cadena JSON
    };
    // llamado al api para entregar el formulario y poster en base de datos
    this.http
      .post('https://hela.transyanez.cl/api/meli/agregarpatente/', formData)
      .subscribe(
        (data) => {
          //mostrar aletar exito
          this.getModalidades();
          alert('El ingreso se ha realizado Correctamente');
        },

        (error) => {
          //MAnejar errores
          console.error('Error al enviar la solicitud', error.error.detail);
          if (error.error.detail.includes('duplicate key')) {
            alert('El nombre de la patente ya existe para el dia de hoy');
          } else {
            alert('Hubo un error al ingresar el dato');
          }
        }
      );
  }

  // para settear el color del fondo del recudro.
  
  //funcion para setear el color de la letra, dependiendo del getColor
  getColorLetra(Color: Number): string {
    
    if (Color == 0) {
      return 'black'; //
    } else if (Color == 1) {
      return 'white'; //
    } else if (Color == 2) {
      return 'white'; //
    } else if (Color == 3) {
      return 'black';
    } else {
      return 'No se encuentra el color';
    }
  }
  getRecargarPatentesCitaciones(){
    const fecha = this.formattedDate;
    const id_operacion = this.getOperacion 
    const id_cop = this.getCentroOperacion
    this.Ct.getPatenteCitacion(id_operacion, id_cop, fecha).subscribe(
      (data) => {
        this.patentesList2 = data;
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }

  getRecuperarPatentesCitaciones(id_operacion: number, id_cop: number) {
    this.isLoadingFull = true;
    this.Cargado = false;
    const fecha = this.formattedDate;
    
    if (id_operacion && id_cop) {
    } else {
      console.error('no se ha encontrado uno o ambos elementos');
    }
    this.Ct.getPatenteCitacion(id_operacion, id_cop, fecha).subscribe(
      (data) => {
        this.patentesList2 = data;
        this.TipoRutaImagen = data[1].tipo_ruta
        this.isLoadingFull = false;
        this.Cargado = true;
      },
      (error) => {
        this.isLoadingFull = false;
        this.Cargado = true;
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }

  getCOPfiltrado(op: any) {
    this.Ct.getCopFiltrado(op).subscribe((data) => {
      this.CopFiltrado = data;
    });
  }
  onChangeOperacion(event: any) {
    this.operacionSeleccionada = event.target.value;
  }
  onChangeCentroOperacion(event: any) {
    this.centroOperacionSeleccionado = event.target.value;
  }
  

  getRecargaPatentesFiltradasPorOpyCop(){
    const fecha = this.formattedDate;
    const id_operacion = this.getOperacion;
    const id_centro_op = this.getCentroOperacion
    this.Ct.getpatentesFiltradas(id_operacion, id_centro_op).subscribe(
      (data) => {
        this.patentesListFiltrada = data;
      });
  }

  getPatentesFiltradasPorOpyCop(id_operacion: number, id_centro_op: number) {
    this.isLoadingFull = true
    this.Cargado = false
    this.Ct.getpatentesFiltradas(id_operacion, id_centro_op).subscribe(
      (data) => {
        this.patentesListFiltrada = data;
        this.isLoadingFull = false;
        this.Cargado = true
        
      }, error => {
        this.isLoadingFull = false;
        this.Cargado = true;
      }
    );

    this.getPpu(id_operacion, id_centro_op);
  }

  getTipoRuta() {
    this.Ct.getTipoRuta().subscribe((data) => {
      this.dataTipoRuta = data;
    });
  }
  

  recuperarIdEstado(id_cop: number, estado: number) {
    const id_centro_op = id_cop;
    const estado_ = estado;

    this.id_count = id_centro_op;
    this.estado_count = estado_;
  }


  recuperarIdPpu(id: number) {
    this.IdPpuRecuperada = id;
  }
  
  initializeAmbulanceCode(): void {
    this.Ct.GetAmbulanciaCode().subscribe((data)=> {
      this.ambulanciaCode = data[0].genera_codigo_ambulancia
      console.log(this.ambulanciaCode)
    })
    
  }
  ambulancia() {
    const fecha = this.formattedDate;
    const rutaAmbulanceInterna = this.ambulanciaCode;
    const ppuAmbulance = this.input1;
    const rutaAmbulance = this.input2;
    const id_ppu = this.IdPpuRecuperada;

    
    this.Ct.ingresarAmbulancia(
      ppuAmbulance,
      id_ppu,
      fecha,
      rutaAmbulance,
      rutaAmbulanceInterna
    ).subscribe(
      (Response) => {
        this.resetForm();
      },
      (error) => {
      }
    );
  }

  
  ingresoDriversPeonetas(){
    const fecha = this.formattedDate
    const id_conductor = this.conductores2
    const id_peoneta = this.peonetas2
    const id_ppu_ingreso = this.IdPpuRecuperada

    this.Ct.ingresarDriversPeoneta(id_conductor,id_peoneta,fecha,id_ppu_ingreso).subscribe(
      (response) => {
        this.conductores2 = ""
        this.peonetas2 = ""
        this.IdPpuRecuperada = 0
        this.getConductores()
        this.getPeonetas() 
      },
      (error) => {
        console.error('error al actualizar el estado', error);
      }
    );
  }
  getColor(id_ppu: number): string { 
    const fecha = this.formattedDate
    this.Ct.getTipoRutaColor(id_ppu,fecha).subscribe((data) => {
      this.dataTipoRutaColor = data[0].tipo_ruta;
    });
    if (this.dataTipoRutaColor == 0) {
      return '#B8B8B8'; // 
    } else if (this.dataTipoRutaColor == 1) {
      return '#04BD41'; // 
    } else if (this.dataTipoRutaColor== 2) {
      return '#F52822'; // 
    } else if(this.dataTipoRutaColor == 3){
      return  '#ecab0f';
    } else {
      return 'No se encuentra el color'
    }
  }

}