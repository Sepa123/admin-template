import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit,Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, skipUntil, startWith, switchMap } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CitacionesService} from '../../../service/citaciones.service'
import { NgForm } from '@angular/forms'
import { FormsModule } from '@angular/forms';
// import { id } from 'date-fns/locale';
import { getStyle } from '@coreui/utils';
import { FormModule } from '@coreui/angular';
import { PanelCitacion } from '../../../models/meli/citacion.interface'



@Component({
  selector: 'app-citaciones',
  templateUrl: './citaciones.component.html',
  styleUrls: ['./citaciones.component.scss','./citaciones2.component.scss','./citaciones3.component.scss','./citaciones4.component.scss'],
})
export class CitacionesComponent implements OnInit  {
  
  @ViewChild('ambulanceForm') ambulanceForm: NgForm | undefined;
  ppuSeleccionada!: string;
  operacionValue: number = 0;
  centroOperacionValue: number = 0;
  dateForm: FormGroup;
  conteoingresados: any;
  conteoConfirmadas: any;
  id_count: any;
  estado_count: any;
  public conductores2: string | null = null;
  peonetas2: any = '';
  patentesEncontradas: any = '';
  input1: any;
  input2: any;
  input3: any;
  IdPpuRecuperada: number = 0;
  selectedPatente: string;
  conteoIngresadosHtml: any;
  dataTipoRutaColor: any;
  TipoRutaImagen: any;
  RutaList: any;
  minDate: string = '';
  opRecuperada: number = 0;
  CopRecuperada: number = 0;
  infoAmbulancia: any;
  visible4: any;

  numeroTelefono!: string;
  driverSeleccionado!: string;
  peonetaSeleccionada!: string;
  id_p!: string;
  id_u: any;
  digitoConductor!: number;
  digitoPeoneta!: number;
  id_driver!: number;
  id_peoneta!: number;

  panelCitacion : PanelCitacion = {
    "Total": 0,
    "Confirmado": 0,
    "Pendiente": 0,
    "No_Confirma": 0
}

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private Ct: CitacionesService,
    private renderer: Renderer2,
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
  modalidades2: any[] = [];
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
  rutaMeliValuesAmb: { [key: number]: string } = {};
  rutaMeliText: { [key: string]: string } = {};
  mensaje: string | null = null;
  mensajeClass: string | null = null;
  formattedDate: string = '';
  getOperacion: any = '';
  getCentroOperacion: any = '';
  ambulanciaCode: string = '';
  operacionSeleccionada: string = '';
  centroOperacionSeleccionado: string = '';
  // Mapea los estados seleccionados para cada patente
  selectedEstados: { [key: string]: string } = {};
  isLoadingFull: boolean = true;
  Cargado: boolean = false;
  selectedTipoRuta: { [key: string]: string } = {};
  inputRutaAmbulance: { [key: string]: string } = {};
  newRutaMeli: number = 0;
  rutaMeliSeleccionada: string = '';
  idPpuSeleccionado: string = '';
  selectedPatenteId : string ='';
  //datos geo
  latitude!: number
  longitud! :number
  latStr!: string
  longStr!: string
  tooltipVisible: boolean = false; // Estado del tooltip
  
