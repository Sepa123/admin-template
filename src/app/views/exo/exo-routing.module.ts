import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelServicioComponent } from './nivel-servicio/nivel-servicio.component';
import { NsDriverComponent } from './ns-driver/ns-driver.component';
import { NsEasyComponent } from './ns-easy/ns-easy.component';
import { NsElectroluxComponent } from './ns-electrolux/ns-electrolux.component';
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
        data: {
          title: 'NIvel Servicio',
        },
      },
      {
        path: 'ns-driver',
        component: NsDriverComponent,
        data: {
          title: 'NIvel Servicio Driver',
        },
      },
      {
        path: 'ns-easy',
        component: NsEasyComponent,
        data: {
          title: 'NIvel Servicio Easy',
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
