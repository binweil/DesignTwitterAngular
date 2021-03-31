import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientService } from '../HttpComponents/http-client.service';
import { DynamodbGetRequest } from '../Model/DynamodbGetRequest';
import Util from '../utility/util';

@Component({
  selector: 'app-shared-list',
  templateUrl: './shared-list.component.html',
  styleUrls: ['./shared-list.component.css']
})
export class SharedListComponent implements OnInit {

  alertMessage = '';
  isAlertMessageVisible = false;

  constructor(private route: ActivatedRoute,
              private httpClientService: HttpClientService) { }

  sharedList = [];

  async ngOnInit(): Promise<void> {
    const usernameA = this.route.snapshot.paramMap.get('userA');
    const usernameB = this.route.snapshot.paramMap.get('userB');
    const users = [usernameA, usernameB];
    try {
      for (const user of users) {
        const param: DynamodbGetRequest = {
          operation: Util.DYNAMODB_LAMBDA_REQUEST_TYPE_READ,
          payload: {
            TableName: Util.MINI_TWITTER_TABLE_NAME,
            Key: {
              username: user
            }
          }
        };
        await this.httpClientService.POST(Util.API_URL, JSON.stringify(param))
          .subscribe((res) => {
            const responseBody = JSON.parse(res.body);
            if (res.body.Item == null) {
              return;
            }
            if (responseBody.Item.hasOwnProperty('wishlist')) {
              this.sharedList = this.sharedList.concat(JSON.parse(responseBody.Item.wishlist));
            }
          });
      }
    } catch (error) {
      console.log(error);
      this.alertMessage = error;
    }
  }

  onchange(index, event): void {
    this.sharedList[index] = event.target.value;
    console.log(this.sharedList);
  }

  onChangeDismissAlert(): void {
    this.alertMessage = '';
    this.isAlertMessageVisible = false;
  }
}
