import { Component, Input } from '@angular/core';
import { LibrosService, Libro } from '../../services/libros.service';

@Component({
  selector: 'app-libro-card',
  templateUrl: './libro-card.component.html',
  styleUrls: ['./libro-card.component.css']
})
export class LibroCardComponent {
  @Input() libro!: Libro;
}