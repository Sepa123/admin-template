export interface Vehiculo {
    Id:                           number;
    Created_at:                   string;
    Update_date:                  string;
    Razon_id:                     number;
    Ppu:                          string;
    Marca:                        number;
    Tipo:                         number;
    Modelo:                       string;
    Ano:                          number;
    Region:                       number;
    Comuna:                       number;
    Estado:                       boolean;
    Activation_date:              string;
    Capacidad_carga_kg:           number;
    Capacidad_carga_m3:           number;
    Platform_load_capacity_kg:    number;
    Crane_load_capacity_kg:       number;
    Permiso_circulacion_fec_venc: string;
    Soap_fec_venc:                string;
    Revision_tecnica_fec_venc:    string;
    Agency_id:                    number;
    Registration_certificate:     string;
    Pdf_revision_tecnica:         string;
    Pdf_soap:                     string;
    Pdf_padron:                   string;
    Pdf_gases_certification:      string;
    Validado_por_id:              number;
    Validado_por_ids:             string;
    Rut:                          string;
    Razon_social:                 string;
    Hab_vehiculo :                boolean;
    Hab_seguridad :               boolean;
    Gps :                         boolean;
    Id_gps :                      number
    Imei :                        string
    Oc_instalacion :              string
    Fecha_instalacion :           string
    Operaciones:                  any [] 
    Centro_operaciones:           any [] 
    Desc_desabilitado:            string;
    Fecha_desinstalacion :        string
    Oc_desinstalacion:            string
    Disponible :                boolean;
    Habilitado :               boolean;
}   


export interface AsignarOperacion {
    Id:           number;
    Created_at:   Date;
    Id_user:      number;
    Ids_user:     string;
    Id_ppu:       number;
    Id_operacion: number;
    Id_centro_op: number;
    Estado:       boolean;
}


export interface VehiculoObservaciones {
    Codigo_retorno:            number;
    Ppu:                       string;
    Razon_social:              string;
    Rut:                       string;
    Celular:                   string;
    Permiso_circulacion_fvenc: string | null;
    Soap_fvenc:                string | null;
    Revision_tecnica_fvenc:    string | null;
    Gps:                       boolean;
}

export interface ArrErrorServer {
    error:      boolean;
    mensaje:    string;
}


export interface ErrorServer {
    [key: string]: ArrErrorServer|null;
    Razon_id:      ArrErrorServer|null;
    Ppu:           ArrErrorServer|null
    Marca:         ArrErrorServer|null;
    Tipo:          ArrErrorServer|null;
    Modelo:        ArrErrorServer|null;
    Ano:           ArrErrorServer|null;
    Region:        ArrErrorServer|null;
    Comuna:        ArrErrorServer|null;
    Estado:        ArrErrorServer|null;
    Activation_date:ArrErrorServer|null;
    Capacidad_carga_kg:ArrErrorServer|null;
    Capacidad_carga_m3:ArrErrorServer
    Platform_load_capacity_kg:ArrErrorServer|null;
    Crane_load_capacity_kg:ArrErrorServer|null;
    Permiso_circulacion_fec_venc:ArrErrorServer|null;
    Soap_fec_venc:ArrErrorServer|null;
    Revision_tecnica_fec_venc:ArrErrorServer|null;
    Agency_id:ArrErrorServer|null;
    Registration_certificate:ArrErrorServer|null;
    Pdf_revision_tecnica:ArrErrorServer|null
    Pdf_soap:            ArrErrorServer|null
    Pdf_padron:          ArrErrorServer|null
    Pdf_gases_certification:ArrErrorServer|null
    Validado_por_id:        ArrErrorServer|null
    Validado_por_ids:       ArrErrorServer|null
    Rut:                    ArrErrorServer|null
    Razon_social:           ArrErrorServer|null
    Hab_vehiculo :          ArrErrorServer|null
    Hab_seguridad :         ArrErrorServer|null
    Gps :                   ArrErrorServer|null
    Id_gps :               ArrErrorServer|null
    Imei :                  ArrErrorServer|null
    Oc_instalacion :          ArrErrorServer|null
    Fecha_instalacion :        ArrErrorServer|null
    Operaciones:               ArrErrorServer|null
    Centro_operaciones:        ArrErrorServer|null
    Desc_desabilitado:         ArrErrorServer|null
    Fecha_desinstalacion :     ArrErrorServer|null
    Oc_desinstalacion:         ArrErrorServer|null
    Disponible :               ArrErrorServer|null
    Habilitado :               ArrErrorServer|null

}
