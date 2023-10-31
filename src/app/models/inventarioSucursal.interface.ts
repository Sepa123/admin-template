export interface InventarioSucursal {
    Codigo:   string;
    Color:    string;
    Producto: string;
    Paquetes: number;
    Unidades: number;
    Total:    number;
    Ubicacion:  Array<null | string>
}