import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionEasyCdComponent } from './recepcion-easy-cd/recepcion-easy-cd.component';
import { RecepcionEasyOplComponent } from './recepcion-easy-opl/recepcion-easy-opl.component';
import { RecepcionElectroluxComponent } from './recepcion-electrolux/recepcion-electrolux.component';
import { RecepcionSportexComponent } from './recepcion-sportex/recepcion-sportex.component';
import {ProductoSinRcepcionComponent} from './producto-sin-recepcion/producto-sin-recepcion.component';

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
        data : {
          title : "Recepcion Easy CD"
        }
      },
      {
        path : 'easy-opl',
        component : RecepcionEasyOplComponent,
        data : {
          title : "Recepcion Easy OPL"
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
        component : ProductoSinRcepcionComponent,
        data : {
          title : "Recepcion Producto sin recepcion"
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
