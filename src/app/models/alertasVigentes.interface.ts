export interface AlertasVigente {
    Fecha_creacion:     string;
    Guia:               null | string;
    Cliente:            null | string;
    Comuna:             null | string;
    Fecha_Compromiso:   null | string;
    Fecha_Reprogramada: null | string;
    Observacion:        null | string;
    Codigo_TY:          null | string;
    Alerta:             boolean;
    En_ruta:            null | string;
    Id:                 string;
}
