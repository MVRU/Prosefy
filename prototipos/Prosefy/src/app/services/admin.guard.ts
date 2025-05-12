import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.authService.currentRole$.pipe(
            take(1),
            map(rol => {
                if (rol === 'admin') {
                    return true;
                }
                this.router.navigate(['/inicio']);
                return false;
            })
        );
    }
}