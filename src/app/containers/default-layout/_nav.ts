import { INavData } from '@coreui/angular';

export const navItemsTra: INavData[] = [
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
  {
    name: 'Transporte',
    url: '/transporte',
    iconComponent: { name: 'cil-car-alt' },
    children: [
      {
        name: 'Reportes',
        url : '/transporte/reportes'
      }
    ]
  },
];

export const navItemsOp: INavData[] = [
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
    ]
  },
];

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
  {
    name: 'Transporte',
    url: '/transporte',
    iconComponent: { name: 'cil-car-alt' },
    children: [
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
    ]
  },
];

export const navItemsAll : any = [{
  "5" : navItems,
  "13": navItemsOp,
  "14": navItemsTra
}]



