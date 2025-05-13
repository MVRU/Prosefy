import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';
import { Categoria } from 'src/app/models/categoria.interface';

@Component({
  selector: 'app-crud-categorias',
  templateUrl: './crud-categorias.component.html',
  styleUrls: ['./crud-categorias.component.css']
})
export class CrudCategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  isAdmin: boolean = false;

  categoriaForm!: FormGroup;
  editForm!: FormGroup;

  isCreateModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  editingCategoriaId: string | null = null;

  constructor(
    private categoriasService: CategoriasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkAdminRole();
    this.loadCategorias();
    this.initForms();
  }

  checkAdminRole(): void {
    this.authService.currentUser$.subscribe(usuario => {
      this.isAdmin = usuario?.rol === 'admin';
    });
  }

  loadCategorias(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  initForms(): void {
    this.categoriaForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s,'.]+$/)
      ]]
    });

    this.editForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s,'.]+$/)
      ]]
    });
  }

  openCreateModal(): void {
    if (!this.isAdmin) {
      this.showPermissionError();
      return;
    }
    this.isCreateModalOpen = true;
    this.categoriaForm.reset();
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.categoriaForm.reset();
  }

  openEditModal(categoria: Categoria): void {
    if (!this.isAdmin) {
      this.showPermissionError();
      return;
    }

    if (!categoria._id) {
      this.showErrorAlert('ID de categoría no válido');
      return;
    }

    this.editingCategoriaId = categoria._id;
    this.editForm.patchValue({ nombre: categoria.nombre });
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editForm.reset();
  }

  registrarCategoria(): void {
    if (this.categoriaForm.invalid) {
      return;
    }

    const nuevaCategoria = this.categoriaForm.value;

    this.categoriasService.registrarCategoria(nuevaCategoria).subscribe({
      next: (response) => {
        console.log('Categoría creada:', response.data);
        this.closeCreateModal();
        this.loadCategorias();
        this.showSuccessAlert('Categoría creada exitosamente');
      },
      error: (error) => {
        console.error('Error al registrar categoría:', error);
        this.showErrorAlert('Hubo un problema al registrar la categoría.');
      }
    });
  }

  actualizarCategoria(): void {
    if (this.editForm.invalid || !this.editingCategoriaId) {
      return;
    }

    const actualizaciones = this.editForm.value;

    this.categoriasService.actualizarCategoria(this.editingCategoriaId, actualizaciones).subscribe({
      next: (response) => {
        console.log('Categoría actualizada:', response.data);
        this.closeEditModal();
        this.loadCategorias();
        this.showSuccessAlert('Categoría actualizada exitosamente');
      },
      error: (error) => {
        console.error('Error al actualizar categoría:', error);
        this.showErrorAlert('Hubo un problema al actualizar la categoría.');
      }
    });
  }

  eliminarCategoria(categoria: Categoria): void {
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
        this.categoriasService.eliminarCategoria(categoria._id!).subscribe({
          next: () => {
            this.categorias = this.categorias.filter(c => c._id !== categoria._id);
            this.showSuccessAlert('Categoría eliminada correctamente');
          },
          error: (error) => {
            console.error('Error al eliminar categoría:', error);
            this.showErrorAlert('Hubo un problema al eliminar la categoría.');
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