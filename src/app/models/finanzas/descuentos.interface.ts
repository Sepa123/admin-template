export interface SeleccionesDescuentos {
    Patentes:     Patente[];
    Razon_social: RazonSocial[];
    Etiquetas:    Etiqueta[];
}

export interface Etiqueta {
    Id:       number;
    Etiqueta: string;
}

export interface Patente {
    Id:      number;
    Patente: string;
}

export interface RazonSocial {
    Id:           number;
    Nombre_razon: string;
}