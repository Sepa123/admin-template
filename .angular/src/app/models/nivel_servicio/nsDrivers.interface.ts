export interface MainNsDriver {
    Datos:      Dato[];
    Patentes:   string[];
    Porcentaje: number[];
    Pedidos:    number[];
    Entregados: number[];
}

export interface Dato {
    Patente:             string;
    Total_rutas:         number;
    Total_km:            number;
    Total_pedidos:       number;
    Total_entregados:    number;
    Total_no_entregados: number;
    P_ee:                number;
    Codigo1:             number;
}