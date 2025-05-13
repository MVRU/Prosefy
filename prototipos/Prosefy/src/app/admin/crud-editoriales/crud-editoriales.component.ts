import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditorialesService } from 'src/app/services/editoriales.service';
import { AuthService } from 'src/app/services/auth.service';
import { Editorial } from 'src/app/models/editorial.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-editoriales',
  templateUrl: './crud-editoriales.component.html',
  styleUrls: ['./crud-editoriales.component.css']
})
export class CrudEditorialesComponent implements OnInit {
  editoriales: Editorial[] = [];
  isAdmin: boolean = false;
  editorialForm!: FormGroup;
  editForm!: FormGroup;
  isCreateModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  editingEditorialId: string | null = null;

  constructor(
    private editorialesService: EditorialesService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkAdminRole();
    this.loadEditoriales();
    this.initForms();
  }

  checkAdminRole(): void {
    this.authService.currentUser$.subscribe(usuario => {
      this.isAdmin = usuario?.rol === 'admin';
    });
  }

  loadEditoriales(): void {
    this.editorialesService.getEditoriales().subscribe({
      next: (editoriales: Editorial[]) => {
        this.editoriales = editoriales;
      },
      error: (error) => {
        console.error('Error al cargar editoriales', error);
      }
    });
  }

  initForms(): void {
    this.editorialForm = this.formBuilder.group({
      descripcion: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s,'.]+$/)
      ]],
      direccion: ['', [
        Validators.required
      ]],
      imagen: ['', [
        Validators.required,
        Validators.pattern(/^https?:\/\//)
      ]]
    });

    this.editForm = this.formBuilder.group({
      descripcion: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s,'.]+$/)
      ]],
      direccion: ['', [
        Validators.required
      ]],
      imagen: ['', [
        Validators.required,
        Validators.pattern(/^https?:\/\//)
      ]]
    });
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
    this.editorialForm.reset();
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.editorialForm.reset();
  }

  openEditModal(editorial: Editorial): void {
    if (!this.isAdmin) {
      this.showPermissionError();
      return;
    }

    if (!editorial._id) {
      console.warn('No se puede editar: editorial._id es undefined');
      this.showErrorAlert('ID de editorial no válido');
      return;
    }

    this.editingEditorialId = editorial._id;
    this.editForm.patchValue({
      descripcion: editorial.descripcion,
      direccion: editorial.direccion,
      imagen: editorial.imagen
    });

    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editForm.reset();
  }

  registrarEditorial(): void {
    if (this.editorialForm.invalid) {
      return;
    }

    const nuevaEditorial = this.editorialForm.value;

    this.editorialesService.registrarEditorial(nuevaEditorial).subscribe({
      next: (response) => {
        console.log('Editorial creada:', response.data);
        this.closeCreateModal();
        this.loadEditoriales();
        this.showSuccessAlert('Editorial creada exitosamente');
      },
      error: (error) => {
        console.error('Error al registrar editorial:', error);
        this.showErrorAlert('Hubo un problema al registrar la editorial.');
      }
    });
  }

  actualizarEditorial(): void {
    if (this.editForm.invalid || !this.editingEditorialId) {
      return;
    }

    const actualizaciones = this.editForm.value;

    this.editorialesService.updateEditorial(this.editingEditorialId, actualizaciones).subscribe({
      next: (response) => {
        console.log('Editorial actualizada:', response.data);
        this.closeEditModal();
        this.loadEditoriales();
        this.showSuccessAlert('Editorial actualizada exitosamente');
      },
      error: (error) => {
        console.error('Error al actualizar editorial:', error);
        this.showErrorAlert('Hubo un problema al actualizar la editorial.');
      }
    });
  }

  eliminarEditorial(editorial: Editorial): void {
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
        this.editorialesService.eliminarEditorial(editorial._id!).subscribe({
          next: () => {
            this.editoriales = this.editoriales.filter(e => e._id !== editorial._id);
            this.showSuccessAlert('Editorial eliminada correctamente');
          },
          error: (error) => {
            console.error('Error al eliminar editorial:', error);
            this.showErrorAlert('Hubo un problema al eliminar la editorial.');
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