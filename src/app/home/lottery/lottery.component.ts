import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LotteryModel} from '../../shared/models/lottery.model';
import {LotteryService} from '../../shared/services/lottery.service';
import {DrawModel} from '../../shared/models/draw.model';
import {fadeInOut} from '../../shared/animations/fade-in-out.animation';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  animations: [fadeInOut],
  styleUrls: ['./lottery.component.scss']
})
export class LotteryComponent implements OnInit {

  lotteryId: string;
  lottery: LotteryModel;
  numberOfDraws: number;
  currentDraw: DrawModel;
  currentDrawIndex: number;
  hasStarted: boolean;
  winners: string[];

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private lotteryService: LotteryService
  ) {
    this.numberOfDraws = 0;
    this.currentDrawIndex = 0;
    this.winners = [];
  }

  ngOnInit() {
    this.lotteryId = this.ar.snapshot.paramMap.get('id');
    this.getLottery(this.lotteryId);
  }

  drawFinished() {
    this.hasStarted = false;
    this.winners.push(this.currentDraw.winner);
    this.currentDrawIndex += 1;

    // wait a bit before starting a new draw;
    setTimeout(() => {
      this.checkForDraw();
    }, 5000);
  }

  private getLottery(lotteryId: string) {
    this.lotteryService.getLottery(lotteryId).subscribe(lottery => {
      this.lottery = lottery;
      this.numberOfDraws = this.lottery.draws.length;
      this.checkForDraw();

      if (!this.lottery) {
        this.router.navigate(['home', 'errorId']);
      }
    }, () => {
      console.error('something went wrong grabbing lottery by id');
    });
  }

  private checkForDraw() {
    if (!this.hasStarted) {
      this.currentDraw = this.lottery.draws[this.currentDrawIndex];
      if (this.currentDraw.started && this.currentDraw.winner) {
        this.hasStarted = true;
      }
    }
  }
}
