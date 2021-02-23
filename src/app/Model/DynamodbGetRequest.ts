export interface DynamodbGetRequest {
  operation: string;
  payload: {
    TableName: string;
    Key: {
      username: string;
    }
  };
}
