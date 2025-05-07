import { Component, OnInit, HostListener } from '@angular/core';
import { AutoresService, Autor } from '../../services/autores.service';

@Component({
  selector: 'app-lista-autores',
  templateUrl: './lista-autores.component.html',
  styleUrls: ['./lista-autores.component.css']
})
export class ListaAutoresComponent implements OnInit {

  elementosAlInicio = true;
  elementosAlFinal = false;

  autores: Autor[] = [];
  autoresAMostrar: Autor[] = [];

  elementoActual = 0;
  elementosPorPaso = 8;

  constructor(private autoresService: AutoresService) { }

  ngOnInit() {
    this.autoresService.obtenerTodos().subscribe((autores: Autor[]) => {
      this.autores = autores;
      this.actualizarAutoresAMostrar();
    });
    this.onResize(); // Ajuste inicial según pantalla
  }

  obtenerAutores(): void {
    this.autoresService.getAutores().subscribe((autores: Autor[]) => {
      this.autores = autores;
      this.actualizarAutoresAMostrar();
    });
  }

  moverIzquierda(): void {
    if (this.elementoActual > 0) {
      this.elementoActual -= this.elementosPorPaso;
      this.actualizarAutoresAMostrar();
    }
    this.elementosAlFinal = false;
    this.elementosAlInicio = this.elementoActual === 0;
  }

  moverDerecha(): void {
    if (this.elementoActual < this.autores.length - this.elementosPorPaso) {
      this.elementoActual += this.elementosPorPaso;
      this.actualizarAutoresAMostrar();
    }
    this.elementosAlInicio = false;
    this.elementosAlFinal = this.elementoActual + this.elementosPorPaso >= this.autores.length;
  }

  actualizarAutoresAMostrar(): void {
    const fin = Math.min(this.elementoActual + this.elementosPorPaso, this.autores.length);
    this.autoresAMostrar = this.autores.slice(this.elementoActual, fin);
  }

  @HostListener('window:resize')
  onResize(): void {
    const width = window.innerWidth;
    if (width < 550) {
      this.elementosPorPaso = 2;
    } else if (width < 768) {
      this.elementosPorPaso = 4;
    } else if (width < 1000) {
      this.elementosPorPaso = 6;
    } else {
      this.elementosPorPaso = 8;
    }
    this.actualizarAutoresAMostrar();
  }

  formatNombreCompleto(nombre_completo: string): string {
    const partes = nombre_completo.split(' ');
    if (partes.length > 1) {
      return `${partes[0]}<br>${partes.slice(1).join(' ')}`;
    }
    return nombre_completo;
  }
}
