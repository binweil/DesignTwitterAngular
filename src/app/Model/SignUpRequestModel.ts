export interface SignUpRequestModel {
  username: string;
  password: string;
  attributes: {
    email: string;
    phone_number: string;
  };
}
