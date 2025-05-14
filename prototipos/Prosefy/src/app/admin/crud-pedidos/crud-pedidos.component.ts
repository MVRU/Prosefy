import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedido.service';
import { AuthService } from 'src/app/services/auth.service';
import { Pedido } from 'src/app/models/pedido.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-pedidos',
  templateUrl: './crud-pedidos.component.html',
  styleUrls: ['./crud-pedidos.component.css']
})
export class CrudPedidosComponent implements OnInit {

  pedidos: Pedido[] = [];
  isAdmin: boolean = false;

  estadosValidos: Pedido['estado'][] = ['pendiente', 'procesado', 'enviado', 'entregado'];

  constructor(
    private pedidosService: PedidosService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkAdminRole();
    this.loadPedidos();
  }

  checkAdminRole(): void {
    this.authService.currentUser$.subscribe(usuario => {
      this.isAdmin = usuario?.rol === 'admin';
    });
  }

  loadPedidos(): void {
    this.pedidosService.getPedidos().subscribe({
      next: (pedidos: Pedido[]) => {
        this.pedidos = pedidos;
      },
      error: (error) => {
        console.error('Error al cargar pedidos:', error);
      }
    });
  }

  cambiarEstado(pedido: Pedido, nuevoEstado: Pedido['estado']): void {
    if (!this.isAdmin || !pedido._id) {
      this.showPermissionError();
      return;
    }

    this.pedidosService.actualizarEstado(pedido._id, nuevoEstado).subscribe({
      next: () => {
        pedido.estado = nuevoEstado;
        this.showSuccessAlert('Estado actualizado exitosamente');
      },
      error: (error) => {
        console.error('Error al actualizar estado:', error);
        this.showErrorAlert('Hubo un problema al actualizar el estado.');
      }
    });
  }

  eliminarPedido(pedido: Pedido): void {
    if (!this.isAdmin) {
      this.showPermissionError();
      return;
    }

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#242729',
      color: '#fff',
      confirmButtonColor: '#473226',
      cancelButtonColor: '#181a1b'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidosService.eliminarPedido(pedido._id!).subscribe({
          next: () => {
            this.pedidos = this.pedidos.filter(p => p._id !== pedido._id);
            this.showSuccessAlert('Pedido eliminado correctamente');
          },
          error: (error) => {
            console.error('Error al eliminar pedido:', error);
            this.showErrorAlert('Hubo un problema al eliminar el pedido.');
          }
        });
      }
    });
  }

  // ✅ Mostrar alertas
  showSuccessAlert(mensaje: string): void {
    Swal.fire({
      title: 'Éxito',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      background: '#242729',
      color: '#fff',
      confirmButtonColor: '#473226'
    });
  }

  showErrorAlert(mensaje: string): void {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      background: '#242729',
      color: '#fff',
      confirmButtonColor: '#473226'
    });
  }

  showPermissionError(): void {
    Swal.fire({
      title: 'Permiso denegado',
      text: 'Solo los administradores pueden realizar esta acción.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      background: '#242729',
      color: '#fff',
      confirmButtonColor: '#473226'
    });
  }
}