import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListaLibrosComponent } from 'src/app/shared/lista-libros/lista-libros.component';

@Component({
  selector: 'app-libros-recomendados',
  templateUrl: './libros-recomendados.component.html',
  styleUrls: ['./libros-recomendados.component.css'],
  imports: [CommonModule, RouterModule, ListaLibrosComponent],
  standalone: true,
})
export class LibrosRecomendadosComponent { }
