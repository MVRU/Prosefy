import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro.interface';
import { LibrosService } from '../../services/libros.service';

@Component({
    selector: 'app-nuevos-lanzamientos',
    templateUrl: './nuevos-lanzamientos.component.html',
    styleUrls: ['./nuevos-lanzamientos.component.css'],
    standalone: false
})
export class NuevosLanzamientosComponent implements OnInit {
  todosLosLibros: Libro[] = [];

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.librosService.getLibros().subscribe(libros => {
      this.todosLosLibros = libros;
    });
  }
}
