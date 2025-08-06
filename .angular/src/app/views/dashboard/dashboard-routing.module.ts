import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HoyComponent } from './hoy/hoy.component';
import { NsVerificadosComponent } from './ns-verificados/ns-verificados.component';
import { PermissionGuard } from '../../guard/permission.guard';

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
        canActivate :[PermissionGuard],
        data: {
          title: 'Dashboard',
          id_submenu: 8
        }
      },
      {
        path: 'hoy',
        component: HoyComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'Hoy',
          id_submenu: 10
        }
      },
      {
        path: 'ns-verificados',
        component: NsVerificadosComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'Ns verificados',
          id_submenu: 9
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
