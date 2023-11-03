export interface Asignacion {
    id_user: string,
    ids_user: string,
    lat: string,
    long: string,
    equipo: number ,
    persona: number,
    fecha_entrega: string | undefined,
    estado: boolean | null,
    fecha_devolucion: string | undefined,
    observacion: string | null,
    nombre_equipo: string  | null,
    folio: string ,
    departamento: number | null
    acta: string | null 
}