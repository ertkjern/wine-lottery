import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValidationService} from './services/validation.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ValidationService
  ]
})
export class SharedModule { }
