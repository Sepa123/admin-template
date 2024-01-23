export interface AsignadosById{
    id:number,
    nombres:string,
    apellidos: string,
    rut: string,
    cargo: string,
    departamento: number | null,
    marca: string,
    serial: string,
    equipo: string ,
    folio_entrega: number,
    fecha_entrega: number| undefined | null,
    descripcion: string |null,
    almacenamiento: string |null,
    ram: string | null,
    equipo_id: number ,
    tipo: string |null
    estado: boolean | null,
    modelo: string |null
    pdf_entrega: string |null
    folio_devolucion: string,
    pdf_devolucion: string |null
    firma_entrega: boolean | null

}