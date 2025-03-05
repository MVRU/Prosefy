import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BotonVolverComponent } from 'src/app/shared/boton-volver/boton-volver.component';
import { IniciarSesionComponent } from 'src/app/sections/iniciar-sesion/iniciar-sesion.component';

@Component({
  selector: 'app-identificarse',
  templateUrl: './identificarse.component.html',
  styleUrls: ['./identificarse.component.css'],
  imports: [CommonModule, RouterModule, BotonVolverComponent, IniciarSesionComponent],
  standalone: true,
})
export class IdentificarseComponent { }
