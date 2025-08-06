import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitacoraTocComponent } from './bitacora-toc/bitacora-toc.component';
import { AlertasVigentesComponent } from './alertas-vigentes/alertas-vigentes.component';
import { JefaturaComponent } from './jefatura/jefatura.component';
import { EditarTocComponent } from './editar-toc/editar-toc.component';
import { ReporteEntregaDiariaComponent } from './reporte-entrega.diaria/reporte-entrega.diaria.component';
import { ReporteTelefonoComponent } from './reporte-telefono/reporte-telefono.component';
import { SeguimientoRutaComponent } from './seguimiento-ruta/seguimiento-ruta.component';
import { ProductosAdelantoComponent } from './productos-adelanto/productos-adelanto.component';
import { PermissionGuard } from '../../guard/permission.guard';

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
          title : "Bitacora",
          id_submenu: 43
        },
        canActivate :[PermissionGuard]
      },
      {
        path : 'alertas-vigentes',
        component : AlertasVigentesComponent,
        canActivate :[PermissionGuard],
        data : {
          title : "Alertas",
          id_submenu: 44
        }
      },
      {
        path : 'jefatura',
        component : JefaturaComponent,
        canActivate :[PermissionGuard],
        data : {
          title : "jefatura",
          id_submenu: 45
        }
      },
      {
        path : 'editar-toc',
        component : EditarTocComponent,
        canActivate :[PermissionGuard],
        data : {
          title : "Editar"
        }
      },
      {
        path: 'reporte-entrega.diaria',
        component : ReporteEntregaDiariaComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Reporte Entregas",
          id_submenu: 46
        }
      },
      {
        path: 'reporte-telefono',
        component : ReporteTelefonoComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Reporte Entregas",
          id_submenu: 47
        }
      },
      {
        path: 'seguimiento-ruta',
        component : SeguimientoRutaComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Reporte Entregas",
          id_submenu: 48
        }
      },
      {
        path: 'producto-adelanto',
        component : ProductosAdelantoComponent,
        canActivate :[PermissionGuard],
        data : {
          title: "Producto Adelanto",
          id_submenu: 49
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
