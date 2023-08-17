import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoToc } from '../models/productosToc.interface'
import { Subestados } from 'src/app/models/subestados.interface';
import { Codigo1 } from 'src/app/models/Codigos1.interface';

@Injectable({
  providedIn: 'root'
})
export class TocService {

  constructor(private http: HttpClient) { }

  apiurl = "https://hela.transyanez.cl/api/toc"
  // apiurl = "http://127.0.0.1:8000/api/toc"

  buscar_producto_toc(cod_producto : string){
    return this.http.get<ProductoToc>(this.apiurl + `/buscar_producto/${cod_producto}`)
  }

  insert_bitacora_toc(body : any){
    return this.http.post(this.apiurl + "/registrar_bitacora", body)
  }

  buscar_subestados(){
    return this.http.get<Subestados []>(this.apiurl + "/subestados")
  }

  buscar_codigos1(){
    return this.http.get<Codigo1 []>(this.apiurl + "/codigos1")
  }

}
