import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    console.log(token)
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  saveExpiration(expiration: any) {
    localStorage.setItem('expiration', JSON.stringify(expiration));
  }

  getToken(keyStorage: string) {
    const token = localStorage.getItem(keyStorage);
    return token;
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
