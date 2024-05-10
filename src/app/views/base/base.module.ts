import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalModule } from '@coreui/angular';
import { NgChartsModule } from 'ng2-charts';

// import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  GridModule,
  ListGroupModule,
  TableModule,
  UtilitiesModule,
  CardModule,
  DropdownModule,
  TabsModule,
  NavModule
} from '@coreui/angular';
import { NgSelectModule } from '@ng-select/ng-select';

// utils
import { DocsComponentsModule } from '@docs-components/docs-components.module';

// views

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { ReportesComponent } from './reportes/reportes.component';
import { TestComponent } from './test/test.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule,
    ModalModule,
    CommonModule,
    BaseRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    ListGroupModule,
    ListGroupModule,
    TableModule,
    DocsComponentsModule,
    DropdownModule,
    NgSelectModule,
    FullCalendarModule,
    TabsModule,
    NavModule,
    NgChartsModule
  ],
  declarations: [
    ReportesComponent,
    TestComponent,
    ColaboradoresComponent
  ],
})
export class BaseModule {}
