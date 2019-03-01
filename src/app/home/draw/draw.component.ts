import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DrawModel} from '../../shared/models/draw.model';
import {of, Subject, timer} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';
import {slide} from '../../shared/animations/slide.animations';
import {fadeInOut} from '../../shared/animations/fade-in-out.animation';
import {LotteryModel} from '../../shared/models/lottery.model';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  animations: [fadeInOut, slide],
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {

  @Input() draw: DrawModel;
  @Input() lottery: LotteryModel;
  @Input() currentDrawIndex: number;
  participants: string[];
  @Output() drawFinished: EventEmitter<boolean>;
  finished: boolean;
  winner1: string;
  winner2: string;

  nameToShow: string;
  victory = new Audio();
  tick = new Audio();

  constructor() {
    this.drawFinished = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.victory.src = '../../assets/sounds/victory.mp3';
    this.victory.load();
    this.tick.src = '../../assets/sounds/tick.mp3';
    this.tick.load();

    this.participants = this.createListOfParticipantsThisRound(this.lottery);
    this.start();
  }

  private createListOfParticipantsThisRound(lottery: LotteryModel) {
    const previousWinners = [];
    let index = 0;
    lottery.draws.forEach(result => {
      if (result.winner && index < this.currentDrawIndex) {
        previousWinners.push(result.winner);
      }
      index += 1;
    });
    return this.generateParticipantList(previousWinners);
  }

  private generateParticipantList(previousWinners: any[]) {
    const drawList = [];
    this.lottery.participants.forEach(participant => {
      let numberOfTickets = participant.numberOfTickets;
      // remove a ticket if already won.
      const hasWonBeforeIndex = previousWinners.indexOf(participant.name);
      if (hasWonBeforeIndex > -1) {
        previousWinners.splice(hasWonBeforeIndex, 1);
        numberOfTickets -= 1;
      }
      for (let i = 0; i < numberOfTickets; i++) {
        drawList.push(participant.name);
      }
    });
    return drawList;
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
