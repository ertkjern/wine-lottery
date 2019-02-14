import {Component, OnInit} from '@angular/core';
import {LotteryService} from '../../shared/services/lottery.service';
import {ActivatedRoute} from '@angular/router';
import {LotteryModel} from '../../shared/models/lottery.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {ParticipantModel} from '../../shared/models/participant.model';

@Component({
  selector: 'app-edit-lottery',
  templateUrl: './edit-lottery.component.html',
  styleUrls: ['./edit-lottery.component.scss']
})
export class EditLotteryComponent implements OnInit {

  lotteryId: string;
  lottery: LotteryModel;
  newParticipantForm: FormGroup;
  addParticipantError: string;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private lotteryService: LotteryService,
    private ar: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.lotteryId = this.ar.snapshot.paramMap.get('id');
    this.getLottery(this.lotteryId);
    this.setupForm();
  }

  addParticipant(participant: ParticipantModel, valid: boolean) {
    this.addParticipantError = null;
    if (valid) {
      this.updateForm(participant);
    } else {
      this.addParticipantError = 'Skjema har mangler';
    }
  }

  deleteParticipant(name: string, index: number) {
    if (index >= 0 && name) {
      if (confirm('Er du sikker på at du vil slette ' + name)) {
        this.lottery.participants.splice(index, 1);
        this.updateLotteryModel(this.lottery);
      }
    }
  }

  private updateForm(participant: ParticipantModel) {
    this.isLoading = true;
    if (!this.lottery.participants) {
      this.lottery.participants = [];
    }
    participant = this.setParticipantFloatingPosition(participant);
    this.lottery.participants.push(participant);
    this.updateLotteryModel(this.lottery);
    this.resetForm();
    this.isLoading = false;
  }

  private setParticipantFloatingPosition(participant: ParticipantModel) {
    participant.cssTop = this.getRandomInt(25, 98);
    participant.cssLeft = this.getRandomInt(0, 98);
    return participant;
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private updateLotteryModel(lottery: LotteryModel) {
    this.lotteryService.updateLottery(lottery);
  }

  private resetForm() {
    this.newParticipantForm.reset();
  }

  private getLottery(lotteryId: string) {
    this.lotteryService.getLottery(lotteryId).subscribe(lottery => {
      this.lottery = lottery;
    }, () => {
      console.error('something went wrong grabbing lottery by id');
    });
  }

  private setupForm() {
    this.newParticipantForm = this.fb.group({
      name: ['', Validators.required],
      numberOfTickets: ['', Validators.compose([Validators.required, this.validationService.validDrawNumber])],
    });
  }

  get name() {
    return this.newParticipantForm.get('name');
  }

  get numberOfTickets() {
    return this.newParticipantForm.get('numberOfTickets');
  }


}
