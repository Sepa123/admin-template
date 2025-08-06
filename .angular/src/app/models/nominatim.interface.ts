export interface Nominatim {
    place_id:     number;
    licence:      string;
    osm_type:     string;
    osm_id:       number;
    boundingbox:  string[];
    lat:          string;
    lon:          string;
    display_name: string;
    class:        string;
    type:         string;
    importance:   number;
}


export interface latlongTabla {
    id_usuario: string 
    direccion: string
    comuna: string
    region: string | null
    lat: string 
    lng: string
    ids_usuario: string
    display_name: string
    type: string | null
}