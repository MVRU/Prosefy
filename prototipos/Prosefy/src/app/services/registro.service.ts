import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from './usuario.service';
import { Router } from '@angular/router';
import { IniciarSesionService } from './iniciar-sesion.service';
import { environment } from 'src/environments/environment.development';
import { UsuarioNew } from '../models/usuario.interface';

export interface RegistroResponse {
  mensaje: string;
  usuario?: {
    username: string;
    nombre: string;
    apellido: string;
    email: string;
    id: string;
  };
}
export interface ErrorRegistroResponse {
  mensaje: string;
  codigo?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl: string = environment.apiUrlUsuarios;

  constructor(private http: HttpClient, private router: Router, private iniciarSesionService: IniciarSesionService) { }

  /* Si está autenticado, se bloquea el acceso a ciertas rutas */
  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return true; // No hay token, permitir acceso
    } else {
      this.router.navigate(['/inicio']);
      return false; // Hay token, bloquear acceso
    }
  }

  registrarUsuario(usuario: UsuarioNew): Observable<RegistroResponse> {
    const { username, nombre, apellido, email, password } = usuario;

    const body = {
      username,
      nombre,
      apellido,
      email,
      password,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = `${this.apiUrl}/registrar`;

    return this.http.post<RegistroResponse>(url, body, httpOptions).pipe(
      tap(response => console.log('Registro exitoso', response)),
      catchError((error: HttpErrorResponse) => this.handleServerError(error))
    );
  }

  validarUsuarioExistente(username: string): Observable<Usuario | null> {
    const url = `${this.apiUrl}/username/${username}`;
    return this.http.get<Usuario>(url)
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

  validarEmailExistente(email: string): Observable<Usuario | null> {
    const url = `${this.apiUrl}/email/${email}`;
    return this.http.get<Usuario>(url)
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

  private handleServerError(error: HttpErrorResponse): Observable<never> {
    let mensaje = 'Error desconocido en el registro';

    if (error.error instanceof ErrorEvent) {
      mensaje = `Error del cliente: ${error.error.message}`;
    } else {
      mensaje = error.error?.mensaje || 'Error del servidor';
    }

    console.error('Error completo:', error);

    return throwError(() => ({ mensaje }));
  }
}
