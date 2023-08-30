export interface RutaPendiente {
    Origen :          string,
    Guia :            string,
    Fecha_ingreso :   string,
    Fecha_pedido :    string,
    Region :          string,
    Comuna :          string,
    Descripcion :     string,
    Cantidad :        number,
    Estado :          string,
    Subestado :       string,
    Verificado :      boolean,
    Recepcion :       boolean
}