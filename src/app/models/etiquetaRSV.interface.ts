export interface EtiquetaRSV {
    Id:          number;
    Created_at:  Date;
    Carga:       string;
    Bar_code:    string;
    Codigo:      string;
    Codigo_imp:  string;
    Descripcion: String;
    Color:       number | string;
    Posicion:    number;
    Tipo:        string;
    Verificado:  boolean;
    Ubicacion:   string;
    En_stock:    boolean;
}