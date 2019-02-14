import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LotteryModel} from '../../shared/models/lottery.model';
import {LotteryService} from '../../shared/services/lottery.service';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss']
})
export class LotteryComponent implements OnInit {

  lotteryId: string;
  lottery: LotteryModel;
  hasStarted: boolean;

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private lotteryService: LotteryService
  ) {
  }

  ngOnInit() {
    this.lotteryId = this.ar.snapshot.paramMap.get('id');
    this.getLottery(this.lotteryId);
  }

  private getLottery(lotteryId: string) {
    this.lotteryService.getLottery(lotteryId).subscribe(lottery => {
      this.lottery = lottery;
      if (!this.lottery) {
        this.router.navigate(['home', 'errorId']);
      }
    }, () => {
      console.error('something went wrong grabbing lottery by id');
    });
  }
}
