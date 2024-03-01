export interface MainNs {
    datos:    Dato[];
    promedio: number;
}

export interface Dato {
    Cliente:         string;
    Compromiso_real: number;
    Entregados:      number;
    Anulados:        number;
    Nivel_servicio:  number;
}