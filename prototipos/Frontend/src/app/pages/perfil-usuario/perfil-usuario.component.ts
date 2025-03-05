import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CommonModule } from '@angular/common';
import { InfoUsuarioComponent } from 'src/app/sections/info-usuario/info-usuario.component';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  imports: [CommonModule, RouterModule, InfoUsuarioComponent],
  standalone: true,
})
export class PerfilUsuarioComponent {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  isPopupOpen: boolean = false;
  modalMessage: string = '';
  showRedirectButton: boolean = false;

  @Output() closed = new EventEmitter<void>();
  tipoUsuario: string = 'usuario';

  closePopup(): void {
    this.isPopupOpen = false;
  }

  eliminarCuenta(): void {
    this.isPopupOpen = true;
  }

  confirmarEliminarCuenta(): void {
    this.usuarioService.eliminarCuenta().subscribe({
      next: () => {
        console.log('Usuario eliminado con éxito.');
        this.router.navigate(['/inicio']);
      },
      error: (error: any) => {
        console.error('Error al eliminar la cuenta:', error);
      },
      complete: () => {
        this.isPopupOpen = false;
      }
    });
  }
}