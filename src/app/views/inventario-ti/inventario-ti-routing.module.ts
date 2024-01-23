import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { MantenedoresComponent } from './mantenedores/mantenedores.component';

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
              data:{
                  title: "Mantenedores"
              }
          },
          {
              path:'asignacion',
              component: AsignacionComponent,
              data :{
                  title: "Asignación de Equipo"
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
