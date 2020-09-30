import { Component, OnInit } from '@angular/core';
import { User } from '../Model/User';
import { sha256 } from 'js-sha256';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpCallServiceService} from '../http-call-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private httpCallServiceService: HttpCallServiceService) { }

  user: User = {
    username: '',
    password: ''
  };

  ngOnInit(): void {
    if (document.cookie.includes('authToken')) {
      deleteCookie('authToken');
    }
  }

  async submit(): Promise<void> {
    const token = sha256(this.user.username + this.user.password);
    await this.httpCallServiceService.GET('http://localhost:8080/JSON/login/' + this.user.username + '/' + token).pipe(
      tap(response => this.processLoginSuccess(response)),
      catchError(this.processLoginError)
    ).subscribe();
  }

  processLoginSuccess(response): void {
    if (response.hasOwnProperty('authToken')) {
      setCookie('authToken', response.authToken);
    }
    window.location.href = '/home/' + this.user.username;
  }

  processLoginError(error): Observable<any> {
    console.error(error);
    deleteCookie('authToken');
    return of();
  }
}

export function setCookie(name: string, val: string): void {
  const date = new Date();
  const value = val;

  // Set it expire in 7 days
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

  // Set it
  document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; domain=localhost; path=/';
}

export function getCookie(name: string): string {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

export function deleteCookie(name: string): void {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

  // Set it
  document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
}
