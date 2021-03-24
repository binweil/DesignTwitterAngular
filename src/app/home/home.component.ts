import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClientService } from '../HttpComponents/http-client.service';
import { Auth } from 'aws-amplify';
import { UserInfo } from '../Model/UserInfo';
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
    private httpClientService: HttpClientService) {
  }

  user: UserInfo = {
    username: '',
    email: '',
    age: '',
    favoritePet: '',
    wishList: ['']
  };

  wishList: [];

  isSpinnerVisible = true;

  async ngOnInit(): Promise<void> {
    if (!await Util.isUserLoggedIn()) {
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
      this.httpClientService.POST(Util.API_URL, JSON.stringify(param))
        .subscribe((res) => {
          const responseBody = JSON.parse(res.body);
          if (responseBody.Item.hasOwnProperty('age')) {
            this.user.age = responseBody.Item.age;
          }
          if (responseBody.Item.hasOwnProperty('favoritePet')) {
            this.user.favoritePet = responseBody.Item.favoritePet;
          }
          if (responseBody.Item.hasOwnProperty('wishlist')) {
            this.user.wishList = JSON.parse(responseBody.Item.wishlist);
            console.log(this.user.wishList);
          }
          this.isSpinnerVisible = false;
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
    this.isSpinnerVisible = true;
    const param: DynamodbUpdateRequest = {
      operation: Util.DYNAMODB_LAMBDA_REQUEST_TYPE_UPDATE,
      payload: {
        TableName: Util.MINI_TWITTER_TABLE_NAME,
        Key: {
          username: this.user.username
        },
        UpdateExpression: 'set favoritePet=:f, age=:g, wishlist=:e',
        ExpressionAttributeValues: {
          ':f': this.user.favoritePet,
          ':g': this.user.age,
          ':e': JSON.stringify(this.user.wishList),
        },
        ReturnValues: 'UPDATED_NEW'
      }
    };
    this.httpClientService.POST(Util.API_URL, JSON.stringify(param))
      .subscribe((res) => {
        window.location.reload();
        this.isSpinnerVisible = false;
      });
  }

  onChangeWishList(index, event): void {
    this.user.wishList[index] = event.target.value;
  }

  addWish(): void {
    this.user.wishList.push('');
  }

}
