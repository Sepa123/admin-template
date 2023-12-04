export interface ProductoOPL {
    Fecha_Ingreso:        string;
    Cliente:              string;
    Codigo_cliente:       string;
    Nombre:               string;
    Calle:                string;
    Ciudad:               string;
    Provincia:            string;
    Codigo_pedido:        string;
    Fecha_pedido:         Date;
    Codigo_producto:      string;
    Descripcion_producto: string;
    Cantidad_producto:    number;
    SKU:                  string;
    Pistoleado:           boolean;
    Carga? :              string;
    Recepcion?:           boolean;
    Bultos:                number;
}