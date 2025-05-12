// productos-carrito-compras.component.ts

import { Component, OnInit } from '@angular/core';
import { CarritoComprasService, ItemCarrito } from 'src/app/services/carrito-compras.service';
import { LibrosService } from 'src/app/services/libros.service';
import { Libro } from 'src/app/models/libro.interface';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-productos-carrito-compras',
  templateUrl: './productos-carrito-compras.component.html',
  styleUrls: ['./productos-carrito-compras.component.css']
})
export class ProductosCarritoComprasComponent implements OnInit {

  carritoItems: ItemCarrito[] = [];
  librosEnCarrito: Libro[] = [];
  total: number = 0;

  // Variables para mostrar en template
  autoresPorLibro: { [id: string]: string } = {};
  categoriasPorLibro: { [id: string]: string } = {};
  editorialPorLibro: { [id: string]: string } = {};

  constructor(
    private carritoService: CarritoComprasService,
    private librosService: LibrosService
  ) { }

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(items => {
      this.carritoItems = items;
      this.cargarLibros();
    });
  }

  cargarLibros(): void {
    this.librosEnCarrito = [];

    if (this.carritoItems.length === 0) {
      this.total = 0;
      return;
    }

    const observables = this.carritoItems.map(item =>
      this.librosService.getLibro(item.idLibro)
    );

    forkJoin(observables).subscribe({
      next: (libros: Libro[]) => {
        this.librosEnCarrito = libros.filter(Boolean);
        this.prepararDatosParaTemplate();
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error al cargar los libros', err);
      }
    });
  }

  prepararDatosParaTemplate(): void {
    this.autoresPorLibro = {};
    this.categoriasPorLibro = {};
    this.editorialPorLibro = {};

    this.librosEnCarrito.forEach(libro => {
      // Autores: nombre completo
      this.autoresPorLibro[libro._id] = libro.autores
        .filter(Boolean)
        .map(a => a.nombre_completo)
        .join(', ');

      // Categorías: nombre
      this.categoriasPorLibro[libro._id] = libro.categorias
        .filter(Boolean)
        .map(c => c.nombre)
        .join(', ');

      // Editorial: nombre
      this.editorialPorLibro[libro._id] = libro.editorial?.descripcion || '';
    });
  }

  eliminarDelCarrito(libroId: string): void {
    this.carritoService.eliminarDelCarrito(libroId);
  }

  calculateTotal(): void {
    this.total = this.librosEnCarrito.reduce((sum, libro) => {
      const item = this.carritoItems.find(i => i.idLibro === libro._id);
      return sum + (libro.precio * (item?.cantidad || 1));
    }, 0);

    console.log('Total calculado:', this.total);
  }

  validarCantidad(event: Event, libroId: string): void {
    const inputElement = event.target as HTMLInputElement;
    let cantidad = parseInt(inputElement.value);

    if (isNaN(cantidad) || cantidad < 1) {
      cantidad = 1;
      inputElement.value = '1';
    } else if (cantidad > 10) {
      cantidad = 10;
      inputElement.value = '10';
    }

    this.carritoService.actualizarCantidad(libroId, cantidad);
  }

  getCantidad(idLibro: string): number {
    return this.carritoService.getCantidad(idLibro);
  }
}