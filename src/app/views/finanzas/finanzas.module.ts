import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanzasRoutingModule } from './finanzas-routing.module';
import { TarifarioComponent } from './tarifario/tarifario.component';
import { ModalModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { CarVehiculoComponent } from './car-vehiculo/car-vehiculo.component';
import { CarTarifarioEspecificoComponent } from './car-tarifario-especifico/car-tarifario-especifico.component';


@NgModule({
  declarations: [
    TarifarioComponent,
    CarVehiculoComponent,
    CarTarifarioEspecificoComponent
  ],
  imports: [
    CommonModule,
    FinanzasRoutingModule,
    ModalModule,
    FormsModule  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class FinanzasModule { }
