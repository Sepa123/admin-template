import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        path: 'select',
        // path: 'ruta-manual',
        component: SelectComponent,
        data: {
          title: 'Select'
        }
      },
      {
        path: 'checks-radios',
        // path: 'rutas-activas',
        component: ChecksRadiosComponent,
        data: {
          title: 'Checks & Radios'
        }
      },
      {
        path: 'range',
        component: RangesComponent,
        data: {
          title: 'Range'
        }
      },
      {
        path: 'input-group',
        component: InputGroupsComponent,
        data: {
          title: 'Input Group'
        }
      },
      {
        path: 'floating-labels',
        component: FloatingLabelsComponent,
        data: {
          title: 'Floating Labels'
        }
      },
      {
        path: 'layout',
        component: LayoutComponent,
        data: {
          title: 'Layout'
        }
      },
      {
        path: 'validation',
        component: ValidationComponent,
        data: {
          title: 'Validation'
        }
      },
      {
        path: 'recepcion-opl',
        component : RecepcionOplComponent,
        data: {
          title : 'Recepcion OPL'
        }
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
