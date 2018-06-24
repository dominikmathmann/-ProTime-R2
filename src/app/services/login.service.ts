import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/observable/interval';

@Injectable()
export class LoginService {
  private static readonly STORAGE_KEY = 'PROTIMER2-LOGIN';
  public static readonly LOGIN_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?';
  public static readonly REFRESH_URL = 'https://securetoken.googleapis.com/v1/token?';

  public loginInformation: any;

  public init(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.loginInformation) {
        resolve(this.loginInformation);
      } else {
        const storedLogin = localStorage.getItem(LoginService.STORAGE_KEY);
        if (storedLogin) {
          this.loginInformation = JSON.parse(storedLogin);
          this.refresh().subscribe(
            r => {
              resolve(this.loginInformation);
            },
            error => {
              this.loginInformation = null;
              resolve(null);
            }
          );
        } else {
          this.loginInformation = null;
          resolve(null);
        }
      }
    });
  }

  constructor(private http: HttpClient) {
    Observable.interval(300 * 1000).subscribe(i => {
      this.refresh().subscribe(r => {});
    });
  }

  login(user: string, password: string): Observable<any> {
    return this.http
      .post(`${LoginService.LOGIN_URL}key=${environment.apikey}`, {
        email: user,
        password: password,
        returnSecureToken: true
      })
      .do(
        (r: any) => {
          this.loginInformation = r;
          this.storeLoginInformation();
        },
        (error: any) => {
          this.logout();
        }
      );
  }

  refresh(): Observable<any> {
    const body = new HttpParams()
      .set('refresh_token', this.loginInformation.refreshToken)
      .set('grant_type', 'refresh_token');

    return this.http
      .post(`${LoginService.REFRESH_URL}key=${environment.apikey}`, body.toString(), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .do((r: any) => {
        this.loginInformation.idToken = r.access_token;
        this.loginInformation.refreshToken = r.refreshToken;
        this.loginInformation.expiresIn = r.expiresIn;
        this.storeLoginInformation();
      });
  }

  logout(): any {
    this.loginInformation = null;
    localStorage.removeItem(LoginService.STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.loginInformation;
  }

  private storeLoginInformation() {
    localStorage.setItem(LoginService.STORAGE_KEY, JSON.stringify(this.loginInformation));
  }
}
