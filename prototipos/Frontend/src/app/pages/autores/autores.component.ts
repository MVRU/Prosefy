import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutoresPopularesComponent } from 'src/app/sections/autores-populares/autores-populares.component';
import { AutoresNuevosComponent } from 'src/app/sections/autores-nuevos/autores-nuevos.component';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
  imports: [CommonModule, RouterModule, AutoresPopularesComponent, AutoresNuevosComponent],
  standalone: true,
})
export class AutoresComponent {

}
