import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {


// Hardcoded date
  @Input() eventDate: Date;
  @Output() countDownFinished: EventEmitter<boolean>;
  private diff: number;
  private countDownResult: number;
  interval: any;
  isLoading: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor() {
    this.countDownFinished = new EventEmitter<boolean>();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngOnInit() {
    this.isLoading = true;
    this.interval = interval(1000).pipe(map((x) => {
      this.diff = Math.floor((this.eventDate.getTime() - new Date().getTime()) / 1000);
      if (this.diff < 0) {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.countDownFinished.emit(true);
      }
    })).subscribe((x) => {
      this.days = this.getDays(this.diff);
      this.hours = this.getHours(this.diff);
      this.minutes = this.getMinutes(this.diff);
      this.seconds = this.getSeconds(this.diff);
      this.isLoading = false;
    });
  }

  getDays(t) {
    let days;
    days = Math.floor(t / 86400);

    return days;
  }

  getHours(t) {
    let days, hours;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;

    return hours;
  }

  getMinutes(t) {
    let days, hours, minutes;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;

    return minutes;
  }

  getSeconds(t) {
    let days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return seconds;
  }

}
