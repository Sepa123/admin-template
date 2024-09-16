import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {TarifarioGeneralService} from '../../../service/tarifario-general.service'
import { ChangeDetectorRef } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tarifario-general',
  templateUrl: './tarifario-general.component.html',
  styleUrls: ['./tarifario-general.component.scss']
})
export class TarifarioGeneralComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private Tg : TarifarioGeneralService,
    private cdr: ChangeDetectorRef

  ){}
  @ViewChild("formulario") formulario: NgForm | undefined;
  showUpdateButton: boolean | undefined;
  isLoadingFull: boolean = true;
  isModalOpen: boolean = false;
  public visible = false;
  public visible2 = false;
  tableinfo: any[] = [];
  tableTipoUnidad: any[] = [];
  OperacionSelect: any[] = [];
  CopSelect: any[] = [];
  CopSelect2: any[] = [];
  CarTarifa: any[] = [];
  Periodicidad: any[] = [];
  tipovehiculo: any[]= [];
  infoTable: any[] = [];
  infoTable2: any[] = [];
  originalData: any[] = [];

  valorInf: string = '';
  valorSup: string = '';
  unidad: number = 0;
  selectedTipoVehiculo: string = ''; // Almacena el tipo de vehículo seleccionado
  
  tarifaMonto: number | null = null;
  idCambioFecha: number | null = null;
  fechaSeleccionada: string | null = null;
  
  toggleLiveDemo() {
    this.visible = !this.visible;
      
  }
  handleLiveDemoChange(event: any) {
      this.visible = event;
    }

  toggleDanger() {
      this.visible2 = !this.visible2;
        
    }
  handleLiveDemoChange2(event: any) {
        this.visible2 = event;
      }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


  ngOnInit(){
    this.getOperacion();
    this.getCentroOp();
    this.getCentroOperacion();
    this.getTipoVehiculo();
    this.GetCaracteristicasTarifa();
    this.getPeriodicidad();
    this.getinfoTableSearch() ;
    this.getinfoTable();
  }

  limpiarInput() {
    this.tarifaMonto = null; // Limpia el valor del input
  }
  nombreOperacion: number = 0;
  centro_operacion: number = 0;
  tipo_vehiculo: number = 0;
  unidadMedida: number = 0;
  periodo: number = 0;

  verificarExistencia() {
    // Obtener los valores de los inputs
    const nombreOperacion = parseInt((<HTMLSelectElement>document.getElementById('Nombre')).value, 10);
    const centro_operacion = parseInt((<HTMLSelectElement>document.getElementById('nombreCop')).value, 10);
    const tipo_vehiculo = parseInt((<HTMLSelectElement>document.getElementById('vehiculo')).value, 10);
    const unidadMedida = parseInt((<HTMLSelectElement>document.getElementById('UnidadMedida')).value, 10);
    const periodo = parseInt((<HTMLSelectElement>document.getElementById('Periodicidad')).value, 10);
  
    // Filtrar los datos que coinciden con los valores ingresados
    let resultadosFiltrados = this.infoTable2;
  
    if (nombreOperacion) {
      resultadosFiltrados = resultadosFiltrados.filter(item => item.operacion === nombreOperacion);
    }
    if (centro_operacion) {
      resultadosFiltrados = resultadosFiltrados.filter(item => item.centro_operacion === centro_operacion);
    }
    if (tipo_vehiculo) {
      resultadosFiltrados = resultadosFiltrados.filter(item => item.tipo_vehiculo === tipo_vehiculo);
    }
    if (unidadMedida) {
      resultadosFiltrados = resultadosFiltrados.filter(item => item.capacidad === unidadMedida);
    }
    if (periodo) {
      resultadosFiltrados = resultadosFiltrados.filter(item => item.periodicidad === periodo);
    }
  
    // Verificar si hay resultados que coincidan completamente con todos los campos
    const DatoEncontrado = resultadosFiltrados.length > 0;
  
    // Asignar el id de la coincidencia y actualizar el estado del botón
    this.idCambioFecha = DatoEncontrado ? resultadosFiltrados[0].id : null;
    this.showUpdateButton = DatoEncontrado;
  
    // Forzar la detección de cambios
    this.cdr.detectChanges();
  
    console.log("Verificación realizada, botón de actualización:", this.showUpdateButton);
  }
  
  
  updateFecha() {
    const idParaCambio = this.idCambioFecha;
    const fechaParaCambio = this.fechaSeleccionada;
  
    // Verifica si ambos valores están presentes
    if (idParaCambio && fechaParaCambio) {


      
      // Aquí puedes realizar la lógica que necesites, por ejemplo:
      console.log('ID para cambio:', idParaCambio);
      console.log('Fecha seleccionada:', fechaParaCambio);
        this.Tg.insertDate(idParaCambio, fechaParaCambio).subscribe((response)=>{
        console.log('Estado actualizado correctamente:', response);
            
            //vuelvo a cargar la tabla principal post ingreso de una nueva tarifa
            this.getinfoTable();
            this.getinfoTableSearch();
            this.verificarExistencia();
            alert(`Datos ingresados correctamente:\nID: ${idParaCambio}\nFecha: ${fechaParaCambio}`);
    })

      // Lógica para actualizar la fecha usando idParaCambio y fechaParaCambio
    } else {
      console.log('Falta el ID o la fecha para realizar el cambio.');
    }
  }
  
  
  
  getCentroOp(){
    this.Tg.getCentroFiltro().subscribe((data) =>
    this.CopSelect2 = data)
  }
  getOperacion(){
    this.Tg.getOperacion().subscribe((data)=>{
      this.OperacionSelect = data
      this.getCentroOperacion();
    })
  }
  getCentroOperacion() {
    // Verifica si el valor seleccionado se refleja en la consola
    const id_op = parseInt((<HTMLSelectElement>document.getElementById('Nombre')).value);
    
    // Llama al servicio solo si se ha seleccionado un valor
    if (id_op !== null) {
      this.Tg.getCentroOperacion(id_op).subscribe(
        (data) => {
          this.CopSelect = data;
          console.log("Datos recibidos:", data); // Verifica la respuesta
        },
        (error) => {
          console.error("Error al obtener los datos:", error);
        }
      );
    } else {
      console.warn("No se ha seleccionado ningún valor.");
    }
  }

  getTipoVehiculo(){
    this.Tg.getTipoVehiculo().subscribe((data)=>
    this.tipovehiculo = data
  )}

  GetCaracteristicasTarifa(){
    this.Tg.GetCaracteristicasTarifa().subscribe((data) =>
    this.CarTarifa = data)
  }
  getPeriodicidad(){
    this.Tg.getPeriodicidad().subscribe((data)=>
    this.Periodicidad = data)
  }
 

  // getinfoTable(){
  //   this.isLoadingFull = true;
  //   this.Tg.getInfoTable().subscribe((data)=>
  //   this.infoTable = data)
  //   this.isLoadingFull = false;
  // }
  getinfoTable() {
    this.isLoadingFull = true;
    this.Tg.getInfoTable().subscribe((data) => {
      this.infoTable = data
      this.filteredData = data
      this.isLoadingFull = false;
      this.originalData = [...this.infoTable]; // Hacemos una copia del array original
    });
  } 

  //variables para filtrar
  selectedOperacion: string = ''; // Almacena la operación seleccionada por el usuario
  filteredData: any[] = [];       // Almacena los datos filtrados 

  
  filtrarDatos() {
    this.filteredData = this.infoTable.filter(item => {
      const matchOperacion = this.selectedOperacion ? item.nombre === this.selectedOperacion : true;
      const matchVehiculo = this.selectedTipoVehiculo ? item.tipo === this.selectedTipoVehiculo : true;
      return matchOperacion && matchVehiculo;
    });
  }


  resetFiltros() {
    this.selectedOperacion = '';
    this.selectedTipoVehiculo = '';
    this.filteredData = [...this.infoTable]; // Restablece los datos originales
  }
  getinfoTableSearch() {
    this.isLoadingFull = true;
    this.Tg.getInfoTableSearch().pipe(
      catchError((error) => {
        this.isLoadingFull = false;
  
        // Si el error es un 404, muestra el botón
        if (error.status === 404) {
          this.showUpdateButton = false;
        } else {
          // Manejar otros errores si es necesario
          console.error('Error al obtener datos:', error);
        }
  
        // Devuelve un observable vacío para continuar el flujo
        return of([]);
      })
    ).subscribe((data) => {
      this.infoTable2 = data;
      this.isLoadingFull = false;
  
      // Si no hay datos y no es un 404, muestra el botón
      if (this.infoTable2.length === 0 && !this.showUpdateButton) {
        this.showUpdateButton = false;
      } else {
        // Si hay datos, deshabilita el botón
        this.showUpdateButton = true;
      }
    });
  }

  getNombrePeriodicidad(id: number): string {
    const periodo = this.Periodicidad.find(op => op.id === id);
    return periodo ? periodo.periodo : 'S/I';
  }
  
  getNombreCaracteristica(id: number): string {
    const caracteristicas = this.CarTarifa.find(op => op.id === id);
    return caracteristicas ? caracteristicas.nombre : 'S/I';
  }

  
  

  operacion: number = 0;
  fechaCaducidad: string = '';


  
  
  // Propiedad para almacenar el valor seleccionado en el select
  selectedPeriodo: number | null = null;
  limpiarSeleccion() {
    this.selectedPeriodo = null; // Limpia el valor seleccionado del select
  }
  ingresoFormNuevaTarifa(tarifaForm: NgForm) {
    // Obtener los valores de los inputs
    const id_user = sessionStorage.getItem('id')?.toString() + '';
    const ids_user =
      sessionStorage.getItem('server') +
      '-' +
      sessionStorage.getItem('id') +
      '';
    const latitud = '44,4'
    const longitud = '44,4'
    const operacion = parseInt((<HTMLSelectElement>document.getElementById('Nombre')).value, 10);
    const centro_operacion = parseInt((<HTMLSelectElement>document.getElementById('nombreCop')).value, 10);
    const tipo_vehiculo = parseInt((<HTMLSelectElement>document.getElementById('vehiculo')).value, 10);
    const Tarifa = parseInt((<HTMLSelectElement>document.getElementById('UnidadMedida')).value, 10);
    const periodo = parseInt((<HTMLSelectElement>document.getElementById('Periodicidad')).value, 10);
    const monto = parseFloat((<HTMLInputElement>document.getElementById('Monto')).value);
    
    //(<HTMLInputElement>document.getElementById('Fecha')).value;
  
    this.Tg.NuevaTarifa(id_user, ids_user,latitud,longitud, operacion, centro_operacion, tipo_vehiculo, Tarifa,periodo,monto,).subscribe(
      (response) => {
        console.log('Estado actualizado correctamente:', response);

        //vuelvo a cargar la tabla principal post ingreso de una nueva tarifa
        
        this.getinfoTableSearch();
        this.getinfoTable();
        this.verificarExistencia();  
        
        tarifaForm.resetForm();
        this.limpiarInput();
        this.limpiarSeleccion();
        
      },
      (error) => {
        console.error('Error al actualizar el estado', error);
        // Puedes manejar el error aquí
      }
    );
  }

  isAsc = true;
  currentColumn = -1;
  sortTable(columnIndex: number) {
    // Si se vuelve a hacer clic en la misma columna, alterna el orden
    if (this.currentColumn === columnIndex) {
      this.isAsc = !this.isAsc;
    } else {
      this.isAsc = true; // Orden ascendente por defecto
      this.currentColumn = columnIndex;
    }

    this.infoTable.sort((a, b) => {
      let cellA, cellB;

      switch (columnIndex) {
        case 0: // Ordenar por nombre
          cellA = a.nombre.toLowerCase();
          cellB = b.nombre.toLowerCase();
          break;
        case 1: // Ordenar por valor inferior
          cellA = a.centro;
          cellB = b.centro;
          break;
        case 2: // Ordenar por valor superior
          cellA = a.tipo;
          cellB = b.tipo;
          break;
        case 3: // Ordenar por uni_dad
          cellA = a.caracteristica_tarifa;
          cellB = b.caracteristica_tarifa;
          break;
        case 4: // Ordenar por uni_dad
          cellA = a.periodo;
          cellB = b.periodo;
          break;
        case 5: // Ordenar por uni_dad
          cellA = a.fecha_de_caducidad;
          cellB = b.fecha_de_caducidad;
          break;
        default:
          return 0;
      }

      if (cellA < cellB) return this.isAsc ? -1 : 1;
      if (cellA > cellB) return this.isAsc ? 1 : -1;
      return 0;
    });
  }


  // Función para exportar los datos de la tabla a Excel
  exportToExcel(): void {
    // Definir el encabezado de la tabla (ajústalo a tus columnas)
    const header = [
      'Operación', 
      'Centro Operación', 
      'Tipo Vehículo', 
      'Capacidad', 
      'Periodicidad', 
      'Tarifa', 
      'Caducidad'
    ];

    // Mapear los datos de la tabla desde infoTable
    const data = this.filteredData.map((ti: any) => [
      ti.nombre,
      ti.centro,
      ti.tipo,
      ti.caracteristica_tarifa,
      ti.tarifa,
      ti.fecha_de_caducidad
    ]);

    // Unir el encabezado con los datos
    const wsData = [header, ...data];

    // Crear una hoja de trabajo
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(wsData);

    // Crear un libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tarifario General');

    // Exportar el archivo Excel
    XLSX.writeFile(wb, 'tarifario_general.xlsx');
  }
}