import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';
import { Usuario } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})

export class RegistrarseComponent {
  registroForm: FormGroup;
  showErrorMessages: boolean = false;
  isPopupOpen: boolean = false;
  modalMessage: string = '';
  showRedirectButton: boolean = false;

  @Output() closed = new EventEmitter<void>();
  tipoUsuario: string = 'usuario';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registroService: RegistroService,
  ) {
    this.registroForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
        nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])/)],
        ],
        repeatPassword: [''],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;

    return password === repeatPassword ? null : { passwordMismatch: true };
  }

  registrarUsuario(): void {
    this.showErrorMessages = true;

    if (this.registroForm.valid) {
      const { username, email } = this.registroForm.value;

      const usernameValidation$ = this.registroService.validarUsuarioExistente(username);
      const emailValidation$ = this.registroService.validarEmailExistente(email);

      forkJoin([usernameValidation$, emailValidation$]).subscribe({
        next: ([usuarioExistente, emailExistente]) => {
          if (usuarioExistente !== null) {
            this.registroForm.get('username')?.setErrors({ usuarioExistente: true });
            this.showModalMessage('El nombre de usuario ya está en uso.');
          } else if (emailExistente !== null) {
            this.registroForm.get('email')?.setErrors({ emailExistente: true });
            this.showModalMessage('El correo electrónico ya está registrado.');
          } else {
            this.realizarRegistro();
          }
        },
        error: (error) => this.handleError(error),
      });
    }
  }

  private realizarRegistro(): void {
    const usuario: Usuario = {
      username: this.registroForm.value.username,
      nombre: this.registroForm.value.nombre,
      apellido: this.registroForm.value.apellido,
      email: this.registroForm.value.email,
      contraseña: this.registroForm.value.password,
      tipo: this.tipoUsuario,
    };

    this.registroService.registrarUsuario(usuario).subscribe({
      next: () => this.showModalMessage('¡Registro exitoso!', true),
      error: (error) => this.handleError(error),
    });
  }

  private showModalMessage(message: string, showRedirectButton: boolean = false): void {
    this.modalMessage = message;
    this.showRedirectButton = showRedirectButton;
    this.isPopupOpen = true;
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    const errorMessage = error?.error?.mensaje || 'Ocurrió un error inesperado. Por favor, inténtalo nuevamente.';
    this.showModalMessage(errorMessage);
  }

  redirectToLogin(): void {
    this.isPopupOpen = false;
    this.router.navigate(['/identificarse']);
  }
}