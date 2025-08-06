import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EasyCdComponent } from '../ingreso-cliente/easy-cd/easy-cd.component'
import { EasyOplComponent } from './easy-opl/easy-opl.component';
import { EasyOplNewComponent } from './easy-opl-new/easy-opl-new.component';
import { PermissionGuard } from '../../guard/permission.guard';

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
        canActivate :[PermissionGuard],
        data : {
          title : "Ingreso Easy CD",
          id_submenu: 62
        }
      },
      // {
      //   path : 'easy-opl',
      //   component : EasyOplComponent,
      //   data : {
      //     title : "Ingreso Easy CD"
      //   }
      // },
      {
        path : 'easy-opl-new',
        component : EasyOplNewComponent,
        data : {
          title : "Ingreso Easy CD"
        }
      },
      {
        path : 'easy-opl',
        component : EasyOplNewComponent,
        canActivate :[PermissionGuard],
        data : {
          title : "Ingreso Easy CD",
          id_submenu: 63
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
