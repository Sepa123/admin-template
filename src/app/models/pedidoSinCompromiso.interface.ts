export interface PedidoSinCompromiso {
    Origen:           string;
    Cod_entrega:      number;
    Fecha_ingreso:    string;
    Fecha_compromiso: string;
    Region:           string;
    Comuna:           string;
    Descripcion:      string;
    Bultos:           number;
    Estado:           string;
    Subestado:        string;
    Verificado:       number;
    Recibido:         number;
    Seleccionado:     boolean;
}