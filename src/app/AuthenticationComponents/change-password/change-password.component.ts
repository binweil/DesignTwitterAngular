import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { UserInfo } from '../../Model/UserInfo';
import Util from '../../utility/util';
import {UserCredential} from '../../Model/UserCredential';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: UserCredential = {
    username: '',
    oldPassword: '',
    password: ''
  };
  alertMessage = '';
  isAlertMessageVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  async changePassword(): Promise<void> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, this.user.oldPassword, this.user.password);
      window.location.href = '/';
    } catch (error) {
      this.alertMessage = JSON.stringify(error);
      this.isAlertMessageVisible = true;
      console.log('Error in changing password: ', error);
    }
  }

  cancel(): void {
    window.location.href = '/home';
  }

  onChangeDismissAlert(): void {
    this.alertMessage = '';
    this.isAlertMessageVisible = false;
  }
}
