import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { UsuarioNew } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UsuarioNew | null>(null);
  public currentUser$: Observable<UsuarioNew | null> = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private currentRoleSubject = new BehaviorSubject<'admin' | 'cliente' | null>(null);
  public currentRole$: Observable<'admin' | 'cliente' | null> = this.currentRoleSubject.asObservable();

  private apiUrlUsuarios: string = environment.apiUrlUsuarios;

  constructor(private http: HttpClient, private router: Router) { }

  cargarUsuarioActual(): void {
    this.http.get<UsuarioNew>(`${this.apiUrlUsuarios}/perfil`, { withCredentials: true }).pipe(
      catchError(err => {
        console.error('Error cargando perfil del usuario:', err);
        this.isAuthenticatedSubject.next(false);
        this.currentRoleSubject.next(null);
        this.currentUserSubject.next(null);
        return throwError(() => err);
      }),
      tap(usuario => {
        this.isAuthenticatedSubject.next(true);
        this.currentRoleSubject.next(usuario.rol || 'cliente');
        this.currentUserSubject.next(usuario);
      })
    ).subscribe();
  }

  getCurrentRole(): 'admin' | 'cliente' | null {
    return this.currentRoleSubject.value;
  }

  cerrarSesion(): Observable<void> {
    return this.http.post<void>(`${this.apiUrlUsuarios}/cerrar-sesion`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
        this.currentRoleSubject.next(null);
        this.currentUserSubject.next(null);
        this.router.navigate(['/identificarse']);
      }),
      catchError(err => {
        this.isAuthenticatedSubject.next(false);
        this.currentRoleSubject.next(null);
        this.currentUserSubject.next(null);
        this.router.navigate(['/identificarse']);
        return throwError(() => err);
      })
    );
  }
}