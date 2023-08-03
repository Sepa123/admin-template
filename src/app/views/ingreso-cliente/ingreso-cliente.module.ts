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
import { EasyOplComponent } from './easy-opl/easy-opl.component';
import { ModalModule } from '@coreui/angular';

@NgModule({
  declarations: [
    EasyCdComponent,
    EasyOplComponent
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
    FormsModule, ReactiveFormsModule,
    ModalModule
  ]
})
export class IngresoClienteModule { }
