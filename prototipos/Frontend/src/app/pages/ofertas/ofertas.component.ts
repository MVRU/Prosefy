import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OfertasDestacadasComponent } from 'src/app/sections/ofertas-destacadas/ofertas-destacadas.component';
import { TodasLasOfertasComponent } from 'src/app/sections/todas-las-ofertas/todas-las-ofertas.component';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
  imports: [CommonModule, RouterModule, OfertasDestacadasComponent, TodasLasOfertasComponent],
  standalone: true,
})
export class OfertasComponent {

}
