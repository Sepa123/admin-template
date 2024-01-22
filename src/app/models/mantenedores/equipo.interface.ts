export enum Marca{
    "Sin info" = "Seleccione una opcion",
    "Lenovo" = "Lenovo",
    "HP" = "HP",
    "HP Pavilion" ="HP Pavilion",
    "Dell" = "Dell",
    "XIAOMI" = "XIAOMI",
    "Iphone" = "Iphone",
    "Samsung" = "Samsung",
    "Entel" = "Entel",
    "Genéricos" =  "Genéricos"


}
export enum Ram{
    "" = "Seleccione una opcion",
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
    "" = "Seleccione una opcion",
    "57.6GB SSD" = "57.6GB SSD",
    "64GB SSD" = "64GB SSD",
    "120GB SSD" = "120GB SSD",
    "128GB SSD" = "128GB SSD",
    "256GB SSD" = "256GB SSD",
    "500GB SSD" = "500GB SSD",
    "1TB SSD" = "1TB SSD",
    "500GB HHDD" = "500GB HHDD",
    "1TB HHDD" = "1TB HHDD"
}

export enum Ubicacion{
    "" = "Seleccione una opcion",
    "Bodega  SBF" = "Bodega  SBF" ,
    "Providencia" = "Providencia",
    "Santiago" = "Santiago",
    "Los Angeles" = "Los Angeles",
    "Seguridad" = "Seguridad",
    "Rancagua" = "Rancagua",
    "Robado" = "Robado",
    "Bodega TI" = "Bodega TI",
    "La Serena" = "La Serena",
    "Viña del Mar" = "Viña del Mar",
    "Talca" = "Talca",
    "N/A" = "N/A"
    

}

export interface Equipo {
    id: number,
    id_user: string | null,
    ids_user: string | null,
    lat: string | null,
    long: string | null,
    marca: Marca| null,
    modelo: string | null,
    serial: string | null,
    mac_wifi: string | null,
    serie: string | null,
    resolucion: string | null,
    dimensiones: string | null,
    descripcion: string | null,
    ubicacion: Ubicacion| null | "", 
    almacenamiento:  Almacenamiento | null| "",
    ram: Ram| null| "",
    estado: number | null,
    tipo: number
    cantidad: number | null
    nr_equipo: number |null
    subestado: number | null
    ubicacionarchivo: string |null,
    observacion: string |null
}