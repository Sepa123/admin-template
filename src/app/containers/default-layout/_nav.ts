import { INavData } from '@coreui/angular';
import { ROLES_PERMITIDOS } from 'src/app/rolesPermitidos.const'

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
      // {
      //   name: 'Reportes',
      //   url: '/operaciones/reportes'
      // },
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


interface INavDataBar {
  name?: string;
  url?: string | any[];
  href?: string;
  icon?: string;
  iconComponent?: any;
  title?: boolean;
  children?: INavDataBar[];
  variant?: string;
  divider?: boolean;
  class?: string;
  roles?: string [];
}

export const navItemsTest: INavDataBar[][] = [
  [
    {
      name: 'Dashboard',
      url: '/dashboard',
      iconComponent: { name: 'cil-speedometer' },

      children: [
        {
          name: 'Reportes',
          url: '/dashboard',
          roles : ['5ss','13','14']
        },
        {
          name: 'Hoy',
          url: '/dashboard/hoy',
          // roles : ['5','13','14']
        },
      ],
      roles : ROLES_PERMITIDOS.DASHBOARD
    }
  ],
  [
    {
      name: 'Transporte',
      url: '/transporte',
      iconComponent: { name: 'cil-car-alt' },
      roles : ROLES_PERMITIDOS.TRANSPORTE,
      children: [
        {
          name: 'Reportes',
          url : '/transporte/reportes'
        }
      ]
    }
  ],
  [
    {
      name: 'Operaciones',
      url: '/operaciones',
      iconComponent: { name: 'cil-cursor' },
      roles : ROLES_PERMITIDOS.OPERACIONES,
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
    }
  ],
  [
    {
      name: 'Picking',
      url: '/picking',
      iconComponent: { name: 'cil-tags' },
      roles : ROLES_PERMITIDOS.PICKING,
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
    }
  ],
];

export const navItems: INavDataBar[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    roles : ROLES_PERMITIDOS.DASHBOARD,
    children: [
      {
        name: 'Reportes',
        url: '/dashboard',
        roles : ['5','13','14']
      },
      {
        name: 'Hoy',
        url: '/dashboard/hoy',
        roles : ['5','13','14']
      },
    ]
  },
  {
    name: 'Transporte',
    url: '/transporte',
    iconComponent: { name: 'cil-car-alt' },
    roles : ROLES_PERMITIDOS.TRANSPORTE,
    children: [
      {
        name: 'Reportes',
        url : '/transporte/reportes'
      },
    ]
  },
  {
    name: 'EXO',
    url: '/exo',
    iconComponent: { name: 'cil-bar-chart' },
    roles : ROLES_PERMITIDOS.EXO,
    children: [
      {
        name: 'Nivel Servicio',
        url : '/exo/nivel-servicio'
      }
    ]
  },
  {
    name: 'Operaciones',
    url: '/operaciones',
    iconComponent: { name: 'cil-cursor' },
    roles : ROLES_PERMITIDOS.OPERACIONES,
    children: [
      // {
      //   name: 'Reportes',
      //   url: '/operaciones/reportes'
      // },
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
    name: 'Rutas',
    url: '/picking',
    iconComponent: { name: 'cil-paper-plane' },
    roles : ROLES_PERMITIDOS.PICKING,
    children: [
      // {
      //   name: 'Quadminds',
      //   url: '/picking/form-control'
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
        name : 'Quadminds',
        url: '/picking/quadminds'
      },
      // {
      //   name : 'Carga Quadminds',
      //   url: '/picking/carga-quadminds'
      // },
    ]
  },
  { /// Pantalla Informacion Para ADMINISTRADORES
    name: 'Informacion',
    url: '/informacion',
    iconComponent : {name : 'cil-magnifying-glass'},
    roles : ROLES_PERMITIDOS.INFORMACION_ADMINISTRADOR,
    children: [
      {
        name: "Estado",
        url : '/informacion/estado'
      },
      {
        name: "Buscar SKU",
        url : '/informacion/buscar-sku'
      },
      {
        name: "Tracking Producto",
        url : '/informacion/tracking-producto'
      },
      {
        name: "Ingreso Producto",
        url : '/informacion/ingreso-producto'
      }
    ]
  },
  { /// Pantalla Informacion Para OPERACIONES
    name: 'Informacion',
    url: '/informacion',
    iconComponent : {name : 'cil-magnifying-glass'},
    roles : ROLES_PERMITIDOS.INFORMACION_OPERACIONES,
    children: [
      {
        name: "Estado",
        url : '/informacion/estado'
      },
      {
        name: "Buscar SKU",
        url : '/informacion/buscar-sku'
      },
      {
        name: "Tracking Producto",
        url : '/informacion/tracking-producto'
      },
      {
        name: "Ingreso Producto",
        url : '/informacion/ingreso-producto'
      }
    ]
  },
  { /// Pantalla Informacion Para PISTOLEADORES
    name: 'Informacion',
    url: '/info',
    iconComponent : {name : 'cil-magnifying-glass'},
    roles : ROLES_PERMITIDOS.INFORMACION_PICKING,
    children: [
      {
        name: "Estado",
        url : '/info/estado'
      },
      {
        name: "Buscar SKU",
        url : '/info/buscar-sku'
      },
    ]
  },
  {
    name: 'Ingreso cliente',
    url: '/ingreso-cliente',
    iconComponent : {name : 'cil-magnifying-glass'},
    roles : ROLES_PERMITIDOS.INGRESO_CLIENTE,
    children: [
      {
        name: "Anden Easy",
        url : '/ingreso-cliente/easy-cd'
      }
    ]
  },
  {
    name: 'Recepción',
    url : '/recepcion',
    iconComponent: { name: 'cil-home' },
    roles : ROLES_PERMITIDOS.RECEPCION,
    children : [
      {
        name: 'Easy OPL',
        url: '/recepcion/easy-opl'
      },
      {
        name: 'Easy CD',
        url: '/recepcion/easy-cd'
      },
      {
        name: 'Electrolux',
        url: '/recepcion/electrolux'
      },
      {
        name: 'Sportex',
        url: '/recepcion/sportex'
      },
    ]
  },
  {
    name: 'Panel',
    url : '/panel',
    iconComponent: { name: 'cil-tags' },
    roles : ROLES_PERMITIDOS.PANEL,
    children : [
      {
        name: 'Registro usuarios',
        url: '/panel/registro-usuario'
      },
    ]
  },
  // {
  //   name: 'Carga Excel',
  //   url : '/carga',
  //   iconComponent: { name: 'cil-inbox' },
  //   roles : ROLES_PERMITIDOS.CARGA_EXCEL,
  //   children : [
  //     {
  //       name: 'easy cd',
  //       url: '/carga/easy-cd'
  //     },
  //   ]
  // }
];





