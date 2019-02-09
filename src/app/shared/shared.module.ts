import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValidationService} from './services/validation.service';
import {AuthenticationService} from './services/authentication.service';
import {AuthGuard} from './services/authGuard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ValidationService,
    AuthenticationService,
    AuthGuard
  ]
})
export class SharedModule { }
