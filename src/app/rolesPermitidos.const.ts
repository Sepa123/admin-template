import {ROLES_ENUM} from  './models/enum/roles.enum'

export const ROLES_PERMITIDOS = {
    LOGIN_NOT_ALLOW : [ROLES_ENUM.USER_JURIDICO, ROLES_ENUM.USER_NATURAL],
    DASHBOARD : [ROLES_ENUM.ADMIN, ROLES_ENUM.JEFE_FINANZAS, ROLES_ENUM.JEFE_TRANSPORTE, ROLES_ENUM.JEFE_OPERACIONES,ROLES_ENUM.TRANSPORTE,ROLES_ENUM.COORDINADOR],
    TRANSPORTE : [ROLES_ENUM.ADMIN, ROLES_ENUM.JEFE_TRANSPORTE, ROLES_ENUM.CHOFER,ROLES_ENUM.TRANSPORTE, ROLES_ENUM.JEFE_OPERACIONES],
    OPERACIONES : [ROLES_ENUM.ADMIN, ROLES_ENUM.JEFE_OPERACIONES,ROLES_ENUM.COORDINADOR],
    PICKING : [ROLES_ENUM.ADMIN, ROLES_ENUM.JEFE_OPERACIONES,ROLES_ENUM.COORDINADOR],
    OPL  : [ROLES_ENUM.ADMIN],
    RECEPCION : [ROLES_ENUM.ADMIN,ROLES_ENUM.PICKING, ROLES_ENUM.JEFE_OPERACIONES,ROLES_ENUM.COORDINADOR],
    PANEL : [ROLES_ENUM.ADMIN],
    INFORMACION : [ROLES_ENUM.ADMIN,ROLES_ENUM.PICKING, ROLES_ENUM.JEFE_OPERACIONES,ROLES_ENUM.COORDINADOR]
}


export const ACCESO_ROL : any = {
    [ROLES_ENUM.ADMIN_DCORE] : 'dashboard',
    [ROLES_ENUM.CHOFER] : 'transporte/reportes',
    [ROLES_ENUM.SUPERVISOR] : 'dashboard',
    [ROLES_ENUM.ADMIN] : 'dashboard',
    [ROLES_ENUM.TRANSPORTE] : 'dashboard',
    [ROLES_ENUM.JEFE_OPERACIONES] : 'dashboard',
    [ROLES_ENUM.JEFE_TRANSPORTE] : 'dashboard',
    [ROLES_ENUM.PICKING]: 'informacion/estado',
    [ROLES_ENUM.COORDINADOR] : 'dashboard'
}