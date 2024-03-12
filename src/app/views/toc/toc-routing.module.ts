import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitacoraTocComponent } from './bitacora-toc/bitacora-toc.component';
import { AlertasVigentesComponent } from './alertas-vigentes/alertas-vigentes.component';
import { JefaturaComponent } from './jefatura/jefatura.component';
import { EditarTocComponent } from './editar-toc/editar-toc.component';
import { ReporteEntregaDiariaComponent } from './reporte-entrega.diaria/reporte-entrega.diaria.component';
import { ReporteTelefonoComponent } from './reporte-telefono/reporte-telefono.component';
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
      },
      {
        path : 'editar-toc',
        component : EditarTocComponent,
        data : {
          title : "Editar"
        }
      },
      {
        path: 'reporte-entrega.diaria',
        component : ReporteEntregaDiariaComponent,
        data : {
          title: "Reporte Entregas"
        }
      },
      {
        path: 'reporte-telefono',
        component : ReporteTelefonoComponent,
        data : {
          title: "Reporte Entregas"
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
