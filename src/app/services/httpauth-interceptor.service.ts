import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

@Injectable()
export class HttpauthInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  private static readonly whitelist = [LoginService.REFRESH_URL, LoginService.LOGIN_URL];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let whitelisted = HttpauthInterceptorService.whitelist.some(u => request.urlWithParams.indexOf(u) != -1);

    let loginInfo: any = this.loginService.loginInformation;

    if (loginInfo && !whitelisted) {
      let paramsadd = request.params;
      paramsadd.append('auth', loginInfo.idToken);
      request = request.clone({
        setParams: {
          auth: loginInfo.idToken
        }
        // setHeaders: {
        //   Authorization: `Bearer ${loginInfo.idToken}`
        // }
      });
    }

    return next.handle(request);
  }
}
