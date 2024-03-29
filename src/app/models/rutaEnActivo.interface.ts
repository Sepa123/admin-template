export interface RutaEnActivo {
    Pos:               number;
    Codigo_pedido:     string;
    Comuna:            string;
    SKU:               string;
    Producto:          string;
    Unidades:          string;
    Bultos:            string;
    Nombre_cliente:    string;
    Direccion_cliente: string;
    Telefono:          string;
    Estado:            boolean;
    Validacion:        string;
    DE:                string;
    DP:                string;
    Region:            string;
    Fecha_pedido:      string;
    Verificado:        boolean;
    arraySKU:          string[];
    arrayProductos:    string[];
    arrayUnidades:     string[] ;
    arrayBultos:       string[] ;
}