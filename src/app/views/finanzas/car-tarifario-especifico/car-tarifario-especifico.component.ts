import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import {TarifarioEspecificoService} from '../../../service/tarifario-especifico.service'
import { NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-car-tarifario-especifico',
  templateUrl: './car-tarifario-especifico.component.html',
  styleUrls: ['./car-tarifario-especifico.component.scss'],
})
export class CarTarifarioEspecificoComponent {
  CopSelect2: any[] = [];
  OperacionSelect: any[] = [];
  CopSelect: any[] = [];
  Periodicidad: any[] = [];
  ColaboradorSelect: any[] = [];
  vehiculo: any[] = [];
  constructor(
    private http: HttpClient,
    private Te: TarifarioEspecificoService,
    private cdr: ChangeDetectorRef
  ) {}
  isLoadingFull: boolean = true;
  selectedOperacion: string = ''; // Almacena la operación seleccionada por el usuario
  nombreOperacion: number = 0;
  centro_operacion: number = 0;
  razon_social: number = 0;
  Ppu_Vehiculo: number = 0;
  periodo: number = 0;
  selectedPeriodo: number | null = null;
  RazonSocial: any[] = [];

  ngOnInit(): void {
    // Llamada al servicio para obtener los datos (suponiendo que uses un servicio para esto)
    this.Te.getInfoTableTE().subscribe({
      next: (infoTable: any[]) => {
        this.infoTable = infoTable || [];  // Aseguramos que no sea void ni undefined
        this.filteredData = [...this.infoTable]; // Copiamos el array para filtrados posteriores
        this.originalData = [...this.infoTable]; // Guardamos una copia original de los datos
        this.isLoadingFull = false;
        // Llamadas a otros servicios para obtener más datos si es necesario
        this.Te.getInfoTableSearch().subscribe({
          next: (infoTableSearch: any[]) => {
            this.infoTable2 = infoTableSearch || [];
          },
          error: (error) => {
            console.error('Error al obtener infoTableSearch', error);
          }
        });
  
        this.Te.getOperacion().subscribe({
          next: (operacion: any[]) => {
            this.OperacionSelect = operacion || [];
          },
          error: (error) => {
            console.error('Error al obtener operacion', error);
          }
        });
  
        this.Te.getPeriodicidad().subscribe({
          next: (periodicidad: any[]) => {
            this.Periodicidad = periodicidad || [];
          },
          error: (error) => {
            console.error('Error al obtener periodicidad', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener infoTable', error);
      }
    });
  }
  

  public visible = false;
  public visibleDanger = false;
  isAsc = true;
  currentColumn = -1;

  filtrarDatos() {
    this.filteredData = this.infoTable.filter(item => {
      const matchOperacion = this.selectedOperacion ? item.operacion === this.selectedOperacion : true;
      return matchOperacion;
    });
  }
  sortTable(columnIndex: number) {
    // Si se vuelve a hacer clic en la misma columna, alterna el orden
    if (this.currentColumn === columnIndex) {
      this.isAsc = !this.isAsc;
    } else {
      this.isAsc = true; // Orden ascendente por defecto
      this.currentColumn = columnIndex;
    }

    this.filteredData.sort((a, b) => {
      let cellA, cellB;

      switch (columnIndex) {
        case 0: // Ordenar por nombre
          cellA = a.ppu.toLowerCase();
          cellB = b.ppu.toLowerCase();
          break;
        case 1: // Ordenar por valor inferior
          cellA = a.operacion;
          cellB = b.operacion;
          break;
        case 2: // Ordenar por valor superior
          cellA = a.cop;
          cellB = b.cop;
          break;
        case 3: // Ordenar por uni_dad
          cellA = a.periodo;
          cellB = b.periodo;
          break;
        
        case 4: // Ordenar por uni_dad
          cellA = a.id;
          cellB = b.id;
          break;
        default:
          return 0;
      }

      if (cellA < cellB) return this.isAsc ? -1 : 1;
      if (cellA > cellB) return this.isAsc ? 1 : -1;
      return 0;
    });
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  toggleLiveDemo() {
    this.visible = !this.visible;
  }
  handleLiveDemoChange2(event: any) {
    this.visibleDanger = event;
  }
  toggleDanger() {
    this.visible = !this.visible;
  }

  infoTable: any[] = [];
  originalData: any[] = [];
  filteredData: any[] = [];

  getinfoTable() {
    this.isLoadingFull = true;

    this.Te.getInfoTableTE().subscribe((data) => {
      this.infoTable = data;
      this.filteredData = data;

      this.originalData = [...this.infoTable]; // Hacemos una copia del array original
      this.isLoadingFull = false;
    });
  }
  getCentroOp() {
    this.Te.getCentroFiltro().subscribe((data) => (this.CopSelect2 = data));
  }
  getOperacion() {
    this.Te.getOperacion().subscribe((data) => {
      this.OperacionSelect = data;
    });
  }

  getinfotableVerificar(){
    
    this.Te.getInfoTableSearch().subscribe((data) => {
      this.infoTable2 = data;
    })
  }

  //seccion para verificacion de existencia en la tabla.
  infoTable2: any[] = [];
  idCambioFecha: number | null = null;
  showUpdateButton: boolean | undefined;

  verificarExistencia() { 
    // Obtener los valores de los inputs
    const nombreOperacion = parseInt((<HTMLSelectElement>document.getElementById('Nombre')).value, 10);
    const centro_operacion = parseInt((<HTMLSelectElement>document.getElementById('nombreCop')).value, 10);
    const RazonSocial = parseInt((<HTMLSelectElement>document.getElementById('RazonSocial')).value, 10);
    const Vehiculo = parseInt((<HTMLSelectElement>document.getElementById('ppu')).value, 10);
    const periodo = parseInt((<HTMLSelectElement>document.getElementById('Periodicidad')).value, 10);
  
    // Filtrar los datos que coinciden con los valores ingresados
    let resultadosFiltrados = this.infoTable2;
  
    if (RazonSocial) {
      resultadosFiltrados = resultadosFiltrados.filter(item => item.razon_social === RazonSocial);
    }
    if (nombreOperacion) {
      resultadosFiltrados = resultadosFiltrados.filter(item => item.operacion === nombreOperacion);
    }
    if (centro_operacion) {
      resultadosFiltrados = resultadosFiltrados.filter(item => item.centro_operacion === centro_operacion);
    }
    
    if (Vehiculo) {
      resultadosFiltrados = resultadosFiltrados.filter(item => item.ppu === Vehiculo);
    }
    if (periodo) {
      resultadosFiltrados = resultadosFiltrados.filter(item => item.periodo === periodo);
    }
  
    // Verificar si hay resultados que coincidan completamente con todos los campos
    const DatoEncontrado = resultadosFiltrados.length > 0;
  
    // Asignar el id de la coincidencia y actualizar el estado del botón
    this.idCambioFecha = DatoEncontrado ? resultadosFiltrados[0].id : null;
    this.showUpdateButton = DatoEncontrado;
  
    this.getinfotableVerificar()
    // Forzar la detección de cambios
    this.cdr.detectChanges();
  
    console.log("Verificación realizada, botón de actualización:", this.showUpdateButton);
  }
  getinfoTableSearch() {
    this.isLoadingFull = true;
    this.Te.getInfoTableSearch().pipe(
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

  getCentroOperacion() {
    // Verifica si el valor seleccionado se refleja en la consola
    const id_op = parseInt(
      (<HTMLSelectElement>document.getElementById('Nombre')).value
    );

    // Llama al servicio solo si se ha seleccionado un valor
    if (id_op !== null) {
      this.Te.getCentroOperacion(id_op).subscribe(
        (data) => {
          this.CopSelect = data;
           // Verifica la respuesta
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    } else {
      console.warn('No se ha seleccionado ningún valor.');
    }
  }
  getPeriodicidad() {
    this.Te.getPeriodicidad().subscribe((data) => (this.Periodicidad = data));
  }
  getColaborador() {
    this.Te.getColaborador().subscribe(
      (data) => (this.ColaboradorSelect = data)
    );
  }
  Vehiculofilter() {
    const id = parseInt(
      (<HTMLSelectElement>document.getElementById('RazonSocial')).value
    );

    this.Te.getVehiculoFilter(id).subscribe((data) => (this.vehiculo = data));
  }

// update de fecha de termino
  fechaSeleccionada: string | null = null;

  updateFecha() {
    const idParaCambio = this.idCambioFecha;
    const fechaParaCambio = this.fechaSeleccionada;
  
    // Verifica si ambos valores están presentes
    if (idParaCambio && fechaParaCambio) {


      
      // Aquí puedes realizar la lógica que necesites, por ejemplo:
      console.log('ID para cambio:', idParaCambio);
      console.log('Fecha seleccionada:', fechaParaCambio);
        this.Te.insertDate(idParaCambio, fechaParaCambio).subscribe((response)=>{
        console.log('Estado actualizado correctamente:', response);
            
            //vuelvo a cargar la tabla principal post ingreso de una nueva tarifa
            this.getinfoTable();
            this.verificarExistencia();
            alert(`Datos ingresados correctamente:\nID: ${idParaCambio}\nFecha: ${fechaParaCambio}`);
    })

      // Lógica para actualizar la fecha usando idParaCambio y fechaParaCambio
    } else {
      console.log('Falta el ID o la fecha para realizar el cambio.');
    }
  }
  ingresoFormNuevaTarifa(tarifaForm: NgForm) {
    // Obtener los valores de los inputs
    const id_user = sessionStorage.getItem('id')?.toString() + '';
    const ids_user =
      sessionStorage.getItem('server') +
      '-' +
      sessionStorage.getItem('id') +
      '';
    const latitud = '44,4';
    const longitud = '44,4';
    const ppu = parseInt(
      (<HTMLSelectElement>document.getElementById('ppu')).value,
      10
    );
    const razon_social = parseInt(
      (<HTMLSelectElement>document.getElementById('RazonSocial')).value,
      10
    );
    const operacion = parseInt(
      (<HTMLSelectElement>document.getElementById('Nombre')).value,
      10
    );
    const centro_operacion = parseInt(
      (<HTMLSelectElement>document.getElementById('nombreCop')).value,
      10
    );
    const periodicidad = parseInt(
      (<HTMLSelectElement>document.getElementById('Periodicidad')).value,
      10
    );
    const tarifa = parseFloat(
      (<HTMLInputElement>document.getElementById('Monto')).value
    );

    //(<HTMLInputElement>document.getElementById('Fecha')).value;

    this.Te.NuevaTarifa(
      id_user,
      ids_user,
      latitud,
      longitud,
      ppu,
      razon_social,
      operacion,
      centro_operacion,
      periodicidad,
      tarifa
    ).subscribe(
      (response) => {
        console.log('Estado actualizado correctamente:', response);

        //vuelvo a cargar la tabla principal post ingreso de una nueva tarifa

        this.getinfoTable();
        this.getinfoTableSearch();
        tarifaForm.resetForm();
        
      },
      (error) => {
        console.error('Error al actualizar el estado', error);
        // Puedes manejar el error aquí
      }
    );
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
      ti.id,
      ti.ppu,
      ti.razon_social,
      ti.operacion,
      ti.periodicidad,
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