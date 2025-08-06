import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelServicioComponent } from './nivel-servicio/nivel-servicio.component';
import { NsDriverComponent } from './ns-driver/ns-driver.component';
import { NsEasyComponent } from './ns-easy/ns-easy.component';
import { NsElectroluxComponent } from './ns-electrolux/ns-electrolux.component';
import { PermissionGuard } from '../../guard/permission.guard';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Exo',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'nivel-servicio',
        component: NivelServicioComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'NIvel Servicio',
          id_submenu: 19
        },
      },
      {
        path: 'ns-driver',
        component: NsDriverComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'NIvel Servicio Driver',
          id_submenu: 20
        },
      },
      {
        path: 'ns-easy',
        component: NsEasyComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'NIvel Servicio Easy',
          id_submenu: 21
        },
      },
      {
        path: 'ns-electrolux',
        component: NsElectroluxComponent,
        data: {
          title: 'NIvel Servicio Electrolux',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExoRoutingModule { }
