import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelServicioComponent } from './nivel-servicio/nivel-servicio.component';
import { NsDriverComponent } from './ns-driver/ns-driver.component';
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
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExoRoutingModule { }
