import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  username: '';
  confirmationCode: '';
  newPassword: '';
  isConfirmationCodeSent = false;
  alertMessage = '';
  isAlertMessageVisible = false;

  @Output() alertBannerEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    try {
      if (this.isConfirmationCodeSent) {
        await Auth.forgotPasswordSubmit(this.username, this.confirmationCode, this.newPassword);
        window.location.href = '/login';
      } else {
        await Auth.forgotPassword(this.username);
        this.isConfirmationCodeSent = true;
      }
    } catch (error) {
      console.log(error.log);
      this.isAlertMessageVisible = true;
      this.alertMessage = 'Error in resetting password - ' + error.log;
    }
  }

  dismissClicked(): void {
    this.alertMessage = '';
    this.isAlertMessageVisible = false;
  }

}
