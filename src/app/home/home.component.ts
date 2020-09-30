import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {HttpCallServiceService} from '../http-call-service.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../Model/User';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private httpCallServiceService: HttpCallServiceService,
    private route: ActivatedRoute) { }

  user: User = {
    id: '',
    username: '',
    name: '',
    age: '',
    region: ''
  };

  ngOnInit(): void {
    const url = 'http://localhost:8080/JSON/get-user-info/' + this.route.snapshot.paramMap.get('username');
    this.httpCallServiceService.GET(url).pipe(
      map(response => {
        this.user.username = response.username;
        this.user.id = response.id;
        this.user.name = response.name;
        this.user.age = response.age;
        this.user.region = response.region;
      }),
      catchError(this.processError)
    ).subscribe();
  }

  processError(error): Observable<any> {
    console.error(error);
    return of();
  }

}
