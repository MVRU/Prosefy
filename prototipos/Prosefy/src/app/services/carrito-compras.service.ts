import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrito {
  idLibro: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  public carrito$ = this.carritoSubject.asObservable();

  constructor() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carritoSubject.next(JSON.parse(carritoGuardado));
    }
  }

  getLibrosEnCarrito(): string[] {
    return this.carritoSubject.value.map(item => item.idLibro);
  }

  getCantidad(idLibro: string): number {
    const item = this.carritoSubject.value.find(item => item.idLibro === idLibro);
    return item?.cantidad || 1;
  }

  agregarAlCarrito(idLibro: string, cantidad: number = 1): void {
    const maxCantidad = 10;

    if (cantidad > maxCantidad) {
      alert(`Solo puedes comprar hasta ${maxCantidad} unidades`);
      cantidad = maxCantidad;
    }

    const carritoActual = [...this.carritoSubject.value];
    const index = carritoActual.findIndex(item => item.idLibro === idLibro);

    if (index >= 0) {
      carritoActual[index].cantidad += cantidad;
      if (carritoActual[index].cantidad > maxCantidad) {
        carritoActual[index].cantidad = maxCantidad;
        alert(`Máximo ${maxCantidad} unidades permitidas.`);
      }
    } else {
      carritoActual.push({ idLibro, cantidad });
    }

    this.guardarEnLocalStorage(carritoActual);
    this.carritoSubject.next(carritoActual);
  }

  eliminarDelCarrito(idLibro: string): void {
    const carritoActual = this.carritoSubject.value.filter(
      item => item.idLibro !== idLibro
    );

    this.guardarEnLocalStorage(carritoActual);
    this.carritoSubject.next(carritoActual);
  }

  limpiarCarrito(): void {
    this.guardarEnLocalStorage([]);
    this.carritoSubject.next([]);
  }

  actualizarCantidad(idLibro: string, nuevaCantidad: number): void {
    const carritoActual = [...this.carritoSubject.value];
    const index = carritoActual.findIndex(item => item.idLibro === idLibro);

    if (index >= 0) {
      carritoActual[index].cantidad = nuevaCantidad;
      this.guardarEnLocalStorage(carritoActual);
      this.carritoSubject.next(carritoActual);
    }
  }

  private guardarEnLocalStorage(carrito: ItemCarrito[]): void {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
}