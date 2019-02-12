import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {LotteryModel} from '../models/lottery.model';
import {Observable, of} from 'rxjs';

@Injectable()
export class LotteryService {

  private lotteryCollection: AngularFirestoreCollection<LotteryModel>;

  constructor(private afs: AngularFirestore) {
  }

  public createLottery(lottery: LotteryModel): Observable<any> {
    return of(this.afs.collection<LotteryModel>('lotteries').add(lottery));
  }
}
