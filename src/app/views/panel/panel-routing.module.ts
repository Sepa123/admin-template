import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarUsuariosComponent} from './registrar-usuarios/registrar-usuarios.component'
import { GestionDeUsuarioYMantencionComponent } from './gestion-de-usuario-y-mantencion/gestion-de-usuario-y-mantencion.component';
import { PermissionGuard } from '../../guard/permission.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Panel Administrador'
    },
    children : [
      {
        path : 'registro-usuario',
        component : RegistrarUsuariosComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Registro Usuario",
          id_submenu: 79
        }
      },
      {
        path : 'gestion-de-usuario-y-mantencion',
        component : GestionDeUsuarioYMantencionComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Gestión y Mantención de Usuario",
          id_submenu: 80
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
