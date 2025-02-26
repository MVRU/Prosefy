import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css'],
})
export class MisPedidosComponent implements OnInit {
  pedidos: any[] = [];
  userId: string | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private pedidosService: PedidosService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    // Obtener el ID del usuario
    this.usuarioService.getUserId().subscribe({
      next: (userId) => {
        if (!userId) {
          this.error = 'No se encontró el ID del usuario.';
          this.isLoading = false;
          return;
        }

        this.userId = userId;

        this.pedidosService.getPedidosByUsuario(userId).subscribe({
          next: (data) => {
            this.pedidos = data;
            this.isLoading = false;
          },
          error: (err) => {
            this.error = 'Error al cargar los pedidos.';
            this.isLoading = false;
            console.error(err);
          },
        });
      },
      error: (err) => {
        this.error = 'Error al obtener el ID del usuario.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }
}