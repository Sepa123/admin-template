export interface CentroOperacion {
    Id:          number;
    Created_at:  string;
    Id_user:     number;
    Ids_user:    string;
    Id_op:       number;
    Centro:      string;
    Descripcion: string;
    Region:      number;
    Estado:      boolean;
    Id_ppu_op:    number;
    Seguimiento_id : number,
    Seguimiento_nombre : string
}
