export interface ObservacionTOC {
    Guia:               string;
    Cliente:            string;
    Comuna:             string;
    Fecha_compromiso:   Date;
    Fecha_Reprogramada: Date;
    Observacion:        null | string;
    Codigo_TY:          string;
    Alerta:             boolean;
    En_ruta:            null | string;
}