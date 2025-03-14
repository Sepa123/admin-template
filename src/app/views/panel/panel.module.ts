import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarUsuariosComponent } from './registrar-usuarios/registrar-usuarios.component';
import { PanelRoutingModule } from './panel-routing.module';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionDeUsuarioYMantencionComponent } from './gestion-de-usuario-y-mantencion/gestion-de-usuario-y-mantencion.component';


@NgModule({
  declarations: [RegistrarUsuariosComponent, GestionDeUsuarioYMantencionComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ButtonModule, CardModule, FormModule, GridModule,
    FormsModule, ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PanelModule { }
