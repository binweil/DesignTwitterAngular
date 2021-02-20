import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import {User} from '../../Model/User';
import {HttpClient} from '@angular/common/http';
import {SignUpRequestModel} from '../../Model/SignUpRequestModel';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor() { }

  alertMessage = '';
  isAlertMessageVisible = false;
  showConfirmationCodeModel = false;
  confirmationCode = '';

  signUpRequest: SignUpRequestModel = {
    username: '',
    password: '',
    attributes: {
      email: '',
      phone_number: ''
    }
  };

  ngOnInit(): void {
  }

  async signUp(): Promise<void> {
    try {
      const { user } = await Auth.signUp(this.signUpRequest);
      this.showConfirmationCodeModel = true;
    } catch (error) {
      this.alertMessage = error.log;
      this.isAlertMessageVisible = true;
      console.log('error signing up:', error);
    }
  }

  onChangeDismissAlert(): void {
    this.alertMessage = '';
    this.isAlertMessageVisible = false;
  }

  async confirm(): Promise<void> {
    try {
      await Auth.confirmSignUp(this.signUpRequest.username, this.confirmationCode);
      window.location.href = '/';
    } catch (error) {
      this.alertMessage = 'Error in signing up';
      this.isAlertMessageVisible = true;
      console.log('error signing up:', error);
    }
  }

  async cancel(): Promise<void> {
    window.location.href = '/';
  }
}
