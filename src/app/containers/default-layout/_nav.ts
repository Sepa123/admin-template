import { ROLES_ENUM } from 'src/app/models/enum/roles.enum';
import { ROLES_PERMITIDOS } from 'src/app/rolesPermitidos.const'

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

/// Este es el importante
export const navItems: INavDataBar[] = [
  // {
  //   name: 'Mi Cuenta',
  //   url: '/mi-cuenta/settings',
  //   iconComponent: { name: 'cil-user' },
  //   roles : ROLES_PERMITIDOS.DASHBOARD,
  //   // children: [
  //   //   {
  //   //     name: 'Reportes',
  //   //     url: '/dashboard',
  //   //     roles : ['5','13','14']
  //   //   },
  //   //   {
  //   //     name: 'Hoy',
  //   //     url: '/dashboard/hoy',
  //   //     roles : ['5','13','14']
  //   //   },
  //   // ]
  // },
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
    iconComponent: { name: 'cil-clipboard' },
    roles : ROLES_PERMITIDOS.OPERACIONES_VIEWS,
    children: [
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
    name: 'Operaciones',
    url: '/operaciones',
    iconComponent: { name: 'cil-clipboard' },
    roles : [ROLES_ENUM.TOC,ROLES_ENUM.JEFE_TOC],
    children: [
      {
        name: 'Pendientes',
        url: '/operaciones/pendientes'
      }
    ]
  }
  ,
  { // Operaciones RAUDDY
    name: 'Operaciones',
    url: '/operaciones',
    iconComponent: { name: 'cil-clipboard' },
    roles : [ROLES_ENUM.RAUDDY],
    children: [
      {
        name: 'Pendientes',
        url: '/operaciones/pendientes'
      },
      {
        name: 'Estados',
        url: '/operaciones/estados'
      },
    ]
  },
  {
    
    name: 'Rutas',
    url: '/picking',
    iconComponent: { name: 'cil-truck' },
    roles : ROLES_PERMITIDOS.PICKING_ALL,
    children: [
      {
        name: 'Crear Ruta',
        url: '/picking/ruta-manual'
      },
      {
        name: 'Rutas Activas',
        url: '/picking/rutas-activas'
      },
      {
        name : 'Quadminds',
        url: '/picking/quadminds'
      },
      {
        name : 'Rutas Predictivas',
        url : '/picking/prearmado-ruta'
      }
    ]
  },
  {
    // Pantalla completa TOC
    name: 'TOC',
    url: '/toc',
    iconComponent: { name: 'cil-chat-bubble' },
    roles : ROLES_PERMITIDOS.FULL_TOC,
    children: [
      {
        name: 'Bitacora',
        url: '/toc/bitacora'
      },
      {
        name: 'Alertas Vigentes',
        url: '/toc/alertas-vigentes'
      },
      {
        name: 'NS TOC',
        url: '/toc/jefatura'
      }
    ]
  },
  {
    // Pantalla muestra para solo TOC
    name: 'TOC',
    url: '/toc',
    iconComponent: { name: 'cil-chat-bubble' },
    roles : [ROLES_ENUM.TOC],
    children: [
      {
        name: 'Bitacora',
        url: '/toc/bitacora'
      },
      {
        name: 'Alertas Vigentes',
        url: '/toc/alertas-vigentes'
      }
    ]
  },
  {
    // Pantalla TOC solo Alertas
    name: 'TOC',
    url: '/toc',
    iconComponent: { name: 'cil-chat-bubble' },
    roles : ROLES_PERMITIDOS.ONLY_ALERTAS_TOC,
    children: [
      {
        name: 'Alertas Vigentes',
        url: '/toc/alertas-vigentes'
      }
    ]
  },
  {
    // Pantalla muestra para ruteador_pickeador
    name: 'Rutas',
    url: '/picking',
    iconComponent: { name: 'cil-truck' },
    roles : ROLES_PERMITIDOS.PICKING_RUT_PICKIEADOR,
    children: [
      {
        name: 'Crear Ruta',
        url: '/picking/ruta-manual'
      },
      {
        name: 'Rutas Activas',
        url: '/picking/rutas-activas'
      }
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
  { /// Pantalla Informacion Para TOC
    name: 'Informacion',
    url: '/informacion',
    iconComponent : {name : 'cil-magnifying-glass'},
    roles :[ROLES_ENUM.TOC, ROLES_ENUM.JEFE_TOC],
    children: [
      {
        name: "Estado",
        url : '/informacion/estado'
      },
      {
        name: "Tracking Producto",
        url : '/informacion/tracking-producto'
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
    iconComponent : {name : 'cil-building'},
    roles : ROLES_PERMITIDOS.INGRESO_CLIENTE,
    children: [
      {
        name: "Anden Easy",
        url : '/ingreso-cliente/easy-cd'
      },
      {
        name: "Easy Tienda",
        url : '/ingreso-cliente/easy-opl'
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
      {
        name: 'Producto Sin Recepcionar',
        url: '/recepcion/productoSinRecepcion'
      }
    ]
  },
  {
    name: 'RSV',
    url : '/rsv',
    roles : ROLES_PERMITIDOS.RSV,
    iconComponent: { name: 'cil-window' },
    children : [
     {
       name: 'Catalogo',
       url: '/rsv/catalogo'
     },
     {
      name: 'Crear Carga',
      url: '/rsv/crear-carga'
     },
    //  {
    //   name: 'Recepción',
    //   url: '/rsv/recepcion'
    //  },
    //  {
    //   name: 'Ventas',
    //   url: '/rsv/ventas'
    //  },
     {
      name: 'Lista Cargas',
      url: '/rsv/listar-carga'
     },
     {
      name: 'Lista inventarios',
      url: '/rsv/inventario-sucursal'
     },
     {
      name: 'Asignar Ubicacion',
      url: '/rsv/filtro-ubicacion'
     },
     {
      name: 'Lista de Paquetes Abiertos',
      url: '/rsv/listar-paquetes'
     },
    //  {
    //   name: 'Agregar Producto',
    //   url: '/rsv/agregar-producto'
    // },
   ]
 },
  {
    name: 'Panel',
    url : '/panel',
    iconComponent: { name: 'cil-contact' },
    roles : ROLES_PERMITIDOS.PANEL,
    children : [
      {
        name: 'Registro usuarios',
        url: '/panel/registro-usuario'
      },
    ]
  },
  {
    name: 'Inventario TI',
    url : '/inventario-ti',
    iconComponent: { name: '' },
    roles : ROLES_PERMITIDOS.RSV,
    children : [
      {
        name: 'Mantenedores',
        url: '/inventario-ti/mantenedores'
      },
      {
        name: 'Asignación de Equipos',
        url: '/inventario-ti/asignacion'
      }
    ]
  }
 
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





