import { Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivateFn {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        const token = localStorage.getItem("token");
        if (!token) {
            this.router.navigate(["/login"]);
            return false;
        }
        return true;
    }
}