import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit,Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, skipUntil, startWith, switchMap } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CitacionesService} from '../../../service/citaciones.service'
import { NgForm } from '@angular/forms'
// import { id } from 'date-fns/locale';
import { getStyle } from '@coreui/utils';




@Component({
  selector: 'app-citaciones',
  templateUrl: './citaciones.component.html',
  styleUrls: ['./citaciones.component.scss','./citaciones2.component.scss','./citaciones3.component.scss'],
})
export class CitacionesComponent implements OnInit  {
  
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
    // Cambia la visibilidad del modal
    this.visible3 = !this.visible3;
  
    // Si el modal se está cerrando, reiniciar las variables y el contenido relacionado con la función getPpu
    if (!this.visible3) {
      this.resetModalContent();
    }
  }

  resetModalContent() {
    this.patentesList = []; // Reiniciar la lista de patentes
  }
  handleLiveDemoChange2(event: any) {
    this.visible2 = event;
    
  }

  handleLiveDemoChange3(event: boolean) {
    this.visible3 = event;
  
    if (!event) {
      this.resetModalContent();  // Reinicia el contenido cuando se cierra el modal
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
    this.getConductores();
    this.getPeonetas();
    this.getEstados();
    this.getTipoRuta();
    this.initializeAmbulancia();
    
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
      } else {
        // Actualiza this.formattedDate antes de llamar a getModalidades
        this.formattedDate = rawDate;
        this.getModalidades();
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
  eliminarPpu(ppu: any) {
    // Llamar a la API para eliminar la razón social por su ID
    this.http
      .delete(`https://hela.transyanez.cl/api/meli/borrar?id_ppu=${ppu}`)
      .subscribe(
        (response) => {
          // Si la eliminación es exitosa
          this.getModalidades();
          this.getPatentesFiltradasPorOpyCop(this.opRecuperada, this.CopRecuperada)
          this.bitacoraUpdate('Se elimino la patente ' + ppu, 'citacion-Mercadolibre')
          console.log('Se ha eliminado correctamente', response);
          alert('Eliminado correctamente ${ppu}');
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
          console.log('Estado actualizado', Response);
          alert('El estado se ha actualizado correctamente.');
          

        },
        (error) => {
          console.error('Error al actualizar el estado', error);
          alert('Ha ocurrido un error al actualizar el estado.');
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
            console.log('Estado actualizado', Response);
            this.getModalidades();
            this.bitacoraUpdate(`Se ha cambiado la ruta de ${rutaMeliAntiguo} a ${rutaMeli} para la patente con id: ${id}`, 'citacion-Mercadolibre');
          },
          (error) => {
            console.error('Error al actualizar el estado', error);
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
        this.initializeSelectedEstados();
        this.initializeRutaMeliValues();
        this.initializeTipoRutaValues();
        
        
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
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
      .post('https://hela.transyanez.cl/api/meli/agregarpatente', formData)
      .subscribe(
        (data) => {
          //mostrar aletar exito
          this.getModalidades();
          this.getRecargarPatentesCitaciones();
          this.bitacoraUpdate('Se ha agregado la patente ' + id_ppu, 'citacion-Mercadolibre')
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

  getLocation(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
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
          alert('se han ingresado correctamente la ambulancia');
        },
        (error) => {
            console.error('error al actualizar el estado', error);
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
    },
    (error) => {
        console.error('error al actualizar el estado', error);
      }
  )

}
}