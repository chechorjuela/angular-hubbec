import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "../token/token.service";
import {environment} from "../../../helpers/enviroments/enviroment";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthResponseDto} from "../../Domain/dto/responseDto/AuthResponse.dto";
import {HobbieRequestDto} from "../../Domain/dto/requestDto/hobbie.request.dto";
import {checkTime} from "../../Applications/interceptors/valid-timer.interceptor";

export abstract class IHobbieService {
  abstract getAll(): Observable<any>;

  abstract getHobbieByUser(userId: string): Observable<any>;

  abstract createHobbie(hobbieRequest: HobbieRequestDto): Observable<any>;

  abstract updateHobbie(id: string, hobbieRequest: HobbieRequestDto): Observable<any>;

  abstract deleteHobbie(id: string): Observable<any>;

}

@Injectable({
  providedIn: 'root'
})
export class HobbieService implements IHobbieService {

  private apiUrl = `${environment.API_URL}/api/hobbie`;
  private user = new BehaviorSubject<any | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  createHobbie(hobbieRequest: HobbieRequestDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, hobbieRequest);
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, {context: checkTime()});
  }

  getHobbieByUser = (userId: string): Observable<any> => this.http.get(`${this.apiUrl}/${userId}`, {context: checkTime()});

  updateHobbie(id: string, hobbieRequest: HobbieRequestDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, hobbieRequest
    );
  }

  deleteHobbie(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
