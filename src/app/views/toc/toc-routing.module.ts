import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitacoraTocComponent } from './bitacora-toc/bitacora-toc.component';
import { AlertasVigentesComponent } from './alertas-vigentes/alertas-vigentes.component';

const routes: Routes = [
  {
    path:'',
    data : {
      title: "Bitacora"
    },
    children : [
      {
        path : 'bitacora',
        component : BitacoraTocComponent,
        data : {
          title : "Bitacora"
        }
      },
      {
        path : 'alertas-vigentes',
        component : AlertasVigentesComponent,
        data : {
          title : "Alertas"
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TocRoutingModule { }
