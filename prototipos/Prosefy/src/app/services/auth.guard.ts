import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    async canActivate(): Promise<boolean> {
        try {
            const auth = await firstValueFrom(this.authService.isAuthenticated$);
            return auth;
        } catch (error) {
            this.router.navigate(['/login']);
            return false;
        }
    }
}