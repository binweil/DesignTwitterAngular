import { Auth } from 'aws-amplify';

export default class Util {

  public static JWT_TOKEN = 'jwtToken';
  public static APP_SESSION_STORAGE_KEY = 'twitterApp';

  public static MINI_TWITTER_TABLE_NAME = 'mini-twitter-table';
  public static DYNAMODB_LAMBDA_REQUEST_TYPE_READ = 'read';
  public static DYNAMODB_LAMBDA_REQUEST_TYPE_UPDATE = 'update';
  public static DYNAMODB_LAMBDA_REQUEST_TYPE_CREATE = 'create';
  public static API_URL = 'https://z002cbm7ih.execute-api.us-west-2.amazonaws.com/Beta';

  static setCookie(name: string, val: string): void {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; domain=localhost; path=/';
  }

  static getCookie(name: string): string {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  static deleteCookie(name: string): void {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
  }

  static async isUserLoggedIn(): Promise<boolean> {
    const isSignedIn = await Auth.currentUserInfo();
    if ((isSignedIn != null) && (sessionStorage.getItem('twitterApp') != null)) {
      return true;
    }
    return false;
  }

  static getUserCredentialFromSessionInString(): string {
    return sessionStorage.getItem('twitterApp');
  }
}
