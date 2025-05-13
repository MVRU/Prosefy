import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Editorial } from '../models/editorial.interface';

export interface EditorialOld {
  descripcion: string;
  direccion: string;
  imagen: string;
}
export interface editorialResponse {
  mensaje: string;
  editorial: {
    descripcion: string;
    direccion: string;
    imagen: string;
  };
}
export interface ErrorEditorialResponse {
  mensaje: string; // Un mensaje de error descriptivo
  codigo?: number; // Un código de error opcional
}

export interface UpdateEditorialResponse {
  message: string;
  data?: EditorialOld; // Datos actualizados de la editorial en caso de éxito
}

@Injectable({
  providedIn: 'root',
})
export class EditorialesService {

  private apiUrl: string = environment.apiUrlEditoriales;

  constructor(private http: HttpClient) { }

  getEditoriales(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(this.apiUrl);
  }

  registrarEditorial(editorial: Partial<Editorial>): Observable<{ mensaje: string; data: Editorial }> {
    return this.http.post<{ mensaje: string; data: Editorial }>(`${this.apiUrl}/crear`, editorial);
  }

  updateEditorial(id: string, editorial: Partial<Editorial>): Observable<{ mensaje: string; data: Editorial }> {
    return this.http.put<{ mensaje: string; data: Editorial }>(`${this.apiUrl}/${id}`, editorial);
  }

  eliminarEditorial(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getEditorial(id: string): Observable<Editorial> {
    return this.http.get<Editorial>(`${this.apiUrl}/id/${id}`);
  }

  // REVISAR LO DE ABAJO

  getEditorialesIds(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/editoriales`).pipe(
      map((response: any) => response.data)
    );
  }

  getDescripcion(id: string): Observable<string | undefined> {
    return this.http.get<any>(`${this.apiUrl}/get-descripcion/${id}`).pipe(
      map((response: any) => response.data),
    );
  }

  getDireccion(id: string): Observable<string | undefined> {
    return this.http.get<any>(`${this.apiUrl}/get-direccion/${id}`).pipe(
      map((response: any) => response.data),
    );
  }

  getImagen(id: string): Observable<string | undefined> {
    return this.http.get<any>(`${this.apiUrl}/get-imagen/${id}`).pipe(
      map((response: any) => response.data)
    );
  }



  validarEditorialExistente(descripcion: string): Observable<EditorialOld | null> {
    const url = `${this.apiUrl}/descripcion/${descripcion}`;
    return this.http.get<EditorialOld>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return of(null);
          } else {
            return throwError(() => error);
          }
        })
      );
  }

  getFormatos(id: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/getformatos/${id}`);
  }

  private handleServerError(error: any): Observable<never> {
    console.error('Error en el registro', error);

    const errorMessage: ErrorEditorialResponse = {
      mensaje: 'Error desconocido en el registro'
    };

    if (error instanceof HttpErrorResponse) {
      errorMessage.mensaje = error.error?.mensaje || 'Error desconocido en el registro';
      console.error('Detalles del error:', error.error);
    }

    return throwError(() => errorMessage);
  }
}
