import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  UtilitiesModule
} from '@coreui/angular';

import { TocRoutingModule } from './toc-routing.module';
import { BitacoraTocComponent } from './bitacora-toc/bitacora-toc.component';
import { AlertasVigentesComponent } from './alertas-vigentes/alertas-vigentes.component';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { JefaturaComponent } from './jefatura/jefatura.component';
import { ModalModule } from '@coreui/angular';
import { NgChartsModule } from 'ng2-charts';
import { EditarTocComponent } from './editar-toc/editar-toc.component';
import { ReporteEntregaDiariaComponent } from './reporte-entrega.diaria/reporte-entrega.diaria.component';
<<<<<<< HEAD
=======
import { ReporteTelefonoComponent } from './reporte-telefono/reporte-telefono.component';
>>>>>>> c1cb59773de176a518b0158439f3c78500f09a42

@NgModule({
  declarations: [
    BitacoraTocComponent,
    AlertasVigentesComponent,
    JefaturaComponent,
    EditarTocComponent,
<<<<<<< HEAD
    ReporteEntregaDiariaComponent
=======
    ReporteEntregaDiariaComponent,
    ReporteTelefonoComponent
>>>>>>> c1cb59773de176a518b0158439f3c78500f09a42
  ],
  imports: [
    CommonModule,
    TocRoutingModule,
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
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    ChartjsModule,
    ModalModule,
    NgChartsModule
  ]
})
export class TocModule { }
