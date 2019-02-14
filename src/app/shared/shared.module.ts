import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValidationService} from './services/validation.service';
import {AuthenticationService} from './services/authentication.service';
import {AuthGuard} from './services/authGuard';
import { HeaderComponent } from './components/header/header.component';
import {LotteryService} from './services/lottery.service';
import { CountDownComponent } from './components/count-down/count-down.component';

@NgModule({
  exports: [HeaderComponent, CountDownComponent],
  declarations: [HeaderComponent, CountDownComponent],
  imports: [
    CommonModule
  ],
  providers: [
    ValidationService,
    AuthenticationService,
    LotteryService,
    AuthGuard
  ]
})
export class SharedModule { }
