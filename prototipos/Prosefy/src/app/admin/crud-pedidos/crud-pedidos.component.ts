import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { PedidosService } from 'src/app/services/pedido.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LibrosService } from 'src/app/services/libros.service';


@Component({
  selector: 'app-crud-pedidos',
  templateUrl: './crud-pedidos.component.html',
  styleUrls: ['./crud-pedidos.component.css']
})
export class CrudPedidosComponent implements OnInit {
  pedidoEditandoId: string | null = null;
  nuevoEstado: string = '';
  pedidos: any[] = [];
  usuarioNombres: { [key: string]: string } = {};
  libroTitulos: { [key: string]: string } = {};


  constructor(private pedidoService: PedidosService, private usuarioService: UsuarioService, private librosService: LibrosService) { }

  ngOnInit() {
    this.pedidoService.getPedidos().subscribe(
      (pedidos: any[]) => {
        this.pedidos = pedidos.map(pedido => ({
          id: pedido._id,
          fecha: pedido.fecha ? new Date(pedido.fecha) : undefined,
          usuario: pedido.usuario,
          libro: pedido.libro,
          estado: pedido.estado || 'Pendiente'
        }));
      },
      (error) => {
        console.error('Error al obtener los pedidos:', error);
      }
    );
  }

  getUsuarioNombreCompleto(): void {
    this.usuarioService.getNombre();
    this.usuarioService.getApellido();
  }

  getLibroTitulo(libroId: string): void {
    this.librosService.getTitulo(libroId);
  }

  eliminarPedido(pedidoId: string): void {
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
      cancelButtonColor: '#181a1b',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.eliminarPedido(pedidoId).subscribe(
          () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El pedido ha sido eliminado con éxito.',
              icon: 'success',
              background: '#242729',
              color: '#fff',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#473226',
            }).then(() => {
              location.reload();
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el pedido.',
              icon: 'error',
              background: '#242729',
              color: '#fff',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#473226',
            });
          }
        );
      }
    });
  }

  editarPedido(pedidoId: string): void {
    if (this.pedidoEditandoId === pedidoId) {
      this.pedidoService.setTipo(pedidoId, this.nuevoEstado).subscribe(
        (response: any) => {
          console.log('Estado actualizado con éxito:', response);
          window.location.reload();
        },
        (error: any) => {
          console.error('Error al actualizar el estado:', error);
        }
      );
    }

    this.pedidoEditandoId = (this.pedidoEditandoId === pedidoId) ? null : pedidoId;
    this.nuevoEstado = '';
  }
}