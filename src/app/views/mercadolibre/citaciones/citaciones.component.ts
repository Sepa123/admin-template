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
  operacionValue: number = 0
  centroOperacionValue: number = 0

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private Ct : CitacionesService,
    
  ){}
  
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
  dataTipoRuta: any[] = [];
  patentesList : any[] = [];
  patentesList2 : any[] = [];
  patentesListFiltrada : any[] = [];
  CopFiltrado: any []= [];
  selectedItem: any = null;
  rutaMeliValues: { [key: number]: string } = {};
  mensaje: string | null = null;
  mensajeClass: string | null = null;

  operacionSeleccionada: string = '';
  centroOperacionSeleccionado: string = '';
  // Mapea los estados seleccionados para cada patente
  selectedEstados: { [key: number]: number } = {};

  selectedTipoRuta:{ [key: number]: number } = {};

  
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
    this.getTipoRuta();
    
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
    const fecha = this.obtenerFechaFormateada()
    
    this.Ct.actualizarEstadoPpu(estado, id, fecha).subscribe(
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
    const fecha = this.obtenerFechaFormateada()

    this.Ct.actualizarRutaMeli(rutaMeli, id, fecha).subscribe(
      Response =>{
        console.log('estado actualizado', Response);
      },
      error =>{
        console.error('error al actualizar el estado', error)
      }
    )
  }
 
  //funcion para ingresar un valor y actualizar mediante la solicitud su estado cada vez que sea
  updateTipoRuta(id : any){
    const idTipoRuta = this.selectedTipoRuta[id]
    const tipoRuta =  (<HTMLInputElement>document.getElementById('tipoRuta')).value;
    const fecha = this.obtenerFechaFormateada()

    this.Ct.actualizarTipoRuta(tipoRuta, id, fecha).subscribe(
      Response =>{
        console.log('estado actualizado', Response);
      },
      error =>{
        console.error('error al actualizar el estado', error)
      }
    )
  }

  getPpu(op:any, cop:any) {

    const fecha = this.obtenerFechaFormateada()
    this.Ct.getPpu(fecha,op,cop).subscribe(
      (data) => {
        this.patentesList = data;
        this.initializeSelectedEstados();
        console.log(this.patentesList);
        this.initializeRutaMeliValues()
        this.patentesList[data.ruta_meli] 
        this.initializeTipoRutaValues()
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
  initializeTipoRutaValues() {
    this.patentesListFiltrada.forEach(pu => {
      this.selectedTipoRuta[pu.id_ppu] = pu.tipo_ruta;
      console.log(this.selectedTipoRuta)
    });
  }

  submitForm(id_ppu: any,  tipo_ruta: any) {
    // Obtener Valores de sessionStorage
    const id_user = sessionStorage.getItem('id')?.toString() + '';
    const ids_user =
      sessionStorage.getItem('server') +
      '-' +
      sessionStorage.getItem('id') +
      '';
    //Obtener  valores de los campos formularios.

    const id_operacion = this.operacionValue;
    const id_centro_op = this.centroOperacionValue;
    const fecha = this.obtenerFechaFormateada();
    const estado =  5;
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
    // llamado al api para entregar el formulario y poster en base de datos
    this.http
      .post('http://localhost:8000/api/agregarpatente/', formData)
      .subscribe((data) => {
        //mostrar aletar exito
        alert('El ingreso se ha realizado Correctamente');
        
      },
      
      (error) =>{
        //MAnejar errores
        console.error('Error al enviar la solicitud', error.error.detail);
        if ( error.error.detail.includes("duplicate key")) {
          alert("El nombre de la patente ya existe para el dia de hoy");
        } else {
          alert('Hubo un error al ingresar el dato');
        }
        
      }
    );
  }

  // para settear el color del fondo del recudro.
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
//funcion para setear el color de la letra, dependiendo del getColor
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

  

  getRecuperarPatentesCitaciones(){
    
    const operacionValor = this.operacionValue;
    const centroOperacionValor = this.centroOperacionValue;
    const fecha = this.obtenerFechaFormateada();
    if (operacionValor && centroOperacionValor){
      console.log(operacionValor);
      console.log(centroOperacionValor);
    
    }else{
      console.error('no se ha encontrado uno o ambos elementos')
    }
    this.Ct.getPatenteCitacion(operacionValor, centroOperacionValor, fecha).subscribe(
      (data) => {
        this.patentesList2 = data;
        console.log(this.patentesList2);
         
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }

  getCOPfiltrado(op:any){
    this.Ct.getCopFiltrado(op).subscribe((data)=>{
      this.CopFiltrado = data;
      console.log(this.CopFiltrado)
    })
  }
  onChangeOperacion(event: any) {
    this.operacionSeleccionada = event.target.value;
    this.getRecuperarPatentesCitaciones();
  }
  onChangeCentroOperacion(event: any) {
    this.centroOperacionSeleccionado = event.target.value;
    this.getRecuperarPatentesCitaciones();
  }
  obtenerFechaFormateada(): string {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
    const day = ('0' + fechaActual.getDate()).slice(-2);
    return `${year}${month}${day}`;
  }


  getPatentesFiltradasPorOpyCop(id_operacion:number, id_centro_op:number){
    this.Ct.getpatentesFiltradas(id_operacion,id_centro_op).subscribe((data)=>{
      this.patentesListFiltrada = data
      console.log(this.patentesListFiltrada)
    })

    this.getPpu(id_operacion,id_centro_op);
  }

  getTipoRuta(){
    this.Ct.getTipoRuta().subscribe((data)=>{
      this.dataTipoRuta = data
      console.log(this.dataTipoRuta)
    })
  }
  
}