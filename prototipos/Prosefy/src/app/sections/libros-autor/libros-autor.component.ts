import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/app/models/libro.interface';
import { LibrosService } from 'src/app/services/libros.service';
@Component({
  selector: 'app-libros-autor',
  templateUrl: './libros-autor.component.html',
  styleUrls: ['./libros-autor.component.css']
})
export class LibrosAutorComponent implements OnInit {
  todosLosLibros: Libro[] = [];
  autorId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService
  ) { }

  ngOnInit(): void {
    // Obtener el 'autorId' desde la URL
    this.autorId = this.route.snapshot.paramMap.get('id');

    if (this.autorId) {
      // Si existe el autorId, obtener los libros de ese autor
      this.librosService.getLibrosPorAutor(this.autorId).subscribe(libros => {
        this.todosLosLibros = libros;
      });
    } else {
      console.log('No se ha encontrado el ID del autor');
    }
  }
}