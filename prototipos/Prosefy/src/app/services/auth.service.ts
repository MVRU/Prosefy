import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { UsuarioNew } from "../models/usuario.interface";
import { throwError } from "rxjs";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private apiUrl: string = environment.apiUrlUsuarios;

  private currentUserSubject = new BehaviorSubject<UsuarioNew | null>(null);
  public currentUser$: Observable<UsuarioNew | null> = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private currentRoleSubject = new BehaviorSubject<'admin' | 'cliente' | null>(null);
  public currentRole$: Observable<'admin' | 'cliente' | null> = this.currentRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  cargarUsuarioActual(): void {
    this.http.get<UsuarioNew>(`${this.apiUrl}/perfil`, { withCredentials: true }).pipe(
      catchError(err => {
        this.isAuthenticatedSubject.next(false);
        this.currentRoleSubject.next(null);
        this.currentUserSubject.next(null);
        return throwError(() => err);
      })
    ).subscribe(usuario => {
      this.isAuthenticatedSubject.next(true);
      this.currentRoleSubject.next(usuario.rol || 'cliente');
      this.currentUserSubject.next(usuario);
    });
  }

  getCurrentRole(): 'admin' | 'cliente' | null {
    return this.currentRoleSubject.value;
  }

  setCurrentUser(usuario: UsuarioNew | null): void {
    this.currentUserSubject.next(usuario);
  }

  cerrarSesion(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cerrar-sesion`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
        this.currentRoleSubject.next(null);
        this.currentUserSubject.next(null);
      }),
      catchError(err => throwError(() => err))
    );
  }
}