import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(public loginService: LoginService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.loginService.isLoggedIn().subscribe(alreadyLoggedIn => {
        if (alreadyLoggedIn) {
          observer.next(true);
          observer.complete();
        } else {
          this.router.navigateByUrl('login');
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
