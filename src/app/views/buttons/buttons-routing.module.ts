import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportesComponent } from './reportes/reportes.component';
import { PendientesComponent } from './pendientes/pendientes.component';
import { EstadosComponent } from './estados/estados.component';
import { ProductosSinClasificacionComponent } from './productos-sin-clasificacion/productos-sin-clasificacion.component';
import { EdicionPendientesComponent } from './edicion-pendientes/edicion-pendientes.component';
import { DifFechasEasyComponent } from './dif-fechas-easy/dif-fechas-easy.component';
import { ProductosIngresadosEasyComponent } from './productos-ingresados-easy/productos-ingresados-easy.component';
import { PendientesEnRutaComponent } from './pendientes-en-ruta/pendientes-en-ruta.component';
import { EditarRutaComponent } from './editar-ruta/editar-ruta.component';
import { PermissionGuard } from '../../guard/permission.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Buttons'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'buttons'
      },
      {
        path: 'estados',
        component: EstadosComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'Estados',
          id_submenu: 23
        }
      },
      {
        path: 'pendientes',
        component: PendientesComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'Pendientes',
          id_submenu: 22
        }
      },
      {
        path: 'productos-sin-clasificacion',
        component: ProductosSinClasificacionComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'Productos sin clasificacion',
          id_submenu: 24
        }
      },
      {
        path: 'reportes',
        component: ReportesComponent,
        data: {
          title: 'Reportes'
        }
      },
      {
        path: 'edicion-pendientes',
        component: EdicionPendientesComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'Edicion Pendientes',
          id_submenu: 25
        }
      },
      {
        path: 'dif-fechas-easy',
        component: DifFechasEasyComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'Diferencia Fechas Easy',
          id_submenu: 26
        }
      },
      {
        path: 'productos-ingresados-easy',
        component: ProductosIngresadosEasyComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'Productoss Ingresados Easy',
          id_submenu: 27
        }
      },
      {
        path: 'pendientes-en-ruta',
        component: PendientesEnRutaComponent,
        data: {
          title: 'Productoss Ingresados Easy'
        }
      },
      {
        path: 'editar-ruta',
        component: EditarRutaComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'Clientes',
          id_submenu: 28
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {
}
