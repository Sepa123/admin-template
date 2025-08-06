import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { TestComponent } from './test/test.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TripulacionComponent } from './tripulacion/tripulacion.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { GestionGpsComponent } from './gestion-gps/gestion-gps.component'
import { ReclutamientoComponent } from './reclutamiento/reclutamiento.component'
import { VentaOTraspasoDeVehiculoComponent } from './venta-o-traspaso-de-vehiculo/venta-o-traspaso-de-vehiculo.component';
import { PermissionGuard } from '../../guard/permission.guard';

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
        canActivate: [PermissionGuard],
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
        canActivate: [PermissionGuard],
        data: {
          title: 'colaboradores',
          id_submenu: 13
        },
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          title: 'rest'
        },
      },
      {
        path: 'tripulacion',
        component: TripulacionComponent,
        canActivate: [PermissionGuard],
        data: {
          title: 'rest',
          id_submenu: 15
        },
      },
      {
        path: 'vehiculos',
        component: VehiculosComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'rest',
          id_submenu: 14
        },
      },
      {
        path: 'buscador',
        component: BuscadorComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'rest',
          id_submenu: 16
        },
      },    
      {
        path: 'gestion-gps',
        component: GestionGpsComponent,
        canActivate: [PermissionGuard],
        data: {
          title: 'rest',
          id_submenu: 17
        },
      },  
      {
        path: 'reclutamiento',
        component: ReclutamientoComponent,
        canActivate: [PermissionGuard],
        data: {
          title: 'rest',
          id_submenu: 12
        },
      },
      {
        path: 'venta-o-traspaso-de-vehiculo',
        component: VentaOTraspasoDeVehiculoComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'rest',
          id_submenu: 18
        },
      },  
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransporteRoutingModule {}

