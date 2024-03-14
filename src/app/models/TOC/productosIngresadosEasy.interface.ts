export interface MainProductoIngresado {
    visible: boolean;
    items:   number;
    datos:   DatoPI[];
}

export interface DatoPI {
    Ingreso_sistema: string;
    Cliente:         string;
    Anden:           string;
    Cod_pedido:      string;
    Fec_compromiso:  Date;
    Cod_producto:    string;
    Sku:             string;
    Comuna:          string;
    Region:          string;
    Cantidad:        number;
    Verificado:      boolean;
    Recepcionado:    boolean;
    Estado:          string;
    Subestado:       string;
}

