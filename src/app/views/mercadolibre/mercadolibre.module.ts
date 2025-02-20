import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
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
import { InfoMercadoLibreComponent } from './info-mercado-libre/info-mercado-libre.component';
import { MercadolibreRoutingModule } from './mercadolibre-routing.module';
import { CitacionesComponent } from './citaciones/citaciones.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListaSupervisoresComponent } from './lista-supervisores/lista-supervisores.component';
import { PrefacturaComponent } from './prefactura/prefactura.component';
import { PrefacturaMensualComponent } from './prefactura-mensual/prefactura-mensual.component';
import { SeguimientoDiarioComponent } from './seguimiento-diario/seguimiento-diario.component';
import { PrefacturaDiariaComponent } from './prefactura-diaria/prefactura-diaria.component';
import { CitacionesActivasComponent } from './citaciones-activas/citaciones-activas.component';
import { CitacionSupervisoresComponent } from './citacion-supervisores/citacion-supervisores.component';
import { NgChartsModule } from 'ng2-charts';
import { NsSupervisoresComponent } from './ns-supervisores/ns-supervisores.component';
import { TestPPUComponent } from './test-ppu/test-ppu.component';
import { WebcamModule } from 'ngx-webcam';
@NgModule({
  declarations: [
    
    InfoMercadoLibreComponent,
    CitacionesComponent,
    ListaSupervisoresComponent,
    PrefacturaComponent,
    PrefacturaMensualComponent,
    SeguimientoDiarioComponent,
    PrefacturaDiariaComponent,
    CitacionesActivasComponent,
    CitacionSupervisoresComponent,
    NsSupervisoresComponent,
    TestPPUComponent
    
  ],
  imports: [
    ProgressComponent,
    PaginationModule,
    ProgressBarComponent,
    CommonModule,
    MercadolibreRoutingModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    MatExpansionModule,
    SharedModule,
    UtilitiesModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DocsComponentsModule,
    NavbarModule,
    NavModule,
    ModalModule,
    TableModule,
    CollapseModule,
    NgChartsModule,
    WebcamModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class MercadolibreModule { }