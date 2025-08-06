export interface AlertasVigente {
    Fecha_creacion:     string;
    Guia:               null | string;
    Cliente:            null | string;
    Comuna:             string;
    Direccion:          string;
    Fecha_Compromiso:   string;
    // Fecha_Reprogramada: null | string;
    Observacion:        null | string;
    Codigo_TY:          null | string;
    Alerta:             boolean;
    En_ruta:            null | string;
    Id:                 string;
}

export interface BitacoraRango {
    Fecha_creacion:   string;
    Guia:             string;
    Cliente:          string;
    Comuna:           string;
    Direccion:        string;
    Fecha_Compromiso: string;
    Observacion:      null | string;
    Codigo_TY:        string;
    Alerta:           boolean;
    En_ruta:          null | string;
    Estado:           string;
    Created_by:       string;
}
