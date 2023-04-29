import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from "../../services/token/token.service";
import {AuthService, IAuthService} from "../../services/auth/auth.service";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.getToken();
    if (token) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
/*    return this.authService.user$
      .pipe(
        map(user => {
          console.info(user)

          if (!user) {

          }
          return true;
        })
      );*/
  }

}
