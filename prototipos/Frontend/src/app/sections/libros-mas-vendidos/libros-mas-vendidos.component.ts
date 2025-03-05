import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListaLibrosComponent } from 'src/app/shared/lista-libros/lista-libros.component';

@Component({
  selector: 'app-libros-mas-vendidos',
  templateUrl: './libros-mas-vendidos.component.html',
  styleUrls: ['./libros-mas-vendidos.component.css'],
  imports: [CommonModule, RouterModule, ListaLibrosComponent],
  standalone: true,
})
export class LibrosMasVendidosComponent { }
