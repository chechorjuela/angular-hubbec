import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from "../../services/token/token.service";
import {AuthService} from "../../services/auth/auth.service";
import {NgToastService} from "ng-angular-popup";

@Injectable({
  providedIn: 'root'
})
export class ComplateProfileGuard implements CanActivate {
  constructor(
    private toast: NgToastService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userComplete = JSON.parse(this.tokenService.getToken('user')!)
    if (userComplete.profile_image === undefined) {
      this.toast.warning({detail:"Completa tu perfil actualizando tus datos..."})
      this.router.navigate(['/user/profile']);
      return false;
    }
    return true;
  }

}
