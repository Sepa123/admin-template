import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EasyCdComponent } from '../ingreso-cliente/easy-cd/easy-cd.component'
import { EasyOplComponent } from './easy-opl/easy-opl.component';

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
      {
        path : 'easy-opl',
        component : EasyOplComponent,
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
