import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {LotteryModel} from '../../shared/models/lottery.model';

@Component({
  selector: 'app-waiting-to-start',
  templateUrl: './waiting-to-start.component.html',
  styleUrls: ['./waiting-to-start.component.scss']
})
export class WaitingToStartComponent implements OnChanges{

  @Input() lottery: LotteryModel;
  @Input() winners: string[];
  countdownFinished: boolean;
  tickets: number;

  constructor() {
  }

  ngOnChanges() {
    this.tickets = 0;
    this.lottery.participants.forEach(participant => {
      this.tickets += participant.numberOfTickets;
    });
  }

  setCountDownFinished(event: boolean) {
    this.countdownFinished = event;
  }


}
