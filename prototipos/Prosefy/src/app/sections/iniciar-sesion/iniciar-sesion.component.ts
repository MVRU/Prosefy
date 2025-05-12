import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IniciarSesionService, IniciarSesionResponse } from 'src/app/services/iniciar-sesion.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {

  loginError: string = '';
  isPopupOpen: boolean = false;
  modalMessage: string = '';

  loginGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private iniciarSesionService: IniciarSesionService,
    private authService: AuthService
  ) { }

  closePopup() {
    this.isPopupOpen = false;
  }

  updateModalContent(message: string): void {
    this.modalMessage = message;
    this.isPopupOpen = true;
  }

  login(): void {
    const { email, password } = this.loginGroup.value;

    if (this.loginGroup.invalid || !email || !password) {
      this.loginGroup.markAllAsTouched();
      return;
    }

    this.iniciarSesionService.iniciarSesion(email, password).subscribe({
      next: (response: IniciarSesionResponse) => {
        console.log('Inicio de sesión exitoso', response.usuario.rol);
        this.authService.cargarUsuarioActual(); // Carga el perfil del usuario
        this.router.navigateByUrl('/inicio');
      },
      error: (error) => {
        console.error('Error en inicio de sesión', error);
        this.loginError = 'Credenciales inválidas. Por favor, vuelva a intentar.';
        this.updateModalContent('Credenciales inválidas.');
      }
    });
  }
}