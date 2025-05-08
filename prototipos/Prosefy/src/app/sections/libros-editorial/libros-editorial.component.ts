import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/models/libro.interface';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-libros-editorial',
  templateUrl: './libros-editorial.component.html',
  styleUrls: ['./libros-editorial.component.css']
})
export class LibrosEditorialComponent implements OnInit {
  todosLosLibros: Libro[] = [];
  editorialId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService
  ) { }

  ngOnInit(): void {
    // Obtener el 'editorialId' desde la URL
    this.editorialId = this.route.snapshot.paramMap.get('id');

    if (this.editorialId) {
      // Si existe el editorialId, obtener los libros de esa editorial
      this.librosService.getLibrosPorEditorial(this.editorialId).subscribe(libros => {
        this.todosLosLibros = libros;
      });
    } else {
      console.log('No se ha encontrado el ID de la editorial');
    }
  }
}