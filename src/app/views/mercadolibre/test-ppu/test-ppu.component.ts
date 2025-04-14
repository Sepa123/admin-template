import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Tesseract from 'tesseract.js';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaginationService } from 'ngx-pagination';
@Component({
  selector: 'app-test-ppu',
  templateUrl: './test-ppu.component.html',
  styleUrls: ['./test-ppu.component.scss']
})
export class TestPPUComponent {
  // Definir la variable para la página
  p: number = 1;

  // Datos de ejemplo para la tabla
  items = [
    { nombre: 'Juan', edad: 30, ciudad: 'Madrid' },
    { nombre: 'Ana', edad: 25, ciudad: 'Barcelona' },
    { nombre: 'Carlos', edad: 35, ciudad: 'Sevilla' },
    { nombre: 'Marta', edad: 28, ciudad: 'Valencia' },
    { nombre: 'Pedro', edad: 40, ciudad: 'Bilbao' },
    { nombre: 'Laura', edad: 32, ciudad: 'Granada' },
    { nombre: 'Luis', edad: 29, ciudad: 'Zaragoza' },
    { nombre: 'Lucía', edad: 33, ciudad: 'Alicante' },
    { nombre: 'Marcos', edad: 22, ciudad: 'Malaga' },
    { nombre: 'Sofía', edad: 27, ciudad: 'Cádiz' },
    { nombre: 'Isabel', edad: 36, ciudad: 'Castellón' },
    { nombre: 'José', edad: 38, ciudad: 'Gijón' }
    // Agregar más datos según lo necesites
  ];
}