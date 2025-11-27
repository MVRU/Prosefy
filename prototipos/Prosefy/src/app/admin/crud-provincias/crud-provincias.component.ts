import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProvinciasService } from '../../services/provincias.service';
import { AuthService } from '../../services/auth.service';
import { Provincia } from '../../models/provincia.interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-crud-provincias',
    templateUrl: './crud-provincias.component.html',
    styleUrls: ['./crud-provincias.component.css'],
    standalone: false
})
export class CrudProvinciasComponent implements OnInit {

  provincias: Provincia[] = [];
  isAdmin: boolean = false;

  provinciaForm!: FormGroup;
  editForm!: FormGroup;

  isCreateModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  editingProvinciaId: string | null = null;

  constructor(
    private provinciasService: ProvinciasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkAdminRole();
    this.loadProvincias();
    this.initForms();
  }

  checkAdminRole(): void {
    this.authService.currentUser$.subscribe(usuario => {
      this.isAdmin = usuario?.rol === 'admin';
    });
  }

  loadProvincias(): void {
    this.provinciasService.getProvincias().subscribe({
      next: (provincias: Provincia[]) => {
        this.provincias = provincias;
      },
      error: (error) => {
        console.error('Error al cargar provincias:', error);
      }
    });
  }

  initForms(): void {
    this.provinciaForm = this.formBuilder.group({
      descripcion: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s,'.]+$/)
      ]]
    });

    this.editForm = this.formBuilder.group({
      descripcion: ['', [
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
    this.provinciaForm.reset();
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.provinciaForm.reset();
  }

  openEditModal(provincia: Provincia): void {
    if (!this.isAdmin) {
      this.showPermissionError();
      return;
    }

    if (!provincia._id) {
      this.showErrorAlert('ID de provincia no válido');
      return;
    }

    this.editingProvinciaId = provincia._id;
    this.editForm.patchValue({ descripcion: provincia.descripcion });
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editForm.reset();
  }

  registrarProvincia(): void {
    if (this.provinciaForm.invalid) {
      return;
    }

    const nuevaProvincia = this.provinciaForm.value;

    this.provinciasService.registrarProvincia(nuevaProvincia).subscribe({
      next: (response) => {
        console.log('Provincia registrada:', response.data);
        this.closeCreateModal();
        this.loadProvincias();
        this.showSuccessAlert('Provincia creada exitosamente');
      },
      error: (error) => {
        console.error('Error al registrar provincia:', error);
        this.showErrorAlert('Hubo un problema al registrar la provincia.');
      }
    });
  }

  actualizarProvincia(): void {
    if (this.editForm.invalid || !this.editingProvinciaId) {
      return;
    }

    const actualizaciones = this.editForm.value;

    this.provinciasService.actualizarProvincia(this.editingProvinciaId, actualizaciones).subscribe({
      next: () => {
        this.closeEditModal();
        this.loadProvincias();
        this.showSuccessAlert('Provincia actualizada exitosamente');
      },
      error: (error) => {
        console.error('Error al actualizar provincia:', error);
        this.showErrorAlert('Hubo un problema al actualizar la provincia.');
      }
    });
  }

  eliminarProvincia(provincia: Provincia): void {
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
        this.provinciasService.eliminarProvincia(provincia._id!).subscribe({
          next: () => {
            this.provincias = this.provincias.filter(p => p._id !== provincia._id);
            this.showSuccessAlert('Provincia eliminada correctamente');
          },
          error: (error) => {
            console.error('Error al eliminar provincia:', error);
            this.showErrorAlert('Hubo un problema al eliminar la provincia.');
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