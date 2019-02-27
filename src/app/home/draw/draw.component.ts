import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DrawModel} from '../../shared/models/draw.model';
import {of, Subject, timer} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';
import {slide} from '../../shared/animations/slide.animations';
import {fadeInOut} from '../../shared/animations/fade-in-out.animation';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  animations: [fadeInOut, slide],
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {

  @Input() draw: DrawModel;
  @Input() participants: string[];
  @Output() drawFinished: EventEmitter<boolean>;
  finished: boolean;
  winner1: string;
  winner2: string;

  nameToShow: string;

  constructor() {
    this.drawFinished = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.start();
  }

  private start() {
    const killTrigger: Subject<void> = new Subject();
    const refreshInterval$ = timer(0, 1000)
      .pipe(
        takeUntil(killTrigger),
        catchError(() => of('Error'))
      );

    refreshInterval$.subscribe(() => {
      if (!this.nameToShow || this.nameToShow === 'winner2') {
        this.winner1 = this.participants[Math.floor((Math.random() * this.participants.length))];
        this.nameToShow = 'winner1';
      } else {
        this.winner2 = this.participants[Math.floor((Math.random() * this.participants.length))];
        this.nameToShow = 'winner2';
      }
    });

    setTimeout(() => {
      killTrigger.next();
      this.finished = true;
      this.winner1 = this.draw.winner;
      this.nameToShow = 'winner1';
    }, 20000);

    setTimeout(() => {
      this.drawFinished.emit(true);
    }, 30000);
  }


}
