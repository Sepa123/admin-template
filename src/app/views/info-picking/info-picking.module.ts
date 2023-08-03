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
  NavbarModule,
  NavModule,
  SharedModule,
  UtilitiesModule
} from '@coreui/angular';

import { InfoPickingRoutingModule } from './info-picking-routing.module';
import { BuscarSkuComponent } from './buscar-sku/buscar-sku.component';
import { EstadoComponent } from './estado/estado.component';


@NgModule({
  declarations: [
    BuscarSkuComponent,
    EstadoComponent
  ],
  imports: [
    CommonModule,
    InfoPickingRoutingModule,
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
    UtilitiesModule,
    FormsModule, ReactiveFormsModule,
    NgSelectModule
  ]
})
export class InfoPickingModule { }
