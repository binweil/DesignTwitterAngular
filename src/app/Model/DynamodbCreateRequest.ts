// Example Usage
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.03
// Dynamodb Client API Documentation
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
export interface DynamodbCreateRequest {
  operation: string;
  payload: {
    TableName: string;
    Key: {
      username: string;
      age?: string;
      favoritePet?: string;
    }
  };
}
