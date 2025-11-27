import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService, RegistroResponse } from 'src/app/services/registro.service';
import { UsuarioNew } from 'src/app/models/usuario.interface';

@Component({
    selector: 'app-registrarse',
    templateUrl: './registrarse.component.html',
    styleUrls: ['./registrarse.component.css'],
    standalone: false
})
export class RegistrarseComponent {
  registroForm: FormGroup;
  showErrorMessages: boolean = false;
  isPopupOpen: boolean = false;
  modalMessage: string = '';
  showRedirectButton: boolean = false;

  @Output() closed = new EventEmitter<void>();
  rolUsuario: string = 'usuario';

  closePopup() {
    this.isPopupOpen = false;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registroService: RegistroService
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

  // Validar contraseña
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const repeatPasswordControl = formGroup.get('repeatPassword');

    if (passwordControl && repeatPasswordControl) {
      const password = passwordControl.value;
      const repeatPassword = repeatPasswordControl.value;

      if (password !== repeatPassword) {
        repeatPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        repeatPasswordControl.setErrors(null);
      }
    }
  }

  registrarUsuario(): void {
    this.showErrorMessages = true;

    if (this.registroForm.invalid) {
      return;
    }

    const usuario: UsuarioNew = {
      username: this.registroForm.value.username,
      nombre: this.registroForm.value.nombre,
      apellido: this.registroForm.value.apellido,
      email: this.registroForm.value.email,
      password: this.registroForm.value.password,
      rol: 'cliente'
    };

    this.registroService.registrarUsuario(usuario).subscribe({
      next: (response: RegistroResponse) => {
        console.log('Registro exitoso', response);
        this.updateModalContent(response.mensaje, true);
      },
      error: (error) => {
        console.error('Error al registrar el usuario', error);
        const mensaje = error?.mensaje || 'Error desconocido en el registro';
        this.updateModalContent(mensaje);
      }
    });
  }

  // Muestra mensajes en el modal
  private updateModalContent(message: string, showRedirectButton: boolean = false): void {
    this.modalMessage = message;
    this.showRedirectButton = showRedirectButton;
    this.isPopupOpen = true;
  }

  // Redirige al login
  redirectToLogin(): void {
    this.isPopupOpen = false;
    this.router.navigate(['/identificarse']);
  }
}