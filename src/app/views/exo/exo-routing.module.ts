import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelServicioComponent } from './nivel-servicio/nivel-servicio.component';


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
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExoRoutingModule { }
