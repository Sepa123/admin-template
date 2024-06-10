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
  UtilitiesModule,
  ModalModule
} from '@coreui/angular';

import { InformacionRoutingModule } from './informacion-routing.module';
import { EstadoComponent } from './estado/estado.component';
import { BuscarSkuComponent } from './buscar-sku/buscar-sku.component';
import { TrackingProductoComponent } from './tracking-producto/tracking-producto.component';
import { IngresoProductoComponent } from './ingreso-producto/ingreso-producto.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ModalidadesDeOperacionesComponent } from './modalidades-de-operaciones/modalidades-de-operaciones.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgChartsModule } from 'ng2-charts';
import { PesoVolumetricoComponent } from './peso-volumetrico/peso-volumetrico.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
  declarations: [
    EstadoComponent,
    BuscarSkuComponent,
    TrackingProductoComponent,
    IngresoProductoComponent,
    TimelineComponent,
    ModalidadesDeOperacionesComponent,
    PesoVolumetricoComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    NgSelectModule,FormsModule,
    ReactiveFormsModule,ListGroupModule,
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
    UtilitiesModule,
    ModalModule,
    NgChartsModule,
    MatAutocompleteModule
  ]
})
export class InformacionModule { }
