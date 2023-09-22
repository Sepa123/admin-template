export interface CatalogoRSV {
    Id:             number;
    Created_at:     string;
    Codigo:         string;
    Producto:       string;
    Unid_x_paquete: number;
    Peso:           number;
    Ancho:          number;
    Alto:           number;
    Largo:          number;
    Id_user:        number;
    Ids_user:       string;
    Color:          number;
    Habilitado:     boolean;
    Precio_unitario : number | null;
	Ubicacion :       string | null
	Codigo_Original : string | null
}

export interface ColoresRSV {
    Id:           number;
    Created_at:   string;
    Nombre_color: string;
    Codigo_html:  string;
    Url_imagen:   string | null;
    Extension:    string;
}