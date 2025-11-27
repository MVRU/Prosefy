import { Component } from '@angular/core';
import { nombreSitio } from '../constants';
import { Categoria } from 'src/app/models/categoria.interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent {
  nombreSitio = nombreSitio;
  currentYear: number = new Date().getFullYear();
  categorias: Categoria[] = [];
  loading = true;

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data.sort((a, b) =>
          a.nombre.localeCompare(b.nombre) // Ordenar alfabéticamente por nombre
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar las categorías en el footer:', error);
        this.loading = false;
      },
    });
  }
}