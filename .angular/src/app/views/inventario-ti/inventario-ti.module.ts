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
// import {InventarioTiComponent} from './mantenedores/inventario-ti.component'
import { InventarioTiRoutingModule } from './inventario-ti-routing.module';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { MantenedoresComponent } from './mantenedores/mantenedores.component';
// import {AsignacionTiComponent} from './asignacion/asignacion-ti.component'

@NgModule({
    declarations: [
        // InventarioTiComponent,
        // AsignacionTiComponent
    
        AsignacionComponent,
        MantenedoresComponent
  ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      InventarioTiRoutingModule,
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
export class InventarioTiModule { }
