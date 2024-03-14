export interface MainDifFechasEasy {
    items: number;
    datos: Dato[];
}

export interface Dato {
    Cliente:              string;
    Ingreso_sistema:      string;
    Fecha_compromiso:     string;
    Ultima_actualizacion: null | string;
    Dias_ejecucion:       number | null;
    Cod_pedido:           string;
    Id_entrega:           string;
    Direccion:            string;
    Comuna:               string;
    Descripcion:          string;
    Unidades:             string;
    Estado:               string;
    Subestado:            string;
}

