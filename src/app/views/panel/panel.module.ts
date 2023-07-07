import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarUsuariosComponent } from './registrar-usuarios/registrar-usuarios.component';
import { PanelRoutingModule } from './panel-routing.module';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegistrarUsuariosComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ButtonModule, CardModule, FormModule, GridModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class PanelModule { }
