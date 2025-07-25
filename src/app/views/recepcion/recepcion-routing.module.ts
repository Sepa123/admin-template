import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionEasyCdComponent } from './recepcion-easy-cd/recepcion-easy-cd.component';
import { RecepcionEasyOplComponent } from './recepcion-easy-opl/recepcion-easy-opl.component';
import { RecepcionElectroluxComponent } from './recepcion-electrolux/recepcion-electrolux.component';
import { RecepcionSportexComponent } from './recepcion-sportex/recepcion-sportex.component';
import { ProductoSinRecepcionComponent } from './producto-sin-recepcion/producto-sin-recepcion.component';
import { PermissionGuard } from '../../guard/permission.guard';
const routes: Routes = [
  {
    path:'',
    data : {
      title: "Recepcion"
    },
    children : [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'recepcion'
      },
      {
        path : 'easy-cd',
        component : RecepcionEasyCdComponent,
        canActivate :[PermissionGuard],
        data : {
          title : "Recepcion Easy CD",
          id_submenu: 65
        }
      },
      {
        path : 'easy-opl',
        component : RecepcionEasyOplComponent,
        canActivate :[PermissionGuard],
        data : {
          title : "Recepcion Easy OPL",
          id_submenu: 64
        }
      },
      {
        path : 'electrolux',
        component : RecepcionElectroluxComponent,

        data : {
          title : "Recepcion Electrolux"
        }
      },
      {
        path : 'sportex',
        component : RecepcionSportexComponent,
        data : {
          title : "Recepcion Sportex"
        }
      },
      {
        path : 'productoSinRecepcion',
        component : ProductoSinRecepcionComponent,
        canActivate :[PermissionGuard],
        data : {
          title : "Producto Sin Recepción",
          id_submenu: 66
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcionRoutingModule { }
