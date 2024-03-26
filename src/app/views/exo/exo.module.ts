import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExoRoutingModule } from './exo-routing.module';
import { NivelServicioComponent } from './nivel-servicio/nivel-servicio.component';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ModalModule } from '@coreui/angular';

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
import { NsDriverComponent } from './ns-driver/ns-driver.component';



@NgModule({
  declarations: [
    NivelServicioComponent,
    NsDriverComponent
  ],
  imports: [
    CommonModule,
    ExoRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    GridModule,
    ListGroupModule,
    TableModule,
    UtilitiesModule,
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    ChartjsModule,
    ModalModule,
    NgChartsModule
  ]
})
export class ExoModule { }
