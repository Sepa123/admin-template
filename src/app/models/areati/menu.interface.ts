export interface Menu {
    id:       number;
    posicion: number;
    titulo:   string;
    icono:    string;
    activo:   boolean;
    subtitulo: string;
    submenus: Submenu[];
}

export interface Submenu {
    link:    string;
    submenu: string;
    activo:  boolean;
    id_submenu: number;
}