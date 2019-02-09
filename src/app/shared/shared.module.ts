import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValidationService} from './services/validation.service';
import {AuthenticationService} from './services/authentication.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ValidationService,
    AuthenticationService,
  ]
})
export class SharedModule { }
