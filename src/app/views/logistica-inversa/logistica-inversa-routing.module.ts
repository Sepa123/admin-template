import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdicionPendientesComponent } from './edicion-pendientes/edicion-pendientes.component';
import { RecepcionOcComponent } from './recepcion-oc/recepcion-oc.component';
import { BodegaVirtualComponent } from './bodega-virtual/bodega-virtual.component';
import { PermissionGuard } from '../../guard/permission.guard';

const routes: Routes = [
  {
    path:'',
    data : {
      title: "log-inversa"
    },
    children : [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'log-inversa'
      },
      {
        path : 'edicion-pendiente',
        component : EdicionPendientesComponent,
        data : {
          title : "Edición Pendiente"
        }
      },
      {
        path : 'recepcion',
        component : RecepcionOcComponent,
        canActivate :[PermissionGuard],
        data : {
          title : "Recepción Log Inversa",
          id_submenu: 6
        }
      },
      {
        path : 'bodega-virtual',
        component : BodegaVirtualComponent,
        canActivate :[PermissionGuard],
        data : {
          title : "Recepción Log Inversa",
          id_submenu: 7
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticaInversaRoutingModule { }
