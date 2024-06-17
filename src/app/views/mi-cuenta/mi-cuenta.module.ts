import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';

import { MiCuentaRoutingModule } from './mi-cuenta-routing.module';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

import { ModalModule } from '@coreui/angular';

@NgModule({
  declarations: [
    SeguridadComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MiCuentaRoutingModule,
    ButtonModule, CardModule, FormModule, GridModule,
    ModalModule
  ]
})
export class MiCuentaModule { }
