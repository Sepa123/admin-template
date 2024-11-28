export interface SeleccionRazonSocial {
    Motivo:         Motivo[];
    Estado:         Estado[];
    Comuna:         Comuna[];
    Marca_vehiculo: Vehiculo[];
    Tipo_vehiculo:  Vehiculo[];
    Region:         Region[];
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

export interface Vehiculo {
    id:   number;
    name: string;
}

export interface Motivo {
    Id:     number;
    Motivo: string;
}

export interface Region {
    Id_region:     string;
    Nombre_region: string;
}
