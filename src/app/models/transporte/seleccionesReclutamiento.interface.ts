export interface MainSeleccionReclutamiento {
    Operacion:          Operacion[];
    Origen:             Origen[];
    Estado_contacto:    EstadoContacto[];
    Motivo_subestado:   MotivoSubestado[];
    Contacto_ejecutivo: ContactoEjecutivo[];
    Tipo_vehiculo:      TipoVehiculo[];
    Region:             Region[];
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
