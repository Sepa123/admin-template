import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

const routes: Routes = [
  {
    path:'',
    data : {
      title: "Mi Cuenta"
    },
    children : [
      {
        path : 'seguridad',
        component : SeguridadComponent,
        data : {
          title : "seguridad"
        }
      },
      {
        path : 'settings',
        component : ConfiguracionComponent,
        data : {
          title : "Settings"
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiCuentaRoutingModule { }
