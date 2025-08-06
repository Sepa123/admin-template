import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarSkuComponent } from './buscar-sku/buscar-sku.component';
import { EstadoComponent } from './estado/estado.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Información Picking'
    },
    children : [
      {
        path : 'estado',
        component : EstadoComponent,
        data : {
          title: "Estado"
        }
      },
      {
        path : 'buscar-sku',
        component : BuscarSkuComponent,
        data : {
          title: "Buscar SKU"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoPickingRoutingModule { }
