export interface MainCamposBT {
    Estados:    Estado[];
    Subestados: Subestado[];
    Codigo1:    Codigo1[];
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