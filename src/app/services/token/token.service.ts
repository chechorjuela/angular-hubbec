import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  saveUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }
  getToken(keyStorage: string) {
    const token = localStorage.getItem(keyStorage);
    return token;
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
