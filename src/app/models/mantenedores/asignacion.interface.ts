export interface Asignacion {
    id_user: string,
    ids_user: string,
    lat: string,
    long: string,
    equipo: number,
    persona: number,
    fecha_entrega: string | null,
    estado: boolean | null,
    fecha_devolucion: string | null,
    observacion: string | null,
    nombre_equipo: string  | null,
    folio: string | null,
    departamento: number | null
}