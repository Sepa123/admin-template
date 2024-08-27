import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit,Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TarifarioService } from '../../../service/tarifario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tarifario',
  templateUrl: './tarifario.component.html',
  styleUrls: ['./tarifario.component.scss']
})
export class TarifarioComponent implements OnInit{
  constructor(
    private http: HttpClient,
    private Tf : TarifarioService
  ){}
  
  isLoadingFull: boolean = true;
  isModalOpen: boolean = false;
  public visible = false;
  tableinfo: any[] = [];
  tableTipoUnidad: any[] = [];

  toggleLiveDemo() {
    this.visible = !this.visible;
      
  }
  handleLiveDemoChange(event: any) {
      this.visible = event;
    }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


  ngOnInit(){
    this.getTableInfo();
    this.getTipoUnidad();
  }

  getTableInfo(){
    this.isLoadingFull = true;
    this.Tf.getInfoList().subscribe((data) => {
      this.tableinfo = data
      this.isLoadingFull = false;
    })
  }
  getTipoUnidad(){
    this.Tf.getTipoUnidad().subscribe((dataT)=>{
      this.tableTipoUnidad = dataT
    })
  }

  nombre: string = '';
  valorInf: string = '';
  valorSup: string = '';
  unidad: number = 0;

  ingresoDriversPeonetas(tarifaForm: NgForm) {
    // Obtener los valores de los inputs
    const id_user = sessionStorage.getItem('id')?.toString() + '';
    const ids_user =
      sessionStorage.getItem('server') +
      '-' +
      sessionStorage.getItem('id') +
      '';
    const nombre = this.nombre;
    const valor_inferior = this.valorInf;
    const valor_superior = this.valorSup;
    const unidad = parseInt((<HTMLSelectElement>document.getElementById('unidad')).value, 10);
  
    // Llamada a la API con los valores capturados
    this.Tf.IngresarNuevaTarifa(id_user, ids_user, nombre, valor_inferior, valor_superior, unidad).subscribe(
      (response) => {
        console.log('Estado actualizado correctamente:', response);

        //vuelvo a cargar la tabla principal post ingreso de una nueva tarifa
        this.getTableInfo();
        
        tarifaForm.resetForm();
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

    this.tableinfo.sort((a, b) => {
      let cellA, cellB;

      switch (columnIndex) {
        case 0: // Ordenar por nombre
          cellA = a.nombre.toLowerCase();
          cellB = b.nombre.toLowerCase();
          break;
        case 1: // Ordenar por valor inferior
          cellA = a.valor_inferior;
          cellB = b.valor_inferior;
          break;
        case 2: // Ordenar por valor superior
          cellA = a.valor_superior;
          cellB = b.valor_superior;
          break;
        case 3: // Ordenar por unidad
          cellA = a.unidad;
          cellB = b.unidad;
          break;
        default:
          return 0;
      }

      if (cellA < cellB) return this.isAsc ? -1 : 1;
      if (cellA > cellB) return this.isAsc ? 1 : -1;
      return 0;
    });
  }
}

