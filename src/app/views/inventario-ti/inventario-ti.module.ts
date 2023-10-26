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
import {InventarioTiComponent} from './mantenedores/inventario-ti.component'
import { InventarioRoutingModule } from './inventario-ti-routing.module';
import {AsignacionTiComponent} from './asignacion/asignacion-ti.component'

@NgModule({
    declarations: [
        InventarioTiComponent,
        AsignacionTiComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      InventarioRoutingModule,
      ButtonGroupModule,
      ButtonModule,
      CardModule,
      DropdownModule,
      FormModule,
      GridModule,
      ListGroupModule,
      SharedModule,
      ModalModule
    ]
  })
  export class InventarioTIModule { }
  