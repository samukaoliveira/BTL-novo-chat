import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/login`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, senha: string) {
    return this.http.post<any>(`${this.apiUrl}/login`,
      {
        email,
        senha
      });
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('emailUsuario');
  }

  logado(): boolean{
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
