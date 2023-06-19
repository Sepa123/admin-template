import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    children: [
      {
        name: 'Reportes',
        url: '/dashboard'
      },
      {
        name: 'Hoy',
        url: '/dashboard/hoy'
      },
    ]
  },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'someAnchor' },
  //   iconComponent: { name: 'cil-pencil' }
  // },
  // {
  //   name: 'Components',
  //   title: true
  // },
  {
    name: 'Transporte',
    url: '/transporte',
    iconComponent: { name: 'cil-car-alt' },
    children: [
      // {
      //   name: 'Reportess',
      //   url: '/transporte/accordion'
      // },  
      {
        name: 'Reportes',
        url : '/transporte/reportes'
      }
    ]
  },
  {
    name: 'Operaciones',
    url: '/operaciones',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Reportes',
        url: '/operaciones/reportes'
      },
      {
        name: 'Pendientes',
        url: '/operaciones/pendientes'
      },
      // {
      //   name: 'Estado',
      //   url: '/base/breadcrumbs'
      // },
      {
        name: 'Estados',
        url: '/operaciones/estados'
      },
      
      {
        name: 'Productos sin clasificación',
        url: '/operaciones/productos-sin-clasificacion'      
      }
    ]
  },
  {
    name: 'Picking',
    url: '/picking',
    iconComponent: { name: 'cil-tags' },
    children: [
      // {
      //   name: 'Quadminds',
      //   url: '/forms/form-control'
      // },
      {
        name: 'Ruta Manual',
        // url: '/forms/select'
        url: '/picking/ruta-manual'
      },
      {
        name: 'Rutas Activas',
        // url: '/forms/checks-radios'
        url: '/picking/rutas-activas'
        
      },
      {
        name : 'Recepcion OPL',
        url : '/picking/recepcion-opl'
      },
      {
        name : 'Buscar SKU',
        url : '/picking/buscar-sku'
      }
      // {
      //   name: 'Range',
      //   url: '/forms/range'
      // },
      // {
      //   name: 'Input Group',
      //   url: '/forms/input-group'
      // },
      // {
      //   name: 'Floating Labels',
      //   url: '/forms/floating-labels'
      // },
      // {
      //   name: 'Layout',
      //   url: '/forms/layout'
      // },
      // {
      //   name: 'Validation',
      //   url: '/forms/validation'
      // }
    ]
  },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   iconComponent: { name: 'cil-chart-pie' }
  // },
  // {
  //   name: 'Icons',
  //   iconComponent: { name: 'cil-star' },
  //   url: '/icons',
  //   children: [
  //     {
  //       name: 'CoreUI Free',
  //       url: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'FREE'
  //       }
  //     },
  //     {
  //       name: 'CoreUI Flags',
  //       url: '/icons/flags'
  //     },
  //     {
  //       name: 'CoreUI Brands',
  //       url: '/icons/brands'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/notifications/modal'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/notifications/toasts'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500'
  //     }
  //   ]
  // },
];
