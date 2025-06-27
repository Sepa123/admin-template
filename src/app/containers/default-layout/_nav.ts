import { ROLES_ENUM } from '../../models/enum/roles.enum';
import { ROLES_PERMITIDOS } from '../../rolesPermitidos.const'

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
    name: 'Area TI',
    url : '/areati',
    icon: "hela",
    roles : ROLES_PERMITIDOS.PANEL,
    children : [
      {
        name: 'Lista de funciones',
        url: '/areati/funciones'
      },
      {
        name: "Escaner",
        url:  '/areati/scan-test'
      },
      {
        name: "Camara",
        url:  '/areati/camara-test'
      },
      {
        name: "Estados Old",
        url:  '/areati/estados-old'
      },
      {
        name: 'Pendientes en ruta',
        url: '/operaciones/pendientes-en-ruta'
      },
      // {
      //   name: 'Agregar funcion',
      //   url: '/areati/agregar-funcion'
      // },
    ]
  },
  {
    name: 'Logistica Inversa',
    url : '/log-inversa',
    iconComponent: { name: 'cil-swap-horizontal' },
    roles : ROLES_PERMITIDOS.LI_VIEW_FULL,
    children : [
      {
        name: 'Recepción',
        url: '/log-inversa/recepcion'
      },
      
      {
        name: 'Bodega Virtual',
        url: '/log-inversa/bodega-virtual'
      },
    ]
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    roles : ROLES_PERMITIDOS.DASHBOARD_FULL,
    children: [
      {
        name: 'Reportes',
        url: '/dashboard',
        roles : ['5','13','14']
      },
      {
        name: 'Nivel Servicio',
        url: '/dashboard/ns-verificados'
       },
      {
        name: 'Hoy',
        url: '/dashboard/hoy',
        roles : ['5','13','14']
      },
      
    ]
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    roles : ROLES_PERMITIDOS.DASHBOARD_VIEW,
    children: [
      {
        name: 'Reportes',
        url: '/dashboard',
        roles : ['5','13','14']
      },
      {
        name: 'Nivel Servicio',
        url: '/dashboard/ns-verificados'
       }
    ]
  },
  {
    name: 'Taskmaster',
    url: '/taskmaster',
    iconComponent: { name: 'cil-list' },
    roles : [ROLES_ENUM.ADMIN],
    children: [
      
      {
        name: 'Gestor de Activos',
        url : '/task-master/gestor-activos'
      },
    ]
  },
  {
    name: 'Transporte',
    url: '/transporte',
    iconComponent: { name: 'cil-car-alt' },
    roles : [ROLES_ENUM.ADMIN],
    children: [
      
      {
        name: 'Reclutamiento',
        url : '/transporte/reclutamiento'
      },
      {
        name: 'Razón Social',
        url : '/transporte/colaboradores'
      },
      {
        name: 'Vehículos ',
        url : '/transporte/vehiculos'
      },
      {
        name: 'Tripulación',
        url : '/transporte/tripulacion'
      },
      {
        name: 'Reporte',
        url : '/transporte/buscador'
      },
      {
        name:'Gestión Gps',
        url: '/transporte/gestion-gps'
      },
      {
        name: "Venta/Traspaso de vehiculo",
        url:  '/transporte/venta-o-traspaso-de-vehiculo'
      },
    ]
  },
  {
    name: 'Transporte',
    url: '/transporte',
    iconComponent: { name: 'cil-car-alt' },
    roles : [ROLES_ENUM.GERENTE_OPERACION],
    children: [
      
      {
        name: 'Reclutamiento',
        url : '/transporte/reclutamiento'
      }
    ]
  },
  {
    name: 'Transporte',
    url: '/transporte',
    iconComponent: { name: 'cil-car-alt' },
    roles : [ROLES_ENUM.TRANSPORTE_OPERARIO,ROLES_ENUM.TRANSPORTE_OPERARIO_PARA_LA_NIÑA, ROLES_ENUM.JEFE_TRANSPORTE_BENA,ROLES_ENUM.JEFE_SEGURIDAD,ROLES_ENUM.TRANSPORTE_MELI],
    children: [
      {
        name: 'Reclutamiento',
        url : '/transporte/reclutamiento'
      },
      // {
      //   name: 'Reportes',
      //   url : '/transporte/reportes'
      // },
      {
        name: 'Razón Social',
        url : '/transporte/colaboradores'
      },
      {
        name: 'Vehículos ',
        url : '/transporte/vehiculos'
      },
      {
        name: 'Tripulación',
        url : '/transporte/tripulacion'
      },
      {
        name: 'Reporte',
        url : '/transporte/buscador'
      },
      {
        name:'Gestión Gps',
        url: '/transporte/gestion-gps'
      },
      
    ]
  },
  {
    name: 'Transporte',
    url: '/transporte',
    iconComponent: { name: 'cil-car-alt' },
    roles : [ROLES_ENUM.TRANSPORTE_ADMINISTRATIVO,ROLES_ENUM.JEFE_TRANSPORTE],
    children: [
      {
        name: 'Reclutamiento',
        url : '/transporte/reclutamiento'
      },
      // {
      //   name: 'Reportes',
      //   url : '/transporte/reportes'
      // },
      {
        name: 'Razón Social',
        url : '/transporte/colaboradores'
      },
      {
        name: 'Vehículos ',
        url : '/transporte/vehiculos'
      },
      {
        name: 'Tripulación',
        url : '/transporte/tripulacion'
      },
      {
        name: 'Reporte',
        url : '/transporte/buscador'
      },
      {
        name:'Gestión Gps',
        url: '/transporte/gestion-gps'
      },
      {
        name: "Venta/Traspaso de vehiculo",
        url:  '/transporte/venta-o-traspaso-de-vehiculo'
      },
    ]
  },
  {
    name: 'Transporte',
    url: '/transporte',
    iconComponent: { name: 'cil-car-alt' },
    roles : [ROLES_ENUM.SUPERVISOR_MERCADO_LIBRE,ROLES_ENUM.JEFE_OPERACION_MERCADO_LIBRE],
    children: [
      {
        name: 'Reporte',
        url : '/transporte/buscador'
      },
      // {
      //   name: 'Colaboradores',
      //   url : '/transporte/colaboradores'
      // },
    ]
  },
  {
    name: 'Transporte',
    url: '/transporte',
    iconComponent: { name: 'cil-car-alt' },
    roles : [ROLES_ENUM.FINANZA,ROLES_ENUM.JEFE_FINANZAS],
    children: [
      
      {
        name:'Gestión Gps',
        url: '/transporte/gestion-gps'
      }
      // {
      //   name: 'Colaboradores',
      //   url : '/transporte/colaboradores'
      // },
    ]
  },
  {
    name: 'Transporte',
    url: '/transporte',
    iconComponent: { name: 'cil-car-alt' },
    roles : [ROLES_ENUM.JEFE_MANTENCION],
    children: [
      
      {
        name:'Vehículos',
        url: '/transporte/vehiculos'
      }
      // {
      //   name: 'Colaboradores',
      //   url : '/transporte/colaboradores'
      // },
    ]
  },
  {
    name: 'EXO',
    url: '/exo',
    iconComponent: { name: 'cil-bar-chart' },
    roles : ROLES_PERMITIDOS.EXO_VIEW,
    children: [
      {
        name: 'NS Beetrack',
        url : '/exo/nivel-servicio'
      },
      {
        name: 'NS Driver',
        url : '/exo/ns-driver'
      },
      {
        name: 'NS Easy',
        url : '/exo/ns-easy'
      },
      // {
      //   name: 'NS Electrolux',
      //   url : '/exo/ns-electrolux'
      // }
    ]
  },
  /// exo para coordinador
  {
    name: 'EXO',
    url: '/exo',
    iconComponent: { name: 'cil-bar-chart' },
    roles : [ROLES_ENUM.COORDINADOR],
    children: [
      {
        name: 'NS Easy',
        url : '/exo/ns-easy'
      },
    ]
  },
  //EXO PARA DAROLY
  {
    name: 'EXO',
    url: '/exo',
    iconComponent: { name: 'cil-bar-chart' },
    roles : [ROLES_ENUM.TRANSPORTE_OPERARIO,ROLES_ENUM.TRANSPORTE_OPERARIO_PARA_LA_NIÑA,ROLES_ENUM.TRANSPORTE_MELI],
    children: [
      {
        name: 'NS Beetrack',
        url : '/exo/nivel-servicio'
      },
      {
        name: 'NS Easy',
        url : '/exo/ns-easy'
      },
      // {
      //   name: 'NS Electrolux',
      //   url : '/exo/ns-electrolux'
      // }
      
    ]
  },
  {
    name: 'EXO',
    url: '/exo',
    iconComponent: { name: 'cil-bar-chart' },
    roles : [ROLES_ENUM.SUPERVISOR_EXO],
    children: [
      {
        name: 'NS Beetrack',
        url : '/exo/nivel-servicio'
      },
      // {
      //   name: 'NS Electrolux',
      //   url : '/exo/ns-electrolux'
      // }
      
    ]
  },
  //EXO PARA solo ns tiendas
  {
    name: 'EXO',
    url: '/exo',
    iconComponent: { name: 'cil-bar-chart' },
    roles : ROLES_PERMITIDOS.EXO_TIENDAS,
    children: [
      {
        name: 'NS Driver',
        url : '/exo/ns-driver'
      },
      {
        name: 'NS Easy',
        url : '/exo/ns-easy'
      },
      // {
      //   name: 'NS Electrolux',
      //   url : '/exo/ns-electrolux'
      // }
    ]
  },
  // FULL PANTALLA
  {
    name: 'Operaciones',
    url: '/operaciones',
    iconComponent: { name: 'cil-clipboard' },
    roles : ROLES_PERMITIDOS.OPERACIONES_VIEWS_FULL,
    children: [
      {
        name: 'Pendientes',
        url: '/operaciones/pendientes'
      },
      // {
      //   name: 'Pendientes en ruta',
      //   url: '/operaciones/pendientes-en-ruta'
      // },
      {
        name: 'Estados',
        url: '/operaciones/estados'
      },
      {
        name: 'Productos sin clasificación',
        url: '/operaciones/productos-sin-clasificacion'
      },
      {
        name: 'Edicion Pendientes',
        url: '/operaciones/edicion-pendientes'
      },
      {
        name: 'Diferencia Fechas Easy',
        url: '/operaciones/dif-fechas-easy'
      },
      {
        name: 'Productos Ingresados',
        url: '/operaciones/productos-ingresados-easy'
      },
      {
        name: 'Clientes',
        url: '/operaciones/editar-ruta'
      }
    ]
  },
  // fulll para admin
  {
    name: 'Operaciones',
    url: '/operaciones',
    iconComponent: { name: 'cil-clipboard' },
    roles : [ROLES_ENUM.ADMIN],
    children: [
      {
        name: 'Pendientes',
        url: '/operaciones/pendientes'
      },
      // {
      //   name: 'Pendientes en ruta',
      //   url: '/operaciones/pendientes-en-ruta'
      // },
      {
        name: 'Estados',
        url: '/operaciones/estados'
      },
      {
        name: 'Productos sin clasificación',
        url: '/operaciones/productos-sin-clasificacion'
      },
      {
        name: 'Edicion Pendientes',
        url: '/operaciones/edicion-pendientes'
      },
      {
        name: 'Diferencia Fechas Easy',
        url: '/operaciones/dif-fechas-easy'
      },
      {
        name: 'Productos Ingresados',
        url: '/operaciones/productos-ingresados-easy'
      },
      {
        name: 'Clientes',
        url: '/operaciones/editar-ruta'
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
  //// operaciones COORDINADORES
  {
    name: 'Operaciones',
    url: '/operaciones',
    iconComponent: { name: 'cil-clipboard' },
    roles : [ROLES_ENUM.COORDINADOR, ROLES_ENUM.JEFE_SEGURIDAD,ROLES_ENUM.TRANSPORTE_OPERARIO_PARA_LA_NIÑA],
    children: [
      {
        name: 'Pendientes',
        url: '/operaciones/pendientes'
      },
      // {
      //   name: 'Pendientes en ruta',
      //   url: '/operaciones/pendientes-en-ruta'
      // },
      {
        name: 'Estados',
        url: '/operaciones/estados'
      },
      {
        name: 'Productos sin clasificación',
        url: '/operaciones/productos-sin-clasificacion'
      },
      {
        name: 'Diferencia Fechas Easy',
        url: '/operaciones/dif-fechas-easy'
      },
      {
        name: 'Productos Ingresados',
        url: '/operaciones/productos-ingresados-easy'
      },
    ]
  },
  {
    name: 'Operaciones',
    url: '/operaciones',
    iconComponent: { name: 'cil-clipboard' },
    roles : [ROLES_ENUM.PICKEADOR_TIENDA,ROLES_ENUM.TRANSPORTE_OPERARIO,ROLES_ENUM.TRANSPORTE_MELI],
    children: [
      {
        name: 'Estados',
        url: '/operaciones/estados'
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
      },
      {
        name: 'Diferencia Fechas Easy',
        url: '/operaciones/dif-fechas-easy'
      },
      {
        name: 'Productos Ingresados',
        url: '/operaciones/productos-ingresados-easy'
      },
    ]
  }
  ,
  { // Operaciones RAUDDY
    name: 'Operaciones',
    url: '/operaciones',
    iconComponent: { name: 'cil-clipboard' },
    roles : [ROLES_ENUM.RAUDDY,ROLES_ENUM.JEFE_TRANSPORTE],
    children: [
      {
        name: 'Pendientes',
        url: '/operaciones/pendientes'
      },
      // {
      //   name: 'Pendientes en ruta',
      //   url: '/operaciones/pendientes-en-ruta'
      // },
      {
        name: 'Estados',
        url: '/operaciones/estados'
      },
      {
        name: 'Edicion Pendientes',
        url: '/operaciones/edicion-pendientes'
      },
    ]
  }
  ,
  { // Operaciones Log Inversa
    name: 'Operaciones',
    url: '/operaciones',
    iconComponent: { name: 'cil-clipboard' },
    roles : [ROLES_ENUM.LI],
    children: [
      {
        name: 'Pendientes',
        url: '/operaciones/pendientes'
      }
    ]
  },
  ///Pantalla Full
  {
    name: 'Rutas',
    url: '/picking',
    iconComponent: { name: 'cil-truck' },
    // roles : ROLES_PERMITIDOS.PICKING_ALL,
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
      
      
      // {
      //   name : 'Quadminds',
      //   url: '/picking/quadminds'
      // },
      {
        name : 'Rutas Predictivas',
        url : '/picking/prearmado-ruta'
      },
      {
        name : 'Despacho Ruta',
        url : '/picking/buscar-ruta'
      },
      {
        name : 'Resumen Rutas',
        url : '/picking/resumen-rutas'
      },
      {
        name: 'Pedidos Comp. Obligatorio',
        url: '/picking/pendientes-obligados'
      },
      // {
      //   name :"Rutas Manuales",
      //   url : '/picking/rutas-manuales'
      // },
      {
        name :"Guías seguimiento",
        url : '/picking/guias-manuales'
      }
    ]
  },
// Pantalla casi todas
  {
    name: 'Rutas',
    url: '/picking',
    iconComponent: { name: 'cil-truck' },
    roles : ROLES_PERMITIDOS.PICKING_CASI_ALL,
    children: [
      {
        name: 'Crear Ruta',
        url: '/picking/ruta-manual'
      },
      {
        name: 'Rutas Activas',
        url: '/picking/rutas-activas'
      },
      // {
      //   name : 'Quadminds',
      //   url: '/picking/quadminds'
      // },
      {
        name : 'Rutas Predictivas',
        url : '/picking/prearmado-ruta'
      },
      {
        name : 'Despacho Ruta',
        url : '/picking/buscar-ruta'
      },
      {
        name : 'Resumen Rutas',
        url : '/picking/resumen-rutas'
      },
      {
        name: 'Pedidos Comp. Obligatorio',
        url: '/picking/pendientes-obligados'
      },
    ]
  },
  { /// Pantalla de info para Mercadolibre
    name: 'Mercado Libre',
    url: '/mercadolibre',
    iconComponent : {name : 'cil-handshake'},
    roles :  [ROLES_ENUM.SUPERVISOR_MERCADO_LIBRE,ROLES_ENUM.JEFE_OPERACION_MERCADO_LIBRE, ROLES_ENUM.TRANSPORTE_MELI],
    children: [
      // {
      //   name: "Información",
      //   url : '/mercadolibre/info-mercado-libre'
      // },
      {
        name: "Citaciones",
        url:  '/mercadolibre/citaciones'
      },
      {
        name: "Supervisores",
        url:  '/mercadolibre/supervisores'
      },
      {
        name: "Seguimiento Diario",
        url:  '/mercadolibre/citacion-supervisores'
      },
      {
        name: "Resumen Supervisores",
        url:  '/mercadolibre/ns-supervisores'
      },
      {
        name: "Posibles Rutas",
        url:  '/mercadolibre/posibles-rutas'
      },
      // {
      //   name: "Test PPU",
      //   url:  '/mercadolibre/test-ppu'
      // },
      
    ]
  },
  { /// Pantalla de info para Mercadolibre
    name: 'Mercado Libre',
    url: '/mercadolibre',
    iconComponent : {name : 'cil-handshake'},
    roles :  [ROLES_ENUM.JEFE_OPERACIONES],
    children: [
      // {
      //   name: "Información",
      //   url : '/mercadolibre/info-mercado-libre'
      // },
      {
        name: "Citaciones",
        url:  '/mercadolibre/citaciones'
      },
      {
        name: "Supervisores",
        url:  '/mercadolibre/supervisores'
      },
      
    ]
  },
  { /// Pantalla de info para Mercadolibre
    name: 'Mercado Libre',
    url: '/mercadolibre',
    iconComponent : {name : 'cil-handshake'},
    roles :  ROLES_PERMITIDOS.MELI_ADMIN,
    children: [
      // {
      //   name: "Información",
      //   url : '/mercadolibre/info-mercado-libre'
      // },
      {
        name: "Citaciones",
        url:  '/mercadolibre/citaciones'
      },
      {
        name: "Supervisores",
        url:  '/mercadolibre/supervisores'
      },
      {
        name: "Prefactura",
        url:  '/mercadolibre/prefactura'
      },
      {
        name: "Seguimiento Diario",
        url:  '/mercadolibre/citacion-supervisores'
      },
      {
        name: "Resumen Supervisores",
        url:  '/mercadolibre/ns-supervisores'
      },
      {
        name: "Posibles Rutas",
        url:  '/mercadolibre/posibles-rutas'
      },
      // {
      //   name: "Test PPU",
      //   url:  '/mercadolibre/test-ppu'
      // },
      
    ]
  },
  { /// Pantalla de info para Mercadolibre
    name: 'Mercado Libre',
    url: '/mercadolibre',
    iconComponent : {name : 'cil-handshake'},
    roles :  ROLES_PERMITIDOS.MELI_VIEW_FINANZA,
    children: [
      {
        name: "Prefactura",
        url:  '/mercadolibre/prefactura'
      },
      {
        name: "Posibles Rutas",
        url:  '/mercadolibre/posibles-rutas'
      },
    ]
  },

  { /// Pantalla de Mercadolibre para GB
    name: 'Mercado Libre',
    url: '/mercadolibre',
    iconComponent : {name : 'cil-handshake'},
    roles :  [ROLES_ENUM.JEFE_TRANSPORTE_BENA],
    children: [
      {
        name: "Seguimiento Diario",
        url:  '/mercadolibre/citacion-supervisores'
      },
      {
        name: "Resumen Supervisores",
        url:  '/mercadolibre/ns-supervisores'
      },
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
      },
      {
        name: 'Reporte entregas Diarias',
        url: '/toc/reporte-entrega.diaria'
      },
      {
        name: 'Reporte Telefonos',
        url: '/toc/reporte-telefono'
      },
      {
        name: 'Seguimiento Ruta',
        url: '/toc/seguimiento-ruta'
      },
      {
        name: 'Productos Adelanto',
        url : '/toc/producto-adelanto'
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
      },
      {
        name: 'Reporte entregas Diarias',
        url: '/toc/reporte-entrega.diaria'
      },
      {
        name: 'Seguimiento Ruta',
        url: '/toc/seguimiento-ruta'
      },
      {
        name: 'Productos Adelanto',
        url : '/toc/producto-adelanto'
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
    // Pantalla TOC Operaciones jefe
    name: 'TOC',
    url: '/toc',
    iconComponent: { name: 'cil-chat-bubble' },
    roles : ROLES_PERMITIDOS.OPE_TOC,
    children: [
      {
        name: 'Alertas Vigentes',
        url: '/toc/alertas-vigentes'
      },
      {
        name: 'NS TOC',
        url: '/toc/jefatura'
      },
      {
        name: 'Seguimiento Ruta',
        url: '/toc/seguimiento-ruta'
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
      },
      {
        name : 'Rutas Predictivas',
        url : '/picking/prearmado-ruta'
      },
      {
        name : 'Despacho Ruta',
        url : '/picking/buscar-ruta'
      }
    ]
  },
  {
    // Pantalla muestra para JEFE TOC
    name: 'Rutas',
    url: '/picking',
    iconComponent: { name: 'cil-truck' },
    roles : [ROLES_ENUM.JEFE_TOC],
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
        name : 'Despacho Ruta',
        url : '/picking/buscar-ruta'
      },
      {
        name: 'Pedidos Comp. Obligatorio',
        url: '/picking/pendientes-obligados'
      },
    ]
  },
  {
    // Pantalla muestra para Jefe transporte
    name: 'Rutas',
    url: '/picking',
    iconComponent: { name: 'cil-truck' },
    roles : [ROLES_ENUM.JEFE_TRANSPORTE, ROLES_ENUM.TRANSPORTE_OPERARIO,ROLES_ENUM.TRANSPORTE_MELI],
    children: [
      {
        name: 'Rutas Activas',
        url: '/picking/rutas-activas'
      }
    ]
  },
  { /// Pantalla Informacion Para Jefe transporte,
    name: 'Información',
    url: '/informacion',
    iconComponent : {name : 'cil-magnifying-glass'},
    roles : [ROLES_ENUM.JEFE_TRANSPORTE,ROLES_ENUM.TRANSPORTE_OPERARIO,ROLES_ENUM.TRANSPORTE_OPERARIO_PARA_LA_NIÑA,ROLES_ENUM.TRANSPORTE_MELI],
    children: [
      {
        name: "Tracking Producto",
        url : '/informacion/tracking-producto'
      }
    ]
  },
  { /// Pantalla Informacion Para ADMINISTRADORES
    name: 'Información',
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
      },
      {
        name: "Historial Producto",
        url: '/informacion/timeline',
      },
      {
        name: "Modalidad operación",
        url: '/informacion/modalidades-de-operaciones',
      },
      {
        name: "Peso Volumétrico",
        url:  '/informacion/peso-volumetrico'
      }
    ]
  },
  { /// Pantalla Informacion Para NO OPERACIONES
    name: 'Información',
    url: '/informacion',
    iconComponent : {name : 'cil-magnifying-glass'},
    roles : ROLES_PERMITIDOS.INFORMACION_NO_OPERACIONES,
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
      },
      {
        name: "Historial Producto",
        url: '/informacion/timeline',
      }
    ]
  },
  
  { /// Pantalla Informacion Para OPERACIONES
    name: 'Información',
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
      },
      {
        name: "Historial Producto",
        url: '/informacion/timeline',
      },
      {
        name: "Peso Volumétrico",
        url:  '/informacion/peso-volumetrico'
      }
    ]
  },
  { /// Pantalla Informacion Para Finanzas
    name: 'Finanzas',
    url: '/finanzas',
    iconComponent : {name : 'cilMoney'},
    roles : ROLES_PERMITIDOS.FINANZAS_VIEW,
    children: [
      {
        name: "Descuento",
        url : '/finanzas/test'
      },
      {
        name: "Car. Tarifario General",
        url : '/finanzas/tarifario'
      },
      {
        name: "Tarifario General",
        url : '/finanzas/tarifarioGeneral'
      },
      // {
      //   name: "Car. Vehículo",
      //   url: '/finanzas/carVehiculo'
      // },
      {
        name: "Tarifario Especifico",
        url: '/finanzas/carTarifarioEspecifico'
      },
      {
        name: "Rutas Mercado Libre",
        url : '/finanzas/rutas-meli'
      },
    ]
  },
  { /// Pantalla Informacion Para ADMIN TI
    name: 'Finanzas',
    url: '/finanzas',
    iconComponent : {name : 'cilMoney'},
    roles : [ROLES_ENUM.ADMIN],
    children: [
      {
        name: "Descuento",
        url : '/finanzas/test'
      },
      {
        name: "Car. Tarifario General",
        url : '/finanzas/tarifario'
      },
      {
        name: "Tarifario General",
        url : '/finanzas/tarifarioGeneral'
      },
      {
        name: "Tarifario Especifico",
        url: '/finanzas/carTarifarioEspecifico'
      },
      {
        name: "Rutas Mercado Libre",
        url : '/finanzas/rutas-meli'
      },
    ]
  },
  //// Pantalla de finanzas para transporte admin????

  { /// Pantalla Informacion Para ADMIN TI
    name: 'Finanzas',
    url: '/finanzas',
    iconComponent : {name : 'cilMoney'},
    roles : [ROLES_ENUM.TRANSPORTE_ADMINISTRATIVO],
    children: [
      {
        name: "Descuento",
        url : '/finanzas/test'
      },
      {
        name: "Car. Tarifario General",
        url : '/finanzas/tarifario'
      },
      {
        name: "Tarifario General",
        url : '/finanzas/tarifarioGeneral'
      },
      // {
      //   name: "Car. Vehículo",
      //   url: '/finanzas/carVehiculo'
      // },
      {
        name: "Tarifario Especifico",
        url: '/finanzas/carTarifarioEspecifico'
      },
      {
        name: "Rutas Mercado Libre",
        url : '/finanzas/rutas-meli'
      },
    ]
  },
  { /// Pantalla Informacion Para TOC
    name: 'Información',
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
      },
      {
        name: "Historial Producto",
        url: '/informacion/timeline',
      }

    ]
  },
  
  { /// Pantalla Informacion Para PISTOLEADORES
    name: 'Información',
    url: '/info',
    iconComponent : {name : 'cil-magnifying-glass'},
    roles : [ROLES_ENUM.RUT_PICKEADOR,],
    children: [
      {
        name: "Estado",
        url : '/info/estado'
      },
      {
        name: "Buscar SKU",
        url : '/info/buscar-sku'
      },
      {
        name: "Tracking Producto",
        url : '/informacion/tracking-producto'
      }
    ]
  },
  { /// Pantalla Informacion Para PISTOLEADORES
    name: 'Información',
    url: '/info',
    iconComponent : {name : 'cil-magnifying-glass'},
    // roles : ROLES_PERMITIDOS.INFORMACION_PICKING,
    roles : [ROLES_ENUM.PICKING],
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
    roles : ROLES_PERMITIDOS.INGRESO_CLIENTE_FULL,
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
    name: 'Ingreso cliente',
    url: '/ingreso-cliente',
    iconComponent : {name : 'cil-building'},
    roles : [ROLES_ENUM.PICKEADOR_TIENDA, ROLES_ENUM.RAUDDY],
    children: [
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
      // {
      //   name: 'Electrolux',
      //   url: '/recepcion/electrolux'
      // },
      // {
      //   name: 'Sportex',
      //   url: '/recepcion/sportex'
      // },
      {
        name: 'Producto Sin Recepcionar',
        url: '/recepcion/productoSinRecepcion'
      }
    ]
  },
  /// Vistas RSV
  {
    name: 'RSV',
    url : '/rsv',
    roles : ROLES_PERMITIDOS.RSV_ALL,
    iconComponent: { name: 'cil-window' },
    children : [
     
     {
       name: 'Catálogo',
       url: '/rsv/catalogo'
     },
     {
      name: 'Lista inventarios',
      url: '/rsv/inventario-sucursal'
     },
     {
      name: 'Crear Carga',
      url: '/rsv/crear-carga'
     },
     {
      name: 'Arribo de Cargas',
      url: '/rsv/listar-carga'
     },
     {
      name: 'Ventas',
      url: '/rsv/ventas'
     },
      {
      name: 'Armar venta',
      url: '/rsv/armar-venta'
     },
     {
      name: 'Lista de ventas',
      url: '/rsv/lista-venta'
     },
     {
      name: 'Reporte etiquetas',
      url: '/rsv/reporte-etiquetas'
     },
     {
      name: 'Asignar Ubicación',
      url: '/rsv/filtro-ubicacion'
     },
     {
      name: 'Lista de Paquetes Abiertos',
      url: '/rsv/listar-paquetes'
     },
     {
      name: 'Mantenedor',
      url: '/rsv/mantenedor'
     },
     {
      name: 'Racks estructura',
      url: '/rsv/ubicacion-producto'
     },
    
    
    //  {
    //   name: 'Unidades Sin Etiqueta',
    //   url: '/rsv/unidad-sin-etiqueta'
    //  }
    //  {
    //   name: 'Agregar Producto',
    //   url: '/rsv/agregar-producto'
    // },
   ]
 },
 {
  name: 'RSV',
  url : '/rsv',
  roles :[ROLES_ENUM.ADMINISTRATIVO_RSV],
  iconComponent: { name: 'cil-window' },
  children : [
   {
     name: 'Catálogo',
     url: '/rsv/catalogo'
   },
   {
    name: 'Lista inventarios',
    url: '/rsv/inventario-sucursal'
   },
   {
    name: 'Crear Carga',
    url: '/rsv/crear-carga'
   },
   {
    name: 'Arribo de Cargas',
    url: '/rsv/listar-carga'
   },
   {
    name: 'Ventas',
    url: '/rsv/ventas'
   },
   {
    name: 'Armar venta',
    url: '/rsv/armar-venta'
   },
   {
    name: 'Lista de ventas',
    url: '/rsv/lista-venta'
   },
   {
    name: 'Reporte etiquetas',
    url: '/rsv/reporte-etiquetas'
   },
   {
    name: 'Asignar Ubicación',
    url: '/rsv/filtro-ubicacion'
   },
   {
    name: 'Racks estructura',
    url: '/rsv/ubicacion-producto'
   },
   {
    name: 'Lista de Paquetes Abiertos',
    url: '/rsv/listar-paquetes'
   }
 ]
},
//NUEVO ROL (Yerko)
{
  name: 'RSV',
  url : '/rsv',
  roles :[ROLES_ENUM.NROL_RSV],
  iconComponent: { name: 'cil-window' },
  children : [
   {
     name: 'Catálogo',
     url: '/rsv/catalogo'
   },
   {
    name: 'Lista inventarios',
    url: '/rsv/inventario-sucursal'
   },
   {
    name: 'Arribo de Cargas',
    url: '/rsv/listar-carga'
   },
   {
    name: 'Ventas',
    url: '/rsv/ventas'
   },
   {
    name: 'Armar venta',
    url: '/rsv/armar-venta'
   },
   {
    name: 'Lista de ventas',
    url: '/rsv/lista-venta'
   },
   {
    name: 'Reporte etiquetas',
    url: '/rsv/reporte-etiquetas'
   },
   {
    name: 'Asignar Ubicación',
    url: '/rsv/filtro-ubicacion'
   },
   {
    name: 'Racks estructura',
    url: '/rsv/ubicacion-producto'
   },
   {
    name: 'Lista de Paquetes Abiertos',
    url: '/rsv/listar-paquetes'
   }
 ]
},
 {
  name: 'RSV',
  url : '/rsv',
  roles : [ROLES_ENUM.CLIENTE_RSV],
  iconComponent: { name: 'cil-window' },
  children : [
   {
     name: 'Catálogo',
     url: '/rsv/catalogo'
   },
   {
    name: 'Lista inventarios',
    url: '/rsv/inventario-sucursal'
   },
   {
    name: 'Arribo de Cargas',
    url: '/rsv/listar-carga'
   },
   {
    name: 'Lista de ventas',
    url: '/rsv/lista-venta'
   },
 ]
},
{
  name: 'RSV',
  url : '/rsv',
  roles : [ROLES_ENUM.OPERARIO_RSV],
  iconComponent: { name: 'cil-window' },
  children : [
   {
     name: 'Catálogo',
     url: '/rsv/catalogo'
   },
   {
    name: 'Lista inventarios',
    url: '/rsv/inventario-sucursal'
   },
   {
    name: 'Lista de ventas',
    url: '/rsv/lista-venta'
   },
   {
    name: 'Reporte etiquetas',
    url: '/rsv/reporte-etiquetas'
   },
   {
    name: 'Asignar Ubicación',
    url: '/rsv/filtro-ubicacion'
   },
   {
    name: 'Racks estructura',
    url: '/rsv/ubicacion-producto'
   },
  
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
      {
        name: 'Gestión de usuario',
        url: '/panel/gestion-de-usuario-y-mantencion'
      },
    ]
  },
  
  {
    name: 'Inventario TI',   // Nombre que sale en el navBar
    url : '/inventario-ti', // URL de la ruta que apunta
    iconComponent: { name: 'cilDevices' }, // el icono que muestra
    roles : ROLES_PERMITIDOS.INVENTARIO_TI, // los perfiles o roles que pueden ver esto
    children : [ // las pestañas que va a mostrar 
      {
        name: 'Mantenedores',  // Nombre
        url: '/inventario-ti/mantenedores' // La ruta especifica
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





