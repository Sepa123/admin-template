import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Accesos
import { ROLES_PERMITIDOS } from 'src/app/rolesPermitidos.const'
import { ROLES_ENUM } from 'src/app/models/enum/roles.enum'
import { PermissionGuard } from 'src/app/guard/permission.guard'

import { FloatingLabelsComponent } from './floating-labels/floating-labels.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { RangesComponent } from './ranges/ranges.component';
import { SelectComponent } from './select/select.component';
import { ChecksRadiosComponent } from './checks-radios/checks-radios.component';
import { LayoutComponent } from './layout/layout.component';
import { ValidationComponent } from './validation/validation.component';
import { RecepcionOplComponent } from './recepcion-opl/recepcion-opl.component';
import { BuscarSkuComponent } from './buscar-sku/buscar-sku.component';
import { EditarRutaComponent } from './editar-ruta/editar-ruta.component';
import { RutaManualComponent } from './ruta-manual/ruta-manual.component';
import { RutasActivasComponent } from './rutas-activas/rutas-activas.component';
import { AsignarRutaComponent } from './asignar-ruta/asignar-ruta.component';

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
      // {
      //   path: 'select',
      //   // path: 'ruta-manual',
      //   component: SelectComponent,
      //   data: {
      //     title: 'Select'
      //   }
      // },
      // {
      //   path: 'checks-radios',
      //   // path: 'rutas-activas',
      //   component: ChecksRadiosComponent,
      //   data: {
      //     title: 'Checks & Radios'
      //   }
      // },
      // {
      //   path: 'range',
      //   component: RangesComponent,
      //   data: {
      //     title: 'Range'
      //   }
      // },
      // {
      //   path: 'input-group',
      //   component: InputGroupsComponent,
      //   data: {
      //     title: 'Input Group'
      //   }
      // },
      // {
      //   path: 'floating-labels',
      //   component: FloatingLabelsComponent,
      //   data: {
      //     title: 'Floating Labels'
      //   }
      // },
      // {
      //   path: 'layout',
      //   component: LayoutComponent,
      //   data: {
      //     title: 'Layout'
      //   }
      // },
      // {
      //   path: 'validation',
      //   component: ValidationComponent,
      //   data: {
      //     title: 'Validation'
      //   }
      // },
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
