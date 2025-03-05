import { Component, OnInit } from '@angular/core';
import { nombreSitio } from './shared/constants';
import { IniciarSesionService } from './services/iniciar-sesion.service';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule, HeaderAdminComponent, HeaderComponent, NavbarComponent, FooterComponent],
  standalone: true,
})
export class AppComponent implements OnInit {
  nombreSitio: string;
  isPanelAdmin: boolean = false;

  constructor(private iniciarSesionService: IniciarSesionService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.nombreSitio = nombreSitio;
  }

  ngOnInit() {
    this.iniciarSesionService.checkToken();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isPanelAdmin = this.isPanelAdminRoute();
    });
  }

  // Verifica si la ruta actual contiene 'panel-admin'
  isPanelAdminRoute(): boolean {
    return this.router.url.includes('panel-admin');
  }
}