import { Injectable } from '@angular/core';
import { 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router
} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class UserGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isUser()) {
            return true;
        } else {
            this.router.navigate(['/home']);
        }
    }
}
