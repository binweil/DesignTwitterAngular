import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import Amplify, { Auth } from 'aws-amplify';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './AuthenticationComponents/login/login.component';
import { HttpCallServiceService } from './http-call-service.service';

// Material Library
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserInfoComponent } from './user-info/user-info.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './AuthenticationComponents/signup/signup.component';
import {AmplifyUIAngularModule} from '@aws-amplify/ui-angular';
import { ChangePasswordComponent } from './AuthenticationComponents/change-password/change-password.component';
import { ForgetPasswordComponent } from './AuthenticationComponents/forget-password/forget-password.component';
import { AlertBannerComponent } from './utility/alert-banner/alert-banner.component';

Amplify.configure({
  Auth: {

    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'us-west-2_3vzP55EYn',

    // REQUIRED - Amazon Cognito Region
    region: 'us-west-2',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'us-west-2',

    // OPTIONAL - Amazon Cognito UserInfo Pool ID
    userPoolId: 'us-west-2_3vzP55EYn',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '55atftvpvfdcrngu22i5b727pf',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //   domain: '.yourdomain.com',
    //   // OPTIONAL - Cookie path
    //   path: '/',
    //   // OPTIONAL - Cookie expiration in days
    //   expires: 365,
    //   // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    //   sameSite: 'strict', // 'lax'
    //   // OPTIONAL - Cookie secure flag
    //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //   secure: true
    // },

    // OPTIONAL - customized storage object
    // storage: MyStorage,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH',

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },

    // OPTIONAL - Hosted UI configuration
    // oauth: {
    //   domain: 'your_cognito_domain',
    //   scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    //   redirectSignIn: 'http://localhost:3000/',
    //   redirectSignOut: 'http://localhost:3000/',
    //   responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    // }
  }
});

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserInfoComponent,
    SidePanelComponent,
    HomeComponent,
    SignupComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,
    AlertBannerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AmplifyUIAngularModule,
    FormsModule,
  ],
  providers: [HttpCallServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
