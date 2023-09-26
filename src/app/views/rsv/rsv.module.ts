import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { ModalModule } from '@coreui/angular';

import { RsvRoutingModule } from './rsv-routing.module';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { CrearCargaComponent } from './crear-carga/crear-carga.component';
import { VentasComponent } from './ventas/ventas.component';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { ListarCargaComponent } from './listar-carga/listar-carga.component';


@NgModule({
  declarations: [
    CatalogoComponent,
    AgregarProductoComponent,
    CrearCargaComponent,
    VentasComponent,
    RecepcionComponent,
    ListarCargaComponent
  ],
  imports: [
    CommonModule,
    RsvRoutingModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    ModalModule
  ]
})
export class RsvModule { }
