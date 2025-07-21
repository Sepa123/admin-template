export interface MainCamposClientes {
    Clientes_ty: ClientesTy[];
    Clientes_guias_ty: ClientesTy[];
    Grupos_operacion: GruposOperacion[];
}

export interface ClientesTy {
    Id_cliente: number;
    Cliente:    string;
}

export interface GruposOperacion {
    Id_operacion:     number;
    Nombre_operacion: string;
}

export interface RutasTyTemp {
    Id:            number;
    Ruta:          number;
    Ppu:           string;
    Guia:          string;
    Mensaje_ppu:   string;
    Proceder_ppu:  boolean;
    Mensaje_ruta:  string;
    Proceder_ruta: boolean;
    Proceder:      boolean;
}


export interface MainGuiasExternas {
    datos:           GuiasExternasTemp[];
    rutas_generadas: number;
}

export interface GuiasExternasTemp {
    Id:            number;
    Ruta:          number;
    Ppu:           string;
    Guia:          string;
    Mensaje_op:    string;
    Proceder_op:   boolean;
    Mensaje_guia:  string;
    Proceder_guia: boolean;
    Mensaje_ppu:   string;
    Proceder_ppu:  boolean;
    Proceder:      boolean;
}


export interface RutasTy {
    fecha:                      Date;
    creado_por:                 string;
    creado_por_img:             string;
    empresa:                    string;
    id_empresa:                 number;
    logo_empresa:               string;
    ruta:                       number;
    ppu:                        string;
    driver:                     string;
    id_colaborador:             number;
    colaborador:                string;
    guia:                       string;
    servicio:                   string;
    region_de_despacho:         string;
    fecha_entrega:              Date;
    estado:                     string;
    subestado:                  string;
    cliente:                    string;
    direccion_cliente:          string;
    comuna:                     string;
    telefono_cliente:           string;
    correo_electronico_cliente: string;
    km:                         number;
    peso:                       string;
    volumen:                    string;
    bultos:                     string;
    factura:                    string;
    tienda:                     string;
    observacion:                string;
    valor_ruta:                 number;

}


export interface GuiasExternas {
    id_user: number;
    ids_user: string;
    operacion: string;
    id_operacion: number;
    centro_op: string;
    id_centro_op: number;
    id_ruta: number;
    fecha: string; // formato 'YYYY-MM-DD'
    ppu: string;
    id_ppu: number;
    driver: string;
    id_driver: number;
    telefono_driver: string;
    guia: string;
    detalle: string;
    cantidad: number;
    bultos: number;
    cliente: string;
    id_cliente: number;
    fecha_entrega: string; // formato 'YYYY-MM-DD'
    modo: string;
    region: string;
    comuna: string;
    direccion: string;
    dnu_cliente: string;
    nombre_cliente: string;
    telefono_cliente: string;
    correo_electronico_cliente: string;
    origen: string;
    fecha_estimada: string; // formato ISO 'YYYY-MM-DDTHH:mm:ss'
    fecha_llegada: string; // formato ISO 'YYYY-MM-DDTHH:mm:ss'
    estado: string;
    subestado: string;
    tiempo_en_destino: string;
    n_intentos: number;
    distancia_km: number;
    peso: number;
    volumen: number;
    codigo: string;
    observacion: string;
    id_razon_social: number;
    razon_social: string;
}



// #### Consolidado de Rutas

export interface RutasConsolidadas {
    id:                 number;
    created_at:         Date;
    last_update:        Date;
    nombre_ruta:        string;
    fecha:              Date;
    id_operacion:       number;
    id_centro_op:       number;
    tipo_ruta:          string;
    estado:             string;
    origen:             null;
    destino:            null;
    origen_seguimiento: null;
    fecha_inicio:       Date;
    fecha_fin:          Date;
    distancia_km:       null;
    tiempo_estimado:    string;
    patente_vehiculo:   string;
    tipo_vehiculo:      number;
    id_razon_social:    number;
    nombre_driver:      string;
    pedido_total:       number;
    entregados:         number;
    no_entregados:      number;
    kg:                 null;
    id_tarifa:          number;
    valor_ruta:         null;
    cliente_info:       ClienteInfo;
    notas:              null;
    porcentaje_entregados: number;
    nombre_op:          string | null;
    nombre_centro_op:   null | string;
}

export interface ClienteInfo {
    comunas:  Comuna;
    usuario: Usuario;
    clientes: Comuna;
    validacion:   Validacion;
    observacion?: string;

}

export interface Usuario {
    id_usuario:   number;
    nombre_usuario: string;
}

export interface Comuna {
    nombre:           string;
    cantidad: number;
}

export interface Validacion {
    pedido_total: number,
    entregados_final: number,
    metodo_principal : string,
    porcentaje_entrega: number,
    no_entregados_final: number,
    
}
