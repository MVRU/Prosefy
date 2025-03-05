import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListaAutoresComponent } from 'src/app/shared/lista-autores/lista-autores.component';

@Component({
  selector: 'app-autores-populares',
  templateUrl: './autores-populares.component.html',
  styleUrls: ['./autores-populares.component.css'],
  imports: [CommonModule, RouterModule, ListaAutoresComponent],
  standalone: true,
})
export class AutoresPopularesComponent { }