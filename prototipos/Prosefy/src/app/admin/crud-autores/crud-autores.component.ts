import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoresService } from 'src/app/services/autores.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioNew } from 'src/app/models/usuario.interface';
import { Autor } from 'src/app/models/autor.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-autores',
  templateUrl: './crud-autores.component.html',
  styleUrls: ['./crud-autores.component.css']
})
export class CrudAutoresComponent implements OnInit {
  autores: Autor[] = [];
  autorForm: FormGroup;
  editForm: FormGroup;
  isPopupOpen: boolean = false;
  isEditPopupOpen: boolean = false;
  editingAutorId: string | null = null;
  isAdmin: boolean = false;

  constructor(
    private autoresService: AutoresService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    // ✅ Formulario para crear autor
    this.autorForm = this.formBuilder.group({
      nombre_completo: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s,'.]+$/)
      ]],
      perfil: ['', [
        Validators.required
      ]],
      info: ['', [
        Validators.required
      ]]
    });

    // ✅ Formulario para editar autor
    this.editForm = this.formBuilder.group({
      nombre_completo: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s,'.]+$/)
      ]],
      perfil: ['', [
        Validators.required
      ]],
      info: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {
    this.checkAdminRole();
    this.loadAutores();
  }

  checkAdminRole(): void {
    this.authService.currentUser$.subscribe(usuario => {
      this.isAdmin = usuario?.rol === 'admin';
    });
  }

  loadAutores(): void {
    this.autoresService.getAutores().subscribe({
      next: (autores: Autor[]) => {
        this.autores = autores;
      },
      error: (err) => {
        console.error('Error al cargar autores:', err);
      }
    });
  }

  openCreateModal(): void {
    this.isPopupOpen = true;
  }

  closeCreateModal(): void {
    this.isPopupOpen = false;
    this.autorForm.reset();
  }

  openEditModal(autor: Autor): void {
    if (!this.isAdmin) {
      Swal.fire({
        title: 'Permiso denegado',
        text: 'Solo los administradores pueden editar autores.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.editingAutorId = autor._id || '';
    this.editForm.patchValue({
      nombre_completo: autor.nombre_completo,
      perfil: autor.perfil,
      info: autor.info
    });
    this.isEditPopupOpen = true;
  }

  closeEditModal(): void {
    this.isEditPopupOpen = false;
    this.editForm.reset();
  }

  registrarAutor(): void {
    if (this.autorForm.invalid) {
      return;
    }

    const nuevoAutor = this.autorForm.value;

    this.autoresService.registrarAutor(nuevoAutor).subscribe({
      next: (response) => {
        console.log('Autor registrado:', response);
        this.closeCreateModal();
        this.loadAutores();
        this.showSuccessAlert('Autor creado exitosamente');
      },
      error: (error) => {
        console.error('Error al registrar autor:', error);
        this.showErrorAlert('Hubo un problema al registrar el autor.');
      }
    });
  }

  actualizarAutor(): void {
    if (this.editForm.invalid || !this.editingAutorId) {
      return;
    }

    const actualizaciones = this.editForm.value;

    this.autoresService.updateAutor(this.editingAutorId, actualizaciones).subscribe({
      next: (response) => {
        console.log('Autor actualizado:', response);
        this.loadAutores();
        this.closeEditModal();
        this.showSuccessAlert('Autor actualizado exitosamente');
      },
      error: (error) => {
        console.error('Error al actualizar autor:', error);
        this.showErrorAlert('Hubo un problema al actualizar el autor.');
      }
    });
  }

  eliminarAutor(autor: Autor): void {
    if (!this.isAdmin) {
      this.showErrorAlert('Solo los administradores pueden eliminar autores.');
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
        this.autoresService.eliminarAutor(autor._id!).subscribe({
          next: () => {
            this.autores = this.autores.filter(a => a._id !== autor._id);
            this.showSuccessAlert('Autor eliminado correctamente');
          },
          error: (error) => {
            console.error('Error al eliminar autor:', error);
            this.showErrorAlert('Hubo un problema al eliminar el autor.');
          }
        });
      }
    });
  }

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
}