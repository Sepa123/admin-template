import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadoComponent } from './estado/estado.component';
import { BuscarSkuComponent } from './buscar-sku/buscar-sku.component';
import { TrackingProductoComponent } from './tracking-producto/tracking-producto.component';
import { IngresoProductoComponent } from './ingreso-producto/ingreso-producto.component'
import { TimelineComponent } from './timeline/timeline.component';
<<<<<<< HEAD
=======

>>>>>>> c1cb59773de176a518b0158439f3c78500f09a42
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
        },
      },
      {
        path : 'timeline',
        component: TimelineComponent,
        data:{
        title : ""}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionRoutingModule { }
