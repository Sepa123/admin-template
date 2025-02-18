import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesRoutingModule } from './componentes-routing.module';
import { ActivoGpsComponent } from './activo-gps/activo-gps.component';
import { WorkingComponent } from './working/working.component';


@NgModule({
  declarations: [
    ActivoGpsComponent,
    WorkingComponent
  ],
  imports: [
    CommonModule,
    ComponentesRoutingModule
  ],
  exports :[ActivoGpsComponent,WorkingComponent]
})
export class ComponentesModule { }
