export interface NSEasy {
    Cliente:   string;
    Guia:      string;
    Ruta_hela: null | string;
    Direccion: string;
    Ciudad:    string;
    Region:    string;
}


export interface NSPendientesEasyPorRegion {
    Region:    string;
    Comuna:    string;
    Pendiente: number;
}
