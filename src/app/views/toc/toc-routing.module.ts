import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitacoraTocComponent } from './bitacora-toc/bitacora-toc.component';
import { AlertasVigentesComponent } from './alertas-vigentes/alertas-vigentes.component';
import { JefaturaComponent } from './jefatura/jefatura.component';

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
      },
      {
        path : 'jefatura',
        component : JefaturaComponent,
        data : {
          title : "jefatura"
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
