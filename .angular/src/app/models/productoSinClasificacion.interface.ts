export interface ProductoSinClasificacion {
    SKU:         string;
    Descripcion: string;
    Talla:       string;
    Origen?:     string;
    buttonDisabled?: false | true;
}