export interface PosiblesRutas {
    Id:               number;
    Created_at:       string;
    Ruta:             string;
    Driver:           string;
    Ppu:              null | string;
    Existe_citacion:  boolean;
    Existe_en_mae_ds: boolean;
    En_proforma:      boolean;
    Usuarios:         Usuario[];
}

export interface Usuario {
    id_usuario:            number;
    ids_usuario:           string;
    nombre:                string;
    cantidad_repeticiones: number;
}
