export interface Asignacion {
    id:number,
    id_user: number,
    ids_user: string,
    lat: string,
    long: string,
    equipo: number ,
    persona: number,
    fecha_entrega:  Date | null,
    estado: boolean| null,
    fecha_devolucion:  Date | null,
    observacion: string | null,
    folio_entrega: number|null,
    folio_devolucion: number |null,
    firma_entrega: boolean |null,
    firma_devolucion: boolean |null,
    pdf_entrega: string |null,
    pdf_devolucion: string |null,
    departamento: number | null
 
}