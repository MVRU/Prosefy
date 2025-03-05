import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FiltrarResultadosComponent } from 'src/app/sections/filtrar-resultados/filtrar-resultados.component';
import { ResultadosComponent } from 'src/app/sections/resultados/resultados.component';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  imports: [CommonModule, RouterModule, FiltrarResultadosComponent, ResultadosComponent],
  standalone: true,
})
export class BusquedaComponent {

}
