import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LotteryService} from '../shared/services/lottery.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pin: string;
  showError: boolean;
  isLoading: boolean;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private lotteryService: LotteryService
  ) {}

  ngOnInit() {
    this.showError = false;
    const message = this.ar.snapshot.paramMap.get('message');
    if (message === 'errorId') {
      this.showError = true;
    }
  }

  goToLottery() {
    this.showError = false;
    if (this.pin) {
      this.isLoading = true;
      this.lotteryService.getLottery(this.pin).subscribe(lottery => {
        if (lottery) {
          this.router.navigate(['lottery', this.pin]);
          this.isLoading = false;
        } else {
          this.showError = true;
          this.isLoading = false;
        }
      }, () => {
        console.error('something went wrong grabbing lottery by id');
      });
    } else {
      this.showError = true;
    }
  }
}
