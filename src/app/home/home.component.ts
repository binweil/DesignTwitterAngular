import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpCallServiceService} from '../http-call-service.service';
import { Auth } from 'aws-amplify';
import {UserInfo} from '../Model/UserInfo';
import Util from '../utility/util';
import { DynamodbGetRequest } from '../Model/DynamodbGetRequest';
import { DynamodbUpdateRequest } from '../Model/DynamodbUpdateRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private httpCallServiceService: HttpCallServiceService) {
  }

  user: UserInfo = {
    username: '',
    email: '',
    age: '',
    favoritePet: ''
  };

  APIUrl = '/api/mini-twitter-DynamoDB-IO';

  ngOnInit(): void {
    if (!Util.isUserLoggedIn()) {
      window.location.href = '/login';
    }
    const loggedUser = JSON.parse(Util.getUserCredentialFromSessionInString());
    this.user.username = loggedUser.username;
    this.user.email = loggedUser.attributes.email;
    try {
      const param: DynamodbGetRequest = {
        operation: Util.DYNAMODB_LAMBDA_REQUEST_TYPE_READ,
        payload: {
          TableName: Util.MINI_TWITTER_TABLE_NAME,
          Key: {
            username: this.user.username
          }
        }
      };
      this.httpCallServiceService.POST(this.APIUrl, param)
        .subscribe((res) => {
          this.user.age = res.Item.age;
          this.user.favoritePet = res.Item.favoritePet;
        });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<void> {
    await Auth.signOut();
    sessionStorage.removeItem(Util.APP_SESSION_STORAGE_KEY);
    window.location.href = '/login';
  }

  update(): void {
    const param: DynamodbUpdateRequest = {
      operation: Util.DYNAMODB_LAMBDA_REQUEST_TYPE_UPDATE,
      payload: {
        TableName: Util.MINI_TWITTER_TABLE_NAME,
        Key: {
          username: this.user.username
        },
        UpdateExpression: 'set favoritePet=:f',
        ExpressionAttributeValues: {
          ':f': this.user.favoritePet
        },
        ReturnValues: 'UPDATED_NEW'
      }
    };
    this.httpCallServiceService.POST(this.APIUrl, param)
      .subscribe((res) => {
        window.location.reload();
      });
  }

}
