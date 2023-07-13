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

import { InformacionRoutingModule } from './informacion-routing.module';
import { EstadoComponent } from './estado/estado.component';
import { BuscarSkuComponent } from './buscar-sku/buscar-sku.component';


@NgModule({
  declarations: [
    EstadoComponent,
    BuscarSkuComponent,
    
  ],
  imports: [
    CommonModule,
    NgSelectModule,FormsModule,
    ReactiveFormsModule,
    InformacionRoutingModule,
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
export class InformacionModule { }
