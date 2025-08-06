export interface MainTelefonosTruncados {
    visible: boolean;
    items:   number;
    datos:   DatoTelefonos[];
}

export interface DatoTelefonos {
    Ingreso_sistema:  string;
    Cliente:          string;
    Telefono:         string;
    Cod_pedido:       string;
    Fecha_compromiso: Date;
    Cod_producto:     string;
    Sku:              string;
    Nombre:           string;
    Direccion_real:   string;
    Comuna:           string;
    Region:           string;
    Cantidad:         number;
    Verificado:       boolean;
    Recepcionado:     boolean;
    Estado:           string;
    Subestado:        string;
}