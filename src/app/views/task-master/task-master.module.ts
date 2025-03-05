import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgSelectModule } from '@ng-select/ng-select';
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
import { NgChartsModule } from 'ng2-charts';

import { TaskMasterRoutingModule } from './task-master-routing.module';
import { GestorActivosComponent } from './gestor-activos/gestor-activos.component';


@NgModule({
  declarations: [
    GestorActivosComponent
  ],
  imports: [
    CommonModule,
    TaskMasterRoutingModule,
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
  ReactiveFormsModule,
  FormsModule,
  NgxPaginationModule,
  NgSelectModule
  ]
})
export class TaskMasterModule { }
