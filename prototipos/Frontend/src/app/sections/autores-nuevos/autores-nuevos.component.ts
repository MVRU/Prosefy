import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListaAutoresComponent } from 'src/app/shared/lista-autores/lista-autores.component';

@Component({
  selector: 'app-autores-nuevos',
  templateUrl: './autores-nuevos.component.html',
  styleUrls: ['./autores-nuevos.component.css'],
  imports: [CommonModule, RouterModule, ListaAutoresComponent],
  standalone: true,
})
export class AutoresNuevosComponent { }