import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AutoresService } from 'src/app/services/autores.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { EditorialesService } from 'src/app/services/editoriales.service';
import { LibrosService } from 'src/app/services/libros.service';
import Swal from 'sweetalert2';
import { Libro } from 'src/app/models/libro.interface';
import { arrayNoVacio } from 'src/app/validators/array-no-vacio.validator';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-crud-libros',
    templateUrl: './crud-libros.component.html',
    styleUrls: ['./crud-libros.component.css'],
    standalone: false
})
export class CrudLibrosComponent implements OnInit {

  libros: Libro[] = [];
  isAdmin: boolean = false;

  // Formularios reactivos
  libroForm!: FormGroup;
  editForm!: FormGroup;

  // Estados modales
  isCreateModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  editingLibroId: string | null = null;

  // Datos relacionados
  autores: { _id: string; nombre_completo: string }[] = [];
  categorias: { _id: string; nombre: string }[] = [];
  editoriales: { _id: string; descripcion: string }[] = [];

  constructor(
    private librosService: LibrosService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private autoresService: AutoresService,
    private categoriasService: CategoriasService,
    private editorialesService: EditorialesService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.checkAdminRole();
    this.loadLibros();
    this.initForms();
    this.loadRelaciones();
  }

  checkAdminRole(): void {
    this.authService.currentUser$.subscribe(usuario => {
      this.isAdmin = usuario?.rol === 'admin';
    });
  }

  loadLibros(): void {
    this.librosService.getLibros().subscribe({
      next: (libros: Libro[]) => {
        this.libros = libros;
      },
      error: (error) => {
        console.error('Error al cargar libros:', error);
      }
    });
  }

  loadRelaciones(): void {
    this.autoresService.getAutores().subscribe(autores => {
      this.autores = autores.map(a => ({ _id: a._id!, nombre_completo: a.nombre_completo }));
    });

    this.categoriasService.getCategorias().subscribe(categorias => {
      this.categorias = categorias.map(c => ({ _id: c._id!, nombre: c.nombre! }));
    });

    this.editorialesService.getEditoriales().subscribe(editoriales => {
      this.editoriales = editoriales.map(e => ({ _id: e._id!, descripcion: e.descripcion! }));
    });
  }

  initForms(): void {
    this.libroForm = this.formBuilder.group({
      isbn: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      idioma: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      fecha_edicion: ['', [Validators.required]],
      portada: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
      formatos: [[], [Validators.required, arrayNoVacio()]],
      autores: [[], [Validators.required, arrayNoVacio()]],
      categorias: [[], [Validators.required, arrayNoVacio()]],
      editorial: ['', [Validators.required]]
    });

    this.editForm = this.formBuilder.group({
      isbn: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      idioma: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      fecha_edicion: ['', [Validators.required]],
      portada: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
      formatos: [[], [Validators.required, arrayNoVacio()]],
      autores: [[], [Validators.required, arrayNoVacio()]],
      categorias: [[], [Validators.required, arrayNoVacio()]],
      editorial: ['', [Validators.required]]
    });
  }

  openCreateModal(): void {
    if (!this.isAdmin) {
      this.showPermissionError();
      return;
    }

    this.isCreateModalOpen = true;
    this.libroForm.reset();
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.libroForm.reset();
  }

  openEditModal(libro: Libro): void {
    if (!this.isAdmin || !libro._id) {
      this.showPermissionError();
      return;
    }

    this.editingLibroId = libro._id;

    // Asigna valores relacionados como arrays o strings según el modelo
    this.editForm.patchValue({
      isbn: libro.isbn,
      titulo: libro.titulo,
      idioma: libro.idioma,
      descripcion: libro.descripcion,
      precio: libro.precio,
      calificacion: libro.calificacion,
      fecha_edicion: libro.fecha_edicion,
      portada: libro.portada,
      formatos: libro.formatos,
      autores: libro.autores.map(a => a._id),
      categorias: libro.categorias.map(c => c._id),
      editorial: libro.editorial._id
    });

    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editForm.reset();
  }

  registrarLibro(): void {
    console.log('Formulario:', this.libroForm.value);
    console.log('Estado del formulario:', this.libroForm.status);

    if (this.libroForm.invalid) {
      this.libroForm.markAllAsTouched();
      console.error('Formulario inválido:', this.libroForm.errors);
      return;
    }

    const nuevoLibro = this.libroForm.value;

    this.librosService.registrarLibro(nuevoLibro).subscribe({
      next: () => {
        this.closeCreateModal();
        this.loadLibros();
        this.showSuccessAlert('Libro creado exitosamente');
      },
      error: (error) => {
        console.error('Error al registrar libro:', error);
        this.showErrorAlert('Hubo un problema al registrar el libro.');
      }
    });
  }

  actualizarLibro(): void {
    if (this.editForm.invalid || !this.editingLibroId) {
      return;
    }

    const actualizaciones = this.editForm.value;

    this.librosService.actualizarLibro(this.editingLibroId, actualizaciones).subscribe({
      next: () => {
        this.closeEditModal();
        this.loadLibros();
        this.showSuccessAlert('Libro actualizado exitosamente');
      },
      error: (error) => {
        console.error('Error al actualizar libro:', error);
        this.showErrorAlert('Hubo un problema al actualizar el libro.');
      }
    });
  }

  eliminarLibro(libro: Libro): void {
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
        this.librosService.eliminarLibro(libro._id!).subscribe({
          next: () => {
            this.libros = this.libros.filter(l => l._id !== libro._id);
            this.showSuccessAlert('Libro eliminado correctamente');
          },
          error: (error) => {
            console.error('Error al eliminar libro:', error);
            this.showErrorAlert('Hubo un problema al eliminar el libro.');
          }
        });
      }
    });
  }

  // Funciones auxiliares para mostrar datos en UI
  getAutoresNombre(libro: Libro): string {
    if (!libro.autores || libro.autores.length === 0) {
      return 'Sin autores definidos';
    }
    return libro.autores.map(a => a.nombre_completo).join(', ');
  }

  getCategoriasNombre(libro: Libro): string {
    if (!libro.categorias || libro.categorias.length === 0) {
      return 'Sin categorías definidas';
    }
    return libro.categorias.map(c => c.nombre).join(', ');
  }

  getFormatosNombre(libro: Libro): string {
    return libro.formatos.length > 0 ? libro.formatos.join(', ') : 'Sin formatos definidos';
  }

  getEditorialDescripcion(libro: Libro): string {
    return libro.editorial?.descripcion ?? 'Sin editorial definida';
  }

  // Mostrar alertas
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

  formatFecha(fecha: Date | string): string {
    if (!fecha) return 'N/A';

    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return this.datePipe.transform(fechaObj, 'mediumDate', 'es') || 'N/A';
  }
}