import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionesComponent } from './funciones/funciones.component';
import { AgregarFuncionComponent } from './agregar-funcion/agregar-funcion.component';
import { ScanTestComponent } from './scan-test/scan-test.component';
import { CamaraTestComponent } from './camara-test/camara-test.component';
import { EstadosOldComponent } from './estados-old/estados-old.component';
import { PermissionGuard } from '../../guard/permission.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Area TI'
    },
    children: [
      {
        path : 'funciones',
        component : FuncionesComponent,
        canActivate: [PermissionGuard],
        data : {
          title : "funciones",
          id_submenu: 1
        }
      },
      {
        path : 'agregar-funcion',
        component : AgregarFuncionComponent,
        canActivate: [PermissionGuard],
        data : {
          title : "Agregar funciones"
        }
      },
      {
        path : 'scan-test',
        component : ScanTestComponent,
        canActivate: [PermissionGuard],
        data : {
          title : "Test Scanner",
          id_submenu: 2
        }
      },
      {
        path : 'camara-test',
        component : CamaraTestComponent,
        canActivate: [PermissionGuard],
        data : {
          title : "camara Scanner",
          id_submenu: 3
        }
      },
      {
        path : 'estados-old',
        component : EstadosOldComponent,
        canActivate: [PermissionGuard],
        data : {
          title : "Estados Old",
          id_submenu: 4
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaTiRoutingModule { }
