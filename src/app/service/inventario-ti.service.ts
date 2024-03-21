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
import {AsignadosById} from '../models/mantenedores/asignacionPorId.interface'
import { DevolucionById } from '../models/mantenedores/devolucionPorID.interface';
import { SubEstado } from '../models/mantenedores/subEstado.interface';
import{Estado} from 'src/app/models/mantenedores/estados.interface'
import{LicenciaYEquipo} from 'src/app/models/mantenedores/licenciaYEquipo.interface'
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import{ChipYEquipo} from 'src/app/models/mantenedores/chipYEquipo.interface'
import{AsignadosPorPersona} from 'src/app/models/mantenedores/asignadoPorPersona.interface'
import { ChipDevolucion } from '../models/mantenedores/chipDevolucion.interface';
@Injectable({
    providedIn: 'root'
  })
  export class InventarioTIService {

    constructor( private http : HttpClient) { }
  
    // apiurl = "https://hela.transyanez.cl/api/inventario-ti"
    apiurl = "http://127.0.0.1:8000/api/inventario-ti"

    //descarga de excel de la planilla completa de datos de personas RRHH

    downloadPlanillaExcel(fecha:string) {
      this.http.get(`${this.apiurl}/planilla/descargar`, {responseType:"blob"})
      .subscribe((blob:Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url
        a.download =`ListaEmpleados-${fecha}.xlsx`; 
          a.click();
          window.URL.revokeObjectURL(url);
      })
    
  }

  downloadPDF_entrega(id:number, nombre: string) {
    this.http.get(`${this.apiurl}/descargar/entrega?id=${id}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download =`${nombre}`; 
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  downloadPDF_devolucion(id:number, nombre: string) {
  this.http.get(`${this.apiurl}/descargar/devolucion?id=${id}`, {responseType:"blob"})
  .subscribe((blob:Blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url
    a.download =`${nombre}`; 
      a.click();
      window.URL.revokeObjectURL(url);
  })
  }

  downloadEscaneado_entrega(id:number, nombre: string) {
    this.http.get(`${this.apiurl}/escaneado/entrega?id=${id}`, {responseType:"blob"})
    .subscribe((blob:Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url
      a.download =`${nombre}`; 
        a.click();
        window.URL.revokeObjectURL(url);
    })
  }

  downloadEscaneado_devolucion(id:number, nombre: string) {
  this.http.get(`${this.apiurl}/escaneado/devolucion?id=${id}`, {responseType:"blob"})
  .subscribe((blob:Blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url
    a.download =`${nombre}`; 
      a.click();
      window.URL.revokeObjectURL(url);
  })
  }

  uploadPDFEntrega(archivo: File, id:number,data:string): Observable<any>{
    const formData= new FormData()
    formData.append('file', archivo)

    return this.http.post(`${this.apiurl}/upload-entrega/${id}/${data}`, formData)
  }
  uploadPDFDevolucion(formulario: string){
    return this.http.post(this.apiurl+"/upload-devolucion", formulario)
  }

    //ENVIO DE DATOS VIAS FORMULARIO
  
    creacion_personal(body: any){
      return this.http.post(this.apiurl+"/personal", body)
    }

    bitacora_persona(body:any){
      return this.http.post(this.apiurl+"/bitacora-persona", body)
    }

    bitacora_equipo(body:any){
      return this.http.post(this.apiurl+"/bitacora-equipo", body)
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
    asignacion_chip(body:any){
      return this.http.post(this.apiurl+"/asignacion-chip", body)
    }

    asignacionAccesorio(body:any){
      return this.http.post(this.apiurl+"/asignacion-accesorio",body)
    }

    crearLicencia(body:any){
      return this.http.post(this.apiurl+"/licencia",body)
    }

    crearSubEstado(body:any){
      return this.http.post(this.apiurl+"/subEstado",body)
    }

    datosPDF(body:any){
      return this.http.post(this.apiurl+"/generar_acta_entrega", body)
    }
    datosPDFDevolucion(body:any){
      return this.http.post(this.apiurl+"/generar_acta_devolucion", body)
    }
    liberarLicencia(body:any){
      return this.http.post(this.apiurl+"/liberar-licencia",body)
    }
    liberarChip(body:any){
      return this.http.post(this.apiurl+"/liberar-chip",body)
    }
    liberarInsumo(body:any){
      return this.http.post(this.apiurl+"/liberar-insumo",body)
    }
    //EDITAR

    devolucionAccesorio(body:any){
      return this.http.put(this.apiurl+"/devolucion-accesorio",body)
    }


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
    actualizar_subestado(body:any){
      return this.http.put(this.apiurl+"/actualizar/subestado",body)
    }
    actualizar_descripcion_equipo(body:any){
      return this.http.put(this.apiurl+"/actualizar/descripcion-equipo",body)
    }
    actualizar_persona(body:any){
      return this.http.put(this.apiurl+"/actualizar/persona",body)
    }
    actualizar_crear_acta_entrega(body:any){
      return this.http.put(this.apiurl+"/actualizar-acta",body)
    }

    actualizar_acta_devolucion(body: any){
      return this.http.put(this.apiurl+"/actualizar-devolucion",body)
    }

    actualizarFirmaActaEntrega(data : any){
      return this.http.put(this.apiurl +"/actualizar-firma-entrega", data)
    }
    actualizarFirmaDevolucion(data : any){
      return this.http.put(this.apiurl +"/actualizar-firma-devolucion", data)
    }

    modificar_habilitado(body: any){
      return this.http.put(this.apiurl+"/actualizar-habilitado",body)
    }

    //OBTENCIA DE LA LISTA DE LOS DATOS 
    get_chip_by_estado(){
      return this.http.get<Equipo[]>(this.apiurl+"/chip-by-estado")
    }
    busquedaPorFolio(id: string){
      return this.http.get<Asignacion>(this.apiurl+`/folio/${id}`)
    }
    get_lista_licencias(){
      return this.http.get<LicenciaWindows[]>(this.apiurl+"/lista-licencia")
    }
    get_licencias_asignadadas(){
      return this.http.get<LicenciaWindows[]>(this.apiurl+"/licencias-asignadas")
    }
    get_lista_licencias_no_asignadas(){
      return this.http.get<LicenciaWindows[]>(this.apiurl+"/licencias-no-asignadas")
    }

    get_licencias_asignadas_a_equipos(){
      return this.http.get<LicenciaYEquipo[]>(this.apiurl+"/licencias-asignadas-a-equipos")
    }

    get_chip_asignados_a_equipos(){
      return this.http.get<ChipYEquipo[]>(this.apiurl+"/chip-asignados-a-equipos")
    }
    get_lista_chip_asignados_para_devolucion(){
      return this.http.get<ChipDevolucion[]>(this.apiurl+"/lista-chip-devolucion")
    }
    get_lista_datos_personales() {
        return this.http.get<Personal[]>(this.apiurl+"/lista-personas")
      }
    get_lista_persona_habilitada(){
      return this.http.get<Personal[]>(this.apiurl+"/persona-habilitada")
    }

    get_lista_estado_inventario(){
      return this.http.get<EstadoInventario[]>(this.apiurl+"/lista-estados")
    }

    get_lista_estado_devolucion(){
      return this.http.get<Estado[]>(this.apiurl+"/lista-estados-devolucion")
    }

    get_lista_estado_chip(){
      return this.http.get<Estado[]>(this.apiurl+"/lista-estado-chip")
    }


    get_lista_estado(){
      return this.http.get<Estado[]>(this.apiurl+"/lista-estado")
    }

    get_lista_de_tipos_equipos(){
      return this.http.get<Tipo[]>(this.apiurl+"/lista-tipo-equipos")
    }
    get_lista_de_tipos_con_documentacion(){
      return this.http.get<Tipo[]>(this.apiurl+"/lista-tipo-con-documentacion")
    }

    get_lista_de_tipos_sin_documentacion(){
      return this.http.get<Tipo[]>(this.apiurl+"/lista-tipo-sin-documentacion")
    }

    get_lista_descripcion_por_equipo(){
      return this.http.get<Equipo[]>(this.apiurl+"/lista-descripcion-equipos")
    }

    // get_equipo_by_Idchip(id:number){
    //   return this.http.get<Equipo[]>(this.apiurl+`/lista-equipo-by-chip/${id}`)
    // }

    get_lista_descripcion_por_id(id:number){
      return this.http.get<Equipo[]>(this.apiurl+`/lista-descripcion-por-id/${id}`)
    }
    //se obtiene la lista de equipos con los datos originales de la tabla
    get_lista_de_equipos_sin_join(){
      return this.http.get<Equipo[]>(this.apiurl+"/lista-equipos")
    }

    get_lista_equipos_disponibles(){
      return this.http.get<Equipo[]>(this.apiurl+"/lista-equipos-disponibles")
    }
    get_lista_de_asignaciones(){
      return this.http.get<Asignacion[]>(this.apiurl+"/lista-asignacion")
    }
    get_lista_accesorios_asignados(){
      return this.http.get<Asignacion[]>(this.apiurl+"/lista-accesorios-asignados")
    }
    get_lista_insumos_asignados(){
      return this.http.get<Asignacion[]>(this.apiurl+"/lista-insumos-asignados")
    }
    get_lista_de_asignados_sin_join(){
      return this.http.get<Asignacion[]>(this.apiurl+"/tabla-asignados")
    }

    get_lista_de_asignados_sin_join_por_id(id:number){
      return this.http.get<Asignacion[]>(this.apiurl+`/tabla-asignados-por-id/${id}`)
    }

    get_lista_de_departamentos(){
      return this.http.get<Departamentos[]>(this.apiurl+"/lista-departamentos")
    }
    get_lista_de_subestados(){
      return this.http.get<SubEstado[]>(this.apiurl+"/lista-subestado")
    }
    get_subestado_chip(){
      return this.http.get<SubEstado[]>(this.apiurl+"/lista-subestado-chip")
    }

    get_chip_no_asignados(){
      return this.http.get<Equipo[]>(this.apiurl+"/chip-no-asignado")
    }

    get_lista_de_sucursal(){
      return this.http.get<SucursalInventario[]>(this.apiurl+"/lista-sucursales")
    }

    get_folio_entrega(){
      return this.http.get<Asignacion[]>(this.apiurl+"/folio_entrega")
    }

    get_folio_devolucion(){
      return this.http.get<Asignacion[]>(this.apiurl+"/folio_devolucion")
    }

    get_nr_equipo(tipo: number){
      return this.http.get<Equipo[]>(this.apiurl+`/nr_equipo/${tipo}`)
    }
    get_code_subestado(parent_code: number){
      return this.http.get<Estado[]>(this.apiurl+`/code/${parent_code}`)
    }

    get_lista_de_equipos_generales(){
      return this.http.get<Equipo[]>(this.apiurl+"/equipos-generales")
    }

    get_lista_asignados_by_id(id:number){
      return this.http.get<AsignadosById[]>(this.apiurl+`/asignados/${id}`)
    }

    get_lista_devolucion_by_id(id:number){
      return this.http.get<DevolucionById[]>(this.apiurl+`/devolucion/${id}`)
    }

    get_lista_equipos_asignados_por_persona(id: string){
      return this.http.get<AsignadosById[]>(this.apiurl+`/lista-equipos-por-persona/${id}`)
    }

    get_all_equipos_asignados_por_persona(rut: string){
      return this.http.get<AsignadosPorPersona[]>(this.apiurl+`/all-equipos-por-persona/${rut}`)
    }


    get_equipo_asignado_por_serial(serial: string){
      return this.http.get<AsignadosPorPersona[]>(this.apiurl+`/equipos-asignado-por-serial/${serial}`)
    }
    get_insumo_asignado_por_serial(serial: string){
      return this.http.get<AsignadosPorPersona[]>(this.apiurl+`/insumo-asignado-por-serial/${serial}`)
    }

    get_lista_equipos_asignados_para_Devolver(id: string){
      return this.http.get<AsignadosById[]>(this.apiurl+`/lista-equipos-por-persona-para-devolver/${id}`)
    }

    get_equipo_por_serial(serial: string){
      return this.http.get<Equipo[]>(this.apiurl+`/equipo-by-serial/${serial}`)
    }

    get_persona_por_rut(rut: string){
      return this.http.get<Personal[]>(this.apiurl+`/persona-by-rut/${rut}`)
    }

    get_estado_de_acta(id: number){
      return this.http.get<AsignadosById[]>(this.apiurl+`/estado-actas/${id}`
      )
    }

    get_ultima_persona_creada(){
      return this.http.get<Personal[]>(this.apiurl+"/ultima-persona")
    }

    get_ultimo_equipo_creado(){
      return this.http.get<Equipo[]>(this.apiurl+"/ultimo-equipo")
    }

    // get_estados_devolucion(){
    //   return this.http.get<EstadoInventario[]>(this.apiurl+"/estado-devolver")
    // }

    get_equipos_devueltos_por_persona(id: string){
      return this.http.get<AsignadosById[]>(this.apiurl+`/lista-equipos-devueltos-por-persona/${id}`)
    }

    get_subestado_by_id(id:number){
      return this.http.get<SubEstado []>(this.apiurl+`/subestado-por_id/${id}`)
    }

    get_ultimo_estado(){
      return this.http.get(this.apiurl+"/ultimo-estado")
    }

    get_equipo_by_tipo(tipo:number){
      return this.http.get<Equipo[]>(this.apiurl+`/equipos-by-tipo/${tipo}`)
    }

    get_firma_entrega(id: number){
      return this.http.get<Asignacion[]>(this.apiurl+`/firma_entrega/${id}`)
    }
    get_firma_devolucion(id: number){
      return this.http.get<Asignacion[]>(this.apiurl+`/firma_devolucion/${id}`)
    }
   
      
    
  
  }  