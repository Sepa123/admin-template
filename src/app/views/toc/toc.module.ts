import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonGroupModule,
  TableModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavbarModule,
  NavModule,
  SharedModule,
  UtilitiesModule
} from '@coreui/angular';

import { TocRoutingModule } from './toc-routing.module';
import { BitacoraTocComponent } from './bitacora-toc/bitacora-toc.component';
import { AlertasVigentesComponent } from './alertas-vigentes/alertas-vigentes.component';


@NgModule({
  declarations: [
    BitacoraTocComponent,
    AlertasVigentesComponent
  ],
  imports: [
    CommonModule,
    TocRoutingModule,
    ButtonGroupModule,
    TableModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    NavbarModule,
    NavModule,
    SharedModule,
    UtilitiesModule,
    FormsModule, ReactiveFormsModule,
    NgSelectModule
  ]
})
export class TocModule { }
