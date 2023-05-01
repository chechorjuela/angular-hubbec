import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HobbieRequestDto} from "../../Domain/dto/requestDto/hobbie.request.dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../helpers/enviroments/enviroment";
import {checkTime} from "../../Applications/interceptors/valid-timer.interceptor";

export abstract class IUserService {

  abstract getUserById(id: string): Observable<any>;

  abstract updateProfile(user_id: string, userRequest: any): Observable<any>;

  abstract uploadImage(user_id: string, picture: any): Observable<any>;


}

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  private apiUrl = `${environment.API_URL}/api/user`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getUserById(id: string): Observable<any> {

    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateProfile(user_id: string,userRequest: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${user_id}`, userRequest);
  }

  uploadImage(user_id: string, picture: any): Observable<any> {
    const params = {
      user_id,
      picture: [picture]
    }
    return this.http.post(`${this.apiUrl}/uploadImage`, params ,{context: checkTime()});
  }
}
