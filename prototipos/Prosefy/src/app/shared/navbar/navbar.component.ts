import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categoria.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isPopupOpen = false;
  showUserOptions = false;
  categorias: Categoria[] = [];
  loading = true; // Indicador de carga

  constructor(public currencyService: CurrencyService, private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data.sort((a, b) =>
          a.nombre.localeCompare(b.nombre) // Ordenar alfabéticamente por nombre
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar las categorías:', error);
        this.loading = false;
      }
    });
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  setCurrency(currency: string): void {
    this.currencyService.setCurrency(currency);
  }
}