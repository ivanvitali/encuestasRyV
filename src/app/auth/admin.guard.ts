import { Injectable } from '@angular/core';
import { 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router
} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAdmin()) {
            return true;
        } else {
            this.router.navigate(['/home']);
        }
    }
}