import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { CurrencyService } from '../../services/currency.service';
import { delay } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { CarritoComprasService } from '../../services/carrito-compras.service';
import { AuthService } from 'src/app/services/auth.service';
import { Libro } from 'src/app/models/libro.interface';

@Component({
    selector: 'app-info-libro-seleccionado',
    templateUrl: './info-libro-seleccionado.component.html',
    styleUrls: ['./info-libro-seleccionado.component.css'],
    standalone: false
})
export class InfoLibroSeleccionadoComponent implements OnInit, OnDestroy {
  libro: any;
  private subscription: Subscription = new Subscription();
  isLoggedIn: boolean = false;
  libroId!: string;
  libroAgregado: boolean = false;

  constructor(
    public currencyService: CurrencyService,
    public librosService: LibrosService,
    private route: ActivatedRoute,
    private router: Router,
    public carritoService: CarritoComprasService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.libroId = this.route.snapshot.paramMap.get('id') || '';
    this.librosService.getLibro(this.libroId).subscribe({
      next: (data) => {
        this.libro = data;
      },
      error: () => {
        this.router.navigate(['/inicio']);
      }
    });

    this.authService.isAuthenticated$.subscribe(auth => {
      this.isLoggedIn = auth;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPrice(): number | undefined {
    return this.libro?.precio;
  }

  calculatePriceInSelectedCurrency(precio: number): number {
    return this.currencyService.convertir(precio);
  }

  agregarAlCarrito(libro: Libro): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/identificarse']);
      return;
    }

    this.carritoService.agregarAlCarrito(libro._id, 1);
    this.mostrarMensaje();
  }

  comprarAhora(cantidad: number = 1): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/identificarse']);
      return;
    }

    this.carritoService.agregarAlCarrito(this.libro._id, cantidad);
    this.router.navigate(['/carrito-compras']);
  }

  mostrarMensaje(): void {
    this.libroAgregado = true;
    this.subscription.add(
      of(null).pipe(delay(3000)).subscribe(() => this.libroAgregado = false)
    );
  }

  private handleError(errorMessage: string) {
    console.error(errorMessage);
    this.router.navigate(['/inicio']);
  }
}