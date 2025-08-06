import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { ModalModule } from '@coreui/angular';
import { AreaTiRoutingModule } from './area-ti-routing.module';
import { FuncionesComponent } from './funciones/funciones.component';
import { AgregarFuncionComponent } from './agregar-funcion/agregar-funcion.component';
import { ScanTestComponent } from './scan-test/scan-test.component';
import { CamaraTestComponent } from './camara-test/camara-test.component';
import { WebcamModule } from 'ngx-webcam';
import { EstadosOldComponent } from './estados-old/estados-old.component';

@NgModule({
  declarations: [
    FuncionesComponent,
    AgregarFuncionComponent,
    ScanTestComponent,
    CamaraTestComponent,
     EstadosOldComponent
  ],
  imports: [
    CommonModule,
    AreaTiRoutingModule,
    FormsModule, ReactiveFormsModule,
    ModalModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    WebcamModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
    ],
})
export class AreaTiModule { }
