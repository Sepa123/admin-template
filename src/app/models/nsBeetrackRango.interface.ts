export interface NSBeetrackRango {
    Fecha:       Date;
    Id_ruta:     number;
    Driver:      string;
    Patente:     string;
    Region:      string;
    Km_ruta:     number;
    T_PED:       number;
    Easy:        number;
    Electrolux:  number;
    Sportex:     number;
    Imperial:    number;
    PBB:         number;
    Virutex:     number;
    R1:          number;
    R2:          number;
    R3:          number;
    VR:          number;
    C11:         number;
    Por_11:      number;
    C13:         number;
    Por_13:      number;
    C15:         number;
    Por_15:      number;
    C17:         number;
    Por_17:      number;
    C18:         number;
    Por_18:      number;
    C20:         number;
    Por_20:      number;
    Final_D:     string;
    Observacion: string;
    H_inicio:    string;
    H_termino:   string;
    TT_ruta:     string;
    Prom_ENT:    string;
    T_ENT:       number;
    N_ENT:       number;
    EE:          number;
    SM:          number;
    CA:          number;
    DA:          number;
    RxD:         number;
    DNE:         number;
    DNCC:        number;
    D_ERR:       number;
    INC_T:       number;
    DFORM:       number;
    PINCOM:      number;
    SPELI:       number;
    PNCORR:      number;
    PFALT:       number;
    PPARC:       number;
    P_DUPL:      number;    
    R:           number;
    Pedidos:     null | string;
    Valor_ruta:  null | number;
}