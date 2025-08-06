export interface ActividadDiariaTOC {
    Fecha_creacion:   string;
    Guia:             string;
    Cliente:          string;
    Comuna:           string;
    Direccion:        string;
    Fecha_compromiso: string;
    Observacion:      null | string;
    Codigo_TY:        string;
    Alerta:           boolean;
    En_ruta:          null | string;
    Estado:           string;
    Creado_por:       string;
}
