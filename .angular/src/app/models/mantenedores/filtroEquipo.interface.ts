
export enum Ram{
    "Sin info" = "Seleccione una opcion",
    "2 GB" = "2 GB",
    "3 GB" = "3 GB",
    "4 GB" = "4 GB",
    "6 GB" = "6 GB",
    "8 GB" = "8 GB",
    "12 GB" = "12 GB",
    "16 GB" = "16 GB",
    "32 GB" = "32 GB"

}

export enum Almacenamiento{
    "Sin info" = "Seleccione una opcion",
    "64GB SSD" = "64GB SSD",
    "120GB SSD" = "120GB SSD",
    "128GB SSD" = "128GB SSD",
    "256GB SSD" = "256GB SSD",
    "500GB SSD" = "500GB SSD",
    "1TB SSD" = "1TB SSD",
    "500GB HHDD" = "500GB HHDD",
    "1TB HHDD" = "1TB HHDD"
}

export interface FiltroEquipo {
    id: number,
    id_user: string | null,
    ids_user: string | null,
    lat: string | null,
    long: string | null,
    marca: string | null,
    modelo: string | null,
    serial: string | null,
    mac_wifi: string | null,
    serie: string | null,
    resolucion: string | null,
    dimensiones: string | null,
    descripcion: string | null,
    ubicacion: string | null, 
    almacenamiento:  Almacenamiento | null,
    ram: Ram| null,
    estado: number | null,
    tipo: string| null
    cantidad: number | null
    nr_equipo: number |null
}