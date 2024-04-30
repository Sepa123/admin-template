export interface NsPanelPrincipalEasy {
    Total_entregas:        number;
    Total_entregados:      number;
    Entregados_hoy:        number;
    En_ruta:               number;
    Sin_ruta_beetrack:     number;
    Anulados:              number;
    Porcentaje_entrega:    number;
    Porcentaje_no_entrega: number;
    Proyeccion:            number;
    Pendientes:            number;
    Porcentaje_pend_en_ruta: number;
    No_entregado:          number;
    Porcentaje_no_entregado: number;
    Porcentaje_sin_ruta_beetrack: number;
}


export interface NsPanelRegionEasy {
    Region:       string;
    Total_region: number;
    Entregados:   number;
    Ns_region:    number;
}

export interface NSPanelNoEntregasEasy {
    Estado:     string;
    Total:      string;
    Porcentaje: number;
}