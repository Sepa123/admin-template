import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Accesos
import { ROLES_PERMITIDOS } from '../../rolesPermitidos.const'
import { PermissionGuard } from '../../guard/permission.guard'

// import { FormControlsComponent } from './form-controls/form-controls.component';
import { RecepcionOplComponent } from './recepcion-opl/recepcion-opl.component';
import { BuscarSkuComponent } from './buscar-sku/buscar-sku.component';
import { EditarRutaComponent } from './editar-ruta/editar-ruta.component';
import { RutaManualComponent } from './ruta-manual/ruta-manual.component';
import { RutasActivasComponent } from './rutas-activas/rutas-activas.component';
import { AsignarRutaComponent } from './asignar-ruta/asignar-ruta.component';
import { QuadmindsComponent } from './quadminds/quadminds.component'
import { CargaQuadmindComponent } from './carga-quadmind/carga-quadmind.component'
import { PrearmadoRutaComponent } from './prearmado-ruta/prearmado-ruta.component';
import { BuscarRutaComponent } from './buscar-ruta/buscar-ruta.component';
import { ResumenRutasComponent } from './resumen-rutas/resumen-rutas.component';
import { PendientesObligadosComponent } from './pendientes-obligados/pendientes-obligados.component';
import { CargaRutasManualesComponent } from './carga-rutas-manuales/carga-rutas-manuales.component'
import { CargaGuiasManualesComponent } from './carga-guias-manuales/carga-guias-manuales.component'
import { ConsolidadoRutasComponent } from './consolidado-rutas/consolidado-rutas.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'form-control'
      },
      {
        path: 'ruta-manual',
        component: RutaManualComponent,
        canActivate :[PermissionGuard],
        data : {
          title : 'Ruta manual',
          id_submenu: 29
        }
      },
      {
        // path: 'checks-radios',
        path: 'rutas-activas',
        component: RutasActivasComponent,
        canActivate :[PermissionGuard],
        data: {
          title: 'Rutas activas',
          id_submenu: 30
        }
      },
      {
        path: 'asignar-ruta',
        // path: 'ruta-manual',
        component: AsignarRutaComponent,
        data: {
          title: 'Asignar Ruta'
        }
      },
      {
        path: 'quadminds',
        // path: 'ruta-manual',
        component: QuadmindsComponent,
        data: {
          title: 'Quadminds'
        }
      },
      {
        path: 'carga-quadminds',
        // path: 'ruta-manual',
        component: CargaQuadmindComponent,
        data: {
          title: 'Quadminds'
        }
      },
      {
        path: 'recepcion-opl',
        component : RecepcionOplComponent,
        data: {
          title : 'Recepcion OPL',
          roles :ROLES_PERMITIDOS.OPL
        },
        canActivate : [PermissionGuard]
      },
      {
        path: 'buscar-sku',
        component : BuscarSkuComponent,
        data : {
          title : 'Buscar SKU'
        }
      },
      {
        path: 'editar-ruta',
        component : EditarRutaComponent,
        data : {
          title : 'Editar ruta'
        }
      },
      {
        path : 'prearmado-ruta',
        component : PrearmadoRutaComponent,
        canActivate :[PermissionGuard],
        data : {
          title : 'Prearmar-ruta',
          id_submenu: 31
        }
      },
      {
        path : 'buscar-ruta',
        component : BuscarRutaComponent,
        canActivate :[PermissionGuard],
        data : {
          title : 'buscar-ruta',
          id_submenu: 32
        }
      },
      {
        path : 'resumen-rutas',
        component : ResumenRutasComponent,
        canActivate :[PermissionGuard],
        data : {
          title : 'resumen-rutas',
          id_submenu: 33
        }
      },
      {
        path : 'pendientes-obligados',
        component : PendientesObligadosComponent,
        canActivate :[PermissionGuard],
        data : {
          title : 'pendientes-obligados',
          id_submenu: 34
        }
      },
      {
        path : 'rutas-manuales',
        component : CargaRutasManualesComponent,
        data : {
          title : 'rutas-manuale'
        }
      },
      {
        path : 'guias-manuales',
        component : CargaGuiasManualesComponent,
        canActivate :[PermissionGuard],
        data : {
          title : 'rutas-manuale',
          id_submenu: 35
        }
      },
      {
        path : 'consolidado-rutas',
        component : ConsolidadoRutasComponent,
        canActivate :[PermissionGuard],
        data : {
          title : 'Consolidado Rutas',
          id_submenu: 36
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutasRoutingModule {
}
