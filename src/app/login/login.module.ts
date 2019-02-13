import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {SharedModule} from '../shared/shared.module';
import { MyLotteriesComponent } from './profile/my-lotteries/my-lotteries.component';
import { NewLotteryComponent } from './new-lottery/new-lottery.component';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditLotteryComponent } from './edit-lottery/edit-lottery.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MyLotteriesComponent,
    NewLotteryComponent,
    EditLotteryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'nb'},
  ]
})
export class LoginModule { }
