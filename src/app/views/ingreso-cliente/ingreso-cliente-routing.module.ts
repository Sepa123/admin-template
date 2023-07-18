import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EasyCdComponent } from '../ingreso-cliente/easy-cd/easy-cd.component'

const routes: Routes = [
  {
    path:'',
    data : {
      title: "Ingreso"
    },
    children : [
      {
        path : 'easy-cd',
        component : EasyCdComponent,
        data : {
          title : "Ingreso Easy CD"
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoClienteRoutingModule { }
