import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarifarioComponent } from './tarifario/tarifario.component';
import { CarVehiculoComponent } from './car-vehiculo/car-vehiculo.component';
import { Title } from 'chart.js';
import { CarTarifarioEspecificoComponent } from './car-tarifario-especifico/car-tarifario-especifico.component';
import { TarifarioGeneralComponent } from './tarifario-general/tarifario-general.component';
import { RutasMeliComponent } from './rutas-meli/rutas-meli.component';
import { TestComponent } from './test/test.component';
import { PermissionGuard } from '../../guard/permission.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Finanzas'
    },
    children: [
      {
        path : 'tarifario',
        component : TarifarioComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "finanzas",
          id_submenu: 57
        }
      },
      {
        path: 'carVehiculo',
        component: CarVehiculoComponent,
        data : {
          title: "carVehiculo"
        }
      },
      {
        path: 'carTarifarioEspecifico',
        component: CarTarifarioEspecificoComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "carTarifarioEspecifico",
          id_submenu: 60
        }
      },
      {
        path: 'tarifarioGeneral',
        component: TarifarioGeneralComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Tarifario General",
          id_submenu: 59
        }
      },
      {
        path: 'rutas-meli',
        component: RutasMeliComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Rutas Meli",
          id_submenu: 61
        }
      },
      {
        path: 'test',
        component: TestComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Rutas Meli",
          id_submenu: 57
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanzasRoutingModule { }
