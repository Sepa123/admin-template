import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HoyComponent } from './hoy/hoy.component';
import { NsVerificadosComponent } from './ns-verificados/ns-verificados.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms'
    },
    children : [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'hoy',
        component: HoyComponent,
        data: {
          title: 'Hoy'
        }
      },
      {
        path: 'ns-verificados',
        component: NsVerificadosComponent,
        data: {
          title: 'Ns verificados'
        }
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
