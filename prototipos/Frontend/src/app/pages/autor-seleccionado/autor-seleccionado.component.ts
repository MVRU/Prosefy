import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BotonVolverComponent } from 'src/app/shared/boton-volver/boton-volver.component';
import { InfoAutorComponent } from 'src/app/sections/info-autor/info-autor.component';
import { LibrosAutorComponent } from 'src/app/sections/libros-autor/libros-autor.component';

@Component({
  selector: 'app-autor-seleccionado',
  templateUrl: './autor-seleccionado.component.html',
  styleUrls: ['./autor-seleccionado.component.css'],
  imports: [CommonModule, RouterModule, BotonVolverComponent, InfoAutorComponent, LibrosAutorComponent],
  standalone: true,
})
export class AutorSeleccionadoComponent {

}
