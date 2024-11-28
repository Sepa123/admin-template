import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanzasRoutingModule } from './finanzas-routing.module';
import { TarifarioComponent } from './tarifario/tarifario.component';
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
  ModalModule,
  PaginationModule,
  ProgressComponent,
  ProgressBarComponent
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { CarVehiculoComponent } from './car-vehiculo/car-vehiculo.component';
import { CarTarifarioEspecificoComponent } from './car-tarifario-especifico/car-tarifario-especifico.component';
import { TarifarioGeneralComponent } from './tarifario-general/tarifario-general.component';
import { RutasMeliComponent } from './rutas-meli/rutas-meli.component';

@NgModule({
  declarations: [
    TarifarioComponent,
    CarVehiculoComponent,
    CarTarifarioEspecificoComponent,
    TarifarioGeneralComponent,
    RutasMeliComponent
  ],
  imports: [
    CommonModule,
    FinanzasRoutingModule,
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
  ModalModule,
  PaginationModule,
  ProgressComponent,
  ProgressBarComponent,
    FormsModule  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class FinanzasModule { }
