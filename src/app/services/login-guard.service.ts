import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(public loginService: LoginService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let loggedIn = this.loginService.isLoggedIn();
    if (!loggedIn) {
      this.router.navigateByUrl('login');
    } else {
      return true;
    }
  }
}
