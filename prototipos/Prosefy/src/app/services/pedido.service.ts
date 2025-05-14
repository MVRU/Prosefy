import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Pedido } from '../models/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = `${environment.apiUrlPedidos}`;

  constructor(private http: HttpClient) { }

  crearPedido(pedido: Pedido): Observable<{ mensaje: string; data: Pedido }> {
    return this.http.post<{ mensaje: string; data: Pedido }>(this.apiUrl, pedido);
  }

  getPedidosPorUsuario(usuarioId: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  actualizarEstado(id: string, nuevoEstado: Pedido['estado']): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, { estado: nuevoEstado });
  }

  eliminarPedido(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}