  resetForm() {
    if (this.ambulanceForm) {
      this.ambulanceForm.reset();
    }
  }
  toggleLiveDemo() {
    this.visible = !this.visible;

    if (!this.visible) {
      this.resetModalContent();
    }
      
  }
  public selectedConductores: { [key: string]: string } = {}; // Mapeo de id -> nombre
  public selectedPeonetas: { [key: string]: string } = {};
  recuperarDatosConductor(id: number, id_p: number): void {
  
    this.id_driver = id;
    this.id_peoneta = id_p;
    

  }
  cargadedatos(): void {
    // Procesar conductores
    // console.log('Contenido de conductores:', this.conductores);
    const valorId = this.id_driver;
    // console.log('id que recupera función (conductor):', valorId);
    
    // Reinicializamos el objeto de mapeo para conductores
    this.selectedConductores = {};
    this.conductores.forEach((c) => {
      this.selectedConductores[c.id.toString()] = c.nombre_completo;
      // console.log('Conductor:', c.nombre_completo);
    });
    // console.log('Claves en selectedConductores:', Object.keys(this.selectedConductores));
    
    if (this.selectedConductores[valorId.toString()]) {
      // Asigna el valor recibido (convertido a string)
      this.conductores2 = valorId.toString();
      // console.log('Selected conductor ID:', valorId);
    } else {
      // Asigna el valor por defecto para que se muestre "Seleccione Conductor"
      this.conductores2 = null;
    }
    // console.log('Selected conductor ID final:', this.conductores2);
  
    // Procesar peonetas
    // console.log('Contenido de peonetas:', this.peonetas);
    const valorIdPeoneta = this.id_peoneta;
    // console.log('id que recupera función (peoneta):', valorIdPeoneta);
    
    // Reinicializamos el objeto de mapeo para peonetas
    this.selectedPeonetas = {};
    this.peonetas.forEach((p) => {
      this.selectedPeonetas[p.id.toString()] = p.nombre_completo;
      // console.log('Peoneta:', p.nombre_completo);
    });
    // console.log('Claves en selectedPeonetas:', Object.keys(this.selectedPeonetas));
    
    if (this.selectedPeonetas[valorIdPeoneta.toString()]) {
      // Asigna el valor recibido
      this.peonetas2 = valorIdPeoneta.toString();
      // console.log('Selected peoneta ID:', valorIdPeoneta);
    } else {
      // Asigna el valor por defecto para que se muestre "Seleccione Peoneta"
      this.peonetas2 = "";
    }
    // console.log('Selected peoneta ID final:', this.peonetas2);
  }
  
  
  
    


  onConductorChange(): void {
    // Suponiendo que conductores2 ya contiene el id seleccionado (como número o string)
    this.numeroTelefono = ''; // Reiniciar el número de teléfono
    const selectedId = this.conductores2 ? this.conductores2.toString() : '';
    // console.log('ID del conductor seleccionado (ngModel):', selectedId);
  
    const selectedConductor = this.conductores.find(
      conductor => conductor.id.toString() === selectedId
    );
    
    if (selectedConductor) {
      this.numeroTelefono = selectedConductor.celular_formateado;
      // console.log('Número de teléfono:', this.numeroTelefono);
    } else {
      // console.log('Conductor no encontrado');
    }
  }
  
  copyToClipboard(text: string): void {
    // console.log('Copiando al portapapeles:', text); // Registro de depuración
    navigator.clipboard.writeText(text).then(() => {
      this.mostrarAlerta(' Se ha extraido el texto correctamente', 'success');
    }).catch(err => {
      this.mostrarAlerta('Error al copiar', 'error');
    });
  }

  toggleAmbulance() {
    this.visibleAmbulance = !this.visibleAmbulance;
    
    
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;

    if (!event) {
      this.resetModalContent2();  // Reinicia el contenido cuando se cierra el modal
    }
  }
  resetForm2() {
    this.form.reset();
  }
  toggleLiveTP() {
    this.visible2 = !this.visible2;
    if (!this.visible2) {
      this.resetPpuSelected();
    }
  }
  toggleLive3() {
    // Cambia la visibilidad del modal
    this.visible3 = !this.visible3;
  
    // Si el modal se está cerrando, reiniciar las variables y el contenido relacionado con la función getPpu
    if (!this.visible3) {
      this.resetModalContent();
    }
  }

  

  resetPpuSelected(){
    this.conductores = [];
    this.peonetas = [];
    this.conductores2 = null;
    this.peonetas2 = '';
  }
  resetModalContent() {
    this.patentesList = []; // Reiniciar la lista de patentes
  }

  resetModalContent2() {
    this.patentesFiltradas = []; // Reiniciar la lista de patentes
  }
  resetModalContent3() {
    this.patentesFiltradasDetalle = []; // Reiniciar la lista de patentes
  }
  handleLiveDemoChange2(event: any) {
    this.visible2 = event;
    
  }

  
  recuperarPpu(ppu: string, id:string, Id_d: any): void {
    this.ppuSeleccionada = ppu;
    this.id_p = id
    this.id_u = Id_d
     // Para verificar que el valor se almacena correctamente
    this.getConductores();
    // console.log(this.id_u);
  }
  handleLiveDemoChange3(event: boolean) {
    this.visible3 = event;
  
    if (!event) {
      this.resetModalContent3();  // Reinicia el contenido cuando se cierra el modal
    }
  }
  handleLiveDemoChange4(event: any) {
    this.visible4 = event;
    
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
    // this.getConductores();
    // this.getPeonetas();
    this.getEstados();
    this.getTipoRuta();
    this.initializeAmbulancia();

    setTimeout(() => {
      this.Ct.getPanelCitaciones(this.formattedDate).subscribe((data) => {
        this.panelCitacion = data
      })
    }, 500);
  
  }

