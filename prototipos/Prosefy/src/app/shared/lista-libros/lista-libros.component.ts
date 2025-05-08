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
  @Input() filtroAutorId: string | null = null;
  @Input() filtroCategoriaId: string | null = null;

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
    if (changes['libros'] || changes['filtroEditorialId'] || changes['filtroAutorId'] || changes['filtroCategoriaId']) {
      this.indiceActual = 0;
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

    // Filtro por editorial si está presente
    if (this.filtroEditorialId) {
      librosFiltrados = librosFiltrados.filter(libro => libro.editorial._id === this.filtroEditorialId);
    }

    // Filtro por autor si está presente
    if (this.filtroAutorId) {
      librosFiltrados = librosFiltrados.filter(libro =>
        libro.autores.some(autor => autor._id === this.filtroAutorId)
      );
    }

    // Filtro por categoría si está presente
    if (this.filtroCategoriaId) {
      librosFiltrados = librosFiltrados.filter(libro =>
        libro.categorias.some(categoria => categoria._id === this.filtroCategoriaId)
      );
    }

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