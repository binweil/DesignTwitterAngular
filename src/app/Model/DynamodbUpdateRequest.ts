// Example Usage
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.03
// Dynamodb Client API Documentation
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
export interface DynamodbUpdateRequest {
  operation: string;
  payload: {
    TableName: string;
    Key: {
      username: string;
    },
    UpdateExpression: string;
    ExpressionAttributeValues: object;
    ReturnValues: 'UPDATED_NEW';
  };
}
