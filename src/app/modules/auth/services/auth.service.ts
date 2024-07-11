import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginForm } from '../models/login';
import { AuthResponse } from '../models/authResponse';
import { Observable, tap } from 'rxjs';
import { RegisterForm } from '../models/register';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private url = environment.baseUrl + '/auth';

  login(loginForm: LoginForm): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.url}/login`, loginForm)
      .pipe(
        tap((response) => {
          localStorage.setItem('user', JSON.stringify(response));
        })
      );
  }

  register(registerForm: RegisterForm): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.url}/register`, registerForm)
      .pipe(
        tap((response) => {
          localStorage.setItem('user', JSON.stringify(response));
        })
      );
  }

  getToken(): string | null {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: AuthResponse = JSON.parse(storedUser);
      return user.token;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }
}
