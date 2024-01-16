import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdicionPendientesComponent } from './edicion-pendientes/edicion-pendientes.component';
import { RecepcionOcComponent } from './recepcion-oc/recepcion-oc.component';

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
        data : {
          title : "Recepción Log Inversa"
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
