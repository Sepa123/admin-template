import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

export interface DataChart {
    labels:   string[];
    datasets: Dataset[];
}

export interface Dataset {
    data:            number[];
    backgroundColor: string[];
    hoverOffset:     number;
}

export interface MainCitacionS {
    Id_operacion: number;
    Nombre:       string;
    Id_centro_op: number;
    Centro:       string;
    Region:       string;
    Detalles:     Detalle[];
    chart_data:   DataChart ;
}

export interface Detalle {
    [key: string]:        string|null|boolean|number;
    estado:        number;
    id_ppu:        number;
    ruta_meli:     null | string;
    ppu:           string;
    tipo_vehiculo: number | null;
    p_avance:      number;
    avance:        number;
}


export interface InfoFotos {
    Latitud:  string;
    Longitud: string;
    Imagen_1: string;
    Imagen_2: string;
    Imagen_3: string;
    Imagen_4: string;
    Imagenes: string[];
}