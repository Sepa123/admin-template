import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {NgbRating} from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router';
import { RutasService } from 'src/app/service/rutas.service';
import { NombreRutaService } from 'src/app/service/nombre-ruta.service';
import { RutasAsignadas } from 'src/app/models/rutaAsignada.interface'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { VehiculoDisponible } from 'src/app/models/rutas/vehiculosDisponibles.interface'
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnChanges {

  currentRating = 3

  @Input() rating: number = 0;
  @Input() totalStars: number = 5;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  stars: boolean[] = [];

  ngOnChanges(): void {
    this.stars = Array(this.totalStars).fill(false).map((_, i) => i < this.rating);
  }

  rate(rating: number): void {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
  }
}
