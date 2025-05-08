import { Component, HostListener, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { Router } from '@angular/router';
import { Libro } from 'src/app/models/libro.interface';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit, OnChanges {
  @Input() libros: Libro[] = [];
  @Input() filtroEditorialId: string | null = null;
  librosVisibles: Libro[] = [];
  indiceActual = 0;
  elementosPorPaso = 4;

  constructor(
    private screenSizeService: ScreenSizeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actualizarElementosPorPaso(window.innerWidth);
    this.aplicarFiltroYActualizarLibros();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['libros'] || changes['filtroEditorialId']) {
      this.indiceActual = 0;  // Resetear el índice cuando cambian los libros o el filtro
      this.aplicarFiltroYActualizarLibros();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    const nuevaCantidad = this.screenSizeService.getElementosPorPaso(event.target.innerWidth);
    if (nuevaCantidad !== this.elementosPorPaso) {
      this.elementosPorPaso = nuevaCantidad;
      this.indiceActual = 0;
      this.aplicarFiltroYActualizarLibros();
    }
  }

  navegarALibro(id: string): void {
    this.router.navigate(['/libros', id]);
  }

  actualizarElementosPorPaso(width: number): void {
    this.elementosPorPaso = this.screenSizeService.getElementosPorPaso(width);
  }

  aplicarFiltroYActualizarLibros(): void {
    let librosFiltrados = this.libros;

    // Filtrar por editorial si existe el filtro
    if (this.filtroEditorialId) {
      librosFiltrados = this.libros.filter(libro => libro.editorial._id === this.filtroEditorialId);
    }

    // Actualizar los libros visibles con la paginación
    const inicio = this.indiceActual;
    const fin = inicio + this.elementosPorPaso;
    this.librosVisibles = librosFiltrados.slice(inicio, fin);
  }

  siguiente(): void {
    if (this.indiceActual + this.elementosPorPaso < this.libros.length) {
      this.indiceActual += this.elementosPorPaso;
      this.aplicarFiltroYActualizarLibros();
    }
  }

  anterior(): void {
    if (this.indiceActual > 0) {
      this.indiceActual -= this.elementosPorPaso;
      this.aplicarFiltroYActualizarLibros();
    }
  }
}