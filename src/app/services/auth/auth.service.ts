import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "../token/token.service";
import {switchMap, tap} from 'rxjs/operators';
import {environment} from "../../../helpers/enviroments/enviroment";
import {Auth} from "../../Domain/dto/auth";
import {User} from "../../Domain/dto/user.model";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginRequestDto} from "../../Domain/dto/requestDto/login.request.dto";
import {SignUpRequestDto} from "../../Domain/dto/requestDto/signUp.request.dto";
import {AuthResponseDto} from "../../Domain/dto/responseDto/AuthResponse.dto";
import * as moment from 'moment';

export abstract class IAuthService {
  abstract signUp(request: SignUpRequestDto): Observable<any>;

  abstract signIn(request: any): Observable<AuthResponseDto>;

  abstract getProfile(request: any): Observable<any>;

  abstract logout(): void;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;
  private apiUrlUser = `${environment.API_URL}/api/user`;
  private user = new BehaviorSubject<any | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  signUp(request: SignUpRequestDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, request)
      .pipe(
        tap(response => this.tokenService.saveToken(response.access_token)),
      );
  }

  signIn(credentials: LoginRequestDto) {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/signin`, credentials)
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.token.token);
          const dateExpiration = moment(Date.now());
          this.tokenService.saveExpiration(dateExpiration.add(response.token.expiresIn / 60,'minutes'))
          this.http.get<any>(`${this.apiUrlUser}/${response.id}`).subscribe(result => {
            this.tokenService.saveUser(result.data);
          })

          this.user.next(response)
        }),
      );
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
      .pipe(
        tap(user => this.user.next(user))
      );
  }

  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe(result => {
      this.tokenService.removeToken();
      this.user.next(null);
    });
  }

}
