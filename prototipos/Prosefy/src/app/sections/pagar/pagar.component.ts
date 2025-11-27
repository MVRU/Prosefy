// pagar.component.ts

import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { CarritoComprasService } from '../../services/carrito-compras.service';
import { PedidosService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';
import { AutoresService } from '../../services/autores.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Pedido } from '../../models/pedido.interface';
import { MetodoPago } from '../../enums/metodo-pago.enum';
import { UsuarioNew } from 'src/app/models/usuario.interface';
import { Envio } from 'src/app/models/envio.interface';
import { Libro } from '../../models/libro.interface';

@Component({
    selector: 'app-pagar',
    templateUrl: './pagar.component.html',
    styleUrls: ['./pagar.component.css'],
    standalone: false
})
export class PagarComponent implements OnInit {

  subtotal: number = 0;
  contador = 1;
  libros: Libro[] = [];
  total: number = 0;
  cantidades: { [id: string]: number } = {};
  mostrarLabel: boolean = true;
  noMostrarlabel: boolean = false;
  autoresNombres: { [id: string]: string[] } = {};
  metodoSeleccionado: MetodoPago | null = null;
  usuarioId: string | null = null;
  usuario: UsuarioNew | null = null;
  envio: Envio = {
    _id: undefined,
    precio: 0,
    fecha_entrega_estimada: new Date(),
    envio_gratis: false
  };

  private userSubscription!: Subscription;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.actualizarVisibilidadLabel();
  }

  constructor(
    private librosService: LibrosService,
    private carritoService: CarritoComprasService,
    private autoresService: AutoresService,
    private pedidosService: PedidosService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actualizarVisibilidadLabel();
    this.obtenerLibrosEnCarrito();

    this.userSubscription = this.authService.currentUser$.subscribe(usuario => {
      if (usuario && usuario._id) {
        this.usuarioId = usuario._id;
        this.usuario = usuario;
      } else {
        this.usuarioId = null;
        console.error('Usuario no autenticado o sin _id');
        this.router.navigate(['/identificarse']);
      }
    });
  }

  obtenerLibrosEnCarrito() {
    const idsLibros = this.carritoService.getLibrosEnCarrito();

    if (!idsLibros.length) {
      this.libros = [];
      return;
    }

    this.librosService.getLibros().subscribe({
      next: (libros: Libro[]) => {
        this.libros = libros.filter(libro =>
          idsLibros.includes(libro._id)
        );
        this.calculateTotal();
      },
      error: (error) => {
        console.error('Error obteniendo libros:', error);
      }
    });
  }

  calculateTotal() {
    this.subtotal = this.libros.reduce((sum, libro) => {
      const cantidad = this.cantidades[libro._id] || 1;
      return sum + (libro.precio * cantidad);
    }, 0);

    this.envio.precio = this.subtotal < 10000 ? 3000 : 0;

    switch (this.contador) {
      case 1: this.total = this.subtotal; break;
      case 2: this.total = this.subtotal + 2000; break;
      case 3: this.total = this.subtotal + 3000; break;
    }
  }

  validarCantidad(event: Event, libroId: string) {
    const inputElement = event.target as HTMLInputElement;
    let cantidad = parseInt(inputElement.value);

    if (isNaN(cantidad) || cantidad < 1) {
      inputElement.value = '1';
      cantidad = 1;
    } else if (cantidad > 10) {
      inputElement.value = '10';
      cantidad = 10;
    }

    this.cantidades[libroId] = cantidad;
    this.calculateTotal();
  }

  aumentarContador() {
    if (this.contador < 3) {
      this.contador++;
      this.calculateTotal();
    }
  }

  disminuirContador() {
    if (this.contador > 1) {
      this.contador--;
      this.calculateTotal();
    }
  }

  seleccionarMetodoPago(metodo: string) {
    const validMethods = ['debito', 'transferencia', 'efectivo', 'tarjeta'];

    if (validMethods.includes(metodo)) {
      this.metodoSeleccionado = metodo as MetodoPago;
    } else {
      this.metodoSeleccionado = null;
      console.warn('Método de pago inválido:', metodo);
      Swal.fire({
        title: 'Método de pago inválido',
        text: 'Por favor, selecciona un método válido.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  crearPedido(): void {
    if (!this.usuarioId) {
      console.error('Usuario no logueado');
      return;
    }

    if (!this.metodoSeleccionado) {
      console.warn('No se ha seleccionado un método de pago.');
      Swal.fire({
        title: 'Método de pago requerido',
        text: 'Por favor, selecciona un método de pago.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (this.libros.length === 0) {
      console.error('No hay libros en el carrito');
      return;
    }

    const items = this.libros.map(libro => ({
      libro: libro,
      cantidad: this.cantidades[libro._id] || 1,
      precio_unitario: libro.precio
    }));

    // ✅ Solo enviamos el ID del usuario y el precio del envío
    const pedido: Pedido = {
      usuario: this.usuario!,
      items,
      metodo_pago: this.metodoSeleccionado!,
      total: this.total,
      envio: this.envio.precio,
      estado: 'pendiente',
      fecha_hora: new Date()
    };

    this.pedidosService.crearPedido(pedido).subscribe({
      next: (response) => {
        console.log('Pedido creado con éxito:', response);

        // Limpiar carrito y redirigir
        this.carritoService.limpiarCarrito();
        this.router.navigateByUrl('/inicio');

        // Mostrar alerta de éxito
        Swal.fire({
          title: '¡Compra realizada con éxito!',
          text: 'Tu pedido ha sido procesado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          background: '#242729',
          color: '#fff',
          confirmButtonColor: '#473226'
        });
      },
      error: (error) => {
        console.error('Error al crear el pedido:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al procesar tu compra.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          background: '#242729',
          color: '#fff',
          confirmButtonColor: '#473226'
        });
      }
    });
  }

  private actualizarVisibilidadLabel() {
    this.mostrarLabel = window.innerWidth > 500;
    this.noMostrarlabel = !this.mostrarLabel;
  }
}