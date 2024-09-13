export interface MainSeleccionReclutamiento {
    Operacion:          Operacion[];
    Origen:             Origen[];
    Estado_contacto:    EstadoContacto[];
    Motivo_subestado:   MotivoSubestado[];
    Contacto_ejecutivo: ContactoEjecutivo[];
    Tipo_vehiculo:      TipoVehiculo[];
    Region:             Region[];
    Comentarios :        ComentarioReclutamiento [];
}

export interface ContactoEjecutivo {
    Id:        number;
    Ejecutivo: string;
}

export interface EstadoContacto {
    Id:              number;
    Estado_contacto: string;
}

export interface MotivoSubestado {
    Id:               number;
    Motivo_subestado: string;
}

export interface Operacion {
    Id:        number;
    Operacion: string;
}

export interface Origen {
    Id:     number;
    Origen: string;
}

export interface Region {
    Id_region:     string | number;
    Nombre_region: string;
}

export interface TipoVehiculo {
    Id:            number;
    Tipo_vehiculo: string;
}



export interface Reclutamiento {
    Id_reclutamiento:   number;
    Region:             number;
    Operacion_postula:  number;
    Nombre:             string;
    Telefono:           string;
    Tipo_vehiculo:      number;
    Origen_contacto:    number;
    Estado_contacto:    number;
    Motivo_subestado:   number;
    Contacto_ejecutivo: number;
    Razon_social:       string;
    Rut_empresa:        string;
    Internalizado:      null;
    Region_nombre:      string;
    Operacion_nombre:   string;
    Nombre_origen:      string;
    Nombre_estados:     string;
    Nombre_motivo:      string;
}


export interface ComentarioReclutamiento {
    Id:           number;
    Calificacion: string;
    Icono:        string;
    Color:        string;
    Latitud:      string;
    Longitud:     string;
    Comentario:   string;
}