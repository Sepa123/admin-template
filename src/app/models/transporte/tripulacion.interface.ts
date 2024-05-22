export interface Usuario {
    Id:                    number;
    Created_at:            Date;
    Id_ingreso_hela:       string;
    Id_user:               number;
    Ids_user:              string;
    Id_razon_social:       number;
    Jpg_foto_perfil:       string;
    Nombre_completo:       string;
    Rut:                   string;
    Nro_serie_cedula:      string;
    Email:                 string;
    Telefono:              string;
    Birthday:              Date;
    Region:                number;
    Comuna:                number;
    Domicilio:             string;
    Tipo_usuario:          number;
    Pdf_antecedentes:      string;
    Pdf_licencia_conducir: string;
    Fec_venc_lic_conducir: Date;
    Pdf_cedula_identidad:  string;
    Pdf_contrato:          string;
    Activo:                boolean;
    Validacion_seguridad:  number;
    Validacion_transporte: number;
}