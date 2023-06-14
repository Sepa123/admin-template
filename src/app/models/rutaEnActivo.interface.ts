export interface RutaEnActivo {
    Pos:               number;
    Codigo_pedido:     string;
    Comuna:            string;
    SKU:               string;
    Producto:          string;
    Unidades:          number;
    Bultos:            number;
    Nombre_cliente:    string;
    Direccion_cliente: string;
    Telefono:          string;
    Estado:            boolean;
    Validacion:        string;
    DE:                string;
    DP:                string;
    arraySKU:         string[];
    arrayProductos:   string[];
}