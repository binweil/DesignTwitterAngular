import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { User } from '../../Model/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpCallServiceService } from '../../http-call-service.service';
import Util from '../../utility/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private httpCallServiceService: HttpCallServiceService) { }

  alertMessage = '';
  isAlertMessageVisible = false;
  user: User = {
    username: '',
    password: ''
  };

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    try {
      const user = await Auth.signIn(this.user.username, this.user.password);
      console.log(user);
      Util.setCookie(Util.JWT_TOKEN, user.getSignInUserSession().getAccessToken().getJwtToken());
      sessionStorage.setItem(Util.APP_SESSION_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      this.alertMessage = error.log || error.message;
      this.isAlertMessageVisible = true;
      console.log('error signing in', error);
    }
    // this.httpCallServiceService.POST('http://localhost:8080/JSON/login-cognito-user', param).pipe(
    //   tap(response => this.processLoginSuccess(response)),
    //   catchError(this.processLoginError)
    // ).subscribe();
  }

  async logout(): Promise<void> {
    try {
      await Auth.signOut();
      Util.deleteCookie(Util.JWT_TOKEN);
      sessionStorage.removeItem(Util.APP_SESSION_STORAGE_KEY);
    } catch (error) {
      this.alertMessage = error.log || error.message;
      this.isAlertMessageVisible = true;
      console.log('error signing out: ', error);
    }
  }

  onChangeDismissAlert(): void {
    this.alertMessage = '';
    this.isAlertMessageVisible = false;
  }
}
