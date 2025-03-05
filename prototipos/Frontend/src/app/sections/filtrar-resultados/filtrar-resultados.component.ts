import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtrar-resultados',
  templateUrl: './filtrar-resultados.component.html',
  styleUrls: ['./filtrar-resultados.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
})
export class FiltrarResultadosComponent {
  idiomas: string[] = ['Inglés', 'Español', 'Francés', 'Alemán'];
  formatos: string[] = ['Físico', 'Ebook'];
  categorias: string[] = [
    'Ficción',
    'No ficción',
    'Literatura infantil',
    'Educación y referencia',
    'Ciencia y naturaleza',
    'Religión y espiritualidad',
    'Política y sociedad',
    'Salud y bienestar',
    'Negocios y finanzas',
  ];
  ordenarPor: string[] = ['Fecha', 'Popularidad', 'Alfabético'];

  selectedIdiomas: string[] = [];
  selectedFormatos: string[] = [];
  selectedCategorias: string[] = [];
  selectedOrdenarPor: string = '';
}
