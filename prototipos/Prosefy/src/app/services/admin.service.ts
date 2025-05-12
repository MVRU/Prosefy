import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    const rol = this.authService.getCurrentRole();
    if (rol === 'admin') return true;

    this.router.navigate(['/inicio']);
    return false;
  }
}