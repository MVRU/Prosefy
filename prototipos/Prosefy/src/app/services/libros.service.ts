import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { AutoresService } from '../services/autores.service';
import { CategoriasService } from './categorias.service';
import { environment } from 'src/environments/environment.development';
import { HttpHeaders } from '@angular/common/http';
import { Libro } from '../models/libro.interface';

export interface LibroOld {
  _id: string;
  isbn: string;
  titulo: string;
  idioma: string;
  descripcion: string;
  precio: number;
  fecha_edicion: Date;
  autores: string[];
  editorial: string;
  categorias: string[];
  formatos: string[];
  portada: string;
  calificacion: number;
}

export interface LibroInput {
  isbn: string;
  titulo: string;
  idioma: string;
  descripcion: string;
  precio: number;
  fecha_edicion: Date;
  autores: string[];
  editorial: string;
  categorias: string[];
  formatos: string[];
  portada: string;
  calificacion: number;
  _id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private apiUrl: string = environment.apiUrlLibros;

  constructor(private http: HttpClient, private autoresService: AutoresService, private categoriasService: CategoriasService) { }

  getLibrosPorEditorial(editorialId: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/editorial/${editorialId}`);
  }

  getLibrosPorAutor(autorId: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/autor/${autorId}`);
  }

  getLibrosPorCategoria(categoriaId: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/categoria/${categoriaId}`);
  }

  getLibrosPaginados(offset: number, limit: number): Observable<LibroOld[]> {
    return this.http.get<LibroOld[]>(`${this.apiUrl}/libros?offset=${offset}&limit=${limit}`);
  }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/`);
  }

  getLibro(id: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/id/${id}`);
  }

  registrarLibro(libro: Partial<Libro>): Observable<{ mensaje: string; data: Libro }> {
    return this.http.post<{ mensaje: string; data: Libro }>(`${this.apiUrl}/crear`, libro);
  }

  actualizarLibro(id: string, libro: Partial<Libro>): Observable<{ mensaje: string; data: Libro }> {
    return this.http.put<{ mensaje: string; data: Libro }>(`${this.apiUrl}/${id}`, libro);
  }

  eliminarLibro(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // REVISAR LO DE ABAJO

  findByEditorial(editorialId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/editoriales/${editorialId}`);
  }

  findByAutor(autorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/autores/${autorId}`);
  }

  findByCategoria(categoriaId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias/${categoriaId}`);
  }

  findByFormatoLibro(formatoId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/formatos/${formatoId}`);
  }


  getLibrosIds(): Observable<any[]> {
    console.log(`Solicitando IDs de libros desde ${this.apiUrl}/libros`);
    return this.http.get(`${this.apiUrl}/libros`).pipe(
      map((response: any) => response.data),
      catchError((error: any) => {
        console.error('Error al obtener IDs de libros:', error);
        return of([]);
      })
    );
  }

  getLibroOld(id: string): Observable<LibroOld> {
    return this.http.get<LibroOld>(`${this.apiUrl}/id/${id}`);
  }

  getLibroNew(id: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/id/${id}`);
  }

  getIsbn(id: string): Observable<string | undefined> {
    return this.http.get<any>(`${this.apiUrl}/isbn/${id}`).pipe(
      map((response: any) => response.data)
    );
  }

  getTitulo(id: string): Observable<string | undefined> {
    return this.http.get<any>(`${this.apiUrl}/titulo/${id}`).pipe(
      map((response: any) => response.data)
    );
  }

  getPortada(id: string): Observable<string | undefined> {
    return this.http.get<any>(`${this.apiUrl}/portada/${id}`).pipe(
      map((response: any) => response.data)
    );
  }

  getAutores(id: string): Observable<string[] | undefined> {
    return this.http.get<any>(`${this.apiUrl}/getautores/${id}`).pipe(
      map((response: any) => response.data)
    );
  }

  getEditorial(id: string): Observable<string | undefined> {
    return this.http.get<any>(`${this.apiUrl}/geteditorial/${id}`).pipe(
      map((response: any) => response.data)
    );
  }

  getCategorias(id: string): Observable<string[] | undefined> {
    return this.http.get<any>(`${this.apiUrl}/getcategorias/${id}`).pipe(
      map((response: any) => response.data)
    );
  }

  getPrecio(id: string): Observable<number | undefined> {
    return this.http.get<any>(`${this.apiUrl}/precio/${id}`).pipe(
      map((response: any) => response.data)
    );
  }

  getDescripcion(id: string): Observable<string | undefined> {
    return this.http.get<any>(`${this.apiUrl}/descripcion/${id}`).pipe(
      map((response: any) => response.data)
    );
  }

  getFechaEdicion(id: string): Observable<Date | undefined> {
    return this.http.get<any>(`${this.apiUrl}/fechaEdicion/${id}`).pipe(
      map((response: any) => response.data)
    );
  }

  getNombresAutores(idsAutores: string[]): Observable<string[]> {
    const observables = idsAutores.map(id => this.autoresService.getNombreCompleto(id));

    return forkJoin(observables).pipe(
      filter((nombres): nombres is string[] => nombres.every(nombre => nombre !== undefined))
    );
  }

  getAutoresObservables(idsAutores: string[]): Observable<string> {
    const observables = idsAutores.map(id => this.autoresService.getNombreCompleto(id));
    return forkJoin(observables).pipe(
      filter((nombres): nombres is string[] => nombres.every(nombre => nombre !== undefined)),
      map(nombres => nombres.join(', '))
    );
  }

  getCategoriasObservables(idsCategorias: string[]): Observable<string> {
    const observables = idsCategorias.map(id => this.categoriasService.getDescripcion(id));
    return forkJoin(observables).pipe(
      filter((descripciones): descripciones is string[] => descripciones.every(descripcion => descripcion !== undefined)),
      map(descripciones => descripciones.join(', '))
    );
  }
}