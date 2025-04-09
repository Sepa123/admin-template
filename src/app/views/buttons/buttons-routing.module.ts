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
        data: {
          title: 'Estados'
        }
      },
      {
        path: 'pendientes',
        component: PendientesComponent,
        data: {
          title: 'Pendientes'
        }
      },
      {
        path: 'productos-sin-clasificacion',
        component: ProductosSinClasificacionComponent,
        data: {
          title: 'Productos sin clasificacion'
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
        data: {
          title: 'Edicion Pendientes'
        }
      },
      {
        path: 'dif-fechas-easy',
        component: DifFechasEasyComponent,
        data: {
          title: 'Diferencia Fechas Easy'
        }
      },
      {
        path: 'productos-ingresados-easy',
        component: ProductosIngresadosEasyComponent,
        data: {
          title: 'Productoss Ingresados Easy'
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
        data: {
          title: 'Editar Ruta'
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
