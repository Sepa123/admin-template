import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Cliente {
  id_usuario: string;
  ids_usuario: string;
  nombre: string;
  rut: string;
  direccion: string;
  ciudad: number | null; // Permitir null
  region: number | null; // Permitir null
  telefono: string;
  correo: string;
  representante: string;
  activo: boolean;
  esquema_destino: string | null;
  tabla_destino: string | null;
  carga_manual: boolean;
  id_operacion: number | null; // Permitir null
  id_centro_op: number | null; // Permitir null
}

// Interface que coincide con tu modelo Pydantic UsuarioUpdate
export interface UpdateCliente {
  nombre?: string;
  rut?: string;
  direccion?: string;
  ciudad?: number | string; // Aceptar número o cadena
  region?: number | string; // Aceptar número o cadena
  telefono?: any;
  correo?: string;
  representante?: string;
  activo?: boolean; 
  logo_img?: string;  
  esquema_destino?: null | string; // Cambiado a null | string
  tabla_destino?: null | string;
  carga_manual?: boolean;
  id_operacion?: number;
  id_centro_op?: number;
}


@Injectable({
  providedIn: 'root'
})
export class EditarRutaService {
 

  constructor(private http: HttpClient) { }

  // https://hela.transyanez.cl/
    // apiUrl = "http://localhost:8000/api";
    apiUrl = "https://hela.transyanez.cl/api/editar_ruta"
    images = "https://hela.transyanez.cl/api/panel/image";
    
    getClient(): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/InfoRuta');
    }

    getOp(): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/Op/');
    }
    getCop(): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/Cop/');
    }

    getFotoPerfil(filename: string): Observable<Blob> {
      return this.http.get(`${this.images}/foto_perfil/${filename}`, {
        responseType: 'blob'
      });
    }

    getRegiones():Observable<any> {
      return this.http.get<any>(this.apiUrl + '/regiones/');
    }

    getComunas(): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/Comunas/');
    }
    getClienteTablaEdit(id: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/clientes/?id=${id}`);
    }

    getSupervisor(): Observable<any>{
      return this.http.get(`${this.apiUrl}/Supervisor/`);
    }

    actualizarUsuario(Cliente: number, updateData: UpdateCliente) {
      return this.http.patch<{ message: string }>(
        `${this.apiUrl}/Actualizar/Cliente/${Cliente}`,
        updateData
      ).pipe(
        catchError(this.handleError)
      );
    }

    agregarCliente(cliente: Cliente) {
      return this.http.post<{ message: string }>(
        `${this.apiUrl}/Agregar/Cliente/`,
        cliente
      ).pipe(
        catchError(this.handleError)
      );
    }

    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Error desconocido';
      if (error.error instanceof ErrorEvent) {
        // Error del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del servidor
        errorMessage = `Código: ${error.status}\nMensaje: ${error.error.detail || error.message}`;
      }
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    }

    subirImagen(id_user: string, imagen: File) {
      const formData = new FormData();
      formData.append('id_user', id_user); // Agrega el ID del usuario
      formData.append('imagen1_png', imagen); // Agrega la imagen

      return this.http.post(`${this.apiUrl}/subir-archivo/fotoPerfil/`, formData); // Realiza la solicitud POST
    }
}