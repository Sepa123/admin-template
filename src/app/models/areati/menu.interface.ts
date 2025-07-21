export interface Menu {
    posicion: number;
    titulo:   string;
    icono:    string;
    activo:   boolean;
    submenus: Submenu[];
}

export interface Submenu {
    link:    string;
    submenu: string;
    activo:  boolean;
}