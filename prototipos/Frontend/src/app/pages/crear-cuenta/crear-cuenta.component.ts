import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BotonVolverComponent } from 'src/app/shared/boton-volver/boton-volver.component';
import { RegistrarseComponent } from 'src/app/sections/registrarse/registrarse.component';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
  imports: [CommonModule, RouterModule, BotonVolverComponent, RegistrarseComponent],
  standalone: true,
})
export class CrearCuentaComponent {

}
