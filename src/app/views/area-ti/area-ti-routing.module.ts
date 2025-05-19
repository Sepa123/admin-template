import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionesComponent } from './funciones/funciones.component';
import { AgregarFuncionComponent } from './agregar-funcion/agregar-funcion.component';
import { ScanTestComponent } from './scan-test/scan-test.component';
import { CamaraTestComponent } from './camara-test/camara-test.component';
import { EstadosOldComponent } from './estados-old/estados-old.component';

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
        data : {
          title : "funciones"
        }
      },
      {
        path : 'agregar-funcion',
        component : AgregarFuncionComponent,
        data : {
          title : "Agregar funciones"
        }
      },
      {
        path : 'scan-test',
        component : ScanTestComponent,
        data : {
          title : "Test Scanner"
        }
      },
      {
        path : 'camara-test',
        component : CamaraTestComponent,
        data : {
          title : "camara Scanner"
        }
      },
      {
        path : 'estados-old',
        component : EstadosOldComponent,
        data : {
          title : "Estados Old"
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
