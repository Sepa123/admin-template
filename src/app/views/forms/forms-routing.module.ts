import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Accesos
import { ROLES_PERMITIDOS } from 'src/app/rolesPermitidos.const'
import { PermissionGuard } from 'src/app/guard/permission.guard'

import { FormControlsComponent } from './form-controls/form-controls.component';
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
        path: 'form-control',
        component: FormControlsComponent,
        data: {
          title: 'Form Control'
        }
      },
      {
        path: 'ruta-manual',
        component: RutaManualComponent,
        data : {
          title : 'Ruta manual'
        }
      },
      {
        // path: 'checks-radios',
        path: 'rutas-activas',
        component: RutasActivasComponent,
        data: {
          title: 'Rutas activas'
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
        data : {
          title : 'Prearmar-ruta'
        }
      },
      {
        path : 'buscar-ruta',
        component : BuscarRutaComponent,
        data : {
          title : 'buscar-ruta'
        }
      },
      {
        path : 'resumen-rutas',
        component : ResumenRutasComponent,
        data : {
          title : 'resumen-rutas'
        }
      },
      {
        path : 'pendientes-obligados',
        component : PendientesObligadosComponent,
        data : {
          title : 'pendientes-obligados'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
