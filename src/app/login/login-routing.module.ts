import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from '../shared/services/authGuard';
import {NewLotteryComponent} from './new-lottery/new-lottery.component';
import {EditLotteryComponent} from './edit-lottery/edit-lottery.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-lottery',
    component: NewLotteryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-lottery/:id',
    component: EditLotteryComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
