import {
  Component,
  Renderer2,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { GestionGpsService } from '../../../service/gestion-gps.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestion-gps',
  templateUrl: './gestion-gps.component.html',
  styleUrls: ['./gestion-gps.component.scss'],
})
export class GestionGpsComponent implements OnInit {
  tableInfo: any;
  id_insta: { [key: number]: number } = {};
  id_oc_baja: { [key: number]: number } = {};
  id_monto: { [key: number]: number } = {};
  id_descontado: { [key: number]: number } = {};
  id_devuelto: { [key: number]: number } = {};
  isLoadingFull: boolean = true;

  @ViewChild('filtroPpu', { static: true }) filtroPpu!: ElementRef;
  @ViewChild('tablaProductosPicking', { static: true })
  tablaProductosPicking!: ElementRef;
  @ViewChild('filtroRazonSocial', { static: true })
  filtroRazonSocial!: ElementRef;
  tableinfoFull: any;
  private originalTableInfo: any[] = [];
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private Gps: GestionGpsService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  public rol = sessionStorage.getItem("rol_id");

  ngOnInit() {
    this.getInfoTable();
    this.originalTableInfo = [...this.tableInfo];
    this.initializeOc_instalacion();
    this.initializeOc_baja();
    this.initialize_devuelto();
    this.initialize_descontado();
    this.initialize_monto();
  }

  // filtrarTabla(): void {
  //   const ppuFiltro = this.filtroPpu.nativeElement.value.toLowerCase().trim();
  //   const razonSocialFiltro = this.filtroRazonSocial.nativeElement.value.toLowerCase().trim();
  //   const tr = this.tablaProductosPicking.nativeElement.getElementsByTagName('tr');
  
  //   for (let i = 1; i < tr.length; i++) {
  //     const tdPpu = tr[i].getElementsByTagName('td')[0];
  //     const tdRazon = tr[i].getElementsByTagName('td')[1];
      
  //     if (tdPpu && tdRazon) {
  //       const ppuTexto = (tdPpu.textContent || tdPpu.innerText).toLowerCase().trim();
  //       const razonTexto = (tdRazon.textContent || tdRazon.innerText).toLowerCase().trim();
  //       console.log('PPU Texto:', ppuTexto);
  //       console.log('Razón Texto:', razonTexto);
  //       // Mostrar fila si ambos filtros coinciden
  //       if (
  //         (ppuFiltro === '' || ppuTexto.includes(ppuFiltro)) &&
  //         (razonSocialFiltro === '' || razonTexto.includes(razonSocialFiltro))
  //       ) {
  //         tr[i].style.display = '';
  //       } else {
  //         tr[i].style.display = 'none';
  //       }
  //     }
  //  }
  //}
  
  

  getInfoTable() {
    this.isLoadingFull = true;
    this.Gps.getInfoList().subscribe(
      (data) => {
        this.tableinfoFull= data;
        this.tableInfo = data;
        this.initializeOc_instalacion();
        this.initializeOc_baja();
        this.initialize_devuelto();
        this.initialize_descontado();
        this.initialize_monto();
        this.isLoadingFull = false;
      },
      (error) => {
        console.error('Error al obtener modalidades de operación', error);
      }
    );
  }
  textoPpu : any = ''
  textoRazon_social : any = ''


  filtrarTabla(campo : string){
    const filtroPpu = this.tableInfo.filter((lista: any) =>
      lista.ppu.toString().toLowerCase().startsWith(this.textoPpu.toLowerCase())
    );
  
    // Filtra por Razon Social
    const filtroRazonSocial = filtroPpu.filter((lista: any) =>
      lista.razon_social.toString().toLowerCase().startsWith(this.textoRazon_social.toLowerCase())
    );
  // Verifica si ambos campos están vacíos
  if (this.textoPpu === '' && this.textoRazon_social === '') {
    this.getInfoTable(); // Carga la tabla completa si no hay filtros
  } else {
    // Si hay algún filtro aplicado, verifica si hay resultados
    if (filtroRazonSocial.length > 0) {
      this.tableInfo = filtroRazonSocial; // Asigna los resultados filtrados
    } else {
      this.tableInfo = []; // No muestra nada si no hay coincidencias
    }
  }
}



  initializeOc_instalacion() {
    this.tableInfo.forEach((gps: any) => {
      this.id_insta[gps.id_gps] = gps.oc_instalacion;
    });
  }

  oc_instalacion(id: number) {
    const oc_instalacion = this.id_insta[id];
  // Verificar si oc_instalacion es null, undefined o está vacío
  if (oc_instalacion === null || oc_instalacion === undefined || isNaN(oc_instalacion)){
    alert('El campo oc_instalacion está vacío o no tiene información válida.');
    return; // Salir de la función si no hay datos válidos
  }

  this.Gps.oc_instalacion(oc_instalacion, id).subscribe(
    (response) => {
      this.getInfoTable();
      console.log('oc_instalacion actualizado:', response);
      alert('oc_instalacion actualizado correctamente.');
    },
    (error) => {
      console.error('Error al actualizar el oc_instalacion:', error);
      alert('Error al actualizar el oc_instalacion.');
    }
);
  }
  initializeOc_baja() {
    this.tableInfo.forEach((gps: any) => {
      this.id_oc_baja[gps.id_gps] = gps.oc_baja;
    });
  }
  oc_baja(id: number) {
    const oc_baja = this.id_oc_baja[id];

    if (oc_baja === null || oc_baja === undefined || isNaN(oc_baja)) {
      alert('El campo oc_baja no tiene información válida.');
      return; // Salir de la función si no hay datos válidos
    }
    this.Gps.oc_baja(oc_baja, id).subscribe(
      (response) => {
        this.getInfoTable();
        console.log('oc_baja actualizado:', response);
        alert('oc_baja actualizado correctamente.');
      },
      (error) => {
        console.error('Error al actualizar el oc_baja:', error);
        alert('Error al actualizar el oc_baja.');
      }
    );
  }

