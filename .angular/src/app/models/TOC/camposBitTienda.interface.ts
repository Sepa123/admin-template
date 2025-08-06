export interface MainCamposBT {
    Estados:    Estado[];
    Subestados: Subestado[];
    Codigo1:    Codigo1[];
    Clientes_ty: Cliente[];
    Clientes:   Cliente[];
}

export interface Cliente {
    Id:       number;
    Clientes: string;
}

export interface Codigo1 {
    Id:          number;
    Descripcion: string;
}

export interface Estado {
    Id_estado:   number;
    Descripcion: string;
}

export interface Subestado {
    Id_subestado: number;
    Id_estado:    number;
    Descripcion:  string;
}



export interface BitacoraTiendaTOC {
    Fecha_creacion:   string;
    Guia:             string;
    Cliente:          string;
    Observacion:      null | string;
    Codigo_ty:        string;
    Alerta:           boolean;
    Estado:           string;
    Subestado:        string;
    Created_by:       string;
}