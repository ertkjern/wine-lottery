import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { LotteryComponent } from './lottery/lottery.component';
import {SharedModule} from '../shared/shared.module';
import { WaitingToStartComponent } from './waiting-to-start/waiting-to-start.component';
import { DrawComponent } from './draw/draw.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HomeComponent,
    LotteryComponent,
    WaitingToStartComponent,
    DrawComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
