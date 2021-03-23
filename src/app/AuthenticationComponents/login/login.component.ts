import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import Util from '../../utility/util';
import {UserCredential} from '../../Model/UserCredential';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  alertMessage = '';
  isAlertMessageVisible = false;
  user: UserCredential = {
    username: '',
    password: ''
  };

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    try {
      const user = await Auth.signIn(this.user.username, this.user.password);
      Util.setCookie(Util.JWT_TOKEN, user.getSignInUserSession().getAccessToken().getJwtToken());
      sessionStorage.setItem(Util.APP_SESSION_STORAGE_KEY, JSON.stringify(user));
      window.location.href = '/home';
    } catch (error) {
      this.alertMessage = JSON.stringify(error);
      this.isAlertMessageVisible = true;
      console.log('error signing in', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await Auth.signOut();
      Util.deleteCookie(Util.JWT_TOKEN);
      sessionStorage.removeItem(Util.APP_SESSION_STORAGE_KEY);
    } catch (error) {
      this.alertMessage = JSON.stringify(error);
      this.isAlertMessageVisible = true;
      console.log('error signing out: ', error);
    }
  }

  onChangeDismissAlert(): void {
    this.alertMessage = '';
    this.isAlertMessageVisible = false;
  }
}
