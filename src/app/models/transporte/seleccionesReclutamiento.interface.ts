export interface MainSeleccionReclutamiento {
    Operacion:          Operacion[];
    Origen:             Origen[];
    Estado_contacto:    EstadoContacto[];
    Motivo_subestado:   MotivoSubestado[];
    Contacto_ejecutivo: ContactoEjecutivo[];
    Tipo_vehiculo:      TipoVehiculo[];
    Region:             Region[];
    Comentarios :        ComentarioReclutamiento [];
    Comuna : Comuna []
}

export interface ContactoEjecutivo {
    Id:        number;
    Ejecutivo: string;
}

export interface EstadoContacto {
    Id:              number;
    Estado_contacto: string;
}

export interface MotivoSubestado {
    Id:               number;
    Motivo_subestado: string;
}

export interface Operacion {
    Id:        number;
    Operacion: string;
}

export interface Origen {
    Id:     number;
    Origen: string;
}

export interface Region {
    Id_region:     string | number;
    Nombre_region: string;
}

export interface Comuna {
    Nombre_comuna: string;
    Id_region:     string;
    Id_comuna:     string;
}

export interface TipoVehiculo {
    Id:            number;
    Tipo_vehiculo: string;
}



export interface Reclutamiento {
    Id_reclutamiento:           number;
    Fecha_creacion:             string;
    Region:                     number;
    Comuna:                     number;
    Operacion_postula:          null;
    Nombre:                     string;
    Telefono:                   string;
    Tipo_vehiculo:              number;
    Origen_contacto:            number;
    Estado_contacto:            number;
    Motivo_subestado:           number;
    Contacto_ejecutivo:         null;
    Razon_social:               null;
    Rut_empresa:                null;
    Internalizado:              boolean | null;
    Region_nombre:              string;
    Operacion_nombre:           null;
    Nombre_origen:              string;
    Nombre_estados:             string;
    Nombre_motivo:              string;
    Nombre_contacto:            null;
    Pais:                       number;
    Inicio_actividades_factura: boolean;
    Giro:                       number;
    Cantidad_vehiculo:          number;
    Correo:                     string;
    Ppu:                        string;
    Metros_cubicos:             number;
    Rango_fecha:                number;
    Capacidad:                  number;
    Pestana:                    number;
    Comentario:                 string;
}


export interface ComentarioReclutamiento {
    Id:           number;
    Calificacion: string;
    Icono:        string;
    Color:        string;
    Latitud:      string;
    Longitud:     string;
    Comentario:   string;
    
}

export interface listaComentarios {
    Estatus_comentario: number;
    Nombre:             string;
    Fecha:              string;
    Hora:               string;
    Comentario:         string;
}