export interface MainCitacionS {
    Id_operacion: number;
    Nombre:       string;
    Id_centro_op: number;
    Centro:       string;
    Region:       string;
    Detalles:     Detalle[];
}

export interface Detalle {
    estado:        number;
    id_ppu:        number;
    ruta_meli:     null | string;
    ppu:           string;
    tipo_vehiculo: number | null;
    p_avance:      number;
    avance:        number;
}