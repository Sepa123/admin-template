import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


export interface Usuario {
  nombre: string;
  mail: string;
  telefono: string;
  fecha_nacimiento: string;
  direccion: string;
  cargo: string;
  id_supervisor: number;
  activate: boolean;
  area_id: number; // Debe ser number
  rol_id: number;  // Debe ser number
  password: string;
}

// Interface que coincide con tu modelo Pydantic UsuarioUpdate
export interface UsuarioUpdate {
  nombre?: string;
  mail?: string;
  password?: string;
  activate?: boolean;
  rol_id?: number;
  telefono?: string;
  id_supervisor?: number;
  fecha_nacimiento?: string;
  direccion?: string;
  area_id?: number;  // Nota: Se usa area_id que será mapeado a id_area
  cargo?: string;
}


@Injectable({
  providedIn: 'root'
})
export class GestionyMantencionService {

  constructor(private http: HttpClient) { }

  // apiUrl = "http://localhost:8000/api";
  apiUrl = "https://hela.transyanez.cl/api/panel";
  images = "https://hela.transyanez.cl/api/panel/image";
  
  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/cargarUsuarios/GestionyMantencion');
  }
  
  getFotoPerfil(filename: string): Observable<Blob> {
    return this.http.get(`${this.images}/foto_perfil/${filename}`, {
      responseType: 'blob'
    });
  }
  
  getAreas(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/area/');
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/Rol');
  }
  getUsuariosTablaEdit(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/?id=${id}`);
  }

  getSupervisor(): Observable<any>{
    return this.http.get(`${this.apiUrl}/Supervisor/`);
  }

  actualizarUsuario(usuarioId: number, updateData: UsuarioUpdate) {
    return this.http.patch<{ message: string }>(
      `${this.apiUrl}/Actualizar/Usuario/${usuarioId}`,
      updateData
    ).pipe(
      catchError(this.handleError)
    );
  }

  agregarUsuario(usuario: Usuario) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/Agregar/Usuario/`,
      usuario
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