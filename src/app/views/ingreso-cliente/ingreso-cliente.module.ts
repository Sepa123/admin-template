import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { IngresoClienteRoutingModule } from './ingreso-cliente-routing.module';
import { EasyCdComponent } from './easy-cd/easy-cd.component';


@NgModule({
  declarations: [
    EasyCdComponent
  ],
  imports: [
    CommonModule,
    IngresoClienteRoutingModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class IngresoClienteModule { }
