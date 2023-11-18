import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Libro, LibrosService } from '../../services/libros.service';
import { CarritoComprasService } from '../../services/carrito-compras.service';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {
  envio: number = 0;
  subtotal: number = 0;
  contador = 1;
  libros: Libro[] = [];
  total: number = 0;
  cantidades: { [id: string]: number } = {};
  mostrarLabel: boolean = true;
  noMostrarlabel: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.actualizarVisibilidadLabel();
  }

  constructor(
    private librosService: LibrosService,
    private carritoService: CarritoComprasService
  ) { }

  ngOnInit() {
    this.actualizarVisibilidadLabel();
    this.obtenerLibrosEnCarrito();
    this.libros.forEach((libro) => {
      this.cantidades[libro._id] = 1;
    });
    this.calculateTotal();
    this.subTotal();
  }

  obtenerLibrosEnCarrito() {
    const librosEnCarritoIds = this.carritoService.getLibrosEnCarrito();

    // Obtén la lista completa de libros
    this.librosService.getAll().subscribe(
      (libros: Libro[]) => {
        // Filtra los libros según los IDs en el carrito
        this.libros = libros.filter(libro => librosEnCarritoIds.includes(libro._id));
        this.calculateTotal();
      },
      (error) => {
        console.error('Error obteniendo libros:', error);
      }
    );
  }

  eliminarDelCarrito(libroId: string) {
    this.carritoService.eliminarDelCarrito(libroId);
    this.obtenerLibrosEnCarrito();
  }

  calculateTotal() {
    
    const maxCantidad = 10;
    const minCantidad = 1;
    this.total = this.libros.reduce((sum, libro) => sum + (libro.precio * this.cantidades[libro._id]), 0);

    for (let libro of this.libros) {
      if (this.cantidades[libro._id] > maxCantidad) {
        this.cantidades[libro._id] = maxCantidad;
      }
      if (this.cantidades[libro._id] < minCantidad) {
        this.cantidades[libro._id] = minCantidad;
      }
    }
    if (this.total < 10000){
      this.envio = 3000;
    }
    if (this.contador == 1) {
      this.total += 0
    }
    else if (this.contador == 2) {
      this.total += 2.000
    }
    else if (this.contador == 3) {
      this.total += 3.000
    }
    this.total += this.envio
    this.envio = 0;
  }

  validarCantidad(event: Event, libroId: string) {
    const inputElement = event.target as HTMLInputElement;
    let cantidad = parseInt(inputElement.value);

    if (isNaN(cantidad) || cantidad < 1) {
      inputElement.value = '1';
      this.cantidades[libroId] = 1;
    } else if (cantidad > 10) {
      inputElement.value = '10';
      this.cantidades[libroId] = 10;
    } else {
      this.cantidades[libroId] = cantidad;
    }
  }

  subTotal() {
    const maxCantidad = 10;
    const minCantidad = 1;
    this.subtotal = this.libros.reduce((sum, libro) => sum + (libro.precio * this.cantidades[libro._id]), 0);

    for (let libro of this.libros) {
      if (this.cantidades[libro._id] > maxCantidad) {
        this.cantidades[libro._id] = maxCantidad;
      }
      if (this.cantidades[libro._id] < minCantidad) {
        this.cantidades[libro._id] = minCantidad;
      }
    }
  }


  aumentarContador() {
    if (this.contador < 3) {
      this.contador++;
    }
  }

  disminuirContador() {
    if (this.contador > 1) {
      this.contador--;
    }
  }

  divStyles: any = {
    'background-color': 'white'
  };

  changeBackgroundColor() {
    // Cambia el color de fondo al hacer click, o no.
    this.divStyles['background-color'] = 'lightblue'
  };


  private actualizarVisibilidadLabel(){
    this.mostrarLabel = window.innerWidth > 500;
    this.noMostrarlabel = !this.mostrarLabel
  }

}
