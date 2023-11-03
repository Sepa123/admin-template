import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import{Asignacion} from '../models/mantenedores/asignacion.interface'
import{Equipo} from '../models/mantenedores/equipo.interface'
import{Personal} from '../models/mantenedores/personal.interface'
import{Tipo} from '../models/mantenedores/tipo.interface'
import { Departamentos } from '../models/mantenedores/departamento.interface';
import {SucursalInventario} from '../models/mantenedores/sucursal.interface'
import { EstadoInventario } from '../models/mantenedores/estado.interface';
import { LicenciaWindows } from '../models/mantenedores/licencia.interface';
@Injectable({
    providedIn: 'root'
  })
  export class InventarioTIService {
  
    constructor( private http : HttpClient) { }
  
    // apiurl = "https://hela.transyanez.cl/api/inventario-ti"
    apiurl = "http://127.0.0.1:8000/api/inventario-ti"

    //ENVIO DE DATOS VIAS FORMULARIO
  
    creacion_personal(body: any){
      return this.http.post(this.apiurl+"/personal", body)
    }
      
    creacion_departamento(body:any){
      return this.http.post(this.apiurl+"/departamento", body)
    }

    creacion_sucursal(body:any){
      return this.http.post(this.apiurl+"/sucursal", body)
    }

    crear_descripcion_equipo(body: any){
      return this.http.post(this.apiurl+"/equipo-descripcion" , body)
    }

    crear_tipo_equipo(body:any){
      return this.http.post(this.apiurl+"/tipo-equipo",body)
    }

    crear_estado_inventario(body: any){
      return this.http.post(this.apiurl+"/estado",body)
    }

    crearAsignacion(body:any){
      return this.http.post(this.apiurl+"/asignacion", body)
    }

    crearLicencia(body:any){
      return this.http.post(this.apiurl+"/licencia",body)
    }
    //EDITAR

    actualizar_asignacion(body: any){
      return this.http.put(this.apiurl+"/actualizar/devolucion",body)
    }
    actualizar_tipo(body:any){
      return this.http.put(this.apiurl+"/actualizar/tipo", body)
    }
    actualizar_departamento(body:any){
      return this.http.put(this.apiurl+"/actualizar/departamento", body)
    }
    actualizar_licencia(body:any){
      return this.http.put(this.apiurl+"/actualizar/licencia",body)
    }

    actualizar_sucursal(body:any){
      return this.http.put(this.apiurl+"/actualizar/sucursal",body)
    }
    actualizar_estado(body:any){
      return this.http.put(this.apiurl+"/actualizar/estado",body)
    }
    actualizar_descripcion_equipo(body:any){
      return this.http.put(this.apiurl+"/actualizar/descripcion-equipo",body)
    }
    actualizar_persona(body:any){
      return this.http.put(this.apiurl+"/actualizar/persona",body)
    }

    //OBTENCIA DE LA LISTA DE LOS DATOS 

    busquedaPorFolio(id: string){
      return this.http.get<Asignacion>(this.apiurl+`/folio/${id}`)
    }
    get_lista_licencias(){
      return this.http.get<LicenciaWindows[]>(this.apiurl+"/lista-licencia")
    }
    get_lista_datos_personales() {
        return this.http.get<Personal[]>(this.apiurl+"/lista-personas")
      }

    get_lista_estado_inventario(){
      return this.http.get<EstadoInventario[]>(this.apiurl+"/lista-estados")
    }


    get_lista_de_tipos_equipos(){
      return this.http.get<Tipo[]>(this.apiurl+"/lista-tipo-equipos")
    }

    get_lista_descripcion_por_equipo(){
      return this.http.get<Equipo[]>(this.apiurl+"/lista-descripcion-equipos")
    }
    get_lista_de_asignaciones(){
      return this.http.get<Asignacion[]>(this.apiurl+"/lista-asignacion")
    }

    get_lista_de_departamentos(){
      return this.http.get<Departamentos[]>(this.apiurl+"/lista-departamentos")
    }

    get_lista_de_sucursal(){
      return this.http.get<SucursalInventario[]>(this.apiurl+"/lista-sucursales")
    }

  
  }  