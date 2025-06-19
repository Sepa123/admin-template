import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  // ButtonGroupModule,
  // ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  // ListGroupModule,
  // SharedModule
} from '@coreui/angular';


import { RecepcionRoutingModule } from './recepcion-routing.module';
import { RecepcionEasyCdComponent } from './recepcion-easy-cd/recepcion-easy-cd.component';
import { RecepcionEasyOplComponent } from './recepcion-easy-opl/recepcion-easy-opl.component';
import { RecepcionElectroluxComponent } from './recepcion-electrolux/recepcion-electrolux.component';
import { RecepcionSportexComponent } from './recepcion-sportex/recepcion-sportex.component';
import { ModalModule } from '@coreui/angular';
import { ProductoSinRecepcionComponent } from './producto-sin-recepcion/producto-sin-recepcion.component';


@NgModule({
  declarations: [
    RecepcionEasyCdComponent,
    RecepcionEasyOplComponent,
    RecepcionElectroluxComponent,
    RecepcionSportexComponent,
    ProductoSinRecepcionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecepcionRoutingModule,
    // ButtonGroupModule,
    // ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    // ListGroupModule,
    // SharedModule,
    ModalModule
  ]
})
export class RecepcionModule { }
