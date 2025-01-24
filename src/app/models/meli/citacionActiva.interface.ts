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
    tipo_ruta:            number;
}




export interface ResumenSupervisores {
    Modalidad:            string;
    Operacion:            string;
    Centro_operacion:     string;
    Region:               string;
    Fecha:                Date;
    Id_ruta:              number;
    Ppu:                  string;
    Driver:               string;
    Kilometros:           number;
    P_avance:             number;
    Avance:               number;
    Campos_por_operacion: CamposPorOperacion[];
    Valor_ruta:           number;
    Ruta_cerrada:         boolean;
    Mostrar_foto:         boolean;
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

export interface PanelSeguimientoDiario {
    Total_vehiculo:       number;
    Total_entrega:  number;
    Pendientes:   number;
    Fallidos: number;
}

export interface PanelResumenMelis {
    Total:       number;
    En_proforma:  number;
    Sin_proforma:   number;
    Descuentos: number;
}


export interface MainResumenRutasSupervisores {
    Rutas:    ResumenSupervisores[];
    Patentes: Patente[];
}

export interface Patente {
    Pantente: string;
}