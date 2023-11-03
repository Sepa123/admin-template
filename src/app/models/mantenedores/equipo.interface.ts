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
    resolucion: number | null,
    dimensiones: string | null,
    descripcion: string | null,
    ubicacion: string | null, 
    almacenamiento:  number | null,
    ram: number | null,
    estado: number | null,
    tipo: number | null
    cantidad: number | null
    nr_equipo: number |null
}