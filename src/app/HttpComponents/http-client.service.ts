import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Util from '../utility/util';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Method': '*',
    jwtToken: Util.getCookie(Util.JWT_TOKEN)
  }),
};

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient) { }

  GET(url: string): Observable<any> {
    return this.http.get(url, httpOptions);
  }

  POST(url: string, data: any): Observable<any> {
    return this.http.post(url, data, httpOptions);
  }

  PUT(url: string, data: any): Observable<any> {
    return this.http.put(url, data, httpOptions);
  }
}
