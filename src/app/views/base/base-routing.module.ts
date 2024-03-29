import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportesComponent } from './reportes/reportes.component';

import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'reportes',
        component: ReportesComponent,
        data: {
          title: 'Reportes',
        },
      },    
      {
        path: 'test',
        component: TestComponent,
        data: {
          title: 'rest',
        },
      }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

