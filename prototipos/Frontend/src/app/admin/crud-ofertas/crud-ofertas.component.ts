import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BotonVolverComponent } from 'src/app/shared/boton-volver/boton-volver.component';

@Component({
  selector: 'app-crud-ofertas',
  templateUrl: './crud-ofertas.component.html',
  styleUrls: ['./crud-ofertas.component.css'],
  imports: [CommonModule, RouterModule, BotonVolverComponent],
  standalone: true,
})
export class CrudOfertasComponent {

}
