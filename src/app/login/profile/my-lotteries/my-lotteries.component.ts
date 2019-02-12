import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-lotteries',
  templateUrl: './my-lotteries.component.html',
  styleUrls: ['./my-lotteries.component.scss']
})
export class MyLotteriesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newLottery() {
    this.router.navigate(['new-lottery']);
  }

}
