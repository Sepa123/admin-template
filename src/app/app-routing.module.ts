import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from "src/app/guard/user.guard";
import { PermissionGuard } from 'src/app/guard/permission.guard'
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { PermisoDenegadoComponent } from './views/pages/permiso-denegado/permiso-denegado.component'
import { ROLES_PERMITIDOS } from 'src/app/rolesPermitidos.const'
import { ROLES_ENUM } from 'src/app/models/enum/roles.enum'

import { RecepcionModule } from 'src/app/views/recepcion/recepcion.module'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
      roles: ROLES_PERMITIDOS.LOGIN_NOT_ALLOW
    },
    children: [
      {
        path: 'dashboard',
        data: {
          roles: ROLES_PERMITIDOS.DASHBOARD
        },
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'transporte', // transporte
        data: {
          // roles: [ROLES_ENUM.TRANSPORTE] 
          roles : ROLES_PERMITIDOS.TRANSPORTE
        },
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule),
        
      },
      {
        path: 'operaciones', // operaciones
        data: {
          // roles: [ROLES_ENUM.TRANSPORTE] 
          roles : ROLES_PERMITIDOS.OPERACIONES
        },
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule),
          
      },
      {
        path: 'picking', // picking
        data: {
          roles : ROLES_PERMITIDOS.PICKING
        },
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      // {
      //   path: 'icons',
      //   loadChildren: () =>
      //     import('./views/icons/icons.module').then((m) => m.IconsModule)
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () =>
      //     import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      // },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'recepcion',  //recepcion
        data: {
          // roles: [ROLES_ENUM.TRANSPORTE] 
          roles : ROLES_PERMITIDOS.RECEPCION
        },
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./views/recepcion/recepcion.module').then((m) => m.RecepcionModule)
      },
      {
        path: 'panel',  //Panel
        data: {
          // roles: [ROLES_ENUM.TRANSPORTE] 
          roles : ROLES_PERMITIDOS.PANEL
        },
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./views/panel/panel.module').then((m) => m.PanelModule )
      },
      {
        path : 'informacion',
        data : {
          roles : ROLES_PERMITIDOS.INFORMACION
        },
        canActivate :[PermissionGuard],
        loadChildren: () =>
          import('./views/informacion/informacion.module').then((m) => m.InformacionModule )
      },
      {
        path : 'info',
        data : {
          roles : ROLES_PERMITIDOS.INFORMACION_PICKING
        },
        canActivate :[PermissionGuard],
        loadChildren: () =>
          import('./views/info-picking/info-picking.module').then((m) => m.InfoPickingModule )
      },
      {
        path : 'ingreso-cliente',
        data : {
          roles : ROLES_PERMITIDOS.INGRESO_CLIENTE
        },
        canActivate :[PermissionGuard],
        loadChildren: () =>
          import('./views/ingreso-cliente/ingreso-cliente.module').then((m) => m.IngresoClienteModule )
      },
      {
        path : 'carga',
        data : {
          roles : ROLES_PERMITIDOS.CARGA_EXCEL
        },
        canActivate :[PermissionGuard],
        loadChildren: () =>
          import('./views/carga-excel/carga-excel.module').then((m) => m.CargaExcelModule )
      }
      ,
      {
        path : 'exo',
        data : {
          roles : ROLES_PERMITIDOS.EXO
        },
        canActivate :[PermissionGuard],
        loadChildren: () =>
          import('./views/exo/exo.module').then((m) => m.ExoModule )
      },
      {
        path : 'mi-cuenta',
        loadChildren: () =>
          import('./views/mi-cuenta/mi-cuenta.module').then((m) => m.MiCuentaModule )
      },
      {
        path : 'toc',
        data : {
          roles : ROLES_PERMITIDOS.TOC
        },
        canActivate :[PermissionGuard],
        loadChildren: () =>
          import('./views/toc/toc.module').then((m) => m.TocModule )
      },
      {
        path: 'rsv',
        data : {
          roles : ROLES_PERMITIDOS.RSV
        },
        canActivate :[PermissionGuard],
        loadChildren: () =>
          import('./views/rsv/rsv.module').then((m) => m.RsvModule)
      },
      {
        path: 'areati',
        data : {
          roles : ROLES_PERMITIDOS.PANEL
        },
        canActivate :[PermissionGuard],
        loadChildren: () =>
          import('./views/area-ti/area-ti.module').then((m) => m.AreaTiModule)
      },
      {
        path: 'log-inversa',
        data : {
          roles : ROLES_PERMITIDOS.LOGISTICA_INVERSA
        },
        canActivate :[PermissionGuard],
        loadChildren: () =>
          import('./views/logistica-inversa/logistica-inversa.module').then((m) => m.LogisticaInversaModule)
      },
      {
        path: 'inventario-ti',
        data:{
          roles : ROLES_PERMITIDOS.INVENTARIO_TI
        },
        canActivate:[PermissionGuard],
        loadChildren:()=>
          import('./views/inventario-ti/inventario-ti.module').then((m)=> m.InventarioTiModule)
      },
    ],
    canActivate: [UserGuard]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path :'permiso-denegado',
    component : PermisoDenegadoComponent,
    data : {
      title : 'Permiso denegado'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
