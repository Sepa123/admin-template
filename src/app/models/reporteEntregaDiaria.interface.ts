export interface ReporteEfectividadConductor {
    Suma:                number;
    T_ent:               number;
    N_ent:               number;
    Efectividad_entrega: number;
}

export interface ReporteEstadoEntregas{
    Descripcion: string;
    Tag:         string;
    Total:       number;
}

export interface ReporteEntregasConductor{
    Driver:         string;
    Patente:        string;
    Total:          number;
    Entregados:     number;
    No_entregado:   number;
    E_entrega:      number;
}
export interface Tienda{
    Nombre: string;
}

export interface NombreRegion{
    Id_region:  string;
    Region_num: string;
    region:     string;
}