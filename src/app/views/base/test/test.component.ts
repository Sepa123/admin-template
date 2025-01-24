import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrarUsuarioService } from 'src/app/service/registrar-usuario.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  p: number = 1;  // Página actual
  itemsPerPage: number = 10;   // Registros por página
  totalItems: number = 1000;   // Total de registros
  items: any[] = [];           // Todos los registros (pueden ser más de 1000)
  pagedItems: any[] = [];      // Registros filtrados según la página actual

  constructor() {
    // Generamos 1000 registros de ejemplo
    this.items = this.generateFakeData(1000);
    this.updatePagedItems(); // Inicializamos los registros a mostrar
  }

  // Generar datos de ejemplo
  generateFakeData(count: number): any[] {
    let data = [];
    for (let i = 1; i <= count; i++) {
      data.push({ nombre: `Nombre ${i}`, edad: 20 + (i % 40), ciudad: `Ciudad ${i}` });
    }
    return data;
  }

  // Actualizar los registros visibles según la página actual
  updatePagedItems() {
    const startIndex = (this.p - 1) * this.itemsPerPage;  // Índice inicial
    const endIndex = this.p * this.itemsPerPage;           // Índice final
    this.pagedItems = this.items.slice(startIndex, endIndex); // Filtrar los registros
  }

  // Método para manejar el cambio de página
  onPageChange(page: number) {
    this.p = page; // Actualizamos la página
    this.updatePagedItems(); // Actualizamos los registros a mostrar
  }
}