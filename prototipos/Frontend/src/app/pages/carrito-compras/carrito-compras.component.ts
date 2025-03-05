import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BotonVolverComponent } from 'src/app/shared/boton-volver/boton-volver.component';
import { ProductosCarritoComprasComponent } from 'src/app/sections/productos-carrito-compras/productos-carrito-compras.component';
import { LibrosRecomendadosComponent } from 'src/app/sections/libros-recomendados/libros-recomendados.component';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css'],
  imports: [CommonModule, RouterModule, BotonVolverComponent, ProductosCarritoComprasComponent, LibrosRecomendadosComponent],
  standalone: true,
})
export class CarritoComprasComponent {

}
