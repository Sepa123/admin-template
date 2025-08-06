export interface ListaFuncion {
    Id:                     number;
    Fecha_creacion:         Date;
    Esquema:                string;
    Nombre_funcion:         string;
    Tipo_funcion:           string;
    Descripcion:            string;
    Parametros:             string[];
    Comentarios_parametros: string[];
    Palabras_clave:         string[];
    Tablas_impactadas:      string[];
    Codigo_fuente :         string;
    Argumentos :            string;
    Tipo_retorno:           string;

}