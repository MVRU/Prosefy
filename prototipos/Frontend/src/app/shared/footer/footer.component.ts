import { Component } from '@angular/core';
import { nombreSitio } from '../constants';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class FooterComponent {
  nombreSitio = nombreSitio;
  currentYear: number = new Date().getFullYear();
}
