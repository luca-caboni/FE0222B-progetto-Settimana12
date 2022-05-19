import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthData, SignupData } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  autologoutTimer: any;


  jwtHelper = new JwtHelperService();
  URL = 'http://localhost:4201';
  private authSubject = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));



  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  restoreUser() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const user: AuthData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(user.accessToken)) {
      return;
    }
    this.authSubject.next(user);
    const expirationDate = this.jwtHelper.getTokenExpirationDate(
      user.accessToken
    ) as Date;
    this.autoLogout(expirationDate);
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.URL}/login`, data).pipe(
      tap((val) => {
        console.log(val);
      }),
      tap((data) => {
        this.authSubject.next(data);
        localStorage.setItem('user', JSON.stringify(data));
        const expirationDate = this.jwtHelper.getTokenExpirationDate(
          data.accessToken
        ) as Date;
        this.autoLogout(expirationDate);
      }),
      catchError(this.errors)
    );
  }

  signup(data: SignupData) {
    return this.http
      .post(`${this.URL}/register`, data)
      .pipe(catchError(this.errors));
  }

  logout() {
    this.authSubject.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('user');
    if (this.autologoutTimer) {
      clearTimeout(this.autologoutTimer);
    }
  }

  autoLogout(expirationDate: Date) {
    const expMs = expirationDate.getTime() - new Date().getTime();
    this.autologoutTimer = setTimeout(() => {
      this.logout();
    }, expMs);
  }

  private errors(err: any) {
    switch (err.error) {
      case 'Email and password are required':
        return throwError('email e password sono obbligatorie');
        break;
      case 'Cannot find user':
        return throwError('Utente non esiste');
        break;
      case 'Email format is invalid':
        return throwError('Email in formato non valido');
        break;
      case 'Email already exists':
        return throwError('Utente già registrato con la stessa email');
        break;
      default:
        return throwError('Errore nella chiamata al server');
        break;
    }
  }
}
