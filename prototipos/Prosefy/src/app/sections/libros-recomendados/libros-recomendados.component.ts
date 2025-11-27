import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro.interface';
import { LibrosService } from '../../services/libros.service';

@Component({
    selector: 'app-libros-recomendados',
    templateUrl: './libros-recomendados.component.html',
    styleUrls: ['./libros-recomendados.component.css'],
    standalone: false
})
export class LibrosRecomendadosComponent implements OnInit {
  todosLosLibros: Libro[] = [];

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.librosService.getLibros().subscribe(libros => {
      this.todosLosLibros = libros;
    });
  }
}
