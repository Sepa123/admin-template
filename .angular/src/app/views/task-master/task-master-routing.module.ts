import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestorActivosComponent } from './gestor-activos/gestor-activos.component';
import { PermissionGuard } from '../../guard/permission.guard';
const routes: Routes = [
  {
      path:'',
      data : {
        title: "Bitacora"
      },
      children : [
        {
          path : 'gestor-activos',
          component : GestorActivosComponent,
          canActivate :[PermissionGuard],
          data : {
            title : "Bitacora",
            id_submenu: 11
          }
        },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskMasterRoutingModule { }
