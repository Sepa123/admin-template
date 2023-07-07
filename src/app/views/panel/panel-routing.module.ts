import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarUsuariosComponent} from './registrar-usuarios/registrar-usuarios.component'

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
