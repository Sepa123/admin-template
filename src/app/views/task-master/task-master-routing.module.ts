import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestorActivosComponent } from './gestor-activos/gestor-activos.component';
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
          data : {
            title : "Bitacora"
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
