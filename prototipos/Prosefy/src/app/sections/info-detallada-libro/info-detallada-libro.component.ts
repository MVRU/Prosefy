import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro.interface';
import { LibrosService } from '../../services/libros.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-info-detallada-libro',
  templateUrl: './info-detallada-libro.component.html',
  styleUrls: ['./info-detallada-libro.component.css'],
})
export class InfoDetalladaLibroComponent implements OnInit {
  libro: Libro | undefined;

  constructor(
    public librosService: LibrosService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const idParam = params.get('id');
          if (!idParam) {
            this.router.navigate(['/inicio']);
            return of(undefined);
          }
          return this.librosService.getLibroNew(idParam); // devuelve Libro con datos expandidos
        })
      )
      .subscribe({
        next: (libro) => {
          if (libro) {
            this.libro = libro;
          } else {
            console.error('Libro no encontrado.');
          }
        },
        error: (error) => {
          console.error('Error obteniendo información: ', error);
        },
      });
  }

  formatearFecha(fecha: Date | string | undefined): string {
    if (fecha) {
      const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
      if (fechaObj instanceof Date) {
        const fechaFormateada = this.datePipe.transform(fechaObj, 'dd/MM/yyyy', 'es');
        if (fechaFormateada) return fechaFormateada;
      }
    }
    return 'N/A';
  }

  formatearSinopsisConSaltosDeLinea(sinopsis: string | undefined): string {
    return sinopsis ? sinopsis.replace(/\n/g, '<br><br>') : '';
  }

  getNombresAutoresTexto(autores: any[] = []): string {
    return autores.map((a) => `${a.nombre} ${a.apellido}`).join(', ');
  }

  getNombresCategoriasTexto(categorias: any[] = []): string {
    return categorias.map((c) => c.descripcion).join(', ');
  }
}
