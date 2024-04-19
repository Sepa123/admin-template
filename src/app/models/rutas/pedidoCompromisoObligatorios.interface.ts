export interface PedidoCompromisoObligatorio {
    Cliente:            string;
    Codigo_pedido:      string;
    Fecha_pedido:       string;
    fecha_reprogramada: string | null;
    Comuna:             string;
    Region:             string;
    Descripcion:        string;
    Sin_moradores:      boolean;
    Verificado:           boolean;
    Recepcionado:       boolean;
    Ruta_hela:          null | string;
}


