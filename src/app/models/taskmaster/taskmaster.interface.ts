export interface MainGestorActivos {
    Categorias:  Categoria[];
    Comuna:      Comuna[];
    Region:      Region[];
    Task_status: TaskStatus[];
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

export interface Region {
    Id_region:     string;
    Nombre_region: string;
}

export interface TaskStatus {
    Id:     number;
    Status: string;
}