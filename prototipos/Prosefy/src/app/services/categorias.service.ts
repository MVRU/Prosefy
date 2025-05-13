import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Categoria } from '../models/categoria.interface';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl: string = environment.apiUrlCategorias;

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  registrarCategoria(categoria: Partial<Categoria>): Observable<{ mensaje: string; data: Categoria }> {
    return this.http.post<{ mensaje: string; data: Categoria }>(`${this.apiUrl}/crear`, categoria);
  }

  actualizarCategoria(id: string, categoria: Partial<Categoria>): Observable<{ mensaje: string; data: Categoria }> {
    return this.http.put<{ mensaje: string; data: Categoria }>(`${this.apiUrl}/${id}`, categoria);
  }

  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCategoria(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // REVISAR LO DE ABAJO

  getDescripcion(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/descripcion/${id}`);
  }

  obtenerDescripcionesCategoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/descripciones`);
  }
}