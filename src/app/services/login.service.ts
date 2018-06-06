import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {
  constructor(public fire: AngularFireAuth) {}

  login(user: string, password: string): Observable<any> {
    return Observable.fromPromise(this.fire.auth.signInAndRetrieveDataWithEmailAndPassword(user, password));
  }

  logout(): Observable<any> {
    return Observable.fromPromise(this.fire.auth.signOut());
  }

  isLoggedIn(): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.fire.authState.subscribe(user => {
        observer.next(!!user);
      });
    });
  }
}
