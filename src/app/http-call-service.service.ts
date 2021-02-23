import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCallServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  GET(url: string): Observable<any> {
    return this.http.get(url, this.httpOptions);
  }

  POST(url: string, data: any): Observable<any> {
    return this.http.post(url, data, this.httpOptions);
  }

  PUT(url: string, data: any): Observable<any> {
    return this.http.put(url, data, this.httpOptions);
  }
}
