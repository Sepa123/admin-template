export interface TrackingBeetrack {
    Id_ruta:                string;
    PPU:                    string;
    Fecha_ingreso_beetrack: string;
    Cliente:                string;
    Fecha_entrega:          string;
    Estado:                 string;
    Subestado:              string;
}


export interface LineaProducto {
    Cliente:            string;
    Linea:             string[] | number[];
}
