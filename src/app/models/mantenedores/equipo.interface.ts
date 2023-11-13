
export enum Ram{
    "cero" = "Seleccione una opcion",
    "4 GB" = "4 GB",
    "8 GB" = "8 GB",
    "12 GB" = "12 GB",
    "16 GB" = "16 GB",
    "32 GB" = "32 GB"

}

export enum Almacenamiento{
    "cero" = "Seleccione una opcion",
    "256 GB SSD" = "256 GB SSD",
    "500 GB SSD" = "500 GB SSD",
    "1 TB SSD" = "1 TB SSD",
    "500 GB HHDD" = "500 GB HHDD"
}

export interface Equipo {
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
    tipo: number | null
    cantidad: number | null
    nr_equipo: number |null
}