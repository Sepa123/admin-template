export interface MainSupervisor {
    Server:        string;
    Id:            number;
    Nombre:        string;
    Mail:          string;
    Imagen_perfil: string | ArrayBuffer | null;
    Lista_centros: ListaCentro[] | null;
}

export interface ListaCentro {
    Operacion:          string;
    Centro_operaciones: CentroOperaciones[];
}

export interface CentroOperaciones {
    id:     number;
    nombre: string;
}