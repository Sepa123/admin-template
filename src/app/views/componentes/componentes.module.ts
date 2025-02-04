import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesRoutingModule } from './componentes-routing.module';
import { ActivoGpsComponent } from './activo-gps/activo-gps.component';


@NgModule({
  declarations: [
    ActivoGpsComponent
  ],
  imports: [
    CommonModule,
    ComponentesRoutingModule
  ],
  exports :[ActivoGpsComponent]
})
export class ComponentesModule { }
