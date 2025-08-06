export interface Menu {
    rol_id:     number;
    nombre_rol: string;
    menus:      ListaMenu[];
    
}

export interface ListaMenu {
    id_menu:     number;
    submenus:    ListaSubmenu[];
    menus_ids:  number[];
    is_propietario: boolean ;
    nombre_menu: string;
    icono : string;
    subtitulo : string
}

export interface ListaSubmenu {
    acceso:          boolean;
    permiso:        number;
    id_submenu:     number;
    nombre_submenu: string;
}



export interface ListaUsuarios {
    id_usuario:     number;
    nombre_usuario: string;
    area:           string | null;
    cargo:          null | string;
    imagen_perfil:  null | string;
    rol_id:         string;
    submenus_permisos: boolean
}