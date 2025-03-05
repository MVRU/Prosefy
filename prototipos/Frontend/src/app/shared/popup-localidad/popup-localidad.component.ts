import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-popup-localidad',
  templateUrl: './popup-localidad.component.html',
  styleUrls: ['./popup-localidad.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  standalone: true,
})
export class PopupLocalidadComponent {
  direcciones: string[] = [
    'Buenos Aires 1345 dpto 2',
    'Wagner 2300 dpto 1',
    'Av. Beethoven 1211',
  ];

  @Input() isPopupOpen: boolean = false;
  selectedDireccion: string = '';
  enOtraUbicacion: boolean = false;
  @Output() closed = new EventEmitter<void>();
  closePopup() {
    this.closed.emit();
  }
  toggleEnOtraUbicacion() {
    this.enOtraUbicacion = this.selectedDireccion === 'En otra ubicación';
  }
}
