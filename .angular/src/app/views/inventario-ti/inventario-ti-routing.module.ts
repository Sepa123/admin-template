import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { MantenedoresComponent } from './mantenedores/mantenedores.component';
import { PermissionGuard } from '../../guard/permission.guard';

const routes: Routes = [
  {
      path: '',
      data:{
          title: "Inventario TI"
      },
      children:[
          {
              path:'mantenedores',
              component: MantenedoresComponent,
              canActivate :[PermissionGuard],
              data:{
                  title: "Mantenedores",
                  id_submenu: 81
              }
          },
          {
              path:'asignacion',
              component: AsignacionComponent,
              canActivate :[PermissionGuard],
              data :{
                  title: "Asignación de Equipo",
                  id_submenu: 82
              }
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioTiRoutingModule { }
