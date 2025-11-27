import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs'
import { CarritoComprasService } from 'src/app/services/carrito-compras.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() closed = new EventEmitter<void>();
  showUserOptions = false;
  isPopupOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  headerScrolled = false;
  placeholderText = 'Buscar...';
  searchTerm: string = '';
  carritoItems: any[] = [];

  private authSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router, private carritoService: CarritoComprasService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(auth => {
      this.isLoggedIn = auth;
      if (auth) {
        this.authService.currentRole$.subscribe(rol => {
          this.isAdmin = rol === 'admin';
        });
      } else {
        this.isAdmin = false;
      }
    });

    this.authService.cargarUsuarioActual();

    this.carritoService.carrito$.subscribe(items => {
      this.carritoItems = items;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.cerrarSesion().subscribe(() => {
      this.router.navigate(['/identificarse']);
    });
    this.showUserOptions = false;
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  toggleUserOptions(): void {
    this.showUserOptions = !this.showUserOptions;
  }

  updatePlaceholder(url: string): void {
    if (url.includes('/inicio')) {
      this.placeholderText = 'Buscar libros...';
    } else if (url.includes('/autores')) {
      this.placeholderText = 'Buscar autores...';
    } else if (url.includes('/editoriales')) {
      this.placeholderText = 'Buscar editoriales...';
    } else if (url.includes('/ayuda')) {
      this.placeholderText = 'Buscar en ayuda...';
    } else {
      this.placeholderText = 'Buscar...';
    }
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/busqueda', this.searchTerm]);
    }
  }

  closeUserOptions(): void {
    this.showUserOptions = false;
  }
}