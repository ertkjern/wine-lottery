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
  minDate: Date;
  errorMessage: string;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lotteryService: LotteryService,
    private validationService: ValidationService,
    private auth: AuthenticationService) {
    this.minDate = new Date();
  }

  ngOnInit() {
    this.setupForm();
    this.getUser();
  }

  private setupForm() {
    this.newLotteryForm = this.fb.group({
      name: ['', Validators.required],
      dateTime: ['', Validators.compose([Validators.required, this.validationService.dateTimeValidation])],
      description: ['', Validators.required],
      numberOfDraws: ['', Validators.compose([Validators.required, this.validationService.validDrawNumber])],
    });
  }

  private getUser() {
    this.auth.isLoggedIn().subscribe(result => {
      this.userId = result.uid;
    }, error => {
      console.log(error);
    });
  }

  createLottery(lotteryForm: LotteryModel, valid: boolean) {
    this.errorMessage = null;
    if (this.userId && valid) {
      this.isLoading = true;
      lotteryForm.userId = this.userId;
      this.lotteryService.createLottery(lotteryForm).then(id => {
        this.isLoading = false;
        this.router.navigate(['edit-lottery', id]);
      }, error => {
        console.log(error);
        this.isLoading = false;
      });
    } else {
      this.errorMessage = 'Something wrong with the form';
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

  get name() {
    return this.newLotteryForm.get('name');
  }

  get numberOfDraws() {
    return this.newLotteryForm.get('numberOfDraws');
  }
}
