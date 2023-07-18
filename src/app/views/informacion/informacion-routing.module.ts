import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadoComponent } from './estado/estado.component';
import { BuscarSkuComponent } from './buscar-sku/buscar-sku.component';
import { TrackingProductoComponent } from './tracking-producto/tracking-producto.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Información'
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
      },
      {
        path : 'tracking-producto',
        component : TrackingProductoComponent,
        data : {
          title: "Buscar SKU"
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionRoutingModule { }
