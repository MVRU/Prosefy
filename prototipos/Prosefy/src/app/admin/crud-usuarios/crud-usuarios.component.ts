import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { UsuarioNew } from 'src/app/models/usuario.interface';

@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.css']
})
export class CrudUsuariosComponent implements OnInit {

  usuarios: UsuarioNew[] = [];
  usuarioEditandoId: string | null = null;
  nuevoRol: 'admin' | 'cliente' = 'cliente';
  currentUserId: string | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(usuario => {
      if (usuario && usuario._id) {
        this.currentUserId = usuario._id;
        this.cargarUsuarios();
      }
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.findAll().subscribe({
      next: (usuarios: UsuarioNew[]) => {
        // Filtra usuarios sin _id definido
        const usuariosValidos = usuarios.filter(u => u._id && u._id !== this.currentUserId);
        this.usuarios = usuariosValidos;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.mostrarError('Hubo un problema al cargar los usuarios.');
      }
    });
  }

  iniciarEdicion(usuario: UsuarioNew): void {
    if (!usuario._id) {
      console.warn('No se puede iniciar edición: usuario._id es undefined');
      return;
    }

    if (this.usuarioEditandoId === usuario._id) {
      this.guardarRol(usuario);
    } else {
      this.usuarioEditandoId = usuario._id;
      this.nuevoRol = usuario.rol || 'cliente';
    }
  }

  guardarRol(usuario: UsuarioNew): void {
    if (!usuario._id) {
      console.error('No se puede guardar: usuario._id es undefined');
      this.mostrarError('El ID del usuario no está definido.');
      return;
    }

    if (usuario._id === this.currentUserId) {
      this.mostrarError('No puedes modificar tu propio rol mientras estás logueado.');
      return;
    }

    this.usuarioService.cambiarRol(usuario._id, this.nuevoRol).subscribe({
      next: (usuarioActualizado) => {
        const index = this.usuarios.findIndex(u => u._id === usuario._id);

        if (index >= 0) {
          this.usuarios[index].rol = usuarioActualizado.rol;
        }

        this.usuarioEditandoId = null;
        this.mostrarExito('Rol actualizado exitosamente');
      },
      error: (error) => {
        console.error('Error al actualizar rol:', error);
        this.mostrarError('Hubo un problema al actualizar el rol.');
      }
    });
  }

  cancelarEdicion(): void {
    this.usuarioEditandoId = null;
  }

  eliminarUsuario(usuario: UsuarioNew): void {
    if (!usuario._id) {
      console.warn('No se puede eliminar: usuario._id es undefined');
      this.mostrarError('ID del usuario no está definido.');
      return;
    }

    if (usuario._id === this.currentUserId) {
      this.mostrarError('No puedes eliminarte a ti mismo.');
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
        this.usuarioService.eliminarUsuario(usuario._id!).subscribe({
          next: () => {
            this.usuarios = this.usuarios.filter(u => u._id !== usuario._id);
            this.mostrarExito('Usuario eliminado exitosamente');
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
            this.mostrarError('Hubo un problema al eliminar el usuario.');
          }
        });
      }
    });
  }

  mostrarExito(mensaje: string): void {
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

  mostrarError(mensaje: string): void {
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
}