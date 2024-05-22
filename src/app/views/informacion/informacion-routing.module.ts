import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadoComponent } from './estado/estado.component';
import { BuscarSkuComponent } from './buscar-sku/buscar-sku.component';
import { TrackingProductoComponent } from './tracking-producto/tracking-producto.component';
import { IngresoProductoComponent } from './ingreso-producto/ingreso-producto.component'
import { TimelineComponent } from './timeline/timeline.component';
import { ModalidadesDeOperacionesComponent } from './modalidades-de-operaciones/modalidades-de-operaciones.component';
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
          title: "Tracking Producto"
        }
      },
      {
        path : 'ingreso-producto',
        component : IngresoProductoComponent,
        data : {
          title: "Ingreso Producto"
        }
      },
      {
        path : 'timeline',
        component: TimelineComponent,
        data:{
        title : ""}
      },
      {
        path : 'modalidades-de-operaciones',
        component : ModalidadesDeOperacionesComponent,
        data : {
          title: "Modalidades de Operaciones"
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
