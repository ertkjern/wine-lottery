import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { LotteryComponent } from './lottery/lottery.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    LotteryComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
