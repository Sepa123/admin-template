export interface seguimientoRuta {
    Ruta_beetrack:      number;
    Ppu:                string;
    Region:             string;
    Cliente:            string;
    Carga_total:        number;
    Fecha_compromiso:   number;
    Entregados:         number;
    Entregado_fec_comp: number;
    Pendientes:         number;
    No_entregados:      number;
    Obs_total_pedidos:  null | string;
}