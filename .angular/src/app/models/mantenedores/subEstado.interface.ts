export enum Code{
    "Sin info" = "Seleccione una opcion",
    "uno" = 1,
    "dos"= 2,
    "tres"= 3,
    "cuatro" = 4
}



export interface SubEstado {
    id: number
    parent_code: Code | null
    code: number
    descripcion: string
}