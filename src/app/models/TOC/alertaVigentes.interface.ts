export interface PanelAlertasTOC {
    Tickets_Creados_Hoy: number;
    CD:                  number;
    Easy_Tienda:         number;
    Alertas_Vigentes:    number;
}




export interface DatosAlertasVigentes {
    Comuna:     Comuna[];
    Subestados: Subestado[];
    Codigo1:    Codigo1[];
}

export interface Codigo1 {
    Id:                number;
    Descripcion:       string;
    Descripcion_larga: string;
}

export interface Comuna {
    Nombre_comuna: string;
    Id_region:     string;
    Id_comuna:     string;
}

export interface Subestado {
    Id:          number;
    Parent_code: number;
    Nombre:      string;
    Codigo:      number;
}