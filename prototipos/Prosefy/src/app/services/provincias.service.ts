import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Provincia } from '../models/provincia.interface';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  private apiUrl = environment.apiUrlProvincias;

  constructor(private http: HttpClient) { }

  getProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.apiUrl);
  }

  registrarProvincia(provincia: Partial<Provincia>): Observable<{ mensaje: string; data: Provincia }> {
    return this.http.post<{ mensaje: string; data: Provincia }>(`${this.apiUrl}/crear`, provincia);
  }

  actualizarProvincia(id: string, provincia: Partial<Provincia>): Observable<{ mensaje: string; data: Provincia }> {
    return this.http.put<{ mensaje: string; data: Provincia }>(`${this.apiUrl}/${id}`, provincia);
  }

  eliminarProvincia(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // REVISAR LO DE ABAJO

  getProvinciaByDescripcion(descripcion: string): Observable<any> {
    // Codificar la descripción antes de incluirla en la URL
    const encodedDescripcion = encodeURIComponent(descripcion);
    const url = `${this.apiUrl}/get-descripcion/${encodedDescripcion}`;
    return this.http.get(url);
  }

  getDescripcion(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-descripcion/${id}`);
  }

}