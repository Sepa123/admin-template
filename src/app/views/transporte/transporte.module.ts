import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgChartsModule } from 'ng2-charts';

// import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// CoreUI Modules
import {
  ModalModule,
  // AccordionModule,
  // BadgeModule,
  // BreadcrumbModule,
  ButtonModule,
  GridModule,
  // ListGroupModule,
  TableModule,
  UtilitiesModule,
  // CardModule,
  DropdownModule,
  TabsModule,
  NavModule,
  FormModule,
} from '@coreui/angular';
import { NgSelectModule } from '@ng-select/ng-select';

// utils
// import { DocsComponentsModule } from '@docs-components/docs-components.module';

// views

// Components Routing
import { TransporteRoutingModule } from './transporte-routing.module';
import { ReportesComponent } from './reportes/reportes.component';
import { TestComponent } from './test/test.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TripulacionComponent } from './tripulacion/tripulacion.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { GestionGpsComponent } from './gestion-gps/gestion-gps.component'
// import {NgbRating} from '@ng-bootstrap/ng-bootstrap';
import { ReclutamientoComponent } from './reclutamiento/reclutamiento.component'
import { VentaOTraspasoDeVehiculoComponent } from './venta-o-traspaso-de-vehiculo/venta-o-traspaso-de-vehiculo.component'
import { WebcamModule } from 'ngx-webcam';
@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule,
    ModalModule,
    CommonModule,
    WebcamModule,
    TransporteRoutingModule,
    // AccordionModule,
    // BadgeModule,
    // BreadcrumbModule,
    // ListGroupModule,
    // CardModule,
    TabsModule,
    ButtonModule,
    
    GridModule,
    UtilitiesModule,
    
    TableModule,
    // DocsComponentsModule,
    DropdownModule,
    NgSelectModule,
    FullCalendarModule,
    
    NavModule,
    NgChartsModule,
    MatSlideToggleModule,
    // NgbRating,
    FormModule,
  ],
  declarations: [
    ReportesComponent,
    TestComponent,
    ColaboradoresComponent,
    VehiculosComponent,
    UsuariosComponent,
    TripulacionComponent,
    BuscadorComponent,
    GestionGpsComponent,
    ReclutamientoComponent,
    VentaOTraspasoDeVehiculoComponent
  ],
})
export class TransporteModule {}
