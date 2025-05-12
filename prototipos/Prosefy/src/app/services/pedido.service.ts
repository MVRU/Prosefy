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

  crearPedido(pedido: Pedido): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, pedido);
  }

  getPedidosPorUsuario(usuarioId: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}