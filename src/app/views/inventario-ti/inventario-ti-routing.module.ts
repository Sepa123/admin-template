import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioTiComponent } from './mantenedores/inventario-ti.component';
import {AsignacionTiComponent} from './asignacion/asignacion-ti.component'
const routes : Routes = [
    {
        path: '',
        data:{
            title: "Inventario TI"
        },
        children:[
            {
                path:'mantenedores',
                component: InventarioTiComponent,
                data:{
                    title: "Mantenedores"
                }
            },
            {
                path:'asignacion',
                component: AsignacionTiComponent,
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
  export class InventarioRoutingModule { }
  