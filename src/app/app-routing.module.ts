import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from "src/app/guard/user.guard";
import { PermissionGuard } from 'src/app/guard/permission.guard'
import { AuthOperacionesGuard } from "src/app/guard/auth-operaciones.guard"; 
import { AuthAdminGuard } from "src/app/guard/auth-admin.guard"; 
import { AuthTransporteGuard } from "src/app/guard/auth-transporte.guard"; 
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
      }
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
