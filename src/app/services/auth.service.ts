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
  baseURL = 'http://localhost:4201';

  private authSubject = new BehaviorSubject<null | AuthData>(null);

  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));


  constructor(private http: HttpClient,
    private router: Router) {
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

  login(data:AuthData) {
    return this.http.post<AuthData>(`${this.baseURL}/login`, data).pipe(
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
      .post(`${this.baseURL}/users`, data)
      .pipe(catchError(this.errors));
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
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

  getUserInfo(){
    let info;
    this.user$.subscribe(user => info = user?.user);
    return info;
  }

  getUserId(){
    let loggedUser = this.getUserInfo();
    if(loggedUser != undefined){
      return loggedUser['id'];
    }
    return 0;
  }

  private errors(err: any) {
    switch (err.error) {
      case 'Can\'t find user':
        return throwError('Utente non trovato');
        break;
        case 'Email format is not valid':
        return throwError('Email in formato non valido');
        break;
      case 'Email and password are required':
        return throwError('email e password sono obbligatorie');
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
