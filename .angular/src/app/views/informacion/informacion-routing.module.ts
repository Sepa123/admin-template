import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadoComponent } from './estado/estado.component';
import { BuscarSkuComponent } from './buscar-sku/buscar-sku.component';
import { TrackingProductoComponent } from './tracking-producto/tracking-producto.component';
import { IngresoProductoComponent } from './ingreso-producto/ingreso-producto.component'
import { TimelineComponent } from './timeline/timeline.component';
import { ModalidadesDeOperacionesComponent } from './modalidades-de-operaciones/modalidades-de-operaciones.component';
import { PesoVolumetricoComponent } from './peso-volumetrico/peso-volumetrico.component';
import { PermissionGuard } from '../../guard/permission.guard';

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
        canActivate :[PermissionGuard],
        data : {
          title: "Estado",
          id_submenu: 50
        }
      },
      {
        path : 'buscar-sku',
        component : BuscarSkuComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Buscar SKU",
          id_submenu: 51
        }
      },
      {
        path : 'tracking-producto',
        component : TrackingProductoComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Tracking Producto",
          id_submenu: 52
        }
      },
      {
        path : 'ingreso-producto',
        component : IngresoProductoComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Ingreso Producto",
          id_submenu: 53
        }
      },
      {
        path : 'timeline',
        component: TimelineComponent,
        canActivate :[PermissionGuard],
        data:{
           title : "",
           id_submenu: 54
          }
      },
      {
        path : 'modalidades-de-operaciones',
        component : ModalidadesDeOperacionesComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Modalidades de Operaciones",
          id_submenu: 55
        }
      },
      {
        path : 'peso-volumetrico',
        component : PesoVolumetricoComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Seguimiento Ruta",
          id_submenu: 56
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionRoutingModule { }
