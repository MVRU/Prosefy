import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedido.service';
import { AuthService } from 'src/app/services/auth.service';
import { Pedido } from 'src/app/models/pedido.interface';
import { UsuarioNew } from 'src/app/models/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  usuario: UsuarioNew | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private pedidosService: PedidosService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(usuario => {
      if (!usuario || !usuario._id) {
        this.error = 'No se encontró tu información. Inicia sesión nuevamente.';
        this.isLoading = false;
        this.router.navigate(['/login']);
        return;
      }

      this.usuario = usuario;

      this.pedidosService.getPedidosPorUsuario(usuario._id).subscribe({
        next: (data) => {
          this.pedidos = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Hubo un problema al cargar tus pedidos.';
          this.isLoading = false;
          console.error(err);
        }
      });
    });
  }
}