export interface NotaVenta {
    Id_user:        number;
    Ids_user:       string;
    Sucursal:       number;
    Cliente:        string;
    Direccion:      string;
    Comuna:         string;
    Region:         string;
    Fecha_entrega:  string;
    Tipo_despacho:  number;
    Numero_factura: string;
    Codigo_ty:      string;
    Entregado:      boolean;
}

export interface NotaVentaProducto {
    Id_venta: number;
    Codigo:   string;
    Unidades: number;
    Id_user:  number;
    Ids_user: string;
}
