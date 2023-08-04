import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  GridModule,
  ListGroupModule,
  TableModule,
  UtilitiesModule
} from '@coreui/angular';

// utils
import { DocsComponentsModule } from '@docs-components/docs-components.module';

// views

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { ReportesComponent } from './reportes/reportes.component';

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule,
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
  ],
  declarations: [
    ReportesComponent,
  ],
})
export class BaseModule {}
