import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import {User} from '../Model/User';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  constructor() { }

  @Input() user: User;

  @Output() userOut: User;

  isUserInfoHidden = true;

  ngOnInit(): void {
    this.userOut = this.user;
  }

  UserInfoImgClick(): void {
    this.isUserInfoHidden = !this.isUserInfoHidden;
}

}
