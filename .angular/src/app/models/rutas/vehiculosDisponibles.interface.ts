export interface VehiculoDisponible {
    Vehiculo_id:    number;
    Ppu:            string;
    Tipo:           number | null;
    Colaborador_id: number;
    Razon_social:   string;
    Tripulacion:    null;
}


export interface PatenteDisponible {
    Patentes:     string;
    Tipo:         number | null;
    Razon_social: string;
    Rutas:        number;
    Porcentaje:   number;
    Estrellas:    number;
    Habilitado:   boolean;
}
