export interface DynamodbGetRequest {
  username?: string;
  operation: string;
  payload: {
    TableName: string;
    Key: {
      username: string;
    }
  };
}
