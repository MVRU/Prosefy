import { Component, HostListener, OnInit } from '@angular/core';
import { LibrosService, Libro } from '../../services/libros.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit {
  libros: Libro[] = [];
  librosVisibles: Libro[] = [];
  indiceActual = 0;
  elementosPorPaso = 4;

  constructor(
    private librosService: LibrosService,
    private screenSizeService: ScreenSizeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.librosService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.actualizarElementosPorPaso(window.innerWidth);
      this.actualizarLibrosVisibles();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const nuevaCantidad = this.screenSizeService.getElementosPorPaso(event.target.innerWidth);
    if (nuevaCantidad !== this.elementosPorPaso) {
      this.elementosPorPaso = nuevaCantidad;
      this.indiceActual = 0; // Reiniciar índice para evitar errores
      this.actualizarLibrosVisibles();
    }
  }

  navegarALibro(id: string): void {
    this.router.navigate(['/libros', id]);
  }

  actualizarElementosPorPaso(width: number): void {
    this.elementosPorPaso = this.screenSizeService.getElementosPorPaso(width);
  }

  actualizarLibrosVisibles(): void {
    const inicio = this.indiceActual;
    const fin = inicio + this.elementosPorPaso;
    this.librosVisibles = this.libros.slice(inicio, fin);
  }

  siguiente(): void {
    if (this.indiceActual + this.elementosPorPaso < this.libros.length) {
      this.indiceActual += this.elementosPorPaso;
      this.actualizarLibrosVisibles();
    }
  }

  anterior(): void {
    if (this.indiceActual > 0) {
      this.indiceActual -= this.elementosPorPaso;
      this.actualizarLibrosVisibles();
    }
  }
}
