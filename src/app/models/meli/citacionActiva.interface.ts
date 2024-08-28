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
    observacion:          string;
    kilometro:            number;
}

export interface CamposPorOperacion {
    [key: string]:        string|null|boolean|number;
    fm_total_paradas:        number;
    fm_paqueteria_colectada: number;
    fm_estimados:            number;
    fm_preparados:           number | null;
    fm_p_colectas_a_tiempo:  number;
    fm_p_no_colectadas:      number;

    lm_fallido:              number;
    lm_pendiente:            number;
    lm_spr:                  number;
    lm_entregas:             number;
    lm_tiempo_ruta:          string;
    lm_estado:               string;


}