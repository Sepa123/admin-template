export interface MainCamposClientes {
    Clientes_ty: ClientesTy[];
}

export interface ClientesTy {
    Id_cliente: number;
    Cliente:    string;
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
