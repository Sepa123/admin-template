export interface SeleccionesVehiculo {
    Comuna:                  Comuna[];
    Marca_vehiculo:          any[];
    Tipo_vehiculo:           any[];
    Region:                  Region[];
    Vehiculos_observaciones: VehiculosObservacione[];
}


export interface Comuna {
    Nombre_comuna: string;
    Id_region:     string;
    Id_comuna:     string;
}

export interface Vehiculo {
    id:   number ;
    name: string;
}

export interface Region {
    Id_region: string;
    Region:    string;
}

export interface VehiculosObservacione {
    Codigo_retorno:            number;
    Ppu:                       string;
    Razon_social:              string;
    Rut:                       string;
    Celular:                   string;
    Permiso_circulacion_fvenc: string | null;
    Soap_fvenc:                string | null;
    Revision_tecnica_fvenc:    string | null;
    Gps:                       boolean;
}