import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RazonSocial } from 'src/app/models/modalidad-de-operaciones.interface';
import { CentroOperacion } from 'src/app/models/operacion/centroOperacion.interface';
import { ModalidadDeOperacionesService } from 'src/app/service/modalidad-de-operaciones.service';
import { RegistrarUsuarioService } from 'src/app/service/registrar-usuario.service'
import { MeliService } from 'src/app/service/meli.service'
import { Prefactura,ResumenPrefactura } from "src/app/models/meli/prefactura.interface"
import * as XLSX from 'xlsx';


interface Ruta {
  Descripcion: string;
  IdRuta: string;
  FechaInicio: string;
  FechaFin: string;
  Patente: string;
  Conductor: string;
  Cantidad: string;
  PrecioUnitario: string;
  [key: string]: string;
}

@Component({
  selector: 'app-seguimiento-diario',
  templateUrl: './seguimiento-diario.component.html',
  styleUrls: ['./seguimiento-diario.component.scss']
})
export class SeguimientoDiarioComponent {

  constructor(private service: MeliService) { }

  inputText: string = '';
  datos: Ruta[] = [];

  idUsuario = sessionStorage.getItem('id')+""
  idsUsuario = sessionStorage.getItem('server')+'-'+this.idUsuario

  procesarDatos() {
    const filas = this.inputText.trim().split('\n');
    const mapaRuta: { [key: string]: Ruta } = {};

    this.datos.forEach(ruta => {
      mapaRuta[ruta.IdRuta] = ruta;
    });

    filas.forEach(fila => {
      const valores = fila.split('\t');
      const ruta: Ruta = {
        Descripcion: valores[0],
        IdRuta: valores[1],
        FechaInicio: valores[2],
        FechaFin: valores[3],
        Patente: valores[4],
        Conductor: valores[5],
        Cantidad: valores[6],
        PrecioUnitario: valores[7],
      };

      if (mapaRuta[ruta.IdRuta]) {
        Object.assign(mapaRuta[ruta.IdRuta], ruta);
      } else {
        this.datos.push(ruta);
      }
    });

    console.log(this.datos)

    this.inputText = ''; // Limpiar el área de texto
  }

  guardarDatos() {
    const jsonDatos = JSON.stringify(this.datos);
    console.log(jsonDatos);
    alert('Datos guardados con éxito (simulado)');
  }

  updateCell(event: any, index: number, field: string) {
    const value = event.target.innerText;
    if(field )
    this.datos[index][field] = value+'';
  }


}
