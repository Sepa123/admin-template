import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarUsuariosComponent} from './registrar-usuarios/registrar-usuarios.component'
import { GestionDeUsuarioYMantencionComponent } from './gestion-de-usuario-y-mantencion/gestion-de-usuario-y-mantencion.component';

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
        data : {
          title: "Registro Usuario"
        }
      },
      {
        path : 'gestion-de-usuario-y-mantencion',
        component : GestionDeUsuarioYMantencionComponent,
        data : {
          title: "Gestión y Mantención de Usuario"
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
