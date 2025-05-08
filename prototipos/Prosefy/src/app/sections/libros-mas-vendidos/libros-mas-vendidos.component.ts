import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro.interface';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-libros-mas-vendidos',
  templateUrl: './libros-mas-vendidos.component.html',
  styleUrls: ['./libros-mas-vendidos.component.css']
})
export class LibrosMasVendidosComponent implements OnInit {
  todosLosLibros: Libro[] = [];

  constructor(private librosService: LibrosService) { }

  ngOnInit(): void {
    this.librosService.getLibros().subscribe(libros => {
      this.todosLosLibros = libros;
    });
  }
}
