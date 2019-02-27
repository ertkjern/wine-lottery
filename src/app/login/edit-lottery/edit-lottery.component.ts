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

  lotteryOngoing: boolean;
  lotteryId: string;
  lottery: LotteryModel;
  newParticipantForm: FormGroup;
  addParticipantError: string;
  isLoading: boolean;
  countdownFinished: boolean;

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

  startLottery() {
    const previousWinners = [];
    for (let i = 0; i < this.lottery.draws.length; i++) {
      const draw = this.lottery.draws[i];

      if (draw.started) {
        previousWinners.push(draw.winner);
      }

      if (!draw.started) {
        this.startLotteryTimer();
        const participants = this.generateParticipantList(previousWinners);
        if (participants.length > 0) {
          const winnerIndex = Math.floor((Math.random() * participants.length - 1) + 1);
          const winner = participants[winnerIndex];
          this.lotteryService.setWinnerAndStart(this.lottery, winner, i, participants);
          break;
        }
      }
    }
  }

  private startLotteryTimer() {
    this.lotteryOngoing = true;
    setTimeout(() => {
      this.lotteryOngoing = false;
    }, 30000);
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

  deleteParticipant(name: string, index: number) {
    if (index >= 0 && name) {
      if (confirm('Er du sikker på at du vil slette ' + name)) {
        this.lottery.participants.splice(index, 1);
        this.updateLotteryModel(this.lottery);
      }
    }
  }

  setCountdownFinished(value: boolean) {
    this.countdownFinished = value;
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
