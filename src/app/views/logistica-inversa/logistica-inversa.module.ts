import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from '@coreui/angular';
import {
  ButtonGroupModule,
  TableModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavbarModule,
  NavModule,
  SharedModule,
  UtilitiesModule
} from '@coreui/angular';

import { LogisticaInversaRoutingModule } from './logistica-inversa-routing.module';
import { EdicionPendientesComponent } from './edicion-pendientes/edicion-pendientes.component';


@NgModule({
  declarations: [
    EdicionPendientesComponent
  ],
  imports: [
    CommonModule,
    LogisticaInversaRoutingModule,
    ModalModule,
    NgSelectModule,
    ReactiveFormsModule,
    DocsComponentsModule,
    FormsModule,
    ButtonGroupModule,
    TableModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    DropdownModule,
    FormModule,
    GridModule,
    NavbarModule,
    NavModule,
    SharedModule,
   UtilitiesModule
  ]
})
export class LogisticaInversaModule { }
