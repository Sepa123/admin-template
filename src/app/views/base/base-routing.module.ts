import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { TestComponent } from './test/test.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TripulacionComponent } from './tripulacion/tripulacion.component';
import { BuscadorComponent } from './buscador/buscador.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'reportes',
        component: ReportesComponent,
        data: {
          title: 'Reportes',
        },
      },    
      {
        path: 'test',
        component: TestComponent,
        data: {
          title: 'rest',
        },
      }, 
      {
        path: 'colaboradores',
        component: ColaboradoresComponent,
        data: {
          title: 'rest',
        },
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          title: 'rest',
        },
      },
      {
        path: 'tripulacion',
        component: TripulacionComponent,
        data: {
          title: 'rest',
        },
      },
      {
        path: 'vehiculos',
        component: VehiculosComponent,
        data: {
          title: 'rest',
        },
      },
      {
        path: 'buscador',
        component: BuscadorComponent,
        data: {
          title: 'rest',
        },
      },      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

