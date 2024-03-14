export interface AsignadosPorPersona{
    id:number,
    persona:string,
    rut: string,
    cargo: string,
    departamento: number | null,
    marca: string,
    serial: string,
    equipo: string ,
    fecha_entrega: number| undefined | null,
    descripcion: string |null,
    equipo_id: number ,
    tipo: string |null
    estado: boolean | null,
    modelo: string |null
    pdf_entrega: string |null
    pdf_devolucion: string |null
    firma_entrega: boolean | null
    subestado: string  |null,
    fecha_devolucion: number| undefined | null,

}