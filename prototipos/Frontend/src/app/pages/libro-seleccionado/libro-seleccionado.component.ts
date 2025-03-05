import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BotonVolverComponent } from 'src/app/shared/boton-volver/boton-volver.component';
import { InfoLibroSeleccionadoComponent } from 'src/app/sections/info-libro-seleccionado/info-libro-seleccionado.component';
import { LibrosRecomendadosComponent } from 'src/app/sections/libros-recomendados/libros-recomendados.component';
import { InfoDetalladaLibroComponent } from 'src/app/sections/info-detallada-libro/info-detallada-libro.component';
import { OpinionesLibroComponent } from 'src/app/sections/opiniones-libro/opiniones-libro.component';

@Component({
  selector: 'app-libro-seleccionado',
  templateUrl: './libro-seleccionado.component.html',
  styleUrls: ['./libro-seleccionado.component.css'],
  imports: [CommonModule, RouterModule, BotonVolverComponent, InfoLibroSeleccionadoComponent, LibrosRecomendadosComponent, InfoDetalladaLibroComponent, OpinionesLibroComponent],
  standalone: true,
})
export class LibroSeleccionadoComponent implements OnInit, AfterViewChecked {
  libroId: string | null = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Suscribirse a los cambios del parámetro 'id' para que el componente se actualice cuando cambie el parámetro
    this.route.paramMap.subscribe(params => {
      this.libroId = params.get('id');
      // Aquí puedes hacer la lógica de recarga de contenido, si es necesario
    });
  }

  ngAfterViewChecked(): void {
    // Asegura que el scroll se desplace hacia arriba cuando se cargue o cambie la vista
    window.scrollTo(0, 0);
  }
}