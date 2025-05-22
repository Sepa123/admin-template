import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbPaginationModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
  NavModule,
  TabsModule,
} from '@coreui/angular';

import { ModalModule } from '@coreui/angular';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { FormsRoutingModule } from './forms-routing.module';
import { RangesComponent } from './ranges/ranges.component';
import { FloatingLabelsComponent } from './floating-labels/floating-labels.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { ChecksRadiosComponent } from './checks-radios/checks-radios.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { LayoutComponent } from './layout/layout.component';
import { ValidationComponent } from './validation/validation.component';
import { RecepcionOplComponent } from './recepcion-opl/recepcion-opl.component';
import { BuscarSkuComponent } from './buscar-sku/buscar-sku.component';
import { EditarRutaComponent } from './editar-ruta/editar-ruta.component';
import { RutaManualComponent } from './ruta-manual/ruta-manual.component';
import { RutasActivasComponent } from './rutas-activas/rutas-activas.component';
import { AsignarRutaComponent } from './asignar-ruta/asignar-ruta.component';
import { QuadmindsComponent } from './quadminds/quadminds.component';
import { CargaQuadmindComponent } from './carga-quadmind/carga-quadmind.component';
import { PrearmadoRutaComponent } from './prearmado-ruta/prearmado-ruta.component';
import { BuscarRutaComponent } from './buscar-ruta/buscar-ruta.component';
import { ResumenRutasComponent } from './resumen-rutas/resumen-rutas.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PendientesObligadosComponent } from './pendientes-obligados/pendientes-obligados.component';
import {NgbRating} from '@ng-bootstrap/ng-bootstrap';
import { CargaRutasManualesComponent } from './carga-rutas-manuales/carga-rutas-manuales.component';
import { CargaGuiasManualesComponent } from './carga-guias-manuales/carga-guias-manuales.component'

@NgModule({
  declarations: [
    RangesComponent,
    FloatingLabelsComponent,
    FormControlsComponent,
    ChecksRadiosComponent,
    InputGroupsComponent,
    LayoutComponent,
    ValidationComponent,
    RecepcionOplComponent,
    BuscarSkuComponent,
    EditarRutaComponent,
    RutaManualComponent,
    RutasActivasComponent,
    AsignarRutaComponent,
    QuadmindsComponent,
    CargaQuadmindComponent,
    PrearmadoRutaComponent,
    BuscarRutaComponent,
    ResumenRutasComponent,
    PendientesObligadosComponent,
    CargaRutasManualesComponent,
    CargaGuiasManualesComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    DragDropModule,
    FormsRoutingModule,
    DocsComponentsModule,
    CardModule,
    FormModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule,
    NgbAlertModule, NgbPaginationModule, NgbDatepickerModule,
    NgSelectModule,
    FullCalendarModule,
    NgbRating,
    NavModule,
    TabsModule
  ]
})
export class CoreUIFormsModule {
}
