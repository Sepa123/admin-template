export interface BackofficeUsuarioTOC {
    Fecha_creacion:   Date;
    Guia:             string;
    Cliente:          string;
    Comuna:           string;
    Direccion:        string;
    Fecha_compromiso: string;
    Observacion:      null | string;
    Codigo_TY:        string;
    Alerta:           boolean;
    En_ruta:          null | string;
    Id:               number;
    Creado_por:       string;
}
