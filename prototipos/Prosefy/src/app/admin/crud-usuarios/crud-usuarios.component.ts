import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
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

  usuarioEditandoId: string | null = null;
  nuevoTipo: string = '';
  currentUserId: string | null = null;

  constructor(private usuarioService: UsuarioService, private authService: AuthService) { }

  usuariosIds: string[] = [];
  usuariosData: { [key: string]: { username: string | undefined, nombre: string | undefined, apellido: string | undefined, email: string | undefined, avatar: string | undefined, tipo: string | undefined } } = {};

  ngOnInit(): void {
    this.authService.cargarUsuarioActual(); // ✅ Carga el perfil desde el backend

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
        this.usuariosIds = usuarios.map(u => u._id!);
        usuarios.forEach(usuario => {
          this.usuariosData[usuario._id!] = {
            username: usuario.username,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            avatar: usuario.avatar || 'assets/img/usuario.png',
            tipo: usuario.rol || 'cliente'
          };
        });
      },
      error: () => {
        console.error('Error al cargar los usuarios');
      }
    });
  }

  eliminarUsuario(usuarioId: string): void {
    // Verificar si el usuario a eliminar es el mismo que el usuario actual usando su ID
    if (usuarioId === this.currentUserId) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'No puede eliminar su propio usuario mientras está iniciado sesión.',
        confirmButtonText: 'Aceptar',
        background: '#242729',
        color: '#fff',
        confirmButtonColor: '#473226'
      });
      return;
    }

    // Confirmar la eliminación si el usuario es diferente
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
        this.usuarioService.eliminarUsuario(usuarioId).subscribe(
          () => {
            // Después de la eliminación exitosa, mostramos el Swal de éxito
            Swal.fire({
              title: 'Eliminado!',
              text: 'El usuario ha sido eliminado con éxito.',
              icon: 'success',
              background: '#242729',
              color: '#fff',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#473226',
            }).then(() => {
              // Recargar la página solo después de que el usuario haga clic en "Aceptar"
              // location.reload();
              this.cargarUsuarios();
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el usuario.',
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

  editarUsuario(usuarioId: string): void {
    if (this.usuarioEditandoId === usuarioId) {
      this.usuarioService.setTipo(usuarioId, this.nuevoTipo).subscribe(
        (response) => {
          console.log('Tipo actualizado con éxito:', response);
          window.location.reload();
        },
        (error) => {
          console.error('Error al actualizar el tipo:', error);
        }
      );
    }

    this.usuarioEditandoId = (this.usuarioEditandoId === usuarioId) ? null : usuarioId;
    this.nuevoTipo = '';
  }
}