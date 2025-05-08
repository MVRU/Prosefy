import { Component, Input } from '@angular/core';
import { Libro } from 'src/app/models/libro.interface';

@Component({
  selector: 'app-libro-card',
  templateUrl: './libro-card.component.html',
  styleUrls: ['./libro-card.component.css']
})
export class LibroCardComponent {
  @Input() libro!: Libro;
}