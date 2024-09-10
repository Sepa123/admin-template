export interface MainPanelVehiculos {
    Panel_vehiculos:     PanelVehiculos;
    Panel_vehiculos_obs: PanelVehiculosObs;
}

export interface PanelVehiculos {
    Total:                 number;
    Vehiculos_Habilitados: number;
    Habilitados_con_GPS:   number;
    Habilitados_sin_GPS:   number;
}

export interface PanelVehiculosObs {
    Observados:  number;
    Vencidos:    number;
    por_Vencer:  number;
    Incompletos: number;
}

export interface PanelColaboradore {
    Total:                 number;
    Colaboradores_Activos: number;
    Activos_con_Contrato:  number;
    Activos_sin_Contrato:  number;
}
