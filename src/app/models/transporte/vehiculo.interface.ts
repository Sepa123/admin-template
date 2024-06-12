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