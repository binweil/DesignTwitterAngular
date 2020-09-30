import {Component, Input, OnInit} from '@angular/core';
import {User} from '../Model/User';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {

  @Input()  user: User | {
    username: '',
    password: '',
    id: '',
    name: '',
    age: '',
    region: '',
  };

  constructor() { }

  ngOnInit(): void {
  }
}
