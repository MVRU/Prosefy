import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListaLibrosComponent } from 'src/app/shared/lista-libros/lista-libros.component';

@Component({
  selector: 'app-nuevos-lanzamientos',
  templateUrl: './nuevos-lanzamientos.component.html',
  styleUrls: ['./nuevos-lanzamientos.component.css'],
  imports: [CommonModule, RouterModule, ListaLibrosComponent],
  standalone: true,
})
export class NuevosLanzamientosComponent { }
