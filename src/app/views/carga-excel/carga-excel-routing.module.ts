import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EasyCdComponent } from '../carga-excel/easy-cd/easy-cd.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Carga'
    },
    children : [
      {
        path : 'easy-cd',
        component : EasyCdComponent,
        data : {
          title: "Carga easy CD"
        }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaExcelRoutingModule { }
