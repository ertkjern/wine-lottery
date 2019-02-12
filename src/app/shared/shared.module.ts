import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValidationService} from './services/validation.service';
import {AuthenticationService} from './services/authentication.service';
import {AuthGuard} from './services/authGuard';
import { HeaderComponent } from './components/header/header.component';
import {LotteryService} from './services/lottery.service';

@NgModule({
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
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
