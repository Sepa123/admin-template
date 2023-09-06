export interface EditarTOC {
    Observacion:        string;
    Subestado_esperado: string;
    Ids_transyanez:     string;
    Alerta:             boolean;
}


export interface AlertaExistenteTOC {
    Alerta:             boolean | null;
    Fecha_Reprogramada: string | null;
    Direccion_correcta: string | null;
    Comuna_correcta:    string | null;
    Subestado:          string | null;
    Subestado_esperado: string | null;
    Observacion:        string | null;
    Codigo1:            string | null;
    Guia:               string | null
}