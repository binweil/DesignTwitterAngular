import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import {UserInfo} from '../Model/UserInfo';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  constructor() { }

  @Input() user: UserInfo;

  @Output() userOut: UserInfo;

  isUserInfoHidden = true;

  ngOnInit(): void {
    this.userOut = this.user;
  }

  UserInfoImgClick(): void {
    this.isUserInfoHidden = !this.isUserInfoHidden;
}

}
