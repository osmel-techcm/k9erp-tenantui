import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router, private config: ConfigService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.config.serverIsAlive()) {
      this._router.navigate(['/notfound'])
      return
    }

    if (this._authService.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/login'])
      return false;
    }

  }
  
}
