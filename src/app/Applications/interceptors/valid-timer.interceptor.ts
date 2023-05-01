import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpContextToken, HttpContext, HttpClient
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from "../../services/token/token.service";
import * as moment from 'moment';
import {Router} from "@angular/router";
import {environment} from "../../../helpers/enviroments/enviroment";

const CHECK_TIME = new HttpContextToken<boolean>(() => false);

export function checkTime() {
  return new HttpContext().set(CHECK_TIME, true)
}

@Injectable()
export class ValidTimerInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.context.get(CHECK_TIME)) {
      const start = performance.now();
      const dateNow = moment(Date.now());
      const dateExpiration = moment(this.tokenService.getToken('expiration')?.replaceAll('"', ''));
      const diffMinutes = dateExpiration.diff(dateNow, 'minutes');
      if (diffMinutes < 0) {
        this.tokenService.removeToken();
        this.router.navigate(["/"])
      }
      if (diffMinutes < 1) {
        this.http.post(`${environment.API_URL}/api/auth/refresh`, {}).subscribe((response: any) => {
          this.tokenService.saveToken(response.data.token.token);
          const dateExpiration = moment(Date.now());
          this.tokenService.saveExpiration(dateExpiration.add(response.data.token.expiresIn / 60,'minutes'));
        }, error => {
          this.tokenService.removeToken();
          this.router.navigate(["/"])
        })
      }

    }
    return next.handle(request);
  }
}
