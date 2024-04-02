import { NgModule} from '@angular/core';
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
import { AreaTiRoutingModule } from './area-ti-routing.module';
import { FuncionesComponent } from './funciones/funciones.component';
import { AgregarFuncionComponent } from './agregar-funcion/agregar-funcion.component';


@NgModule({
  declarations: [
    FuncionesComponent,
    AgregarFuncionComponent
  ],
  imports: [
    CommonModule,
    AreaTiRoutingModule,
    FormsModule, ReactiveFormsModule,
    ModalModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule
  ]
})
export class AreaTiModule { }
