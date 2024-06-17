import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, skipUntil, startWith, switchMap } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CitacionesService} from '../../../service/citaciones.service'
import { Estado } from '../../../models/mantenedores/estados.interface';

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

  eliminarPpu(ppu: string) {
    // Llamar a la API para eliminar la razón social por su ID
    this.http
      .delete(`http://localhost:8000/api/borrar?ppu=${ppu}`)
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

}
