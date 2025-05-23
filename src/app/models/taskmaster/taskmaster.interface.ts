export interface MainGestorActivos {
    Responsables: Responsable[];
    Estados:     Estado[];
    Areas:       Area[];
    Categorias:  Categoria[];
    Comuna:      Comuna[];
    Region:      Region[];
    Task_status: TaskStatus[];
}

export interface Area {
    Id:   number;
    Area: string;
}

export interface Categoria {
    Id:        number;
    Categoria: string;
}

export interface Comuna {
    Nombre_comuna: string;
    Id_region:     string;
    Id_comuna:     string;
}

export interface Estado {
    Id:     number;
    Estado: string;
}

export interface Region {
    Id_region:     string;
    Nombre_region: string;
}

export interface TaskStatus {
    Id:     number;
    Status: string;
}

export interface Responsable {
    Id:          number;
    Responsable: string;
}



export interface ListaActivos {
    Id:               number;
    Nombre_equipo:    string;
    Categoria:        number;
    Nombre_categoria: string;
    Activo:           boolean;
}
