import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './AuthenticationComponents/login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './AuthenticationComponents/signup/signup.component';
import { ChangePasswordComponent } from './AuthenticationComponents/change-password/change-password.component';
import {ForgetPasswordComponent} from './AuthenticationComponents/forget-password/forget-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
