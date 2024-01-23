export interface DevolucionById{
    id:number,
    nombres:string,
    apellidos: string,
    rut: string,
    cargo: string,
    marca: string,
    serial: string,
    equipo: string ,
    fecha_devolucion: string | undefined,
    folio_devolucion: string,
    departamento: number | null,
    equipo_id: number  |null,
    estado: boolean | null

}