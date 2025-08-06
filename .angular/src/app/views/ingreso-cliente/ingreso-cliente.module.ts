import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  // ButtonGroupModule,
  // ButtonModule,
  // CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  // ListGroupModule,
  // SharedModule,
  TabsModule,
  NavModule
} from '@coreui/angular';

import { IngresoClienteRoutingModule } from './ingreso-cliente-routing.module';
import { EasyCdComponent } from './easy-cd/easy-cd.component';
import { EasyOplComponent } from './easy-opl/easy-opl.component';
import { ModalModule } from '@coreui/angular';
import { EasyOplNewComponent } from './easy-opl-new/easy-opl-new.component';

@NgModule({
  declarations: [
    EasyCdComponent,
    EasyOplComponent,
    EasyOplNewComponent
  ],
  imports: [
    CommonModule,
    IngresoClienteRoutingModule,
    // ButtonGroupModule,
    // ButtonModule,
    // CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    // ListGroupModule,
    // SharedModule,
    FormsModule, ReactiveFormsModule,
    ModalModule,
    TabsModule,
    NavModule
  ]
})
export class IngresoClienteModule { }
