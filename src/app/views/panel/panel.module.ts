import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarUsuariosComponent } from './registrar-usuarios/registrar-usuarios.component';
import { PanelRoutingModule } from './panel-routing.module';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionDeUsuarioYMantencionComponent } from './gestion-de-usuario-y-mantencion/gestion-de-usuario-y-mantencion.component';
import { ModalModule } from '@coreui/angular';  // Importación de CoreUI Modal
import { NgSelectModule } from '@ng-select/ng-select';
import { AsignacionPerfilComponent } from './asignacion-perfil/asignacion-perfil.component';

@NgModule({
  declarations: [RegistrarUsuariosComponent, GestionDeUsuarioYMantencionComponent, AsignacionPerfilComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ButtonModule, CardModule, FormModule, GridModule,
    FormsModule, ReactiveFormsModule,ModalModule,IconModule,NgSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PanelModule { }
