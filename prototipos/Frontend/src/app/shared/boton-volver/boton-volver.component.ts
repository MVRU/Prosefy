import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-boton-volver',
  templateUrl: './boton-volver.component.html',
  styleUrls: ['./boton-volver.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class BotonVolverComponent {
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.listen('window', 'popstate', () => {
    });
  }

  goBack() {
    window.history.back();
  }
}
