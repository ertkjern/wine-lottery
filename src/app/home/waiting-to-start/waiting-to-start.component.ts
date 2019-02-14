import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {LotteryModel} from '../../shared/models/lottery.model';

@Component({
  selector: 'app-waiting-to-start',
  templateUrl: './waiting-to-start.component.html',
  styleUrls: ['./waiting-to-start.component.scss']
})
export class WaitingToStartComponent {

  @Input() lottery: LotteryModel;
  countdownFinished: boolean;

  constructor() {
  }

  setCountDownFinished(event: boolean) {
    this.countdownFinished = event;
  }


}