  patentesFiltradas = [...this.patentesList2]; // Inicialmente todas las patentes

  buscarPatente(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const valorBusqueda = inputElement.value.trim().toLowerCase();
  this.isLoadingFull = true;
  this.patentesFiltradas = this.patentesList2.filter(patente => {
    return (
      patente.ppu?.toLowerCase().includes(valorBusqueda)
      // patente.razon_social?.toLowerCase().includes(valorBusqueda) ||
      // patente.tipo?.toString().includes(valorBusqueda) ||
      // patente.colaborador_id?.toString().includes(valorBusqueda) ||
      // patente.tripulacion?.toLowerCase().includes(valorBusqueda)
      
    );
    
  });
  // console.log(this.patentesFiltradas);
}

patentesFiltradasDetalle = [...this.patentesList];

buscarPatenteDetalle(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const valorBusqueda = inputElement.value.trim().toLowerCase();

  this.patentesFiltradasDetalle = this.patentesList.filter(patente => {
    return (
      patente.ppu?.toLowerCase().includes(valorBusqueda)
      // patente.razon_social?.toLowerCase().includes(valorBusqueda) ||
      // patente.tipo?.toString().includes(valorBusqueda) ||
      // patente.colaborador_id?.toString().includes(valorBusqueda) ||
      // patente.tripulacion?.toLowerCase().includes(valorBusqueda)
    );
  });
}
  obtenerFechaFormateada() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.formattedDate = `${year}-${month}-${day}`;
    this.minDate = this.formattedDate;
    
