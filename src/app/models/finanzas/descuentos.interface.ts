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


export interface SeleccionOperaciones {
    Id_op:     number;
    Operacion: string;
    Centros:   Centro[];
}

export interface Centro {
    Id_cop: number;
    Nombre: string;
}


export interface Descuentos {
    Id:               number;
    Fecha_evento:      Date;
    Fecha_cobro:      Date;
    Ingresado_por:    string;
    Operacion:        string;
    Centro_operacion: string;
    Ppu:              string;
    Razon_social:     string;
    Cuota:            string;
    Valor_cuenta:     number;
    Total:            number | null;
    Etiqueta:         null | string;
    Descripcion:      null | string;
    Cobrada:          boolean;
    Oc_cobro:         string;
    Adjunto:          string ;
    Aplica:           boolean;
    Id_desc_origen:   number;
}
