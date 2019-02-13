import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ValidationService} from '../../shared/services/validation.service';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {LotteryModel} from '../../shared/models/lottery.model';
import {LotteryService} from '../../shared/services/lottery.service';

@Component({
  selector: 'app-new-lottery',
  templateUrl: './new-lottery.component.html',
  styleUrls: ['./new-lottery.component.scss']
})
export class NewLotteryComponent implements OnInit {

  newLotteryForm: FormGroup;
  userId: string;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lotteryService: LotteryService,
    private validationService: ValidationService,
    private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.setupForm();
    this.getUser();
  }

  private setupForm() {
    this.newLotteryForm = this.fb.group({
      dateTime: ['', Validators.compose([Validators.required, this.validationService.dateTimeValidation])],
      description: [''],
    });
  }

  private getUser() {
    this.auth.isLoggedIn().subscribe(result => {
      this.userId = result.uid;
    }, error => {
      console.log(error);
    });
  }

  createLottery(lotteryForm: LotteryModel) {
    if (this.userId) {
      lotteryForm.userId = this.userId;
      const id = this.lotteryService.createLottery(lotteryForm).then(result => {
        console.log(result);
      });
      console.log(id);
    } else {
      console.error('No valid user id.');
    }

  }

  cancel() {
    this.router.navigate(['profile']);
  }

  get dateTime() {
    return this.newLotteryForm.get('dateTime');
  }

  get description() {
    return this.newLotteryForm.get('description');
  }
}
