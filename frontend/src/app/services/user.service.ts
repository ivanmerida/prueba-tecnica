import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = 'http://localhost:3000/api/user/';
  constructor(private http: HttpClient) {
  }

  login(data: {}): Observable<any> {
    return this.http.post<any>(this.api + 'login', data);
  }

  register(data: {}): Observable<any> {
    return this.http.post<any>(this.api + 'register', data);
  }

  // Guardar datos del usuario en LocalStorage
  setUserData(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtener datos del usuario de LocalStorage
  getUserData(): any {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  // Eliminar datos del usuario (por ejemplo, al cerrar sesión)
  clearUserData(): void {
    localStorage.removeItem('user');
  }

}
