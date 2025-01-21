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

  SendTarifaform(tarifaForm: NgForm) {
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
        this.mostrarAlerta('Tarifa ingresada correctamente', 'success');

        //vuelvo a cargar la tabla principal post ingreso de una nueva tarifa
        this.getTableInfo();
        
        tarifaForm.resetForm();
      },
      (error) => {
        this.mostrarAlerta('Error al ingresar la tarifa', 'error');
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
}

