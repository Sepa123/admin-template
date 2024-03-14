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
<<<<<<< HEAD

=======
>>>>>>> c1cb59773de176a518b0158439f3c78500f09a42

@NgModule({
  declarations: [
    EstadoComponent,
    BuscarSkuComponent,
    TrackingProductoComponent,
    IngresoProductoComponent,
    TimelineComponent,
<<<<<<< HEAD
    
=======
>>>>>>> c1cb59773de176a518b0158439f3c78500f09a42
  ],
  imports: [
    CommonModule,
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
    ModalModule
  ]
})
export class InformacionModule { }
