import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagarComponent } from 'src/app/sections/pagar/pagar.component';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css'],
  imports: [CommonModule, RouterModule, PagarComponent],
  standalone: true,
})
export class FinalizarCompraComponent {

}
