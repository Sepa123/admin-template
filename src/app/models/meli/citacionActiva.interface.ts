export interface MainCitacionA {
    [key: string]:        string|null|boolean|number|CamposPorOperacion[];
    id_ty:                string;
    operacion:            string;
    estado:               number;
    estado_correcto:      boolean;
    ruta_meli:            string;
    id_ppu:               number;
    razon_id:             number;
    ppu:                  string;
    patente_igual:        boolean;
    driver:               string;
    driver_ok:            boolean;
    p_avance:             number;
    avance:               number;
    campos_por_operacion: CamposPorOperacion[];
    tipo_vehiculo:        string;
    valor_ruta:           string;
    ruta_cerrada:         boolean;
}

export interface CamposPorOperacion {
    total_paradas:        number;
    paqueteria_colectada: number;
    estimados:            number;
    preparados:           number | null;
    p_colectas_a_tiempo:  number;
    p_no_colectadas:      number;
}