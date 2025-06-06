import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

export interface IniciarSesionResponse {
  token: string;
  usuario: {
    id: string;
    nombre: string;
    email: string;
    rol: 'admin' | 'cliente';
  };
}

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {
  private apiUrl: string = environment.apiUrlUsuarios;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }

  iniciarSesion(email: string, contraseña: string): Observable<IniciarSesionResponse> {
    const body = { email, password: contraseña };
    return this.http.post<IniciarSesionResponse>(`${this.apiUrl}/iniciar-sesion`, body).pipe(
      tap(response => {
        console.log('Inicio de sesión exitoso');
        this.authService.cargarUsuarioActual(); // ✅ Carga el usuario desde el servidor
      })
    );
  }

  cerrarSesion(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cerrar-sesion`, {}, {
      withCredentials: true,
    }).pipe(
      tap(() => {
        this.isLoggedInSubject.next(false);
        console.log('Cierre de sesión desde el servidor');
      }),
      catchError(error => {
        console.error('Error al cerrar sesión:', error);
        this.isLoggedInSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  getEstadoSesion(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}