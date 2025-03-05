import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibrosRecomendadosComponent } from 'src/app/sections/libros-recomendados/libros-recomendados.component';
import { LibrosMasVendidosComponent } from 'src/app/sections/libros-mas-vendidos/libros-mas-vendidos.component';
import { NuevosLanzamientosComponent } from 'src/app/sections/nuevos-lanzamientos/nuevos-lanzamientos.component';
import { AutoresPopularesComponent } from 'src/app/sections/autores-populares/autores-populares.component';
import { OfertasDestacadasComponent } from 'src/app/sections/ofertas-destacadas/ofertas-destacadas.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: [CommonModule, RouterModule, LibrosRecomendadosComponent, LibrosMasVendidosComponent, NuevosLanzamientosComponent, AutoresPopularesComponent, OfertasDestacadasComponent],
  standalone: true,
})
export class InicioComponent {

}
