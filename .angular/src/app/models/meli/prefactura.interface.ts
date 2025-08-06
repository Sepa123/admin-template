export interface Prefactura {
    Id_usuario:      number;
    Ids_usuario:     string;
    Id_prefactura:   number;
    Periodo:         string;
    Descripcion:     string;
    Id_de_ruta:      number;
    Fecha_inicio:    string;
    Fecha_fin:       string;
    Patente:         string;
    Id_patente:      number | null;
    Conductor:       string;
    Cantidad:        number;
    Precio_unitario: number;
    Descuento:       boolean;
    Total:           number;
}


export interface ResumenPrefactura {
    Total_registros:        number;
    Fecha_ultimo_ingreso:   string;
    Ultimos_ingresados:     number;
    Nombre_ultima_proforma: number;
    Ultimo_segmento_fecha:  string;
}