    // Inicializa el valor del campo de fecha y la fecha mínima permitida
    this.dateForm.get('date')?.setValue(this.formattedDate);
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
      this.renderer.setProperty(dateInput, 'value', this.formattedDate);
    }
  }

  onDateChange(event: any) {
    const rawDate = event.target.value;
    if (rawDate) {
      const selectedDate = new Date(rawDate);
      const today = new Date(this.formattedDate);
      if (selectedDate < today) {
        // Si se selecciona una fecha anterior, restablece al valor mínimo permitido (fecha actual)
        this.formattedDate = rawDate
        this.getModalidades(); // Llama a getModalidades con la fecha actual
        this.Ct.getPanelCitaciones(this.formattedDate).subscribe((data) => {
          this.panelCitacion = data
        })
      } else {
        // Actualiza this.formattedDate antes de llamar a getModalidades
        this.formattedDate = rawDate;
        this.getModalidades();
        this.Ct.getPanelCitaciones(this.formattedDate).subscribe((data) => {
          this.panelCitacion = data
        })
      }
    }
  }

  getModalidades() {
    
    // const id_user = '130'
    const id_user =  sessionStorage.getItem('id')?.toString() + '';
    // sessionStorage.getItem('id')?.toString() + '';;
    const fecha = this.formattedDate;
    
    this.Ct.getOperaciones( fecha, id_user).subscribe(
      (data) => {
        this.modalidades = data;
        this.OperacionesFiltradas = data
      },
      (error) => {
        this.mostrarAlerta(' No se han encontrado patentes', 'error');
      }
    );
  }

  OperacionesFiltradas = [...this.modalidades];

  buscarOperaciones(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const valorBusqueda = inputElement.value.trim().toLowerCase();
    // console.log("Valor de búsqueda:", valorBusqueda); // Verifica el valor

    this.OperacionesFiltradas = this.modalidades.filter(operacion => {
        return (
            operacion.operacion?.toLowerCase().includes(valorBusqueda) ||
            operacion.nombre_cop?.toLowerCase().includes(valorBusqueda)
            
        );
    });


    if (this.OperacionesFiltradas.length == 0) {
      this.panelCitacion = {
          "Total": 0,
          "Confirmado": 0,
          "Pendiente": 0,
          "No_Confirma": 0
      }
    } else {
      this.panelCitacion.Total = this.OperacionesFiltradas.map(op => op.citacion).reduce((ant,act) => {
        return ant + act
      }) 

      this.panelCitacion.Confirmado = this.OperacionesFiltradas.map(op => op.confirmados).reduce((ant,act) => {
        return ant + act
      })


      this.panelCitacion.Pendiente = this.OperacionesFiltradas.map(op => op.pendientes).reduce((ant,act) => {
        return ant + act
      })


      this.panelCitacion.No_Confirma = this.OperacionesFiltradas.map(op => op.rechazadas).reduce((ant,act) => {
        return ant + act
      })

  
      // console.log(this.OperacionesFiltradas.map(op => op.confirmados).reduce((ant,act) => {
      //   return ant + act
      // }))
    }
    // console.log("Operaciones filtradas:", this.OperacionesFiltradas); // Verifica el resultado
}


  getEstados() {
    this.Ct.getEstadoList().subscribe(
      (data) => {
        this.estados = data;
      },
      (error) => {
        this.mostrarAlerta(' Error al obtener los estados', 'error');
      }
    );
  }
  getConductores() {
    const id_ppuC = this.id_p
    this.Ct.getConductoresList(id_ppuC).subscribe(
      (data) => {
        this.conductores = data.filter((item: any) => item.tipo_usuario === 1);
        this.peonetas = data.filter((item: any) => item.tipo_usuario === 2);
        this.cargadedatos();
        this.onConductorChange();
      },
      (error) => {
        this.mostrarAlerta('No hay Conductor designado para esta patente', 'error');
      }
    );
  }

  // getPeonetas() {
  //   const fecha = this.formattedDate
  //   this.Ct.getPeonetaList(fecha).subscribe(
  //     (data) => {
  //       this.peonetas = data;
  //     },
  //     (error) => {
  //       this.mostrarAlerta(' Error al obtener peonetas', 'error');        
  //     }
  //   );
  // }
  
  colorPunto(tipoRuta: any, estado:any) {
    // Aquí debes implementar la lógica para determinar el color
    // Basado en el valor seleccionado y el ID de la base de datos
    if (tipoRuta == 1 && estado == 5) {
      return {
        'background-color':'#87CEEB',
        'animation-duration': '0s',
        

      };
    } else if (tipoRuta == 2  && estado != 5) {
      return {
        'background-color':'#87CEEB',
        'animation-duration': '0s'
      };
    } else if (tipoRuta == 3 && estado != 5){
      return {
        'background-color':'Black',
        'animation-duration': '0s'

      };
    }
    else if (tipoRuta == 4 && estado != 5 ){
      return {
        'background-color':'red',
        
      };
    }else if (tipoRuta == 5 && estado != 5){
      return {
        'background-color':'#87CEEB',
      };
    }else{
      return {'background-color':'green',
        'animation-duration': '0s'

      };
    }
  }
  getStyles(value: number): { [key: string]: string } {
    if (value == 4) {
      return {
        'animation-name': 'parpadeo',
        'animation-duration': '1s',
        'animation-timing-function': 'linear',
        'animation-iteration-count': 'infinite',

        '-webkit-animation-name':'parpadeo',
        '-webkit-animation-duration': '1s',
        '-webkit-animation-timing-function': 'linear',
        '-webkit-animation-iteration-count': 'infinite',
      };
    } else if (value == 5) {
      return {
        'animation-name': 'parpadeo',
        'animation-duration': '1s',
        'animation-timing-function': 'linear',
        'animation-iteration-count': 'infinite',

        '-webkit-animation-name':'parpadeo',
        '-webkit-animation-duration': '1s',
        '-webkit-animation-timing-function': 'linear',
        '-webkit-animation-iteration-count': 'infinite',
      };
    } else {
      return {};
    }
  }
  eliminarPpu(ppu: any, ) {
    // Llamar a la API para eliminar la razón social por su ID
    // https://hela.transyanez.cl/api/meli/borrar?id_ppu
    const fecha = this.formattedDate

    this.http
      .delete(`https://hela.transyanez.cl/api/meli/borrar?id_ppu=${ppu}&fecha=${fecha}`)
      .subscribe(
        (response) => {
          // Si la eliminación es exitosa
          this.getModalidades();
          this.getPatentesFiltradasPorOpyCop(this.opRecuperada, this.CopRecuperada)
          this.bitacoraUpdate('Se elimino la patente ' + ppu, 'citacion-Mercadolibre')
          this.mostrarAlerta(' La patente '+ ppu + ' se ha eliminado correctamente ', 'success');
        },
        (error) => {
          this.mostrarAlerta(' Error al eliminar la patente', 'error');
        }
      );
  }
  valorIdppu(id: number) {
    const valor = id;
    return valor;
  }
  preventTyping(event: KeyboardEvent) {
    event.preventDefault();
  }
  updateEstado(id: string, event: Event) {
    const fecha = this.formattedDate
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedValue = target.value;
  
      this.selectedEstados[id] = selectedValue;
  
      this.Ct.actualizarEstadoPpu(selectedValue, id, fecha).subscribe(
        (Response) => {
          this.getModalidades();
          this.bitacoraUpdate('Se cambio el estado de la patente '+ id + ' a ' + selectedValue, 'citacion-Mercadolibre')
          this.mostrarAlerta(' El cambio de estado se ha realizado correctamente', 'success');

        },
        (error) => {
          this.mostrarAlerta(' Error al actualizar el estado', 'error');
        }
      );
    }
  }
 
  
  updateRutaMeli(id: any, inputElement: HTMLInputElement) {
    const rutaMeliAntiguo = this.rutaMeliText[id];

    const rutaMeli = inputElement.value;
    const fecha = this.formattedDate;

    this.rutaMeliText[id] = rutaMeli;
    // Llama a validacionRutaMeli y realiza la validación dentro de su callback
        this.Ct.actualizarRutaMeli(rutaMeli, id, fecha).subscribe(
          (Response) => {
            this.getModalidades();
            this.bitacoraUpdate(`Se ha cambiado la ruta de ${rutaMeliAntiguo} a ${rutaMeli} para la patente con id: ${id}`, 'citacion-Mercadolibre');
            this.mostrarAlerta(' El cambio de ruta se ha realizado correctamente', 'success');
          },
          (error) => {
            this.mostrarAlerta(' Error al actualizar la ruta', 'error');
          }
        );
  }

  //funcion para ingresar un valor y actualizar mediante la solicitud su estado cada vez que sea
  updateTipoRuta(id : string, event: Event) {
    const fecha = this.formattedDate
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedValue = target.value;

      this.selectedTipoRuta[id] = selectedValue;

      this.Ct.actualizarTipoRuta(selectedValue,id,fecha).subscribe(
        (Response) => {
          alert('El cambio se ha realizado correctamente.')
          this.getModalidades();
          this.bitacoraUpdate(`Se ha cambiado el tipo de ruta a ${selectedValue} en la patente: ${id}`, 'citacion-Mercadolibre');
        },
        (error) => {
          alert('Error al actualizar el estado')
        }
      );
    }
  }

  getPpu(op: any, cop: any) {
    
    const fecha = this.formattedDate;
    this.Ct.getPpu(fecha, op, cop).subscribe(
      (data) => {
        this.patentesList = data;
        this.patentesFiltradasDetalle = data;
        this.isLoadingFull = false;
        this.initializeSelectedEstados();
        this.initializeRutaMeliValues();
        this.initializeTipoRutaValues();
        
        
      },
      (error) => {
        this.mostrarAlerta(' No hay patentes registradas.', 'error');
        this.toggleLive3()
      }
    );
  }

  initializeSelectedEstados() {
    this.patentesList.forEach((pu) => {
      this.selectedEstados[pu.id] = pu.estado;
    });
  }
  initializeAmbulancia() {
    this.patentesList.forEach((pu) => {
      this.rutaMeliValuesAmb[pu.id_ppu_amb] = pu.ruta_meli;
    });
  }

  initializeRutaMeliValues() {
    this.patentesList.forEach((pu) => {
      this.rutaMeliValues[pu.id] = pu.ruta_meli;
    });
  }
  initializeTipoRutaValues() {
    this.patentesList.forEach((pu) => {
      this.selectedTipoRuta[pu.id] = pu.tipo_ruta;
      
    });
  }

  //funcion que trae las patentes para recuperar la id para almacenarlas y usarlas.
  recuperarId(id_op: any, id_cop: any) {
    const id_operacion = id_op;
    const id_centro = id_cop;

    this.getOperacion = id_operacion;
    this.getCentroOperacion = id_centro;
  }

  submitForm(id_ppu: any, ppu: any) {
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
      .post('https://hela.transyanez.cl/api/meli/agregarpatente', formData)
      .subscribe(
        (data) => {
          //mostrar aletar exito
          this.getModalidades();
          this.getRecargarPatentesCitaciones();
          this.bitacoraUpdate('Se ha agregado la patente ' + id_ppu, 'citacion-Mercadolibre')
          this.mostrarAlerta(' La patente ' + ppu +' se ha ingresado correctamente ' , 'success');
          },

        (error) => {
          //MAnejar erroress
          this.mostrarAlerta(' Error al ingresar la patente', 'error');
          if (error.error.detail.includes('duplicate key')) {
            this.mostrarAlerta(' La patente ya se encuentra registrada.', 'error');
          } else {
            this.mostrarAlerta(' Error al ingresar la patente', 'error');
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
    this.isLoadingFull = true;

    this.Ct.getPatenteCitacion(id_operacion, id_cop, fecha).subscribe(
      (data) => {
        if (data && data.length > 0){
        this.patentesFiltradas = data;
      }else{
        this.mostrarAlerta(' No se encontraron patentes citadas', 'warning');
        this.patentesFiltradas = []; // Limpiar la lista si no hay datos
      }
        this.isLoadingFull = false;

      },
      (error) => {
        this.mostrarAlerta(' Error al obtener las patentes citadas', 'error');
      }
    );
  }

  getRecuperarPatentesCitaciones(id_operacion: number, id_cop: number) {
    this.isLoadingFull = true;
    const fecha = this.formattedDate;
    
    if (id_operacion && id_cop) {
    } else {
      this.mostrarAlerta(' Error al obtener las patentes citadas', 'error');
    }
    this.Ct.getPatenteCitacion(id_operacion, id_cop, fecha).subscribe(
      (data) => {
        if (data && data.length > 0){
          this.patentesList2 = data;
          this.patentesFiltradas = data;
          this.TipoRutaImagen = data[1].tipo_ruta
        }else{
          this.mostrarAlerta(' No se encontraron patentes citadas', 'warning');
          this.patentesFiltradas = []; // Limpiar la lista si no hay datos
        }
          this.isLoadingFull = false
      },
      (error) => {
        this.mostrarAlerta(' Error al obtener las patentes citadas', 'error');
        this.isLoadingFull = false
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
        this.isLoadingFull = false;

      });
  }

  getPatentesFiltradasPorOpyCop(id_operacion: number, id_centro_op: number) {
    this.isLoadingFull = true
    
    this.Ct.getpatentesFiltradas(id_operacion, id_centro_op).subscribe(
      (data) => {
        this.patentesListFiltrada = data;
        this.isLoadingFull = false;
        
        
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

  recuperarOpCopAMB(id: number, cop:number) {
    this.opRecuperada = id;
    this.CopRecuperada = cop;
  }
  
  initializeAmbulanceCode(): void {
    this.Ct.GetAmbulanciaCode().subscribe((data)=> {
      this.ambulanciaCode = data[0].genera_codigo_ambulancia
    })
    
  }

  
  ingresoDriversPeonetas(){
    const fecha = this.formattedDate
    const id_conductor = this.conductores2
    const id_peoneta = this.peonetas2
    const id_ppu_ingreso = this.IdPpuRecuperada

    this.Ct.ingresarDriversPeoneta(id_conductor,id_peoneta,fecha,id_ppu_ingreso).subscribe(
      (response) => {
        this.conductores2 = null
        this.peonetas2 = ""
        this.IdPpuRecuperada = 0
        this.getConductores()
        // this.getPeonetas() 
      },
      (error) => {
        this.mostrarAlerta(' Error al ingresar los datos', 'error');
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

  getLocation(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      // console.log("Localización no disponible");
    }
  }

  showPosition(position: any): any{
    this.latitude = position.coords.latitude
    this.longitud= position.coords.longitude 
    
    this.latStr = this.latitude.toString()
    this.longStr = this.longitud.toString()

    // console.log("Longitud : " , this.longStr, "latitud :", this.latStr)
}
getLocationAsync(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, (error) => {
        reject(error);
      });
    } else {
      reject("Localización no disponible");
    }
  });
}

ingresarDatosAmbulancia(){
  const fecha = this.formattedDate
  const ruta_amb_interna = this.ambulanciaCode
  const id_ppu = this.idPpuSeleccionado
  const id_ruta_meli = this.rutaMeliSeleccionada
  const id_ppu_amb = this.IdPpuRecuperada

    this.Ct.postData(ruta_amb_interna, id_ppu, fecha,id_ppu_amb,id_ruta_meli).subscribe(
        (responde)=>{
          this.mostrarAlerta (' Se ha ingresado correctamente la ambulancia', 'success')
        },
        (error) => {
          this.mostrarAlerta(' Error al ingresar la ambulancia', 'error');
        }
      )
  }

 

getInfoAMB(){

  const fecha = this.formattedDate
  const id = this.IdPpuRecuperada
  const op = this.opRecuperada
  const cop = this.CopRecuperada

  this.Ct.infoAMB(fecha,op,cop,id).subscribe((data)=> {
    this.infoAmbulancia = data
  })
}
onSelectChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const selectedOption = selectElement.options[selectElement.selectedIndex];

  // Capturando el id_ppu seleccionado
  this.idPpuSeleccionado = selectElement.value;

  // Intentar obtener el valor de data-id-ruta
  const rutaMeli = selectedOption ? selectedOption.getAttribute('data-id-ruta') : '';

  // Si rutaMeli es null o una cadena vacía, asignar 'S/I de ruta'
  this.rutaMeliSeleccionada = rutaMeli ? rutaMeli : 'S/i de ruta';
}

// Llamar a esta función cuando el modal se abra


bitacoraUpdate(modificacion: string, origen: string){
  const id_user = sessionStorage.getItem('id')?.toString() + '';
  const ids_user =
      sessionStorage.getItem('server') +
      '-' +
      sessionStorage.getItem('id') +
      '';
  const latitud  =  this.latStr 
  const longitud = this.longStr

  this.Ct.Bitacora(id_user, ids_user,modificacion,latitud,longitud,origen ).subscribe(
    (responde)=>{
      // console.log('Se ha ingresado correctamente la bitacora', responde)
    },
    (error) => {
      // this.mostrarAlerta('Error al ingresar la bitacora', 'error');
    }
  )

}

mostrarAlerta(mensaje: string, tipo: 'success' | 'error' | 'warning'): void {
  // Crear un div para la alerta
  const alerta: HTMLDivElement = document.createElement('div');
  alerta.classList.add('alerta', tipo); // Añadir clase para tipo (success, error, warning)

  // Elegir icono basado en el tipo
  const icono: HTMLElement = document.createElement('i');
  switch (tipo) {
    case 'success':
      icono.classList.add('fas', 'fa-check-circle'); // Icono de éxito
      alerta.style.backgroundColor = 'rgba(40, 167, 69, 0.9)'; // Verde
      alerta.style.borderRadius = '10px';
      alerta.style.padding = '7px'; // Aumentar el padding
      break;
    case 'error':
      icono.classList.add('fas', 'fa-times-circle'); // Icono de error
      alerta.style.backgroundColor = '#dc3545'; // Rojo
      alerta.style.borderRadius = '10px';
      alerta.style.padding = '7px'; // Aumentar el padding
      break;
    case 'warning':
      icono.classList.add('fas', 'fa-exclamation-triangle'); // Icono de advertencia
      alerta.style.backgroundColor = '#ffc107'; // Amarillo
      alerta.style.borderRadius = '10px';
      alerta.style.padding = '7px'; // Aumentar el padding
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

makePhoneCall(phoneNumber: string): void {
  const fullPhoneNumber = `${phoneNumber}`;
  // console.log('Intentando llamar al número:', fullPhoneNumber); // Registro de depuración
  const isWindows = navigator.platform.indexOf('Win') > -1;
  if (isWindows) {
    alert('Esta opción no está disponible en Windows.');
  } else {
    window.location.href = `tel:${fullPhoneNumber}`;
  }
}
}