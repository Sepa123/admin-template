export interface NotaVenta {
    Id:             number;
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
    Preparado:      boolean;
    Fecha_preparado:string;
    Fecha_despacho: string;
}

export interface NotaVentaProducto {
    Id_venta: number;
    Codigo:   string;
    Unidades: number;
    Id_user:  number;
    Ids_user: string;
    Producto: string;
    UnidadesAgregadas : number 
}


export interface DetalleVenta {
    Bar_code: string;
    Codigo:   string;
    Tipo:     string;
    Cantidad: number;
}
