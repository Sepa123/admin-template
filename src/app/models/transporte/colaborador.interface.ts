export interface Colaborador {
    Id:                       number;
    Created_at:               string;
    Id_user:                  number;
    Ids_user:                 string;
    Date_modified:            string;
    Tipo_razon:               string;
    Razon_social:             string;
    Rut:                      string;
    Celular:                  string;
    Telefono:                 string;
    Region:                   string;
    Comuna:                   string;
    Direccion:                string;
    Representante_legal:      string;
    Rut_representante_legal:  string;
    Email_rep_legal:          string;
    Direccion_comercial:      string;
    Pdf_legal_contitution:    string;
    Pdf_registration_comerce: string;
    Pdf_validity_of_powers:   string;
    Pdf_certificate_rrpp:     string;
    Chofer:                   boolean;
    Peoneta:                  boolean;
    Abogado:                  number;
    Seguridad:                number;
    Activo:                   boolean;
}


export interface DetallePago {
    Id:              number;
    Created_at:      string;
    Id_user:         number;
    Ids_user:        string;
    Id_razon_social: number;
    Rut_cuenta:      string;
    Titular_cuenta:  string;
    Numero_cuenta:   string;
    Banco:           number;
    Email:           string;
    Tipo_cuenta:     number;
    Forma_pago:      number;
    Pdf_documento:   string;
    Estado:          number;
}