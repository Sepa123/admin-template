export interface ReporteMeliFinanza {
    Fecha:            string;
    Modalidad:        string;
    Id_ruta:          number;
    Centro_operacion: string;
    Ppu:              string;
    Tipo_vehiculo:    string;
    Estado_ruta:      string;
    Driver:           string;
    Tipo:             string;
    Ruta_auxiliada:   string;
    Avance:           number;
    Lm_fallido:       number;
    P_avance:         number;
    Lm_entregas:      number;
    Km:               number;
    Peoneta:          string;
    Valor_ruta:       number;
    Observacion:      null | string;
    Razon_id:         number;
    Razon_social:     string;
    Rut_empresa:      string;
    En_proforma:        boolean;
    P_total_descuentos: number;
    Descuento_clp:    string;
    P_a_pago:           boolean;
    Adicional:          boolean
}