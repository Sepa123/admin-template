import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ButtonsRoutingModule } from './buttons-routing.module';
import { ModalModule } from '@coreui/angular';
import {
  ButtonGroupModule,
  TableModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavbarModule,
  NavModule,
  SharedModule,
  UtilitiesModule
} from '@coreui/angular';

// import { IconModule } from '@coreui/icons-angular';
import { ReportesComponent } from './reportes/reportes.component';
import { PendientesComponent } from './pendientes/pendientes.component';
import { EstadosComponent } from './estados/estados.component';
import { ProductosSinClasificacionComponent } from './productos-sin-clasificacion/productos-sin-clasificacion.component';
import { EdicionPendientesComponent } from './edicion-pendientes/edicion-pendientes.component';
import { DifFechasEasyComponent } from './dif-fechas-easy/dif-fechas-easy.component';
import { ProductosIngresadosEasyComponent } from './productos-ingresados-easy/productos-ingresados-easy.component';
import { PendientesEnRutaComponent } from './pendientes-en-ruta/pendientes-en-ruta.component';
import { EditarRutaComponent } from './editar-ruta/editar-ruta.component';

@NgModule({
  declarations: [
    ReportesComponent,
    PendientesComponent,
    EstadosComponent,
    ProductosSinClasificacionComponent,
    EdicionPendientesComponent,
    DifFechasEasyComponent,
    ProductosIngresadosEasyComponent,
    PendientesEnRutaComponent,
    EditarRutaComponent
  ],
  imports: [
    FormsModule,
    NgSelectModule,
    CommonModule,
    TableModule,
    ButtonsRoutingModule,
    ButtonModule,
    ButtonGroupModule,
    GridModule,
    // IconModule,
    ModalModule,
    CardModule,
    UtilitiesModule,
    DropdownModule,
    SharedModule,
    FormModule,
    ReactiveFormsModule,
    DocsComponentsModule,
    NavbarModule,
    CollapseModule,
    NavModule,
    NavbarModule
  ]
})
export class ButtonsModule {
}
