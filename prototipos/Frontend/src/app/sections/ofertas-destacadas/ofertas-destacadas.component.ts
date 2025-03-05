import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ofertas-destacadas',
  templateUrl: './ofertas-destacadas.component.html',
  styleUrls: ['./ofertas-destacadas.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class OfertasDestacadasComponent { }