  initialize_monto() {
    this.tableInfo.forEach((gps: any) => {
      this.id_monto[gps.id_gps] = gps.monto;
    });
  }
  monto(id: number) {
    const monto = this.id_monto[id];
    
    // Verificar si oc_instalacion es null, undefined, o no es un número válido
  if (monto === null || monto === undefined || isNaN(monto)) {
    alert('El campo monto no tiene información válida.');
    return; // Salir de la función si no hay datos válidos
  }

    this.Gps.monto(monto, id).subscribe(
      (response) => {
        this.getInfoTable();
        console.log('monto actualizado:', response);
        alert('monto actualizado correctamente.');
      },
      (error) => {
        console.error('Error al actualizar el monto:', error);
        alert('Error al actualizar el monto.');
      }
    );
  }

  initialize_descontado() {
    this.tableInfo.forEach((gps: any) => {
      this.id_descontado[gps.id_gps] = gps.descontado;
    });
  }

  descontado(id: number) {
    const descontado = this.id_descontado[id];

    this.Gps.descontado(descontado, id).subscribe(
      (response) => {
        this.getInfoTable();
        console.log('Estado actualizado:', response);
        alert('Estado actualizado correctamente.');
      },
      (error) => {
        console.error('Error al actualizar el estado:', error);
        alert('Error al actualizar el estado.');
      }
    );
  }

  initialize_devuelto() {
    this.tableInfo.forEach((gps: any) => {
      this.id_devuelto[gps.id_gps] = gps.devuelto;
    });
  }

  devuelto(id: number) {
    const devuelto = this.id_devuelto[id];

    this.Gps.devuelto(devuelto, id).subscribe(
      (response) => {
        this.getInfoTable();
        console.log('Estado actualizado:', response);
        alert('Estado actualizado correctamente.');
      },
      (error) => {
        console.error('Error al actualizar el estado:', error);
        alert('Error al actualizar el estado.');
      }
    );
  }
  exportTableToExcel() {
    const table = this.tablaProductosPicking.nativeElement;
  
    // Guardar el estado original de los inputs y checkboxes
    const originalContent: string[][] = [];
    const rows = table.getElementsByTagName('tr');
  
    // Identificar el índice de la columna "Acción"
    const headerCells = table.querySelectorAll('th');
    const actionColumnIndex = headerCells.length - 1;
  
    // Eliminar el encabezado de la columna "Acción"
    if (headerCells.length > 0) {
      headerCells[headerCells.length - 1].remove();
    }
  
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      originalContent[i] = [];
      
      for (let j = 0; j < cells.length; j++) {
        // Guardar el contenido original
        originalContent[i][j] = cells[j].innerHTML;
  
        // Reemplazar el valor de los checkboxes con 'X' o vacío
        const inputElement = cells[j].querySelector('input[type="checkbox"]');
        if (inputElement) {
          cells[j].innerHTML = inputElement.checked ? 'X' : '';
        }
      }
    }
  
    // Eliminar la última columna (columna "Acción") de las filas
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      if (cells.length > actionColumnIndex) {
        cells[actionColumnIndex].remove();
      }
    }
  
    // Proceder a exportar la tabla
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
  
    // Ajustar el tamaño de las columnas
    ws['!cols'] = [
      { wpx: 75 }, // Ancho para la primera columna
      { wpx: 200 }, // Ancho para la segunda columna
      { wpx: 75 }, // Ancho para la tercera columna
      { wpx: 80 }, // Ancho para la cuarta columna
      { wpx: 150 }, // Ancho para la quinta columna
      { wpx: 100 }, // Ancho para la sexta columna
      { wpx: 100 }, // Ancho para la séptima columna
      { wpx: 100 }, // Ancho para la octava columna
      { wpx: 100 }, // Ancho para la novena columna
      { wpx: 50  }, // Ancho para la décima columna
      { wpx: 50 }, // Ancho para la undécima columna
    ];
  
    // Ajustar el tamaño de las filas (esto se hace para todas las filas de la hoja de cálculo)
    ws['!rows'] = [];
    for (let i = 0; i < rows.length; i++) {
      ws['!rows'][i] = { hpx: 20 }; // Ajusta el valor para el alto de las filas
    }
  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'productos.xlsx');
  
    // Restaurar el contenido original y actualizar la vista
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      
      for (let j = 0; j < cells.length; j++) {
        cells[j].innerHTML = originalContent[i][j];
      }
    }
  
    // Forzar la detección de cambios para actualizar la vista
    this.cdr.detectChanges();
  
    // Llamar a las funciones de inicialización
    this.getInfoTable();
}
  }
