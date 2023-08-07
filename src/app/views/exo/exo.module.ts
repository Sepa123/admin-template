import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExoRoutingModule } from './exo-routing.module';
import { NivelServicioComponent } from './nivel-servicio/nivel-servicio.component';

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



@NgModule({
  declarations: [
    NivelServicioComponent
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
    FormsModule, ReactiveFormsModule
  ]
})
export class ExoModule { }
