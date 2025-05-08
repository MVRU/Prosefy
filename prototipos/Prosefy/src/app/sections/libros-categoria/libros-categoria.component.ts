import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/models/libro.interface';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-libros-categoria',
  templateUrl: './libros-categoria.component.html',
  styleUrls: ['./libros-categoria.component.css']
})
export class LibrosCategoriaComponent implements OnInit {
  todosLosLibros: Libro[] = [];
  categoriaId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.categoriaId = paramMap.get('id');

      if (this.categoriaId) {
        // Obtenemos TODOS los libros y dejamos que el componente hijo los filtre
        this.librosService.getLibros().subscribe(libros => {
          this.todosLosLibros = libros;
        });
      } else {
        console.log('No se ha encontrado el ID de la categoría');
      }
    });
  }
}