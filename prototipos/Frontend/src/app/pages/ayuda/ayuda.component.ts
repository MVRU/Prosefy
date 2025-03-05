import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeccionesAyudaComponent } from 'src/app/sections/secciones-ayuda/secciones-ayuda.component';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css'],
  imports: [CommonModule, RouterModule, SeccionesAyudaComponent],
  standalone: true,
})
export class AyudaComponent {

}
