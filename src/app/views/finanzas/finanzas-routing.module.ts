import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarifarioComponent } from './tarifario/tarifario.component';
import { CarVehiculoComponent } from './car-vehiculo/car-vehiculo.component';
import { Title } from 'chart.js';
import { CarTarifarioEspecificoComponent } from './car-tarifario-especifico/car-tarifario-especifico.component';
import { TarifarioGeneralComponent } from './tarifario-general/tarifario-general.component';
import { RutasMeliComponent } from './rutas-meli/rutas-meli.component';
import { TestComponent } from './test/test.component';

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
      },
      {
        path: 'tarifarioGeneral',
        component: TarifarioGeneralComponent,
        data : {
          title: "Tarifario General"
        }
      },
      {
        path: 'rutas-meli',
        component: RutasMeliComponent,
        data : {
          title: "Rutas Meli"
        }
      },
      {
        path: 'test',
        component: TestComponent,
        data : {
          title: "Rutas Meli"
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
