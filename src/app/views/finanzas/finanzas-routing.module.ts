import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarifarioComponent } from './tarifario/tarifario.component';
import { CarVehiculoComponent } from './car-vehiculo/car-vehiculo.component';
import { Title } from 'chart.js';
import { CarTarifarioEspecificoComponent } from './car-tarifario-especifico/car-tarifario-especifico.component';

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
        data : {
          title: "finanzas"
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
        data : {
          title: "carTarifarioEspecifico"
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
